import { NextApiHandler } from "next";
import { errorsBuilders } from "../../../_common/errors/errorBuilder";
import { apiConfig } from "../../../_config/config";
import { errorHandler, genericCtrlFn } from "../../../_common/_helpers/ctrlHelper";
import { Req } from "../../../_common/_types/Req";
import authService from "./authService";

class AuthCtrl {
    static ctrlName = "AuthCtrl";

    login: NextApiHandler = async (req, res) => {
        const { email, password } = req.body;

        try {
            const userId = await authService.login(email, password);
            res.status(200).send({ userId });
        } catch (error) {
            errorHandler(res, error, AuthCtrl.ctrlName + ".signIn");
        }
    };

    register: NextApiHandler = async (req, res) => {
        const { lastName, firstName, email, password } = req.body;

        try {
            if (req.query.apiKey !== apiConfig.apiKey) {
                throw errorsBuilders.users.auth.unauthorized();
            }
            const user = await authService.register(lastName, firstName, email, password);

            res.status(201).send({ user });
        } catch (error) {
            errorHandler(res, error, AuthCtrl.ctrlName + ".signUp");
        }
    };

    askResetPassword: NextApiHandler = async (req, res) => {
        try {
            await authService.askResetPassword(req.body.email);
            res.status(200).send({});
        } catch (error) {
            errorHandler(res, error, AuthCtrl.ctrlName + ".askResetPassword");
        }
    };

    resetPassword: NextApiHandler = async (req, res) => {
        try {
            await authService.resetPassword(req.body.token, req.body.password);
            res.status(200).send({});
        } catch (error) {
            errorHandler(res, error, AuthCtrl.ctrlName + ".resetPassword");
        }
    };

    confirmEmail: NextApiHandler = async (req, res) => {
        return genericCtrlFn(res, AuthCtrl.ctrlName + ".confirmEmail", async () => {
            const { tokenId } = req.query;
            if (!tokenId) throw errorsBuilders.global.invalidParameters();

            // const user = (await usersService.getByToken(tokenId)) as IUserModel;
            //
            // if (user.emailToken === tokenId) {
            //     await usersService.patch(user._id, { status: true });
            return { SUCESS: true };
            // } else throw errorsBuilders.global.invalidParameters();
        });
    };
}

const authCtrl = new AuthCtrl();
export default authCtrl;
