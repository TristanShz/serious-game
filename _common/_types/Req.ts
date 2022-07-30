import { NextApiRequest } from "next";

export type Req = NextApiRequest & {
    user?: string;
};
