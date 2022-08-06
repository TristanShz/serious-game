type Props = {
    item: any
    resourceColumns: any
};

export function ResourcesLine(props: Props) {
    return (
        <>
            {
                props.resourceColumns.map((column: any) =>
                    (<th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {column.render?.() ?? props.item[column.key]}
                    </th>),
                )
            }
            <td className="actions-cell">
                <button>éditer</button>
            </td>
        </>
    );
}