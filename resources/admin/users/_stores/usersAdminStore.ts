import { ApiStore } from "../../../../_common/_stores/ApiStore";
import { TUser } from "../../../users/_models/UserMdl";

class UsersAdminStore extends ApiStore<TUser> {
    constructor() {
        super("users");
    }
}

export const usersAdminStore = new UsersAdminStore();
