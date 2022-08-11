import React from "react";
import { ResourcesColumns } from "./ResourcesColumns";
import { ResourceRowList } from "./ResourceRowList";
import { useResourcesStore } from "../../../resources/admin/_stores/ResourcesContext";
import { Button } from "../../ui/Button";
import { useRouter } from "next/router";
import { urlsAdmin } from "../../routes/routes";
import { observer } from "mobx-react";

type Props = {
    columns: { key: string; label: string }[];
};

export const TableComponent = observer((props: Props) => {
    const resourcesStore = useResourcesStore();
    const { replace } = useRouter();
    return (
        <div className={"flex flex-col gap-3"}>
            <Button
                color={"gradient"}
                content={"Ajouter"}
                onClick={() => {
                    replace(`${urlsAdmin().formations}/new`);
                }}
            />
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
