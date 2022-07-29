export type TDocument = { url: string; title?: string };
export type TImage = TDocument & { alt?: string };

export interface IPrimitiveObject {
    [name: string]: string | number | null;
}

export type TTokenData = {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
};

export type TObjWithId = {
    _id: string | number;
};
