import { LoggerColors } from "../interfaces/logger";
/**
 * Logger
 * @description Logger for debug mode
 */
export declare class Logger {
    /**
     * Show log in console
     * @param color color of log
     * @param message message to show
     */
    log(color: LoggerColors, message: {} | string): void;
}
