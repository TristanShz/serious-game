export type TErrorsMessages = keyof typeof ERRORS_MESSAGES;

export const ERRORS_MESSAGES = {
    UNKNOWN_ERROR: "Une erreur est survenue, veuillez reessayer",
    USER_NOT_FOUND: "Aucun utilisateur avec cet adresse email",
    USER_INVALID_PASSWORD: "Mot de passe invalide",
    USER_NO_PASSWORD: "A FAIRE",
    USER_ALREADY_EXISTS: "Cet email est déjà utilisé",
    USER_INVALID_TOKEN: "A FAIRE",
    USER_UNAUTHORIZED_EMAIL: "A FAIRE",
    USER_NOT_CONFIRMED: "A FAIRE",
};
