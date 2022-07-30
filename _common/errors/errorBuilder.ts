import { transformPlainTree } from "../_helpers/treeHelper";
import BaseError from "./baseError";

export const ERRORS_KEYS = {
    global: {
        required: "FIELD_REQUIRED",
        unknown: "UNKNOWN_ERROR",
        invalidParameters: "INVALID_PARAMETERS",
        notImage: "NOT_AN_IMAGE",
        invalidFileType: "INVALID_FILE_TYPE",
        notFound: "NOT_FOUND",
    },
    category: {
        notFound: "CATEGORY_NOT_FOUND",
    },
};

type ErrorBuilder = (message?: string, info?: string) => BaseError;

export const errorsBuilders = transformPlainTree<typeof ERRORS_KEYS, string, ErrorBuilder>(
    ERRORS_KEYS,
    (errorKey) => (message?: string, info?: string) => new BaseError(errorKey, message, info),
);
