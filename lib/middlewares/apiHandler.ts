import { NextApiRequest, NextApiResponse } from "next";
import { TApiHandler } from "../../_common/_types/apiTypes";
import dbConnect from "../dbConnect";

export function apiHandler<T>(handler: TApiHandler<T>) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const method = req.method?.toLowerCase() as keyof typeof handler;

        if (handler[method]) {
            try {
                await dbConnect();
                await handler[method]?.(req, res);
            } catch (err) {}
        } else {
            return res.status(405).end(`Method ${req.method} not allowed`);
        }
    };
}
