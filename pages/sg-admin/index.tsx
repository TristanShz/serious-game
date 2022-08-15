import { ReactElement } from "react";
import { RegularAdminLayout } from "../../resources/layouts/RegularAdminLayout";
import UsersAdminDashboard from "./users";
import { withSessionSsr } from "../../lib/withSession";
import { USER_ROLES } from "../../lib/users/UserModel";
import FormationsAdminDashboard from "./formations";
import CategoryAdminDashboard from "./category";

const SgAdmin = () => {
    return (
        <div className={"flex flex-col gap-3"}>
            <UsersAdminDashboard />
            <FormationsAdminDashboard />
            <CategoryAdminDashboard />
        </div>
    );
};

SgAdmin.getLayout = function getLayout(page: ReactElement) {
    return <RegularAdminLayout>{page}</RegularAdminLayout>;
};

export default SgAdmin;

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
    if (req.session.user) {
        const user = req.session.user;

        if (user && user.role !== USER_ROLES.ADMIN) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                user: req.session.user,
            },
        };
    } else {
        return {
            notFound: true,
        };
    }
});
