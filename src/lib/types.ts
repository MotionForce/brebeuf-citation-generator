type Citation = {
    author: Author,
    title: string,
    source_type: SourceType,
    type_specific_fields: BookFields | WebFields
}

type Author = {
    first_name: string,
    last_name: string
}

type BookFields = {
    publisher: string,
    collection: string,
    year: number,
    page: number
}

type WebFields = {
    name: string,
    url: string,
    accessed_on: Date
}

enum SourceType {
    BOOK = "book",
    WEB = "web",
}