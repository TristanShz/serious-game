export const urlsAdmin = () => {
    const baseUrlAdmin = "http://localhost:3000/sg-admin";
    return {
        home: baseUrlAdmin,
        users: `${baseUrlAdmin}/users`,
        category: `${baseUrlAdmin}/category`,
    };
};
