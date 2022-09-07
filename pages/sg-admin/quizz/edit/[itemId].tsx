import { ReactElement } from "react";
import { AdminLayout } from "../../../../resources/layouts/AdminLayout";
import { FormationsForm } from "../../../../resources/formations/components/FormationsForm";
import { ComponentLoader } from "../../../../_common/components/loader/ComponentLoader";
import { formationsAdminStore } from "../../../../resources/admin/formations/_stores/formationsAdminStores";
import { useRouter } from "next/router";
import { QuizzForm } from "../../../../resources/admin/quizz/components/QuizzForm";
import { quizzAdminStore } from "../../../../resources/admin/quizz/_stores/quizzAdminStore";

const EditFormation = () => {
    const { query } = useRouter();

    return (
        <ComponentLoader
            endPoint={quizzAdminStore.getEndPoint(query.itemId as string)}
            render={(data) => {
                return <QuizzForm data={data?.data} />;
            }}
        />
    );
};

EditFormation.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default EditFormation;
