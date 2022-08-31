import { AdminLayout } from "../../../../resources/layouts/AdminLayout";
import { ReactElement } from "react";
import { CategoryForm } from "../../../../resources/formations/categories/components/CategoryForm";

const NewCategory = () => {
  return <CategoryForm />;
};

NewCategory.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default NewCategory;
