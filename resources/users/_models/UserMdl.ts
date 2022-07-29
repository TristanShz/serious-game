export enum USER_ROLES {
    ADMIN = "ADMIN",
    USER = "USER",
}

export type TUserBase = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
};

export type TUser = TUserBase & {
    roles: USER_ROLES;
};
