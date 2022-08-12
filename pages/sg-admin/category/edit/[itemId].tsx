import React, { ReactElement } from "react";
import { RegularAdminLayout } from "../../../../resources/layouts/RegularAdminLayout";
import { ComponentLoader } from "../../../../_common/components/loader/ComponentLoader";
import { useRouter } from "next/router";
import { categoryAdminStore } from "../../../../resources/admin/category/_stores/categoryAdminStore";
import { CategoryForm } from "../../../../resources/formations/categories/components/CategoryForm";

export function EditCategory() {
    const { query } = useRouter();
    return (
        <ComponentLoader
            endPoint={categoryAdminStore.getEndPoint(query.itemId as string)}
            render={(data) => {
                return <CategoryForm data={data?.data} />;
            }}
        />
    );
}

EditCategory.getLayout = function getLayout(page: ReactElement) {
    return <RegularAdminLayout>{page}</RegularAdminLayout>;
};

export default EditCategory;
