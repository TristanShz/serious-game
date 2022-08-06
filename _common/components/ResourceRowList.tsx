import { ResourcesLine } from "./ResourcesLine";

type Props = {
    item: any
    resourceColumns: any
};

export function ResourceRowList(props: Props) {
    console.log(props.item);
    return (
        <>
            <tr className="bg-white w-full border-b dark:bg-gray-800 dark:border-gray-700">
                <ResourcesLine item={props.item} resourceColumns={props.resourceColumns}/>
            </tr>
        </>
    );
}