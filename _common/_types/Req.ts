import { NextApiRequest } from "next";
import { IUserModel } from "../../lib/users/UserModel";

export type Req = NextApiRequest & {
    user?: IUserModel;
};
