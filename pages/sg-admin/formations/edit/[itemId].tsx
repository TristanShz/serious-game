import React, { ReactElement } from "react";
import { RegularAdminLayout } from "../../../../resources/layouts/RegularAdminLayout";
import { FormationsForm } from "../../../../resources/formations/components/FormationsForm";
import { ComponentLoader } from "../../../../_common/components/loader/ComponentLoader";
import { formationsAdminStore } from "../../../../resources/admin/formations/_stores/formationsAdminStores";
import { useRouter } from "next/router";

export function EditFormation() {
    const { query } = useRouter();
    return (
        <ComponentLoader
            endPoint={formationsAdminStore.getEndPoint(query.itemId as string)}
            render={(data) => {
                return <FormationsForm data={data?.data} />;
            }}
        />
    );
}

EditFormation.getLayout = function getLayout(page: ReactElement) {
    return <RegularAdminLayout>{page}</RegularAdminLayout>;
};

export default EditFormation;
