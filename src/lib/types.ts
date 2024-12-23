type Citation = {
  author: Author;
  title: string;
  source_type: SourceType;
  type_specific_fields: BookFields | WebFields;
};

type Author = {
  first_name: string;
  last_name: string;
};

type BookFields = {
  publisher: string;
  collection: string;
  year: number;
  page: number;
};

type WebFields = {
  name: string;
  url: string;
  accessed_on: Date;
};

enum SourceType {
  LIVRE = "livre",
  WEB = "web",
}

type updatedCitation = {
  author: {
    first_name: string;
    last_name: string;
  };
  title: string;
  citationFormSchemaOptions:
    | {
        name?: string;
        url?: string;
        accessed_on?: string;
        source_type: SourceType.WEB;
      }
    | {
        publisher?: string;
        collection?: string;
        year?: number;
        page?: number;
        source_type: SourceType.LIVRE;
      };
};

function match_month(month: string): string {
  switch (month) {
    case "01":
      return "janvier";
    case "02":
      return "février";
    case "03":
      return "mars";
    case "04":
      return "avril";
    case "05":
      return "mai";
    case "06":
      return "juin";
    case "07":
      return "juillet";
    case "08":
      return "août";
    case "09":
      return "septembre";
    case "10":
      return "octobre";
    case "11":
      return "novembre";
    case "12":
      return "décembre";
    default:
      return "mois inconnu";
  }
}

export function formatCitation(cit: string): string {
  let formattedCitation = "";
  let citation = JSON.parse(JSON.stringify(cit)).data;

  if (citation.citationFormSchemaOptions.source_type === SourceType.LIVRE) {
    // Book citation
    // Author
    formattedCitation =
      formattedCitation +
      (citation.author.first_name !== "" && citation.author.last_name !== ""
        ? citation.author.first_name + " " + citation.author.last_name + ", "
        : "Sans auteur, ");
    // Title
    formattedCitation =
      formattedCitation +
      (citation.title !== "" ? "« " + citation.title + " », " : "Sans titre, ");
    // Publisher
    formattedCitation =
      formattedCitation +
      (citation.citationFormSchemaOptions.publisher !== ""
        ? citation.citationFormSchemaOptions.publisher + ", "
        : "Éditions inconnues, ");
    // Collection
    formattedCitation =
      formattedCitation +
      (citation.citationFormSchemaOptions.collection !== ""
        ? "coll. « " + citation.citationFormSchemaOptions.collection + " », "
        : "Collection inconnue, ");
    // Year
    formattedCitation =
      formattedCitation +
      (citation.citationFormSchemaOptions.year !== 0
        ? citation.citationFormSchemaOptions.year + ", "
        : "Année de parution inconnue, ");
    // Page
    formattedCitation =
      formattedCitation +
      (citation.citationFormSchemaOptions.page !== 0
        ? "p. <i>" + citation.citationFormSchemaOptions.page + "</i>."
        : "Page inconnue.");
  } else {
    // Web citation
    // Author
    formattedCitation =
      formattedCitation +
      (citation.author.first_name !== "" && citation.author.last_name !== ""
        ? (citation.author.last_name !== ""
            ? citation.author.last_name.toUpperCase() + ", "
            : "") +
          (citation.author.first_name !== ""
            ? citation.author.first_name + ", "
            : "")
        : "Sans auteur, ");
    // Title
    formattedCitation =
      formattedCitation +
      (citation.title !== "" ? "« " + citation.title + " », " : "Sans titre, ");
    // Name
    formattedCitation =
      formattedCitation +
      (citation.citationFormSchemaOptions.name !== ""
        ? "<i>" + citation.citationFormSchemaOptions.name + "</i>, "
        : "<i> Nom du site Web inconnu </i>, ");
    // URL
    formattedCitation =
      formattedCitation +
      "[en ligne], " +
      (citation.citationFormSchemaOptions.url !== ""
        ? "[" + citation.citationFormSchemaOptions.url + "], "
        : "URL inconnue, ");
    // Accessed on
    let month_index: string | undefined =
      citation.citationFormSchemaOptions.accessed_on?.split("-")[1];
    formattedCitation =
      formattedCitation +
      "(consulté le " +
      (citation.citationFormSchemaOptions.accessed_on !== ""
        ? citation.citationFormSchemaOptions.accessed_on?.split("-")[2] +
          (month_index === undefined
            ? " mois inconnu "
            : " " + match_month(month_index) + " ") +
          citation.citationFormSchemaOptions.accessed_on?.split("-")[0] +
          ")"
        : "date inconnue") +
      ".";
  }
  return formattedCitation;
}
