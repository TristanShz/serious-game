import { useRouter } from "next/router";
import { urlsAdmin } from "../../routes/routes";
import { useResourcesStore } from "../../../resources/admin/_stores/ResourcesContext";
import { Button } from "../../ui/Button";
import { useModalStore } from "../../../resources/modal/_stores/ModalContext";
import Confirm from "../modal/Confirm";
import { observer } from "mobx-react";

type Props = {
    item: any;
    resourceColumns: any;
};

export const ResourcesLine = observer((props: Props) => {
    const { push } = useRouter();
    const modalStore = useModalStore();
    const resourcesStore = useResourcesStore();
    return (
        <>
            {props.resourceColumns.map((column: any, index: number) => (
                <td key={index} scope="row" className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    {column.render?.() ?? props.item[column.key]}
                </td>
            ))}
            <td scope="row" className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <div className={"flex justify-center items-center gap-2"}>
                    <Button
                        className={"bg-yellow-500 rounded"}
                        onClick={() => {
                            push(`${urlsAdmin().edit(resourcesStore.storeName, props.item._id)}`);
                        }}
                        content={"éditer"}
                    />
                    <Button
                        className={"bg-red-500 rounded"}
                        onClick={() => {
                            modalStore.open(
                                <Confirm
                                    question={"Confirmer la suppréssion ?"}
                                    title={"Supprimer"}
                                    onAccept={() => {
                                        resourcesStore.onDelete(props.item._id);
                                        modalStore.close();
                                    }}
                                />,
                                "confirm",
                            );
                        }}
                        content={"Supprimer"}
                    />
                </div>
            </td>
        </>
    );
});
