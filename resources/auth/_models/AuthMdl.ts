export type TAskResetPassData = { email: string };

export type TResetPassData = {
    newPassword: string;
    confirmNewPassword: string;
};

export type TRegisterData = {
    lastName: string;
    firstName: string;
    email: string;
    password: string;
};

export type TLoginData = {
    email: string;
    password: string;
};
