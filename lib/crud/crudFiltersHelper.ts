const OP = {
    gt: "$gt",
    gte: "$gte",
    eq: "$eq",
    ne: "$ne",
    lt: "$lt",
    lte: "$lte",
};

export enum TFilterType {
    STRING = "string",
    DATE = "date",
    BOOLEAN = "boolean",
    NUMBER = "number",
    ENUM = "enum",
    ID = "_id",
    IN = "in",
    DATE_BETWEEN = "dateBetween",
    USERS = "users",
    STATUS = "status",
}

function buildCondition(filter: any) {
    switch (filter.type) {
        case "enum":
        case "boolean":
            return filter.value;
        case TFilterType.ID:
            return filter.value;
        case "string":
            return { $regex: new RegExp(filter.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") };
        case "status":
            return { $regex: new RegExp(filter.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") };
        case "date":
            return new Date(filter.value);
        case "number":
            return { [OP[filter.op as keyof typeof OP]]: filter.value };
        case "in":
            return { $in: filter.value };
        case "dateBetween":
            return { $gte: new Date(filter.value[0]), $lte: new Date(filter.value[1]) };
        case "users":
            const idSplit = filter.id.split("_");

            return {
                $or: [
                    { [idSplit[0]]: { $regex: new RegExp(filter.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") } },
                    { [idSplit[1]]: { $regex: new RegExp(filter.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") } },
                    { [idSplit[2]]: { $regex: new RegExp(filter.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") } },
                ],
            };

        default:
            return undefined;
    }
}

export function buildQueryFromFilters(filters: any) {
    const query: any = {};
    for (let i = 0; i < filters.length; i++) {
        const filter = filters[i];
        if (filter.value !== undefined) {
            if (!query.$and) query.$and = [];
            if (filter.type === TFilterType.USERS) {
                query.$and.push(buildCondition(filter));
            } else {
                query.$and.push({ [filter.id]: buildCondition(filter) });
            }
        }
    }
    return query;
}
