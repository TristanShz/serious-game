import httpClient from "../../../_config/axios";
import { appConfig } from "../../../_config/config";
import { tokenStore } from "../../users/_stores/tokenStore";
import { TTokenData } from "../../../_common/_types/baseType";
import { TAskResetPassData, TLoginData, TRegisterData } from "../_models/AuthMdl";

class AuthStore {
    protected httpClient = httpClient;
    private serviceName = "auth";

    public async signIn(data: TLoginData) {
        try {
            const response = await this.httpClient.post<{ token: string }>(`/${this.serviceName}/signIn`, data);
            if (response && response.status === 200 && response.data.token) {
                const tokenData = tokenStore.getTokenData<TTokenData>();

                tokenStore.setToken(response.data.token);

                if (tokenData) return tokenData;
            }
            return undefined;
        } catch (e) {
            return undefined;
        }
    }

    public async signUp(data: TRegisterData) {
        try {
            const response = await this.httpClient.post<{ token: string }>(
                `/${this.serviceName}/signUp?apiKey=${appConfig.apiKey}`,
                data,
            );
            console.log(response, response.status, response.data);
            if (response && response.status === 201 && response.data.token) {
                tokenStore.setToken(response.data.token);
                const tokenData = tokenStore.getTokenData<TTokenData>();
                console.log(tokenData);
                if (tokenData) return tokenData;
            }
            return undefined;
        } catch (e) {
            return e;
        }
    }

    public async askResetPassword(data: TAskResetPassData) {
        try {
            const response = await this.httpClient.post(`/${this.serviceName}/askResetPassword`, data);
            if (response && response.status === 200) {
                console.log("ok");
            }
            return undefined;
        } catch (e) {
            return e;
        }
    }

    signOut() {
        tokenStore.setToken(undefined);
        window.location.reload();
    }
}

export const authStore = new AuthStore();
