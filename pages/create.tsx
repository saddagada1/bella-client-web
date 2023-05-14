import LoadingButton from "@/components/Utils/LoadingButton";
import { toErrorMap } from "@/utils/toErrorMap";
import { trimString } from "@/utils/trimString";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { FiCheck } from "react-icons/fi";
import * as yup from "yup";
import Select, { components } from "react-select";
import { promises as fs } from "fs";
import path from "path";
import type { GetStaticProps, NextPage, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import clsx from "clsx";
import { Department, Country, Designer, Condition, Colour } from "@/utils/types";
import { FixedSizeList as List } from "react-window";

const ConditionOption = (props: any) => {
  return (
    <components.Option {...props}>
      <div className="font-sans text-md font-medium">{props.data.label}</div>
      <div className="mt-1 font-sans text-sm font-light">{props.data.value}</div>
    </components.Option>
  );
};

const ColourOption = (props: any) => {
  return (
    <components.Option {...props}>
      <div className="flex">
        <div
          className="w-6 aspect-square rounded-full border border-solid border-primary"
          style={{
            backgroundColor: props.data.value,
          }}
        />
        <div className="ml-4 font-sans text-md font-medium">{props.data.label}</div>
      </div>
    </components.Option>
  );
};

const CustomMenuList = (props: any) => {
  const itemHeight = 47;
  const { options, children, maxHeight, maxWidth, getValue } = props;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * itemHeight;

  return (
    <div>
      <List width={maxWidth} height={maxHeight} itemCount={children.length} itemSize={itemHeight} initialScrollOffset={initialOffset}>
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{
  departments: Department[];
  countries: Country[];
  designers: Designer[];
  conditions: Condition[];
  colours: Colour[];
  eras: string[];
  sources: string[];
  styles: string[];
}> = async () => {
  const erasResponse = await fs.readFile(path.resolve(process.cwd(), "./public/data/eras.json"), "utf-8");
  const designersResponse = await fs.readFile(path.resolve(process.cwd(), "./public/data/designers.json"), "utf-8");
  const coloursResponse = await fs.readFile(path.resolve(process.cwd(), "./public/data/colours.json"), "utf-8");
  const conditionsResponse = await fs.readFile(path.resolve(process.cwd(), "./public/data/conditions.json"), "utf-8");
  const countriesResponse = await fs.readFile(path.resolve(process.cwd(), "./public/data/countries.json"), "utf-8");
  const departmentsResponse = await fs.readFile(path.resolve(process.cwd(), "./public/data/departments.json"), "utf-8");
  const sourcesResponse = await fs.readFile(path.resolve(process.cwd(), "./public/data/sources.json"), "utf-8");
  const stylesResponse = await fs.readFile(path.resolve(process.cwd(), "./public/data/styles.json"), "utf-8");
  const eras = JSON.parse(erasResponse);
  const designers = JSON.parse(designersResponse);
  const colours = JSON.parse(coloursResponse);
  const conditions = JSON.parse(conditionsResponse);
  const countries = JSON.parse(countriesResponse);
  const departments = JSON.parse(departmentsResponse);
  const sources = JSON.parse(sourcesResponse);
  const styles = JSON.parse(stylesResponse);
  return { props: { eras, designers, colours, conditions, countries, departments, sources, styles } };
};

interface CreateValues {
  title: string;
  description: string;
  condition: string;
  department: string;
  category: string;
  subcategory: string;
  quantity: number;
  size: string | null;
  designer: string | null;
  colour: string | null;
  source: string | null;
  era: string | null;
  style: string | null;
  country: string;
  offer_free_shipping: boolean;
  shipping_price: string;
  offer_global_shipping: boolean;
  global_shipping_price: string;
  price: string;
}

const Create: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  eras,
  designers,
  colours,
  conditions,
  countries,
  departments,
  sources,
  styles,
}) => {
  return (
    <>
      <Head>
        <title>New Product - Bella</title>
      </Head>
      <>
        <Formik
          initialValues={
            {
              title: "",
              description: "",
              condition: "",
              department: "",
              category: "",
              subcategory: "",
              quantity: 1,
              size: null,
              designer: null,
              colour: null,
              source: null,
              era: null,
              style: null,
              country: "",
              offer_free_shipping: false,
              shipping_price: "",
              offer_global_shipping: false,
              global_shipping_price: "",
              price: "",
            } as CreateValues
          }
          validationSchema={yup.object().shape({
            title: yup.string().required("Required"),
            description: yup.string().max(1000, "Max 1000 Chars").required("Required"),
            condition: yup.string().required("Required"),
            department: yup.string().required("Required"),
            category: yup.string().required("Required"),
            subcategory: yup.string().required("Required"),
            quantity: yup.number().required("Required"),
            size: yup.string().when(["department", "category"], {
              is: (department: string, category: string) =>
                department &&
                category &&
                departments.find((d) => d.name === department)!.categories.find((c) => c.name === category)!.sizes !== undefined,
              then: () => yup.string().required("Required"),
              otherwise: () => yup.string().nullable(),
            }),
            country: yup.string().required("Required"),
            shipping_price: yup.string().when("offer_free_shipping", {
              is: (offer_free_shipping: boolean) => !offer_free_shipping,
              then: () => yup.string().required("Required"),
              otherwise: () => yup.string(),
            }),
            global_shipping_price: yup.string().when("offer_global_shipping", {
              is: (offer_global_shipping: boolean) => offer_global_shipping,
              then: () => yup.string().required("Required"),
              otherwise: () => yup.string(),
            }),
            price: yup.string().required("Required"),
          })}
          onSubmit={async (values: CreateValues, { setErrors }: FormikHelpers<CreateValues>) => {
            alert("submit");
          }}
        >
          {({ errors, touched, values, setFieldValue, isSubmitting }) => (
            <Form className="w-full pt-10 sm:pb-28 px-4">
              <h1 className="text-2xl font-black font-display uppercase pb-6 border-b border-solid border-gray-300">New Product</h1>
              <h2 className="text-lg font-bold font-display uppercase mt-9 pb-4 mb-4 border-b border-solid border-gray-300">General</h2>
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="title">Title</label>
                {errors.title && touched.title && <div className="text-red-500">{errors.title}</div>}
              </div>
              <Field
                className="w-full bg-transparent text-md font-medium p-3 mb-4 border border-solid border-secondary rounded focus:outline-none"
                placeholder="e.g. green Nike hoodie"
                id="title"
                name="title"
              />
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="description">Description</label>
                {errors.description && touched.description && <div className="text-red-500">{errors.description}</div>}
              </div>
              <Field
                className="w-full h-24 bg-transparent text-md font-medium p-3 border border-solid border-secondary rounded resize-none focus:outline-none"
                placeholder="e.g. only worn a few times"
                id="description"
                name="description"
                as="textarea"
              />
              <p className="w-full text-right text-sm text-gray-500 mb-4">
                {values.description ? 1000 - values.description.length : 1000} Chars Left
              </p>
              <h2 className="text-lg font-bold font-display uppercase pb-4 mb-4 border-b border-solid border-gray-300">Specifics</h2>
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="condition">Condition</label>
                {errors.condition && touched.condition && <div className="text-red-500">{errors.condition}</div>}
              </div>
              <Select
                className="font-sans text-md font-medium mb-4"
                classNames={{
                  control: () => "p-3 border border-solid border-secondary rounded",
                  menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded shadow-2xl",
                  menuList: () => "flex flex-col gap-2",
                  option: ({ isSelected }) =>
                    clsx("py-2 px-3 hover:bg-gray-300 hover:text-secondary rounded", isSelected && "bg-secondary text-primary"),
                }}
                unstyled
                placeholder=""
                isSearchable={false}
                isClearable
                onChange={(option, trigger) => {
                  if (option) {
                    setFieldValue("condition", option.label);
                  }
                  if (trigger.action === "clear") {
                    setFieldValue("condition", "");
                  }
                }}
                options={conditions.map((condition) => ({ value: condition.description, label: condition.name }))}
                components={{ Option: ConditionOption }}
              />
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="department">Department</label>
                {errors.department && touched.department && <div className="text-red-500">{errors.department}</div>}
              </div>
              <Select
                className="font-sans text-md font-medium mb-4"
                classNames={{
                  control: () => "p-3 border border-solid border-secondary rounded",
                  menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded shadow-2xl",
                  menuList: () => "flex flex-col gap-2",
                  option: ({ isSelected }) =>
                    clsx("py-2 px-3 hover:bg-gray-300 hover:text-secondary rounded", isSelected && "bg-secondary text-primary"),
                }}
                unstyled
                placeholder=""
                isSearchable={false}
                isClearable
                onChange={(option, trigger) => {
                  if (option) {
                    setFieldValue("department", option.label);
                    setFieldValue("category", "");
                    setFieldValue("subcategory", "");
                    setFieldValue("size", null);
                    setFieldValue("quantity", 1);
                  }
                  if (trigger.action === "clear") {
                    setFieldValue("department", "");
                    setFieldValue("category", "");
                    setFieldValue("subcategory", "");
                    setFieldValue("size", null);
                    setFieldValue("quantity", 1);
                  }
                }}
                options={departments.map((department) => ({ value: department.name, label: department.name }))}
              />
              {values.department && (
                <>
                  <div className="flex justify-between text-md font-semibold mb-2">
                    <label htmlFor="category">Category</label>
                    {errors.category && touched.category && <div className="text-red-500">{errors.category}</div>}
                  </div>
                  <Select
                    key={values.department}
                    className="font-sans text-md font-medium mb-4"
                    classNames={{
                      control: () => "p-3 border border-solid border-secondary rounded",
                      menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded shadow-2xl",
                      menuList: () => "flex flex-col gap-2",
                      option: ({ isSelected }) =>
                        clsx("py-2 px-3 hover:bg-gray-300 hover:text-secondary rounded", isSelected && "bg-secondary text-primary"),
                    }}
                    unstyled
                    placeholder=""
                    isSearchable={false}
                    isClearable
                    onChange={(option, trigger) => {
                      if (option) {
                        setFieldValue("category", option.label);
                        setFieldValue("subcategory", "");
                        setFieldValue("size", null);
                        setFieldValue("quantity", 1);
                      }
                      if (trigger.action === "clear") {
                        setFieldValue("category", "");
                        setFieldValue("subcategory", "");
                        setFieldValue("size", null);
                        setFieldValue("quantity", 1);
                      }
                    }}
                    options={departments
                      .find((department) => department.name === values.department)!
                      .categories.map((category) => ({ value: category.name, label: category.name }))}
                  />
                </>
              )}
              {values.department && values.category && (
                <>
                  <div className="flex justify-between text-md font-semibold mb-2">
                    <label htmlFor="subcategory">Subcategory</label>
                    {errors.subcategory && touched.subcategory && <div className="text-red-500">{errors.subcategory}</div>}
                  </div>
                  <Select
                    key={values.category}
                    className="font-sans text-md font-medium mb-4"
                    classNames={{
                      control: () => "p-3 border border-solid border-secondary rounded",
                      menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded shadow-2xl",
                      menuList: () => "flex flex-col gap-2",
                      option: ({ isSelected }) =>
                        clsx("py-2 px-3 hover:bg-gray-300 hover:text-secondary rounded", isSelected && "bg-secondary text-primary"),
                    }}
                    unstyled
                    placeholder=""
                    isSearchable={false}
                    isClearable
                    onChange={(option, trigger) => {
                      if (option) {
                        setFieldValue("subcategory", option.label);
                        setFieldValue("size", null);
                        setFieldValue("quantity", 1);
                      }
                      if (trigger.action === "clear") {
                        setFieldValue("subcategory", "");
                        setFieldValue("size", null);
                        setFieldValue("quantity", 1);
                      }
                    }}
                    options={departments
                      .find((department) => department.name === values.department)!
                      .categories.find((category) => category.name === values.category)!
                      .subcategories.map((subcategory) => ({ value: subcategory, label: subcategory }))}
                  />
                  <div className="flex items-center">
                    {departments
                      .find((department) => department.name === values.department)!
                      .categories.find((category) => category.name === values.category)!.sizes && (
                      <div className="w-1/2 mr-4">
                        <div className="flex justify-between text-md font-semibold mb-2">
                          <label htmlFor="size">Size</label>
                          {errors.size && touched.size && <div className="text-red-500">{errors.size}</div>}
                        </div>
                        <Select
                          key={values.category}
                          className="font-sans text-md font-medium mt-2 mb-4"
                          classNames={{
                            control: () => "p-3 border border-solid border-secondary rounded",
                            menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded shadow-2xl",
                            menuList: () => "flex flex-col gap-2",
                            option: ({ isSelected }) =>
                              clsx("py-2 px-3 hover:bg-gray-300 hover:text-secondary rounded", isSelected && "bg-secondary text-primary"),
                          }}
                          unstyled
                          placeholder=""
                          isSearchable={false}
                          isClearable
                          onChange={(option, trigger) => {
                            if (option) {
                              setFieldValue("size", option.label);
                            }
                            if (trigger.action === "clear") {
                              setFieldValue("size", null);
                            }
                          }}
                          options={departments
                            .find((department) => department.name === values.department)!
                            .categories.find((category) => category.name === values.category)!
                            .sizes!.map((size) => ({ value: size, label: size }))}
                        />
                      </div>
                    )}
                    <div className="w-1/2">
                      <div className="flex justify-between text-md font-semibold mb-2">
                        <label htmlFor="quantity">Quantity</label>
                        {errors.quantity && touched.quantity && <div className="text-red-500">{errors.quantity}</div>}
                      </div>
                      <Select
                        key={values.category}
                        className="font-sans text-md font-medium mt-2 mb-4"
                        classNames={{
                          control: () => "p-3 border border-solid border-secondary rounded",
                          menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded shadow-2xl",
                          menuList: () => "flex flex-col gap-2",
                          option: ({ isSelected }) =>
                            clsx("py-2 px-3 hover:bg-gray-300 hover:text-secondary rounded", isSelected && "bg-secondary text-primary"),
                        }}
                        unstyled
                        isClearable
                        defaultValue={{ value: values.quantity, label: values.quantity }}
                        onChange={(option, trigger) => {
                          if (option) {
                            setFieldValue("quantity", option.label);
                          }
                          if (trigger.action === "clear") {
                            setFieldValue("quantity", 1);
                          }
                        }}
                        options={Array(100)
                          .fill(null)
                          .map((_, index) => ({ value: index + 1, label: index + 1 }))}
                      />
                    </div>
                  </div>
                </>
              )}
              <h2 className="text-lg font-bold font-display uppercase mt-9 pb-4 mb-4 border-b border-solid border-gray-300">Enhance</h2>
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="designer">Designer</label>
                {errors.designer && touched.designer && <div className="text-red-500">{errors.designer}</div>}
              </div>
              <Select
                className="font-sans text-md font-medium mb-4"
                classNames={{
                  control: () => "p-3 border border-solid border-secondary rounded",
                  menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded shadow-2xl",
                  menuList: () => "flex flex-col gap-2",
                  option: ({ isSelected }) =>
                    clsx("py-2 px-3 hover:bg-gray-300 hover:text-secondary rounded", isSelected && "bg-secondary text-primary"),
                }}
                unstyled
                isClearable
                placeholder=""
                onChange={(option, trigger) => {
                  if (option) {
                    setFieldValue("designer", option.label);
                  }
                  if (trigger.action === "clear") {
                    setFieldValue("designer", null);
                  }
                }}
                options={designers.map((designer) => ({ value: designer.name, label: designer.name }))}
                components={{ MenuList: CustomMenuList }}
              />
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="colour">Colour</label>
                {errors.colour && touched.colour && <div className="text-red-500">{errors.colour}</div>}
              </div>
              <Select
                className="font-sans text-md font-medium mb-4"
                classNames={{
                  control: () => "p-3 border border-solid border-secondary rounded",
                  menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded shadow-2xl",
                  menuList: () => "flex flex-col gap-2",
                  option: ({ isSelected }) =>
                    clsx("py-2 px-3 hover:bg-gray-300 hover:text-secondary rounded", isSelected && "bg-secondary text-primary"),
                }}
                unstyled
                placeholder=""
                isSearchable={false}
                isClearable
                onChange={(option, trigger) => {
                  if (option) {
                    setFieldValue("colour", option.label);
                  }
                  if (trigger.action === "clear") {
                    setFieldValue("colour", null);
                  }
                }}
                options={colours.map((colour) => ({ value: colour.code, label: colour.name }))}
                components={{ Option: ColourOption }}
              />
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="source">Source</label>
                {errors.source && touched.source && <div className="text-red-500">{errors.source}</div>}
              </div>
              <Select
                className="font-sans text-md font-medium mb-4"
                classNames={{
                  control: () => "p-3 border border-solid border-secondary rounded",
                  menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded shadow-2xl",
                  menuList: () => "flex flex-col gap-2",
                  option: ({ isSelected }) =>
                    clsx("py-2 px-3 hover:bg-gray-300 hover:text-secondary rounded", isSelected && "bg-secondary text-primary"),
                }}
                unstyled
                placeholder=""
                isSearchable={false}
                isClearable
                onChange={(option, trigger) => {
                  if (option) {
                    setFieldValue("source", option.label);
                  }
                  if (trigger.action === "clear") {
                    setFieldValue("source", null);
                  }
                }}
                options={sources.map((source) => ({ value: source, label: source }))}
              />
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="era">Era</label>
                {errors.era && touched.era && <div className="text-red-500">{errors.era}</div>}
              </div>
              <Select
                className="font-sans text-md font-medium mb-4"
                classNames={{
                  control: () => "p-3 border border-solid border-secondary rounded",
                  menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded shadow-2xl",
                  menuList: () => "flex flex-col gap-2",
                  option: ({ isSelected }) =>
                    clsx("py-2 px-3 hover:bg-gray-300 hover:text-secondary rounded", isSelected && "bg-secondary text-primary"),
                }}
                unstyled
                placeholder=""
                isSearchable={false}
                isClearable
                onChange={(option, trigger) => {
                  if (option) {
                    setFieldValue("era", option.label);
                  }
                  if (trigger.action === "clear") {
                    setFieldValue("era", null);
                  }
                }}
                options={eras.map((era) => ({ value: era, label: era }))}
              />
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="style">Style</label>
                {errors.style && touched.style && <div className="text-red-500">{errors.style}</div>}
              </div>
              <Select
                className="font-sans text-md font-medium mb-4"
                classNames={{
                  control: () => "p-3 border border-solid border-secondary rounded",
                  menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded shadow-2xl",
                  menuList: () => "flex flex-col gap-2",
                  option: ({ isSelected }) =>
                    clsx("py-2 px-3 hover:bg-gray-300 hover:text-secondary rounded", isSelected && "bg-secondary text-primary"),
                }}
                unstyled
                placeholder=""
                isSearchable={false}
                isClearable
                onChange={(option, trigger) => {
                  if (option) {
                    setFieldValue("style", option.label);
                  }
                  if (trigger.action === "clear") {
                    setFieldValue("style", null);
                  }
                }}
                options={styles.map((style) => ({ value: style, label: style }))}
              />
              <h2 className="text-lg font-bold font-display uppercase mt-9 pb-4 mb-4 border-b border-solid border-gray-300">Location</h2>
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="country">Country</label>
                {errors.country && touched.country && <div className="text-red-500">{errors.country}</div>}
              </div>
              <Select
                className="font-sans text-md font-medium mb-4"
                classNames={{
                  control: () => "p-3 border border-solid border-secondary rounded",
                  menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded shadow-2xl",
                  menuList: () => "flex flex-col gap-2",
                  option: ({ isSelected }) =>
                    clsx("py-2 px-3 hover:bg-gray-300 hover:text-secondary rounded", isSelected && "bg-secondary text-primary"),
                }}
                unstyled
                placeholder=""
                isClearable
                onChange={(option, trigger) => {
                  if (option) {
                    setFieldValue("country", option.label);
                  }
                  if (trigger.action === "clear") {
                    setFieldValue("country", "");
                  }
                }}
                options={countries.map((country) => ({ value: country.name, label: country.name }))}
              />
              <h2 className="text-lg font-bold font-display uppercase mt-9 pb-4 mb-4 border-b border-solid border-gray-300">Shipping</h2>
              <div className="sm:w-2/3 flex items-center text-md font-semibold mb-6">
                <div
                  onClick={() => {
                    setFieldValue("offer_free_shipping", !values.offer_free_shipping);
                    setFieldValue("shipping_price", "");
                  }}
                  className={`w-5 aspect-square mr-4 flex justify-center items-center border border-solid border-secondary rounded ${
                    values.offer_free_shipping && "bg-secondary"
                  }`}
                >
                  {values.offer_free_shipping && <FiCheck className="text-sm text-primary" />}
                </div>
                <label htmlFor="offer_free_shipping">Free Shipping</label>
              </div>
              {!values.offer_free_shipping && (
                <>
                  <div className="sm:w-2/3 flex justify-between text-md font-semibold mb-2">
                    <label htmlFor="shipping">Shipping</label>
                    {errors.shipping_price && touched.shipping_price && <div className="text-red-500">{errors.shipping_price}</div>}
                  </div>
                  <div className="sm:w-2/3 flex text-md font-medium p-3 mb-10 border border-solid border-secondary rounded">
                    <span className="font-display mr-1">CA$</span>
                    <input
                      className="bg-transparent focus:outline-none"
                      type="text"
                      value={values.shipping_price}
                      onChange={(event) => {
                        const currencyRegex = /^[1-9]*(\.[0-9]{0,2})?$/;
                        if (currencyRegex.test(event.currentTarget.value)) {
                          setFieldValue("shipping_price", event.currentTarget.value);
                        }
                      }}
                    />
                  </div>
                </>
              )}
              <div className="sm:w-2/3 flex items-center text-md font-semibold mb-6">
                <div
                  onClick={() => {
                    setFieldValue("offer_global_shipping", !values.offer_global_shipping);
                    setFieldValue("global_shipping_price", "");
                  }}
                  className={`w-5 aspect-square mr-4 flex justify-center items-center border border-solid border-secondary rounded ${
                    values.offer_global_shipping && "bg-secondary"
                  }`}
                >
                  {values.offer_global_shipping && <FiCheck className="text-sm text-primary" />}
                </div>
                <label htmlFor="offer_free_shipping">Global Shipping</label>
              </div>
              {values.offer_global_shipping && (
                <>
                  <div className="sm:w-2/3 flex justify-between text-md font-semibold mb-2">
                    <label htmlFor="global_shipping">Global Shipping</label>
                    {errors.global_shipping_price && touched.global_shipping_price && (
                      <div className="text-red-500">{errors.global_shipping_price}</div>
                    )}
                  </div>
                  <div className="sm:w-2/3 flex text-md font-medium p-3 mb-4 border border-solid border-secondary rounded">
                    <span className="font-display mr-1">CA$</span>
                    <input
                      className="bg-transparent focus:outline-none"
                      type="text"
                      value={values.global_shipping_price}
                      onChange={(event) => {
                        const currencyRegex = /^[1-9]*(\.[0-9]{0,2})?$/;
                        if (currencyRegex.test(event.currentTarget.value)) {
                          setFieldValue("global_shipping_price", event.currentTarget.value);
                        }
                      }}
                    />
                  </div>
                </>
              )}
              <h2 className="text-lg font-bold font-display uppercase mt-9 pb-4 mb-4 border-b border-solid border-gray-300">Pricing</h2>
              <div className="sm:w-2/3 flex justify-between text-md font-semibold mb-2">
                <label htmlFor="price">Price</label>
                {errors.price && touched.price && <div className="text-red-500">{errors.price}</div>}
              </div>
              <div className="sm:w-2/3 flex text-md font-medium p-3 mb-10 border border-solid border-secondary rounded">
                <span className="font-display mr-1">CA$</span>
                <input
                  className="bg-transparent focus:outline-none"
                  type="text"
                  value={values.price}
                  onChange={(event) => {
                    const currencyRegex = /^[1-9]*(\.[0-9]{0,2})?$/;
                    if (currencyRegex.test(event.currentTarget.value)) {
                      setFieldValue("price", event.currentTarget.value);
                    }
                  }}
                />
              </div>
              <div className="flex gap-4 text-md font-bold font-display uppercase border-t border-solid border-gray-300 sm:fixed sm:z-50 sm:w-full sm:px-4 sm:bottom-0 sm:left-0 sm:bg-primary">
                <div className="w-full h-14 mt-6 mb-12 flex justify-center items-center rounded border border-solid border-secondary">Draft</div>
                <LoadingButton
                  className="w-full h-14 mt-6 mb-12 flex justify-center items-center bg-secondary text-primary uppercase rounded border border-solid border-secondary"
                  dark
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Post
                </LoadingButton>
              </div>
            </Form>
          )}
        </Formik>
      </>
    </>
  );
};

export default Create;
