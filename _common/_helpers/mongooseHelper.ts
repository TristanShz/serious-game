import loggerService from "../logger/loggerService";
import { errorsBuilders } from "../errors/errorBuilder";
import _ from "lodash";

export function sanitizeObject(obj: Object, objectName: string, allowDot?: boolean) {
    if (_.isObject(obj) || _.isArray(obj)) {
        for (const key in obj) {
            if (key.startsWith("$") || (!allowDot && key.includes("."))) {
                loggerService.error("mongoSanitize", objectName, "invalid key", key);
                throw errorsBuilders.global.invalidParameters();
            }
            sanitizeObject(obj[key as keyof typeof obj], objectName);
        }
    }
}
