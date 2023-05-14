import LoadingButton from "@/components/LoadingButton";
import { toErrorMap } from "@/utils/toErrorMap";
import { trimString } from "@/utils/trimString";
import { Formik, FormikHelpers, Form, Field } from "formik";
import Select from "react-select";
import { promises as fs } from "fs";
import path from "path";
import type { GetStaticProps, NextPage, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import clsx from "clsx";

interface Department {
  name: string;
  categories: { name: string; subcategories: string[]; sizes?: string[] }[];
}

interface Country {
  name: string;
  code: string;
}

interface Brand {
  id: number;
  name: string;
  slug: string;
}

interface Condition {
  name: string;
  description: string;
}

export const getStaticProps: GetStaticProps<{
  departments: Department[];
  countries: Country[];
  brands: Brand[];
  conditions: Condition[];
  ages: string[];
  colours: string[];
  sources: string[];
  styles: string[];
}> = async ({ params }) => {
  const agesResponse = await fs.readFile(path.resolve(process.cwd(), "./public/data/ages.json"), "utf-8");
  const brandsResponse = await fs.readFile(path.resolve(process.cwd(), "./public/data/brands.json"), "utf-8");
  const coloursResponse = await fs.readFile(path.resolve(process.cwd(), "./public/data/colours.json"), "utf-8");
  const conditionsResponse = await fs.readFile(path.resolve(process.cwd(), "./public/data/conditions.json"), "utf-8");
  const countriesResponse = await fs.readFile(path.resolve(process.cwd(), "./public/data/countries.json"), "utf-8");
  const departmentsResponse = await fs.readFile(path.resolve(process.cwd(), "./public/data/departments.json"), "utf-8");
  const sourcesResponse = await fs.readFile(path.resolve(process.cwd(), "./public/data/sources.json"), "utf-8");
  const stylesResponse = await fs.readFile(path.resolve(process.cwd(), "./public/data/styles.json"), "utf-8");
  const ages = JSON.parse(agesResponse);
  const brands = JSON.parse(brandsResponse);
  const colours = JSON.parse(coloursResponse);
  const conditions = JSON.parse(conditionsResponse);
  const countries = JSON.parse(countriesResponse);
  const departments = JSON.parse(departmentsResponse);
  const sources = JSON.parse(sourcesResponse);
  const styles = JSON.parse(stylesResponse);
  return { props: { ages, brands, colours, conditions, countries, departments, sources, styles } };
};

interface CreateValues {
  title: string;
  description: string | null;
  department: string;
  category: string;
  subcategory: string;
  size: string | null;
  brand: string | null;
  condition: string | null;
  colour: string | null;
  source: string | null;
  age: string | null;
  style: string | null;
  country: string;
  price: number;
  shipping_price: number;
}

const Create: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  ages,
  brands,
  colours,
  conditions,
  countries,
  departments,
  sources,
  styles,
}) => {
  const validateRequired = (value: string) => {
    let error;
    if (!value) {
      error = "Required";
    }
    return error;
  };

  const validateDescription = (value: string) => {
    let error;
    if (value && value.length >= 1000) {
      error = "Max 500 Chars";
    }
    return error;
  };

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
              description: null,
              department: "",
              category: "",
              subcategory: "",
              size: null,
              brand: null,
              condition: null,
              colour: null,
              source: null,
              age: null,
              style: null,
              country: "",
              price: 20.0,
              shipping_price: 5.0,
            } as CreateValues
          }
          onSubmit={async (values: CreateValues, { setErrors }: FormikHelpers<CreateValues>) => {}}
        >
          {({ errors, touched, values, setFieldValue, isSubmitting }) => (
            <Form className="w-full pt-10 px-4">
              <h1 className="text-2xl font-black font-display uppercase pb-6 mb-10 border-b border-solid border-secondary">New Product</h1>
              <h2 className="text-lg font-bold font-display uppercase pb-4 mb-4 border-b border-solid border-secondary">General</h2>
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="title">Title</label>
                {errors.title && touched.title && <div className="text-red-500">{errors.title}</div>}
              </div>
              <Field
                className="w-full bg-transparent text-md font-medium p-3 mb-4 border border-solid border-secondary rounded"
                placeholder="e.g. Green Nike Hoodie"
                id="title"
                name="title"
                validate={validateRequired}
              />
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="description">Description</label>
                {errors.description && touched.description && <div className="text-red-500">{errors.description}</div>}
              </div>
              <Field
                className="w-full h-24 bg-transparent text-md font-medium p-3 border border-solid border-secondary rounded resize-none"
                placeholder="e.g. Only worn a few times"
                id="description"
                name="description"
                as="textarea"
                validate={validateDescription}
              />
              <p className="w-full text-right text-sm text-gray-500 mb-4">{values.description ? 1000 - values.description.length : 1000}</p>
              <h2 className="text-lg font-bold font-display uppercase pb-4 mb-4 border-b border-solid border-secondary">Specifics</h2>
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="department">Department</label>
                {errors.department && touched.department && <div className="text-red-500">{errors.department}</div>}
              </div>
              <Select
                className="font-sans text-md font-medium mb-4"
                classNames={{
                  control: () => "p-3 border border-solid border-secondary rounded",
                  menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded",
                  menuList: () => "flex flex-col gap-2",
                  option: ({ isSelected }) => clsx("p-2 hover:bg-gray-300 rounded", isSelected && "bg-gray-300"),
                }}
                unstyled
                placeholder=""
                isSearchable={false}
                onChange={(option) => setFieldValue("department", option!.value)}
                options={departments.map((department) => ({ value: department.name, label: department.name }))}
              />
              {values.department !== "" && (
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
                      menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded",
                      menuList: () => "flex flex-col gap-2",
                      option: ({ isSelected }) => clsx("p-2 hover:bg-gray-300 rounded", isSelected && "bg-gray-300"),
                    }}
                    unstyled
                    placeholder=""
                    isSearchable={false}
                    onChange={(option) => setFieldValue("category", option!.value)}
                    options={departments
                      .find((department) => department.name === values.department)!
                      .categories.map((category) => ({ value: category.name, label: category.name }))}
                  />
                </>
              )}
              {values.department !== "" && values.category !== "" && (
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
                      menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded",
                      menuList: () => "flex flex-col gap-2",
                      option: ({ isSelected }) => clsx("p-2 hover:bg-gray-300 rounded", isSelected && "bg-gray-300"),
                    }}
                    unstyled
                    placeholder=""
                    isSearchable={false}
                    onChange={(option) => setFieldValue("subcategory", option!.value)}
                    options={departments
                      .find((department) => department.name === values.department)!
                      .categories.find((category) => category.name === values.category)!
                      .subcategories.map((subcategory) => ({ value: subcategory, label: subcategory }))}
                  />
                  {departments
                    .find((department) => department.name === values.department)!
                    .categories.find((category) => category.name === values.category)!.sizes && (
                    <>
                      <div className="flex justify-between text-md font-semibold mb-2">
                        <label htmlFor="Size">Size</label>
                        {errors.size && touched.size && <div className="text-red-500">{errors.size}</div>}
                      </div>
                      <Select
                        key={values.category}
                        className="font-sans text-md font-medium mt-2 mb-4"
                        classNames={{
                          control: () => "p-3 border border-solid border-secondary rounded",
                          menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded",
                          menuList: () => "flex flex-col gap-2",
                          option: ({ isSelected }) => clsx("p-2 hover:bg-gray-300 rounded", isSelected && "bg-gray-300"),
                        }}
                        unstyled
                        placeholder=""
                        isSearchable={false}
                        onChange={(option) => setFieldValue("size", option!.value)}
                        options={departments
                          .find((department) => department.name === values.department)!
                          .categories.find((category) => category.name === values.category)!
                          .sizes!.map((size) => ({ value: size, label: size }))}
                      />
                    </>
                  )}
                </>
              )}
              <h2 className="text-lg font-bold font-display uppercase mt-9 pb-4 mb-4 border-b border-solid border-secondary">Enhance</h2>
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="brand">Brand</label>
                {errors.brand && touched.brand && <div className="text-red-500">{errors.brand}</div>}
              </div>
              <Select
                className="font-sans text-md font-medium mb-4"
                classNames={{
                  control: () => "p-3 border border-solid border-secondary rounded",
                  menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded",
                  menuList: () => "flex flex-col gap-2",
                  option: ({ isSelected }) => clsx("p-2 hover:bg-gray-300 rounded", isSelected && "bg-gray-300"),
                }}
                unstyled
                placeholder=""
                onChange={(option) => setFieldValue("brand", option!.value)}
                options={brands.map((brand) => ({ value: brand.name, label: brand.name }))}
              />
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="colour">Colour</label>
                {errors.colour && touched.colour && <div className="text-red-500">{errors.colour}</div>}
              </div>
              <Select
                className="font-sans text-md font-medium mb-4"
                classNames={{
                  control: () => "p-3 border border-solid border-secondary rounded",
                  menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded",
                  menuList: () => "flex flex-col gap-2",
                  option: ({ isSelected }) => clsx("p-2 hover:bg-gray-300 rounded", isSelected && "bg-gray-300"),
                }}
                unstyled
                placeholder=""
                isSearchable={false}
                onChange={(option) => setFieldValue("colour", option!.value)}
                options={colours.map((colour) => ({ value: colour, label: colour }))}
              />
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="source">Source</label>
                {errors.source && touched.source && <div className="text-red-500">{errors.source}</div>}
              </div>
              <Select
                className="font-sans text-md font-medium mb-4"
                classNames={{
                  control: () => "p-3 border border-solid border-secondary rounded",
                  menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded",
                  menuList: () => "flex flex-col gap-2",
                  option: ({ isSelected }) => clsx("p-2 hover:bg-gray-300 rounded", isSelected && "bg-gray-300"),
                }}
                unstyled
                placeholder=""
                isSearchable={false}
                onChange={(option) => setFieldValue("source", option!.value)}
                options={sources.map((source) => ({ value: source, label: source }))}
              />
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="age">Age</label>
                {errors.age && touched.age && <div className="text-red-500">{errors.age}</div>}
              </div>
              <Select
                className="font-sans text-md font-medium mb-4"
                classNames={{
                  control: () => "p-3 border border-solid border-secondary rounded",
                  menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded",
                  menuList: () => "flex flex-col gap-2",
                  option: ({ isSelected }) => clsx("p-2 hover:bg-gray-300 rounded", isSelected && "bg-gray-300"),
                }}
                unstyled
                placeholder=""
                isSearchable={false}
                onChange={(option) => setFieldValue("age", option!.value)}
                options={ages.map((age) => ({ value: age, label: age }))}
              />
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="style">Style</label>
                {errors.style && touched.style && <div className="text-red-500">{errors.style}</div>}
              </div>
              <Select
                className="font-sans text-md font-medium mb-4"
                classNames={{
                  control: () => "p-3 border border-solid border-secondary rounded",
                  menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded",
                  menuList: () => "flex flex-col gap-2",
                  option: ({ isSelected }) => clsx("p-2 hover:bg-gray-300 rounded", isSelected && "bg-gray-300"),
                }}
                unstyled
                placeholder=""
                isSearchable={false}
                onChange={(option) => setFieldValue("style", option!.value)}
                options={styles.map((style) => ({ value: style, label: style }))}
              />
              <h2 className="text-lg font-bold font-display uppercase mt-9 pb-4 mb-4 border-b border-solid border-secondary">Location</h2>
              <div className="flex justify-between text-md font-semibold mb-2">
                <label htmlFor="country">Country</label>
                {errors.country && touched.country && <div className="text-red-500">{errors.country}</div>}
              </div>
              <Select
                className="font-sans text-md font-medium mb-4"
                classNames={{
                  control: () => "p-3 border border-solid border-secondary rounded",
                  menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded",
                  menuList: () => "flex flex-col gap-2",
                  option: ({ isSelected }) => clsx("p-2 hover:bg-gray-300 rounded", isSelected && "bg-gray-300"),
                }}
                unstyled
                placeholder=""
                onChange={(option) => setFieldValue("country", option!.value)}
                options={countries.map((country) => ({ value: country.name, label: country.name }))}
              />
              <h2 className="text-lg font-bold font-display uppercase mt-9 pb-4 mb-4 border-b border-solid border-secondary">Pricing</h2>
              <div className="flex flex-col gap-4">
                <div className="w-1/2">
                  <div className="flex justify-between text-md font-semibold mb-2">
                    <label htmlFor="shipping">Shipping</label>
                    {errors.shipping_price && touched.shipping_price && <div className="text-red-500">{errors.shipping_price}</div>}
                  </div>
                  <Field
                    className="w-full bg-transparent text-md font-medium p-3 mb-4 border border-solid border-secondary rounded"
                    placeholder="e.g. 5.00"
                    id="shipping_price"
                    name="shipping_price"
                    validate={validateRequired}
                  />
                </div>
                <div className="w-1/2">
                  <div className="flex justify-between text-md font-semibold mb-2">
                    <label htmlFor="price">Price</label>
                    {errors.price && touched.price && <div className="text-red-500">{errors.price}</div>}
                  </div>
                  <Field
                    className="w-full bg-transparent text-md font-medium p-3 mb-4 border border-solid border-secondary rounded"
                    placeholder="e.g. 20.00"
                    id="price"
                    name="price"
                    validate={validateRequired}
                  />
                </div>
              </div>
              <div className="border-t border-solid border-secondary fixed bottom-0 left-0 w-full bg-primary px-4">
                <LoadingButton
                  className="w-full h-14 mt-6 mb-10 flex justify-center items-center bg-secondary text-primary rounded text-md font-bold border border-solid border-secondary"
                  dark
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Create Product
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
