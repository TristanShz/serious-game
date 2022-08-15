import { ResourcesLine } from "./ResourcesLine";
import { observer } from "mobx-react";

type Props = {
    item: any;
    resourceColumns: any;
};

export const ResourceRowList = observer((props: Props) => (
    <>
        <tr className="bg-white border border-grey-500 md:border-none block md:table-row">
            <ResourcesLine item={props.item} resourceColumns={props.resourceColumns} />
        </tr>
    </>
));
