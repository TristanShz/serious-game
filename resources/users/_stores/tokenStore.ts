import httpClient, { fetchUtils } from "../../../_config/axios";
import { appConfig } from "../../../_config/config";
import { action, makeObservable, observable } from "mobx";
import jwt_decode from "jwt-decode";
import { deleteCookie, getCookie, setCookie } from "../../../_common/_utils/cookieUtils";
import { __BROWSER__ } from "../../../_common/_utils/coreUtils";

function getTokenExpirationDate(token: string) {
    const decoded: { exp: number | undefined } = jwt_decode<any>(token);
    if (decoded.exp === undefined) {
        return undefined;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
}

function getToken() {
    try {
        const token = getCookie(appConfig.token.storageKey);
        if (!token) {
            return undefined;
        }
        const date = getTokenExpirationDate(token);
        if (date === undefined || date.valueOf() < new Date().valueOf()) {
            return undefined;
        }
        return token;
    } catch (e) {}
    return undefined;
}

export class TokenStore {
    @observable token = getToken();

    constructor() {
        makeObservable(this);
        this.refreshToken();
    }

    @action setToken = (token: string | undefined) => {
        this.token = token;
        try {
            if (__BROWSER__) {
                if (token) setCookie(appConfig.token.storageKey, token);
                else deleteCookie(appConfig.token.storageKey);
            }
        } catch (e) {
            //nothing to do
        }
    };

    refreshToken() {
        if (this.token) {
            httpClient.interceptors.request.use((config) => {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${this.token ?? ""}`,
                };
                return config;
            });
            return fetchUtils.post<string | undefined>(`/auth/token`).then(
                ({ data }) => this.setToken(data),
                (error) => {
                    if (error.key && error.key.startsWith("errors.api.")) {
                        this.setToken(undefined);
                    }
                },
            );
        }
    }

    getTokenData<TTokenData>() {
        return this.token ? jwt_decode<{ data: TTokenData }>(this.token).data : undefined;
    }
}

export const tokenStore = new TokenStore();
