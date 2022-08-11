import React, { ReactElement } from "react";
import { RegularAdminLayout } from "../../../../resources/layouts/RegularAdminLayout";
import { FormationsForm } from "../../../../resources/formations/components/FormationsForm";

export function NewFormation() {
    return <FormationsForm />;
}

NewFormation.getLayout = function getLayout(page: ReactElement) {
    return <RegularAdminLayout>{page}</RegularAdminLayout>;
};

export default NewFormation;
