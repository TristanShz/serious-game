import loggerService from "../logger/loggerService";
import { apiConfig } from "../../_config/config";
import { errorsBuilders } from "../errors/errorBuilder";
import BaseError from "../errors/baseError";
import { NextApiResponse } from "next";
import { Req } from "../_types/Req";

export function errorHandler(res: NextApiResponse, error: any, identifier: string) {
    const body = { error: errorsBuilders.global.unknown() };
    let status;
    if (error.constructor && (error.name === "ValidationError" || error.name === "MongoError")) {
        if (apiConfig.isDev) loggerService.warn("ctrlUtils", error);
        status = 400;
        body.error = errorsBuilders.global.invalidParameters();
    } else if (!(error instanceof Error)) {
        loggerService.error("ctrlUtils", "Unknown error from", identifier);
        loggerService.error("ctrlUtils", error);
        status = 500;
        body.error = errorsBuilders.global.unknown();
    } else {
        body.error = error as BaseError;
        loggerService.error(error);
        status = typeof error === typeof BaseError ? (error as BaseError).getStatusCode() : 400;
    }
    try {
        res.status(status).send(body);
    } catch (err) {
        // error if after a res.write
        res.write(JSON.stringify(body));
        res.send(err);
    }
}

export async function genericCtrlFn<T, U>(
    res: NextApiResponse,
    identifier: string,
    serviceCallFn: () => Promise<T>,
    responseTransformerFn?: (data: T) => U,
) {
    try {
        loggerService.info("[ENDPOINT]", identifier);
        let response: T | U = await serviceCallFn();
        if (responseTransformerFn) {
            response = responseTransformerFn(response);
        }
        res.status(200).send(response);
    } catch (error) {
        errorHandler(res, error, identifier);
    }
}

export async function getUserFromRequest(req: Req) {
    // if (!req.user) {
    //     return undefined;
    // } else if (req.user.fromToken) {
    //     const user = await usersService.get(req.user._id, {});
    //     if (user) {
    //         req.user = { fromToken: false, ...user.toObject() };
    //     }
    // }
    return req.user;
}

export function sanitizeFileName(fileName: string) {
    fileName.replace(/[\s]/, "-");
    fileName.replace(/\W/g, "");
    return fileName;
}
