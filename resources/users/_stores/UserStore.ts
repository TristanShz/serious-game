import { ApiPublicStore } from "../../../_common/_stores/ApiPublicStore";
import { action, computed, makeObservable, observable } from "mobx";
import { TSessionData } from "../../../lib/withSession";

export class UserStore extends ApiPublicStore<TSessionData> {
    @observable user: TSessionData | undefined = undefined;

    constructor() {
        super("users");
        makeObservable(this);
    }

    @computed get isLogged() {
        return !!this.user;
    }

    @action setUserConnected = (user: TSessionData | undefined) => {
        this.user = user;
    };
}

export const userStore = new UserStore();
