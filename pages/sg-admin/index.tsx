import { ReactElement } from "react";
import { AdminLayout } from "../../resources/layouts/AdminLayout";
import { withSessionSsr } from "../../lib/withSession";
import { USER_ROLES } from "../../lib/users/UserModel";
import CategoryAdminDashboard from "./category";
import UsersAdminDashboard from "./users";
import FormationsAdminDashboard from "./formations";
import Quizz from "./quizz";

const SgAdmin = () => {
    return (
        <div className={"flex flex-col gap-3"}>
            <UsersAdminDashboard />
            <FormationsAdminDashboard />
            <CategoryAdminDashboard />
            <Quizz />
        </div>
    );
};

SgAdmin.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
    if (req.session.user) {
        const user = req.session.user;

        if (user && user.role !== USER_ROLES.ADMIN) {
            console.log("OUAIS JE SUIS LA");
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

export default SgAdmin;
