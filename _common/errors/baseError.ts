class BaseError extends Error {
    key: string;
    info?: string;

    constructor(key: string, message?: string, info?: string) {
        super(message);
        this.key = key;
        this.info = info;
    }

    getStatusCode() {
        return this.key.endsWith("NOT_FOUND") ? 404 : 400;
    }

    toString() {
        return this.key + "\n" + this.message + "\n" + this.info;
    }
}

export default BaseError;
