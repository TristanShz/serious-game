export const baseUrlAdmin = "http://localhost:3000/sg-admin";

export const urlsAdmin = () => {
    return {
        home: baseUrlAdmin,
        users: `${baseUrlAdmin}/users`,
        category: `${baseUrlAdmin}/category`,
    };
};
