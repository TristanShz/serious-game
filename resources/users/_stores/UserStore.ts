import { ApiPublicStore } from "../../../_common/_stores/ApiPublicStore";
import { action, computed, makeObservable, observable, reaction } from "mobx";
import { tokenStore } from "./tokenStore";
import { TTokenData } from "../../../_common/_types/baseType";
import { authStore } from "../../auth/_stores/AuthStore";
import { TUser } from "../_models/UserMdl";
import { __BROWSER__ } from "../../../_common/_utils/coreUtils";

export class UserStore extends ApiPublicStore<TUser> {
    @observable user: TTokenData | undefined = undefined;

    constructor() {
        super("users");
        makeObservable(this);
        reaction(
            () => tokenStore.token,
            (token) => {
                if (__BROWSER__) {
                    if (!token) window.location.href = "/";
                    else {
                        this.setDataFromToken(token);
                    }
                }
            },
        );
        this.setDataFromToken(tokenStore.token);
    }

    @computed get isLogged() {
        return !!this.user;
    }

    @action setUserConnected = (user: TTokenData | undefined) => {
        this.user = user;
    };

    protected readonly setDataFromToken = (_token: string | undefined) => {
        const tokenData = tokenStore.getTokenData<TTokenData>();
        if (!tokenData) {
            if (this.isLogged) authStore.signOut();
        } else {
            this.user = tokenData;
        }
    };
}

export const userStore = new UserStore();
