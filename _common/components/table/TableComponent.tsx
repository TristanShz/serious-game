import { useResourcesStore } from "../../../resources/admin/_stores/ResourcesContext";
import { Button } from "../../ui/Button";
import { useRouter } from "next/router";
import { urlsAdmin } from "../../routes/routes";
import { observer } from "mobx-react";
import { ResourceRowList } from "./ResourceRowList";
import { ResourcesColumns } from "./ResourcesColumns";

type Props = {
  columns: { key: string; label: string }[];
};

export const TableComponent = observer((props: Props) => {
  const resourcesStore = useResourcesStore();
  const { replace } = useRouter();
  return (
    <div className={"flex flex-col gap-3"}>
      <div className={"flex items-center"}>
        <Button
          color={"gradient"}
          content={"Ajouter"}
          onClick={() => {
            replace(`${urlsAdmin().formationsNew(resourcesStore.storeName)}`);
          }}
        />
        <h1 className={"text-center w-full font-bold"}>{resourcesStore.storeName}</h1>
      </div>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
        <ResourcesColumns resourceColumns={props.columns} />
        </thead>
        <tbody className="block md:table-row-group">
        {resourcesStore.items.map((item) => (
          <ResourceRowList key={item._id} item={item} resourceColumns={props.columns} />
        ))}
        </tbody>
      </table>
    </div>
  );
});
