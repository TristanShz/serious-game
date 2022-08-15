import React from "react";

export type TResourcesColumns = {
    key: string;
    label: string;
};

type Props = {
    resourceColumns: TResourcesColumns[];
};

export function ResourcesColumns(props: Props) {
    return (
        <tr
            className={
                "bg-neutral-95 border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative "
            }
        >
            {props.resourceColumns.map((column) => {
                return (
                    <th
                        key={column.key}
                        scope="col"
                        className="bg-neutral-95 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell"
                    >
                        {column.label}
                    </th>
                );
            })}
            <th className="bg-neutral-95 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Action
            </th>
        </tr>
    );
}
