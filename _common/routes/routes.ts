export const baseAPIUrlAdmin = "http://localhost:3000/api/v1/admin";
export const baseUrlAdmin = "http://localhost:3000/sg-admin";

export const urlsAdmin = (arg?: string) => {
    return {
        home: baseUrlAdmin,
        users: `${baseUrlAdmin}/users`,
        category: `${baseUrlAdmin}/category`,
        formations: `${baseUrlAdmin}/formations`,
        edit: (name: string, itemId: string) => `${baseUrlAdmin}/${name}/edit/${itemId}`,
        formationsNew: (arg: string) => `${baseUrlAdmin}/${arg}/new`,
    };
};
