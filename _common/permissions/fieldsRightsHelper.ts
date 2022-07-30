import _ from "lodash";
import { IUserModel, USER_ROLES } from "../../lib/users/UserModel";

export type TFieldsRights = "*" | { [key: string]: boolean | TFieldsRights };

export type TFieldsRightsByRole<T> = {
    [role: string]:
        | TFieldsRights
        | ((type: "PATCH" | "UPDATE" | "CREATE", item?: T, user?: IUserModel) => TFieldsRights);
};

function fieldsUpdateRightsMerger(right1: boolean | "*", right2: boolean | "*") {
    if (right1 === "*" || right2 === "*") {
        return "*";
    }
    if (right1 || right2) {
        return true;
    }
    return right1;
}

export function getFieldsUpdateRights<T>(
    type: "PATCH" | "UPDATE" | "CREATE",
    item: T | undefined,
    fieldsUpdateRights: TFieldsRightsByRole<T>,
    user?: IUserModel,
) {
    return Object.entries(fieldsUpdateRights).reduce((fieldsUpdateRights, [role, roleUpdateRights]) => {
        if (fieldsUpdateRights === "*") return fieldsUpdateRights;
        if (role === "*" || user?.role.includes(role as USER_ROLES)) {
            if (typeof roleUpdateRights === "function") {
                roleUpdateRights = roleUpdateRights(type, item, user);
            }
            if (roleUpdateRights === "*") return "*";
            fieldsUpdateRights = _.mergeWith(fieldsUpdateRights, roleUpdateRights, fieldsUpdateRightsMerger);
        }
        return fieldsUpdateRights;
    }, {});
}

export function pickWithRights(src: any, fieldsRights?: TFieldsRights | boolean) {
    if (!fieldsRights) {
        return undefined;
    }
    if (fieldsRights === "*" || src == null || fieldsRights === true) {
        return src;
    }

    const picked: any = {};
    for (const fieldKey in src) {
        const value = pickWithRights(src[fieldKey], fieldsRights[fieldKey]);
        if (value !== undefined) {
            picked[fieldKey] = value;
        }
    }
    return picked;
}
