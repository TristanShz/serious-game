import { ReactElement } from "react";
import { TableComponent } from "../../../_common/components/table/TableComponent";
import { ComponentLoader } from "../../../_common/components/loader/ComponentLoader";
import { formationsAdminStore } from "../../../resources/admin/formations/_stores/formationsAdminStores";
import { TFormationMdl } from "../../../resources/formations/_models/FormationMdl";
import { ResourcesProvider } from "../../../resources/admin/_stores/ResourcesContext";
import { ResourcesStore } from "../../../resources/admin/_stores/ResourcesStore";
import { AdminLayout } from "../../../resources/layouts/AdminLayout";

const FAKE_COLUMNS = [
  {
    key: "_id",
    label: "ID"
  },
  {
    key: "category",
    label: "Catégorie"
  },
  {
    key: "title",
    label: "Titre"
  },
  {
    key: "alias",
    label: "Alias"
  }
];

const FormationsAdminDashboard = () => {
  return (
    <>
      <ComponentLoader<TFormationMdl>
        endPoint={formationsAdminStore.listEndPoint()}
        render={(data) => {
          if (data) formationsAdminStore.setItems(data?.data.items);
          const resourcesStore = new ResourcesStore<TFormationMdl>(
            "formations",
            data?.data.items,
            formationsAdminStore
          );
          return (
            <ResourcesProvider store={resourcesStore}>
              <TableComponent columns={FAKE_COLUMNS} />
            </ResourcesProvider>
          );
        }}
      />
    </>
  );
};

FormationsAdminDashboard.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default FormationsAdminDashboard;
