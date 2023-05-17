import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
  res.status(200).json({ eras, designers, colours, conditions, countries, departments, sources, styles });
};

export default handler;
