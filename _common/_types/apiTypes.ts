import { NextApiHandler } from "next";

export type TApiHandler<T> = {
    get?: NextApiHandler<T>;
    post?: NextApiHandler<T>;
    put?: NextApiHandler<T>;
    delete?: NextApiHandler<T>;
    patch?: NextApiHandler<T>;
};
