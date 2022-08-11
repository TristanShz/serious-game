export const baseAPIUrlAdmin = "http://localhost:3000/api/v1/admin";
export const baseUrlAdmin = "http://localhost:3000/sg-admin";

export const urlsAdmin = () => {
    return {
        home: baseUrlAdmin,
        users: `${baseUrlAdmin}/users`,
        category: `${baseUrlAdmin}/category`,
        formations: `${baseUrlAdmin}/formations`,
        formationsEdit: `${baseUrlAdmin}/formations/edit`,
    };
};
