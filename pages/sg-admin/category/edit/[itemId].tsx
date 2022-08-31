import { ReactElement } from "react";
import { AdminLayout } from "../../../../resources/layouts/AdminLayout";
import { ComponentLoader } from "../../../../_common/components/loader/ComponentLoader";
import { useRouter } from "next/router";
import { categoryAdminStore } from "../../../../resources/admin/category/_stores/categoryAdminStore";
import { CategoryForm } from "../../../../resources/formations/categories/components/CategoryForm";

const EditCategory = () => {
  const { query } = useRouter();
  return (
    <ComponentLoader
      endPoint={categoryAdminStore.getEndPoint(query.itemId as string)}
      render={(data) => {
        return <CategoryForm data={data?.data} />;
      }}
    />
  );
};

EditCategory.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default EditCategory;
