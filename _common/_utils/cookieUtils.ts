import { appConfig } from "../../_config/config";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { TokenStore } from "../../resources/users/_stores/tokenStore";
import { TTokenData } from "../_types/baseType";

export function setCookie(name: string, val: string) {
    const date = new Date();
    const value = val;

    date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

export function getCookie(name: string, cookies?: NextApiRequestCookies) {
    const value = "; " + (cookies ?? document.cookie);
    const parts = value.split("; " + name + "=");
    const token = (parts.length === 2 && parts.pop()?.split(";").shift()) || "";
    return token;
}

export function deleteCookie(name: string) {
    const date = new Date();

    date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);

    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}

export function getTokenAndUserFromRequestCookies(cookies: NextApiRequestCookies, tokenStore: TokenStore) {
    const token = getCookie(appConfig.token.storageKey, cookies);
    const user = tokenStore.getTokenData() as TTokenData;
    tokenStore.setToken(token);
    return { user, token };
}
