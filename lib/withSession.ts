import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from "next";
import { apiConfig } from "../_config/config";
import { USER_ROLES } from "./users/UserModel";
import { USER_ROLES_FRONT } from "../resources/users/_models/UserMdl";

export function withSessionRoute(handler: NextApiHandler) {
    return withIronSessionApiRoute(handler, apiConfig.ironOptions);
}

export function withSessionSsr<P extends { [key: string]: unknown } = { [key: string]: unknown }>(
    handler: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
    return withIronSessionSsr(handler, apiConfig.ironOptions);
}

declare module "iron-session" {
    interface IronSessionData {
        user: {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
            role: USER_ROLES;
            isLoggedIn: boolean;
        };
    }
}

export type TSessionData = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: USER_ROLES | USER_ROLES_FRONT;
    isLoggedIn: boolean;
};

export const SESSION_FIELDS = {
    _id: 1,
    email: 1,
    firstName: 1,
    lastName: 1,
    role: 1,
};
