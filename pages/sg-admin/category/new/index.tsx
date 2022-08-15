import React, { ReactElement } from "react";
import { RegularAdminLayout } from "../../../../resources/layouts/RegularAdminLayout";
import { CategoryForm } from "../../../../resources/formations/categories/components/CategoryForm";

export function NewCategory() {
    return <CategoryForm />;
}

NewCategory.getLayout = function getLayout(page: ReactElement) {
    return <RegularAdminLayout>{page}</RegularAdminLayout>;
};

export default NewCategory;
