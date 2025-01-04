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

export function formatBibliography(cit: string): string {
  let formattedCitation = "";
  let citation = JSON.parse(JSON.stringify(cit)).data;

  if (citation.citationFormSchemaOptions.source_type === SourceType.LIVRE) {
    // Book citation
    // Author
    formattedCitation =
      citation.author.last_name === "" &&
      citation.author.first_name === "" &&
      citation.author.last_name === undefined &&
      citation.author.first_name === undefined
        ? "Sans auteur, "
        : (citation.author.last_name !== "" &&
          citation.author.last_name !== undefined
            ? citation.author.last_name.toUpperCase() + ", "
            : "") +
          (citation.author.first_name !== "" &&
          citation.author.first_name !== undefined
            ? citation.author.first_name + ", "
            : "");
    // Title
    formattedCitation =
      formattedCitation +
      (citation.title !== "" && citation.title !== undefined
        ? "<i>" + citation.title + "</i>, "
        : "Sans titre, ");
    // Publisher
    formattedCitation =
      formattedCitation +
      (citation.citationFormSchemaOptions.publisher !== "" &&
      citation.citationFormSchemaOptions.publisher !== undefined
        ? citation.citationFormSchemaOptions.publisher + ", "
        : "Éditions inconnues, ");
    // Publication year
    formattedCitation =
      formattedCitation +
      (citation.citationFormSchemaOptions.year !== 0 &&
      citation.citationFormSchemaOptions.year !== undefined
        ? citation.citationFormSchemaOptions.year + ", "
        : "Année de parution inconnue, ");
    // Total pages
    formattedCitation =
      formattedCitation +
      (citation.citationFormSchemaOptions.total_pages !== 0 &&
      citation.citationFormSchemaOptions.total_pages !== undefined
        ? citation.citationFormSchemaOptions.total_pages +
          " " +
          (citation.citationFormSchemaOptions.total_pages > 1 &&
          citation.citationFormSchemaOptions.total_pages !== undefined
            ? "pages."
            : "page.")
        : "Nombre de pages inconnu.");
  } else {
    // Web citation
    // Author
    formattedCitation =
      citation.author.last_name === "" &&
      citation.author.first_name === "" &&
      citation.author.last_name === undefined &&
      citation.author.first_name === undefined
        ? "Sans auteur, "
        : (citation.author.last_name !== "" &&
          citation.author.last_name !== undefined
            ? citation.author.last_name.toUpperCase() + ", "
            : "") +
          (citation.author.first_name !== "" &&
          citation.author.first_name !== undefined
            ? citation.author.first_name + ", "
            : "");
    // Title
    formattedCitation =
      formattedCitation +
      (citation.title !== "" && citation.title !== undefined
        ? "<i>" + citation.title + "</i> "
        : "Sans titre, ") +
      "[En ligne]. ";
    // URL
    formattedCitation =
      formattedCitation +
      (citation.citationFormSchemaOptions.url !== "" &&
      citation.citationFormSchemaOptions.url !== undefined
        ? "Adresse URL : " + citation.citationFormSchemaOptions.url + " "
        : "URL inconnue ");
    // Publication year
    formattedCitation =
      formattedCitation +
      (citation.citationFormSchemaOptions.publication_year !== "" &&
      citation.citationFormSchemaOptions.publication_year !== undefined
        ? "(" + citation.citationFormSchemaOptions.publication_year + "). "
        : "(Année de publication inconnue). ");
  }
  return formattedCitation;
}

export function formatFootnote(cit: string): string {
  let formattedCitation = "";
  let citation = JSON.parse(JSON.stringify(cit)).data;

  if (citation.citationFormSchemaOptions.source_type === SourceType.LIVRE) {
    // Book citation
    // Author
    formattedCitation =
      citation.author.last_name === "" &&
      citation.author.first_name === "" &&
      citation.author.last_name === undefined &&
      citation.author.first_name === undefined
        ? "Sans auteur, "
        : (citation.author.last_name !== "" &&
          citation.author.last_name !== undefined
            ? citation.author.last_name.toUpperCase() + ", "
            : "") +
          (citation.author.first_name !== "" &&
          citation.author.first_name !== undefined
            ? citation.author.first_name + ", "
            : "");
    // Title
    formattedCitation =
      formattedCitation +
      (citation.title !== "" && citation.title !== undefined
        ? "« " + citation.title + " », "
        : "Sans titre, ");
    // Publisher
    formattedCitation =
      formattedCitation +
      (citation.citationFormSchemaOptions.publisher !== "" &&
      citation.citationFormSchemaOptions.publisher !== undefined
        ? citation.citationFormSchemaOptions.publisher + ", "
        : "Éditions inconnues, ");
    // Collection
    formattedCitation =
      formattedCitation +
      (citation.citationFormSchemaOptions.collection !== "" &&
      citation.citationFormSchemaOptions.collection !== undefined
        ? "coll. « " + citation.citationFormSchemaOptions.collection + " », "
        : "Collection inconnue, ");
    // Year
    formattedCitation =
      formattedCitation +
      (citation.citationFormSchemaOptions.year !== 0 &&
      citation.citationFormSchemaOptions.year !== undefined
        ? citation.citationFormSchemaOptions.year + ", "
        : "Année de parution inconnue, ");
    // Page
    formattedCitation =
      formattedCitation +
      (citation.citationFormSchemaOptions.page !== 0 &&
      citation.citationFormSchemaOptions.page !== undefined
        ? "p. <i>" + citation.citationFormSchemaOptions.page + "</i>."
        : "Page inconnue.");
  } else {
    // Web citation
    // Author
    formattedCitation =
      citation.author.last_name === "" &&
      citation.author.first_name === "" &&
      citation.author.last_name === undefined &&
      citation.author.first_name === undefined
        ? "Sans auteur, "
        : (citation.author.last_name !== "" &&
          citation.author.last_name !== undefined
            ? citation.author.last_name.toUpperCase() + ", "
            : "") +
          (citation.author.first_name !== "" &&
          citation.author.first_name !== undefined
            ? citation.author.first_name + ", "
            : "");
    // Title
    formattedCitation =
      formattedCitation +
      (citation.title !== "" && citation.title !== undefined
        ? "« " + citation.title + " », "
        : "Sans titre, ");
    // Name
    formattedCitation =
      formattedCitation +
      (citation.citationFormSchemaOptions.name !== "" &&
      citation.citationFormSchemaOptions.name !== undefined
        ? "<i>" + citation.citationFormSchemaOptions.name + "</i>, "
        : "<i> Nom du site Web inconnu </i>, ");
    // URL
    formattedCitation =
      formattedCitation +
      "[en ligne], " +
      (citation.citationFormSchemaOptions.url !== "" &&
      citation.citationFormSchemaOptions.url !== undefined
        ? "[" + citation.citationFormSchemaOptions.url + "], "
        : "URL inconnue, ");
    // Accessed on
    let month_index: string | undefined =
      citation.citationFormSchemaOptions.accessed_on?.split("-")[1];
    formattedCitation =
      formattedCitation +
      "(consulté le " +
      (citation.citationFormSchemaOptions.accessed_on !== "" &&
      citation.citationFormSchemaOptions.accessed_on !== undefined
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
