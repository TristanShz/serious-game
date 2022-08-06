import React from "react";

export type TResourcesColumns = {
    key: string,
    label: string
}

type Props = {
    resourceColumns: TResourcesColumns[];
};

export function ResourcesColumns(props: Props) {
    return (
        <tr>
            {
                props.resourceColumns.map((column) => {
                    return (
                        <th key={column.key} scope="col" className="px-6 py-3">
                            {column.label}
                        </th>
                    );
                })
            }
            <th className="px-6 py-3">
                Action
            </th>
        </tr>
    );
}
