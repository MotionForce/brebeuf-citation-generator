import { z } from "zod";

export const source_types = {
  livre: "Livre",
  web: "Web",
} as const;

const source_enum = z.enum(["livre", "web"]);

export const citationFormSchemaOptions = z.discriminatedUnion("source_type", [
  z.object({
    name: z.string().optional(),
    url: z.string(),
    publication_year: z.string().optional(),
    accessed_on: z.string(),
    source_type: source_enum.extract(["web"]),
    last_added: z.string().optional(),
  }),
  z.object({
    publisher: z.string().optional(),
    collection: z.string().optional(),
    year: z.string().default("2025").optional(),
    page: z.string().default("1").optional(),
    total_pages: z.string().default("1"),
    source_type: source_enum.extract(["livre"]),
  }),
]);

export const citationFormSchema = z.object({
  author: z.object({
    first_name: z.string().optional().default(""),
    last_name: z.string().optional().default(""),
  }),
  title: z.string().optional().default(""),
  citationFormSchemaOptions,
});

export type CitationFormSchema = typeof citationFormSchema;
