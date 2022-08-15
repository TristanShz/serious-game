import { CrudCtrl } from "../crud/CrudCtrl";
import { IUserDocument, IUserModel } from "./UserModel";
import usersService from "./UsersService";

class UsersCtrl extends CrudCtrl<"users", IUserModel, IUserDocument> {
    constructor() {
        super("users", usersService);
    }
}

export const usersCtrl = new UsersCtrl();
