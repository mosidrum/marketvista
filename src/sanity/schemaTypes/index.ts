import { type SchemaTypeDefinition } from "sanity";
import banner from "../schemas/banner";

export const schema: { types: SchemaTypeDefinition[] } = {
  //banner, product, category
  types: [banner],
};
