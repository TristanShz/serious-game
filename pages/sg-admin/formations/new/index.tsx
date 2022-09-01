import { ReactElement } from "react";
import { AdminLayout } from "../../../../resources/layouts/AdminLayout";
import { FormationsForm } from "../../../../resources/formations/components/FormationsForm";

const NewFormation = () => {
  return <FormationsForm />;
};

NewFormation.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default NewFormation;
