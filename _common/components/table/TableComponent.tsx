import React from "react";
import { ResourcesColumns } from "./ResourcesColumns";
import { ResourceRowList } from "./ResourceRowList";

type Props = {
    data: {
        _id: string;
        name: string;
        email: string;
        date: string;
        adresse: string;
        phone: string;
        subscribe: string;
        role: string;
    }[];
    columns: { key: string; label: string }[];
};

export function TableComponent(props: Props) {
    return (
        <>
            <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <ResourcesColumns resourceColumns={props.columns} />
                </thead>
                <tbody className="block md:table-row-group">
                    {props.data.map((item) => (
                        <ResourceRowList key={item._id} item={item} resourceColumns={props.columns} />
                    ))}
                </tbody>
            </table>
        </>
    );
}
