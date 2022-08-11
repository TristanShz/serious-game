import httpClient from "../../../_config/axios";
import { appConfig } from "../../../_config/config";
import { TAskResetPassData, TCredentials, TRegisterData } from "../_models/AuthMdl";
import { TSessionData } from "../../../lib/withSession";

class AuthStore {
    protected httpClient = httpClient;
    private serviceName = "auth";

    public async login(data: TCredentials) {
        return this.httpClient.post<TSessionData>(`/${this.serviceName}/login`, data);
    }

    public async register(data: TRegisterData) {
        try {
            const response = await this.httpClient.post<{ token: string }>(
                `/${this.serviceName}/register?apiKey=${appConfig.apiKey}`,
                data,
            );
            if (response && response.status === 201 && response.data.token) {
            }
            return undefined;
        } catch (e) {
            throw e;
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

    signOut() {}
}

export const authStore = new AuthStore();
