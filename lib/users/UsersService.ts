import CrudService from "../crud/CrudService";
import UserModel, { IUserDocument, IUserModel } from "./UserModel";

export class UsersService extends CrudService<"users", IUserModel, IUserDocument> {
    constructor() {
        super("users", UserModel, false);
    }
}

const usersService = new UsersService();
export default usersService;
