import _ from "lodash";

export function isStringFilled(str?: any, minLength = 1, maxLength?: number) {
    return (
        _.isString(str) && str.trim().length >= minLength && (maxLength === undefined || str.trim().length <= maxLength)
    );
}

export function isNumber(value?: any, min?: number, max?: number) {
    return (
        _.isNumber(value) &&
        !_.isNaN(value) &&
        (min === undefined || value >= min) &&
        (max === undefined || value <= max)
    );
}

const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function isEmail(email?: string) {
    return email !== undefined && email !== null && emailRegex.test(email.trim());
}

export function isToken(token: string) {
    return isStringFilled(token, 36, 36);
}

export const IMAGES_EXTENSION = [".png", ".svg", ".jpg", ".gif", ".jpeg"];
