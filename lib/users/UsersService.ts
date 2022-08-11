import CrudService from "../crud/CrudService";
import UserModel, { IUserDocument, IUserModel } from "./UserModel";
import { Select, TMongooseId } from "../../_common/_types/MongooseTypes";
import { errorsBuilders } from "../../_common/errors/errorBuilder";
import { hashPassword } from "./_helpers/passwordHelper";

const DEFAULT_SELECT = { password: 0 };

export class UsersService extends CrudService<"users", IUserModel, IUserDocument> {
    constructor() {
        super("users", UserModel, false);
    }

    async getUserByEmail(email: string, select: Select = DEFAULT_SELECT) {
        return UserModel.findOne(
            {
                email: {
                    $regex: new RegExp("^" + email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$", "i"),
                },
            },
            select,
        );
    }

    async create(user: Omit<IUserModel, "_id">) {
        if (await this.getUserByEmail(user.email, { _id: 1 })) {
            throw errorsBuilders.users.alreadyExists();
        }
        // user.token = guid();
        return super.create(user);
    }

    async delete(userId: TMongooseId) {
        return await super.delete(userId);
    }

    async changePassword(userId: TMongooseId, password: string) {
        const passwordHashed = hashPassword(password);
        await UserModel.findByIdAndUpdate(userId, {
            $set: { password: passwordHashed },
        });
    }

    async getOne(userId: TMongooseId) {
        return UserModel.findOne({ _id: userId }).exec();
    }

    async getByToken(token: string) {
        return UserModel.findOne({ emailToken: token }).exec();
    }
}

const usersService = new UsersService();
export default usersService;
