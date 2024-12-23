import { z } from "zod";

export const source_types = {
  livre: "Livre",
  web: "Web",
} as const;

const source_enum = z.enum(["livre", "web"]);

export const citationFormSchemaOptions = z.discriminatedUnion("source_type", [
  z.object({
    name: z.string().min(1).max(255).optional(),
    url: z.string().min(1).max(255),
    accessed_on: z.string(),
    source_type: source_enum.extract(["web"]),
  }),
  z.object({
    publisher: z.string().min(1).max(255).optional(),
    collection: z.string().min(1).max(255).optional(),
    year: z.string().default("2025").optional(),
    page: z.string().default("1"),
    source_type: source_enum.extract(["livre"]),
  }),
]);

export const citationFormSchema = z.object({
  author: z.object({
    first_name: z.string().min(1).max(255),
    last_name: z.string().min(1).max(255),
  }),
  title: z.string().min(1).max(255),
  citationFormSchemaOptions,
});

export type CitationFormSchema = typeof citationFormSchema;
