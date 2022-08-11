import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { withSessionSsr } from "../../lib/withSession";
import { USER_ROLES } from "../../lib/users/UserModel";
import { ReactElement } from "react";
import AdminLayout from "../../resources/layouts/AdminLayout";

export default function Admin({ user }: InferGetServerSidePropsType<GetServerSideProps>) {
    console.log(user);
    return <div className={"flex"}></div>;
}

Admin.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

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
