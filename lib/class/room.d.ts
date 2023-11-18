import { BehaviorSubject } from "rxjs";
import { KitRtc } from "../services/kitrtc.service";
import { Logger } from "./logger";
/**
 * Room for manage room in signaling server
 * @description Room class for manage room
 */
export declare class Room {
    private kitRtc;
    /**
     * Is connected
     * @description Is connected to room
     */
    private _isConnected;
    /**
     * Is connected (Observable)
     * @description Is connected to room
     */
    isConnected: BehaviorSubject<boolean>;
    /**
     * Logger
     * @description Logger
     */
    protected logger: Logger;
    constructor(kitRtc: KitRtc);
    /**
     * Join room
     * @param room room name for join, if not defined use room name from kitrtc or latest room name
     * @returns {Promise<boolean>}
     */
    join(room?: string): Promise<boolean>;
    /**
     * Leave room
     * @description Leave room
     * @returns {Promise<boolean>}
     * @param clearConnections clear connections
     */
    leave(clearConnections?: boolean): Promise<boolean>;
    /**
     * Clear connections
     * @description Clear connections, participants and local tracks
     * @param isLeaved is leaved to room
     */
    private clearConnections;
    get connected(): boolean;
}
