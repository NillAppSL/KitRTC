import { BehaviorSubject } from "rxjs";
import { LoggerColors } from "../interfaces/logger";
import { RoomCodes } from "../interfaces/room";
import { Logger } from "./logger";
/**
 * Room for manage room in signaling server
 * @description Room class for manage room
 */
export class Room {
    constructor(kitRtc) {
        this.kitRtc = kitRtc;
        /**
         * Is connected
         * @description Is connected to room
         */
        this._isConnected = false;
        /**
         * Is connected (Observable)
         * @description Is connected to room
         */
        this.isConnected = new BehaviorSubject(false);
        /**
         * Logger
         * @description Logger
         */
        this.logger = new Logger();
        this._isConnected = false;
    }
    /**
     * Join room
     * @param room room name for join, if not defined use room name from kitrtc or latest room name
     * @returns {Promise<boolean>}
     */
    async join(room) {
        const socket = this.kitRtc.getSocket();
        this.kitRtc.roomName = room || this.kitRtc.roomName;
        if (!socket) {
            this.logger.log(LoggerColors.RED, { event: "join-room", message: "socket is not defined" });
            return false;
        }
        if (!this.kitRtc.roomName) {
            this.logger.log(LoggerColors.RED, { event: "join-room", message: "room is not defined" });
            return false;
        }
        try {
            await this.leave(false);
            return new Promise((resolve, reject) => {
                socket?.emit("join-room", this.kitRtc.roomName, (response) => {
                    if (response.code === RoomCodes.SUCCESS) {
                        this.logger.log(LoggerColors.GREEN, { event: "join-room", message: `joined to room (${this.kitRtc.roomName})` });
                        this._isConnected = true;
                        this.isConnected.next(true);
                        resolve(true);
                    }
                    else {
                        this.logger.log(LoggerColors.RED, { event: "join-room", message: `error joining to room (${this.kitRtc.roomName})` });
                        this._isConnected = false;
                        this.isConnected.next(false);
                        reject(response);
                    }
                });
            });
        }
        catch (error) {
            this.logger.log(LoggerColors.RED, { event: "join-room", message: `error joining to room` });
            return false;
        }
    }
    /**
     * Leave room
     * @description Leave room
     * @returns {Promise<boolean>}
     * @param clearConnections clear connections
     */
    async leave(clearConnections = true) {
        if (!this.isConnected) {
            return false;
        }
        const socket = this.kitRtc.getSocket();
        if (!socket) {
            this.logger.log(LoggerColors.RED, { event: "leave-room", message: "socket is not defined" });
            return false;
        }
        try {
            return new Promise((resolve, reject) => {
                socket?.emit("leave-room", async (response) => {
                    if (response.code === RoomCodes.SUCCESS) {
                        this.logger.log(LoggerColors.GREEN, { event: "leave-room", message: `leaved to room` });
                        //clear connections
                        if (clearConnections)
                            await this.clearConnections(true);
                        this._isConnected = false;
                        this.isConnected.next(false);
                        resolve(true);
                    }
                    else {
                        this.logger.log(LoggerColors.RED, { event: "leave-room", message: `error leaved to room` });
                        reject(response);
                    }
                });
            });
        }
        catch (error) {
            this.logger.log(LoggerColors.RED, { event: "leave-room", message: `error leaved to room` });
            return false;
        }
    }
    /**
     * Clear connections
     * @description Clear connections, participants and local tracks
     * @param isLeaved is leaved to room
     */
    async clearConnections(isLeaved) {
        //clear participants
        for (const participant of this.kitRtc.participants) {
            participant.close();
        }
        this.kitRtc.participants = [];
        if (isLeaved) {
            await this.kitRtc.localParticipant.localTracks.unpublish(true);
            this.kitRtc.localParticipant.tracks = [];
        }
    }
    get connected() {
        return this._isConnected;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlha2l0YXBwanMvc3JjL2xpYi9jbGFzcy9yb29tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBWSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR2xDOzs7R0FHRztBQUNILE1BQU0sT0FBTyxJQUFJO0lBdUJmLFlBQ1UsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFyQnhCOzs7V0FHRztRQUNLLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBRXRDOzs7V0FHRztRQUNILGdCQUFXLEdBQTZCLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBSTVFOzs7V0FHRztRQUNPLFdBQU0sR0FBVyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBS3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFHRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFhO1FBQ3RCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBRXBELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDO1lBQzVGLE9B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LElBQUksQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUMxQztJQUNILENBQUM7SUFHRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztDQUVGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHsgTG9nZ2VyQ29sb3JzIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvbG9nZ2VyXCI7XHJcbmltcG9ydCB7IEpvaW5Sb29tLCBSb29tQ29kZXMgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9yb29tXCI7XHJcbmltcG9ydCB7IEtpdFJ0YyB9IGZyb20gXCIuLi9zZXJ2aWNlcy9raXRydGMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi9sb2dnZXJcIjtcclxuXHJcblxyXG4vKipcclxuICogUm9vbSBmb3IgbWFuYWdlIHJvb20gaW4gc2lnbmFsaW5nIHNlcnZlclxyXG4gKiBAZGVzY3JpcHRpb24gUm9vbSBjbGFzcyBmb3IgbWFuYWdlIHJvb21cclxuICovXHJcbmV4cG9ydCBjbGFzcyBSb29tIHtcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIElzIGNvbm5lY3RlZFxyXG4gICAqIEBkZXNjcmlwdGlvbiBJcyBjb25uZWN0ZWQgdG8gcm9vbVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2lzQ29ubmVjdGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIElzIGNvbm5lY3RlZCAoT2JzZXJ2YWJsZSlcclxuICAgKiBAZGVzY3JpcHRpb24gSXMgY29ubmVjdGVkIHRvIHJvb21cclxuICAgKi9cclxuICBpc0Nvbm5lY3RlZDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogTG9nZ2VyXHJcbiAgICogQGRlc2NyaXB0aW9uIExvZ2dlclxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBsb2dnZXI6IExvZ2dlciA9IG5ldyBMb2dnZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGtpdFJ0YzogS2l0UnRjLFxyXG4gICkge1xyXG4gICAgdGhpcy5faXNDb25uZWN0ZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBKb2luIHJvb21cclxuICAgKiBAcGFyYW0gcm9vbSByb29tIG5hbWUgZm9yIGpvaW4sIGlmIG5vdCBkZWZpbmVkIHVzZSByb29tIG5hbWUgZnJvbSBraXRydGMgb3IgbGF0ZXN0IHJvb20gbmFtZVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGpvaW4ocm9vbT86IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgY29uc3Qgc29ja2V0ID0gdGhpcy5raXRSdGMuZ2V0U29ja2V0KCk7XHJcbiAgICB0aGlzLmtpdFJ0Yy5yb29tTmFtZSA9IHJvb20gfHwgdGhpcy5raXRSdGMucm9vbU5hbWU7XHJcblxyXG4gICAgaWYgKCFzb2NrZXQpIHtcclxuICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ2dlckNvbG9ycy5SRUQsIHsgZXZlbnQ6IFwiam9pbi1yb29tXCIsIG1lc3NhZ2U6IFwic29ja2V0IGlzIG5vdCBkZWZpbmVkXCIgfSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMua2l0UnRjLnJvb21OYW1lKSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dnZXJDb2xvcnMuUkVELCB7IGV2ZW50OiBcImpvaW4tcm9vbVwiLCBtZXNzYWdlOiBcInJvb20gaXMgbm90IGRlZmluZWRcIiB9KTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IHRoaXMubGVhdmUoZmFsc2UpXHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgc29ja2V0Py5lbWl0KFwiam9pbi1yb29tXCIsIHRoaXMua2l0UnRjLnJvb21OYW1lLCAocmVzcG9uc2U6IEpvaW5Sb29tKSA9PiB7XHJcbiAgICAgICAgICBpZiAocmVzcG9uc2UuY29kZSA9PT0gUm9vbUNvZGVzLlNVQ0NFU1MpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ2dlckNvbG9ycy5HUkVFTiwgeyBldmVudDogXCJqb2luLXJvb21cIiwgbWVzc2FnZTogYGpvaW5lZCB0byByb29tICgke3RoaXMua2l0UnRjLnJvb21OYW1lfSlgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9pc0Nvbm5lY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaXNDb25uZWN0ZWQubmV4dCh0cnVlKTtcclxuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dnZXJDb2xvcnMuUkVELCB7IGV2ZW50OiBcImpvaW4tcm9vbVwiLCBtZXNzYWdlOiBgZXJyb3Igam9pbmluZyB0byByb29tICgke3RoaXMua2l0UnRjLnJvb21OYW1lfSlgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9pc0Nvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmlzQ29ubmVjdGVkLm5leHQoZmFsc2UpO1xyXG4gICAgICAgICAgICByZWplY3QocmVzcG9uc2UpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aGlzLmxvZ2dlci5sb2coTG9nZ2VyQ29sb3JzLlJFRCwgeyBldmVudDogXCJqb2luLXJvb21cIiwgbWVzc2FnZTogYGVycm9yIGpvaW5pbmcgdG8gcm9vbWAgfSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBMZWF2ZSByb29tXHJcbiAgICogQGRlc2NyaXB0aW9uIExlYXZlIHJvb21cclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn1cclxuICAgKiBAcGFyYW0gY2xlYXJDb25uZWN0aW9ucyBjbGVhciBjb25uZWN0aW9uc1xyXG4gICAqL1xyXG4gIGFzeW5jIGxlYXZlKGNsZWFyQ29ubmVjdGlvbnM6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCl7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzb2NrZXQgPSB0aGlzLmtpdFJ0Yy5nZXRTb2NrZXQoKTtcclxuXHJcbiAgICBpZiAoIXNvY2tldCkge1xyXG4gICAgICB0aGlzLmxvZ2dlci5sb2coTG9nZ2VyQ29sb3JzLlJFRCwgeyBldmVudDogXCJsZWF2ZS1yb29tXCIsIG1lc3NhZ2U6IFwic29ja2V0IGlzIG5vdCBkZWZpbmVkXCIgfSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHNvY2tldD8uZW1pdChcImxlYXZlLXJvb21cIiwgYXN5bmMgKHJlc3BvbnNlOiBKb2luUm9vbSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlc3BvbnNlLmNvZGUgPT09IFJvb21Db2Rlcy5TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dnZXJDb2xvcnMuR1JFRU4sIHsgZXZlbnQ6IFwibGVhdmUtcm9vbVwiLCBtZXNzYWdlOiBgbGVhdmVkIHRvIHJvb21gIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9jbGVhciBjb25uZWN0aW9uc1xyXG4gICAgICAgICAgICBpZihjbGVhckNvbm5lY3Rpb25zKSBhd2FpdCB0aGlzLmNsZWFyQ29ubmVjdGlvbnModHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9pc0Nvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmlzQ29ubmVjdGVkLm5leHQoZmFsc2UpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ2dlckNvbG9ycy5SRUQsIHsgZXZlbnQ6IFwibGVhdmUtcm9vbVwiLCBtZXNzYWdlOiBgZXJyb3IgbGVhdmVkIHRvIHJvb21gIH0pO1xyXG4gICAgICAgICAgICByZWplY3QocmVzcG9uc2UpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dnZXJDb2xvcnMuUkVELCB7IGV2ZW50OiBcImxlYXZlLXJvb21cIiwgbWVzc2FnZTogYGVycm9yIGxlYXZlZCB0byByb29tYCB9KTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIGNvbm5lY3Rpb25zXHJcbiAgICogQGRlc2NyaXB0aW9uIENsZWFyIGNvbm5lY3Rpb25zLCBwYXJ0aWNpcGFudHMgYW5kIGxvY2FsIHRyYWNrc1xyXG4gICAqIEBwYXJhbSBpc0xlYXZlZCBpcyBsZWF2ZWQgdG8gcm9vbVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYXN5bmMgY2xlYXJDb25uZWN0aW9ucyhpc0xlYXZlZDogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgLy9jbGVhciBwYXJ0aWNpcGFudHNcclxuICAgIGZvciAoY29uc3QgcGFydGljaXBhbnQgb2YgdGhpcy5raXRSdGMucGFydGljaXBhbnRzKSB7XHJcbiAgICAgIHBhcnRpY2lwYW50LmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmtpdFJ0Yy5wYXJ0aWNpcGFudHMgPSBbXTtcclxuXHJcbiAgICBpZihpc0xlYXZlZCl7XHJcbiAgICAgIGF3YWl0IHRoaXMua2l0UnRjLmxvY2FsUGFydGljaXBhbnQubG9jYWxUcmFja3MudW5wdWJsaXNoKHRydWUpO1xyXG4gICAgICB0aGlzLmtpdFJ0Yy5sb2NhbFBhcnRpY2lwYW50LnRyYWNrcyA9IFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGdldCBjb25uZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNDb25uZWN0ZWQ7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=