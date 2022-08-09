import { useState } from "react";
import { useRouter } from "next/router";
import { urlsAdmin } from "../../routes/routes";

type Props = {
    item: any;
    resourceColumns: any;
};

export function ResourcesLine(props: Props) {
    const { replace } = useRouter();
    return (
        <>
            {props.resourceColumns.map((column: any, index: number) => (
                <td key={index} scope="row" className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    {column.render?.() ?? props.item[column.key]}
                </td>
            ))}
            <td scope="row" className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <div className={"flex justify-center items-center gap-2"}>
                    <button className={"bg-yellow-500 rounded"}>éditer</button>
                    <button className={"bg-red-500 rounded"}>Supprimer</button>
                    <button
                        className={"bg-green-500 rounded"}
                        onClick={() => {
                            replace(`${urlsAdmin().users}/edit/${props.item._id}`);
                        }}
                    >
                        Ajouter
                    </button>
                </div>
            </td>
        </>
    );
}
