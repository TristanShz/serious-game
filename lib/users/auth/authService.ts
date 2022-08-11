import { errorsBuilders } from "../../../_common/errors/errorBuilder";
import usersService from "../UsersService";
import UserModel, { IUserModel, USER_ROLES } from "../UserModel";
import { comparePasswords, hashPassword } from "../_helpers/passwordHelper";
import { isEmail, isStringFilled, isToken } from "../../../_common/_helpers/validatorHelper";
import { guid } from "../../../_common/_helpers/coreHelper";
import { JUNK_EMAILS } from "../../emails/junkEmails";
import { SESSION_FIELDS } from "../../withSession";

class AuthService {
    async login(email: string, password: string) {
        if (!email || !password) {
            throw errorsBuilders.global.invalidParameters();
        }

        const user = (await usersService.getUserByEmail(email, {
            ...SESSION_FIELDS,
            password: 1,
        })) as IUserModel;

        if (!user) {
            throw errorsBuilders.users.notFound();
        } else if (!user.password) {
            throw errorsBuilders.users.noPassword();
        }

        if (await comparePasswords(password, user.password)) {
            return user;
        }

        throw errorsBuilders.users.invalidPassword();
    }

    async register(lastName: string, firstName: string, email: string, password: string) {
        if (
            !isStringFilled(lastName) ||
            !isStringFilled(firstName) ||
            !isEmail(email) ||
            !isStringFilled(password, 8)
        ) {
            throw errorsBuilders.global.invalidParameters();
        }
        const emailDomain = email.substring(email.indexOf("@") + 1).toLowerCase();
        if (JUNK_EMAILS.has(emailDomain)) {
            throw errorsBuilders.users.unauthorizedEmail();
        }

        const existingUser = await UserModel.findOne({
            email: {
                $regex: new RegExp("^" + email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$", "i"),
            },
        });
        if (existingUser) {
            throw errorsBuilders.users.alreadyExists();
        }

        const passwordHashed = await hashPassword(password);
        const user = (await usersService.create({
            lastName,
            firstName,
            email,
            password: passwordHashed,
            role: USER_ROLES.USER,
        })) as IUserModel;

        return user;
    }

    async askResetPassword(email: string) {
        const user = (await usersService.getUserByEmail(email)) as IUserModel;
        if (!user) {
            throw errorsBuilders.users.notFound();
        }

        const token = guid();
        await usersService.patch(user._id, { token });
        // await emailsService.sendTemplateKey(EMAIL_TEMPLATE_KEY.FORGOT_PASSWORD, user._id, {
        //     RESET_LINK: "/auth/reset_password?token=" + token,
        // });
    }

    async resetPassword(token: string, password: string) {
        if (!isToken(token) || !isStringFilled(password, 6)) {
            throw errorsBuilders.global.invalidParameters();
        }

        const user = await UserModel.findOne({ token });
        if (!user) {
            throw errorsBuilders.users.invalidToken();
        }

        const passwordHashed = await hashPassword(password);

        await usersService.patch(user._id, { token: undefined, password: passwordHashed });
    }
}

const authService = new AuthService();
export default authService;
