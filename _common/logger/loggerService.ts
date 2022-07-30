class LoggerService {
    info(...args: any[]) {
        console.info("[INFO]", new Date(), "-", ...args);
    }

    warn(...args: any[]) {
        console.warn("[WARN]", new Date(), "-", ...args);
    }

    error(...args: any[]) {
        console.error("[ERROR]", new Date(), "-", ...args);
    }
}

const loggerService = new LoggerService();
export default loggerService;
