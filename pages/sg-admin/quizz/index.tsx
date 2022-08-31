import { ReactElement } from "react";
import { TableComponent } from "../../../_common/components/table/TableComponent";
import { AdminLayout } from "../../../resources/layouts/AdminLayout";
import { ComponentLoader } from "../../../_common/components/loader/ComponentLoader";
import { ResourcesProvider } from "../../../resources/admin/_stores/ResourcesContext";
import { ResourcesStore } from "../../../resources/admin/_stores/ResourcesStore";
import { TQuizzMdl } from "../../../resources/quizz/_models/QuizzMdl";
import { quizzAdminStore } from "../../../resources/admin/quizz/_stores/quizzAdminStore";

const FAKE_COLUMNS = [
  {
    key: "_id",
    label: "ID"
  },
  {
    key: "name",
    label: "Nom"
  },
  {
    key: "duration",
    label: "Durée"
  },
  {
    key: "difficulty",
    label: "Difficulté"
  }
];

const QuizzAdminDashboard = () => {
  return (
    <>
      <ComponentLoader<TQuizzMdl>
        endPoint={quizzAdminStore.listEndPoint()}
        render={(data) => {
          if (data) quizzAdminStore.setItems(data?.data.items);
          const resourcesStore = new ResourcesStore<TQuizzMdl>(
            "quizz",
            data?.data.items,
            quizzAdminStore
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

QuizzAdminDashboard.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default QuizzAdminDashboard;
