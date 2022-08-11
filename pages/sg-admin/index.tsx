import { ReactElement } from "react";
import { RegularAdminLayout } from "../../resources/layouts/RegularAdminLayout";
import UsersAdminDashboard from "./users";
import { USER_ROLES } from "../../lib/users/UserModel";

const SgAdmin = () => {
    return <UsersAdminDashboard />;
};

SgAdmin.getLayout = function getLayout(page: ReactElement) {
    return <RegularAdminLayout>{page}</RegularAdminLayout>;
};

export default SgAdmin;
