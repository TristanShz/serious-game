import { ResourcesLine } from "./ResourcesLine";

type Props = {
    item: any;
    resourceColumns: any;
};

export function ResourceRowList(props: Props) {
    return (
        <>
            <tr className="bg-white border border-grey-500 md:border-none block md:table-row">
                <ResourcesLine item={props.item} resourceColumns={props.resourceColumns} />
            </tr>
        </>
    );
}
