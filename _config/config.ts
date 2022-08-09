const isDev = process.env.NODE_ENV === "development";
const isStaging = process.env.IS_STAGING === "true";
const isProd = process.env.NODE_ENV === "production" && !isStaging;

export const appConfig = {
    url: process.env.NEXT_PUBLIC_URL as string,
    apiUrl: process.env.NEXT_PUBLIC_SG_API as string,
    apiUrlStatic: process.env.NEXT_PUBLIC_SG_API_STATIC as string,
    apiKey: "MSeUkQdx9t7AaNfw2kbX",
    token: {
        storageKey: "TOKEN",
    },
};

export const apiConfig = {
    isDev,
    isStaging,
    isProd,
    apiKey: "MSeUkQdx9t7AaNfw2kbX",
    ironOptions: {
        cookieName: "SESSION",
        password: process.env.SESSION_PASSWORD as string,
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    },
    uploads: {
        baseUrl: "uploads/seriousgame",
    },
    mongo: {
        uri: process.env.MONGO_URI,
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
    },
    jwt: {
        secret: process.env.JWT_KEY as string,
    },
    apiPath: "api/v1",
};
