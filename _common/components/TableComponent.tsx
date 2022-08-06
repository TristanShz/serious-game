import React from "react";
import { ResourcesColumns } from "./ResourcesColumns";
import { ResourceRowList } from "./ResourceRowList";

type Props = {
data:{
    _id: string
    name: string,
    email: string,
    date: string,
    adresse: string,
    phone: string,
    subscribe: string,
    role: string,
}[],
    columns:{key:string,label:string}[]
};

export function TableComponent(props: Props) {
    return (
        <div className="relative shadow-md sm:rounded-lg">
            <table className="text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <ResourcesColumns resourceColumns={props.columns}/>
                </thead>
                <tbody>
                {
                    props.data.map(item =>

                        <ResourceRowList key={item._id} item={item} resourceColumns={props.columns}/>,
                    )
                }
                </tbody>
            </table>
        </div>
    );
}
