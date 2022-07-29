export type TOpItems = "gt" | "gte" | "eq" | "ne" | "lt" | "lte" | "minMax" | undefined;

export enum TFilterType {
    STRING = "string",
    DATE = "date",
    BOOLEAN = "boolean",
    NUMBER = "number",
    ENUM = "enum",
    ID = "_id",
    IN = "in",
}

export type TFilter = {
    id: string;
    type: TFilterType;
    value?: any;
    op?: TOpItems;
};
