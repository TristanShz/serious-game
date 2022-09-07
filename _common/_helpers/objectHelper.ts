import _ from "lodash";
import * as mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { TMongooseId } from "../_types/MongooseTypes";

export function flattenObject(
    baseObject?: any,
    path = "",
    output: {
        [key: string]: string | number | undefined | null | boolean;
    } = {},
) {
    if (
        baseObject === undefined ||
        baseObject === null ||
        typeof baseObject !== "object" ||
        _.isArray(baseObject) ||
        _.isDate(baseObject)
    ) {
        output[path] = baseObject;
    } else {
        for (const key in baseObject) {
            flattenObject(baseObject[key], path !== "" ? path + "." + key : key, output);
        }
    }
    return output;
}

export function createPath(
    baseObject: Record<string, any>,
    path: (string | number)[],
    value = {},
    returnValue = true,
    replace = false,
) {
    let currentObject: any = baseObject;
    for (let i = 0; i < path.length; i++) {
        const last = i === path.length - 1;
        if (currentObject[path[i]] == null) {
            currentObject[path[i]] = last ? value : {};
        } else if (last && replace) {
            currentObject[path[i]] = value;
        }
        currentObject = !last || returnValue ? currentObject[path[i]] : currentObject;
    }
    return currentObject;
}

export function isObjectsIdsEqual(
    id1: string | mongoose.Types.ObjectId | null | undefined,
    id2: string | mongoose.Types.ObjectId | null | undefined,
) {
    if (id1 === id2) {
        return true;
    }
    if (id1 == null || id2 == null) {
        return false;
    }
    if (typeof id1 !== "string") {
        id1 = id1.toString();
    }
    if (typeof id2 !== "string") {
        id2 = id2.toString();
    }
    return id1 === id2;
}

export function objectIdToStringAlt(objectId: TMongooseId) {
    if (typeof objectId === "string") {
        return objectId;
    }
    return objectId.toHexString();
}

export function objectIdToString(objectId?: TMongooseId) {
    if (!objectId) return undefined;
    return objectIdToStringAlt(objectId);
}

export function stringify(obj: any, ignoreFunction?: boolean) {
    const cache: object[] = [];
    const result = JSON.stringify(obj, (_key, value) => {
        if (ignoreFunction && typeof value === "function") return undefined;
        return typeof value === "object" && value !== null
            ? cache.includes(value)
                ? undefined // Duplicate reference found, discard key
                : cache.push(value) && value // Store value in our collection
            : value;
    });
    return result;
}

export function stringIdToObjectId(id: string) {
    return new ObjectId(id);
}
