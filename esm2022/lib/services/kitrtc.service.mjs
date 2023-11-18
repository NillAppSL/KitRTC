import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { Participant } from '../class/participant';
import { Room } from '../class/room';
import { Subject } from 'rxjs';
import { Logger } from '../class/logger';
import { LoggerColors } from '../interfaces/logger';
import * as i0 from "@angular/core";
/**
 * KitRtc is the main service of the library.
 * It allows you to connect to a server and create a room.
 * @description This service is the main entry point for using the library. It provides methods for connecting to a server and creating rooms for real-time communication.
 */
class KitRtc {
    constructor() {
        //Connection
        this.server = "http://localhost:3000";
        /**
         * Debug mode
         * @description Debug mode
         * @default false
         */
        this.isDebug = false;
        /**
         * Logger
         * @description Logger
         */
        this.logger = new Logger();
        /**
         * Media options
         * @description Media options for local participant
         */
        this.mediaOptions = {
            video: {
                maxBitrate: 2000
            },
            audio: {
                maxBitrate: 200
            }
        };
        /**
         * Participants
         */
        this.participants = [];
        this.localParticipant = new Participant(this, "", true);
        /**
         * Events
         */
        this.onDisconnect = new Subject();
        this.onParticipantConnected = new Subject();
        this.onParticipantDisconnected = new Subject();
        this.onRemoteMedia = new Subject();
        this.onRemoveLocalMedia = new Subject();
        this.onRemoveRemoteMedia = new Subject();
        this.onMuted = new Subject();
        this.onUnMuted = new Subject();
        /**
         * Room
         */
        this.roomName = "";
        this.reconnect = true;
        this.room = new Room(this);
        this.isConnected = false;
        /**
         * Set default bitrate
         */
        if (this.mediaOptions) {
            if (this.mediaOptions.video) {
                this.mediaOptions.video.maxBitrate = this.mediaOptions.video?.maxBitrate || this.mediaOptions.video.maxBitrate;
            }
            if (this.mediaOptions.audio) {
                this.mediaOptions.audio.maxBitrate = this.mediaOptions.audio?.maxBitrate || this.mediaOptions.audio.maxBitrate;
            }
        }
    }
    /**
     * Connect with a server
     * @description Connect with a server
     * @param server Server url
     * @returns Promise<boolean>
     */
    async connect(server) {
        if (!server) {
            this.logger.log(LoggerColors.RED, { event: "connect", message: "server is not defined" });
            return false;
        }
        //connect to server with socket
        this.server = server;
        try {
            this.socket = io(this.server, {
                transports: ["websocket"],
                path: "/",
            });
            this.localParticipant = new Participant(this, this.socket?.id || "", true);
            this.handlingEventsServer();
            return new Promise((resolve, reject) => {
                this.socket?.once("connect", () => {
                    resolve(true);
                });
                this.socket?.once("connect_error", (error) => {
                    this.logger.log(LoggerColors.RED, { event: "connecterror", message: error });
                    //clear socket once events
                    resolve(false);
                });
            });
        }
        catch (error) {
            if (this.isDebug)
                console.log(`MediaKitApp: error connecting to server (${error})`);
            return false;
        }
    }
    /**
     * Handle events from server
     * @description Handle events from server
     */
    handlingEventsServer() {
        this.socket?.on("connect", () => {
            this.logger.log(LoggerColors.GREEN, { event: "connect", message: "connected to server" });
            this.isConnected = true;
            /**
             * Reconnect to room
             */
            if (this.roomName && this.reconnect) {
                this.logger.log(LoggerColors.BLUE, { event: "reconnect", message: "reconnecting to room" });
                this.room.join(this.roomName).then((response) => {
                    if (response) {
                        this.logger.log(LoggerColors.GREEN, { event: "reconnect", message: "reconnected to room" });
                    }
                    else {
                        this.logger.log(LoggerColors.RED, { event: "reconnect", message: "error reconnected to room" });
                    }
                }).catch((error) => {
                    this.logger.log(LoggerColors.RED, { event: "reconnect", message: error });
                });
            }
        });
        this.socket?.on("disconnect", (event) => {
            this.logger.log(LoggerColors.RED, { event: "disconnect", message: event });
            this.onDisconnect.next(event);
            this.isConnected = false;
        });
        this.socket?.on("participants", async (response) => {
            //create participants lists
            this.participants = response.map((p) => {
                const participant = new Participant(this, p, false, false);
                //Emit event on joined participant
                this.onParticipantConnected.next(participant);
                //add track to connection
                participant.negotiated();
                return participant;
            });
        });
        this.socket?.on("participant-join", async (id) => {
            if (this.participants.find((p) => p.id === id)) {
                return;
            }
            //create participant
            const participant = new Participant(this, id, false, true);
            this.participants.push(participant);
            //Emit event on joined participant
            this.onParticipantConnected.next(participant);
            //add track to connection (deprecated)
            //participant.startNegotiation();
        });
        this.socket?.on("participant-left", (id) => {
            const participant = this.participants.find((p) => p.id === id);
            if (participant) {
                participant.close();
                this.participants = this.participants.filter((p) => p.id !== id);
                this.onParticipantDisconnected.next(participant);
            }
        });
        /**
         * WebRTC events
         */
        this.socket?.on("candidate", (event, id) => {
            const participant = this.participants.find((p) => p.id === event.id);
            if (participant) {
                participant.handleCandidate(event);
            }
        });
        this.socket?.on("offer", (offer) => {
            const participant = this.participants.find((p) => p.id === offer.id);
            if (participant) {
                participant.handleOffer(offer);
            }
        });
        this.socket?.on("answer", (answer) => {
            const participant = this.participants.find((p) => p.id === answer.id);
            if (participant) {
                participant.handleAnswer(answer);
            }
        });
    }
    /**
     * Get socket instance
     * @returns Socket
     */
    getSocket() {
        return this.socket;
    }
    /**
     * Auto play all tracks
     * @description Manual auto play for all participants.
     */
    autoPlayPolicy() {
        for (const participant of this.participants) {
            for (const track of participant.tracks) {
                if (track.trackComponent)
                    track.trackComponent.autoPlay();
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: KitRtc, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: KitRtc, providedIn: 'root' }); }
}
export { KitRtc };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: KitRtc, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2l0cnRjLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYWtpdGFwcGpzL3NyYy9saWIvc2VydmljZXMva2l0cnRjLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQVUsRUFBRSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQUdwRDs7OztHQUlHO0FBSUgsTUFLYSxNQUFNO0lBb0pqQjtRQWxKQSxZQUFZO1FBQ0osV0FBTSxHQUFXLHVCQUF1QixDQUFDO1FBSWpEOzs7O1dBSUc7UUFDSCxZQUFPLEdBQVksS0FBSyxDQUFDO1FBRXpCOzs7V0FHRztRQUNPLFdBQU0sR0FBVyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBeUN4Qzs7O1dBR0c7UUFDSCxpQkFBWSxHQUFpQjtZQUMzQixLQUFLLEVBQUU7Z0JBQ0wsVUFBVSxFQUFFLElBQUk7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7YUFDaEI7U0FDRixDQUFBO1FBaUZDOztXQUVHO1FBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFJeEQ7O1dBRUc7UUFDSCxJQUFJLENBQUMs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LENBQUM7YUFDbEM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUlMLENBQUM7SUFHRDs7O09BR0c7SUFDSCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFJRDs7O09BR0c7SUFDSCxjQUFjO1FBQ1osS0FBSyxNQUFNLFdBQVcsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzNDLEtBQUssTUFBTSxLQUFLLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRTtnQkFDdEMsSUFBRyxLQUFLLENBQUMsY0FBYztvQkFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQzFEO1NBQ0Y7SUFDSCxDQUFDOytHQXRYVSxNQUFNO21IQUFOLE1BQU0sY0FKTCxNQUFNOztTQUlQLE1BQU07NEZBQU4sTUFBTTtrQkFMbEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQsIGlvIH0gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcbmltcG9ydCB7IFBhcnRpY2lwYW50IH0gZnJvbSAnLi4vY2xhc3MvcGFydGljaXBhbnQnO1xuaW1wb3J0IHsgUm9vbSB9IGZyb20gJy4uL2NsYXNzL3Jvb20nO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWVkaWFPcHRpb25zLCBUcmFjayB9IGZyb20gJy4uL2ludGVyZmFjZXMvdHJhY2tzJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4uL2NsYXNzL2xvZ2dlcic7XG5pbXBvcnQgeyBMb2dnZXJDb2xvcnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2xvZ2dlcic7XG5cblxuLyoqXG4gKiBLaXRSdGMgaXMgdGhlIG1haW4gc2VydmljZSBvZiB0aGUgbGlicmFyeS5cbiAqIEl0IGFsbG93cyB5b3UgdG8gY29ubmVjdCB0byBhIHNlcnZlciBhbmQgY3JlYXRlIGEgcm9vbS5cbiAqIEBkZXNjcmlwdGlvbiBUaGlzIHNlcnZpY2UgaXMgdGhlIG1haW4gZW50cnkgcG9pbnQgZm9yIHVzaW5nIHRoZSBsaWJyYXJ5LiBJdCBwcm92aWRlcyBtZXRob2RzIGZvciBjb25uZWN0aW5nIHRvIGEgc2VydmVyIGFuZCBjcmVhdGluZyByb29tcyBmb3IgcmVhbC10aW1lIGNvbW11bmljYXRpb24uXG4gKi9cblxuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuXG5cbmV4cG9ydCBjbGFzcyBLaXRSdGMge1xuXG4gIC8vQ29ubmVjdGlvblxuICBwcml2YXRlIHNlcnZlcjogc3RyaW5nID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcbiAgcHJpdmF0ZSBzb2NrZXQ/OiBTb2NrZXQ7XG5cblxuICAvKipcbiAgICogRGVidWcgbW9kZVxuICAgKiBAZGVzY3JpcHRpb24gRGVidWcgbW9kZVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgaXNEZWJ1ZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBMb2dnZXJcbiAgICogQGRlc2NyaXB0aW9uIExvZ2dlclxuICAgKi9cbiAgcHJvdGVjdGVkIGxvZ2dlcjogTG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuXG5cbiAgLyoqXG4gICAqIFBhcnRpY2lwYW50c1xuICAgKiBAZGVzY3JpcHRpb24gTGlzdCBvZiBwYXJ0aWNpcGFudHNcbiAgICovXG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcblxuICAvKipcbiAgICogTG9jYWwgcGFydGljaXBhbnRcbiAgICogQGRlc2NyaXB0aW9uIExvY2FsIHBhcnRpY2lwYW50XG4gICAqL1xuICBsb2NhbFBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudDtcblxuXG4gIC8qKlxuICAgKiBSb29tIG5hbWVcbiAgICogQGRlc2NyaXB0aW9uIFJvb20gbmFtZSBmb3Igam9pblxuICAgKi9cbiAgcm9vbU5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogUm9vbSBpbnN0YW5jZVxuICAgKiBAZGVzY3JpcHRpb24gUm9vbSBpbnN0YW5jZSBmb3IgbWFuYWdlIHJvb21cbiAgICovXG4gIHJvb206IFJvb207XG5cbiAgLyoqXG4gICAqIFJlY29ubmVjdFxuICAgKiBAZGVzY3JpcHRpb24gUmVjb25uZWN0IHRvIHJvb20gYWZ0ZXIgZGlzY29ubmVjdGlvblxuICAgKi9cbiAgcmVjb25uZWN0OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJcyBjb25uZWN0ZWRcbiAgICogQGRlc2NyaXB0aW9uIElzIGNvbm5lY3RlZCB0byBzZXJ2ZXJcbiAgICovXG4gIGlzQ29ubmVjdGVkOiBib29sZWFuIDtcblxuXG4gIC8qKlxuICAgKiBNZWRpYSBvcHRpb25zXG4gICAqIEBkZXNjcmlwdGlvbiBNZWRpYSBvcHRpb25zIGZvciBsb2NhbCBwYXJ0aWNpcGFudFxuICAgKi9cbiAgbWVkaWFPcHRpb25zOiBNZWRpYU9wdGlvbnMgPSB7XG4gICAgdmlkZW86IHtcbiAgICAgIG1heEJpdHJhdGU6IDIwMDBcbiAgICB9LFxuICAgIGF1ZGlvOiB7XG4gICAgICBtYXhCaXRyYXRlOiAyMDBcbiAgICB9XG4gIH1cblxuXG5cblxuXG5cblxuXG4gIC8qKlxuICAgKiBAZXZlbnQgb25QYXJ0aWNpcGFudENvbm5lY3RlZFxuICAgKiBAZGVzY3JpcHRpb24gRXZlbnQgZW1pdHRlZCB3aGVuIGEgcGFydGljaXBhbnQgam9pbnMgdGhlIHJvb21cbiAgICogQHBhcmFtIHBhcnRpY2lwYW50IFBhcnRpY2lwYW50IGNvbm5lY3RlZFxuICAgKi9cbiAgb25QYXJ0aWNpcGFudENvbm5lY3RlZDogU3ViamVjdDxQYXJ0aWNpcGFudD47XG5cbiAgLyoqXG4gICAqIEBldmVudCBvblBhcnRpY2lwYW50RGlzY29ubmVjdGVkXG4gICAqIEBkZXNjcmlwdGlvbiBFdmVudCBlbWl0dGVkIHdoZW4gYSBwYXJ0aWNpcGFudCBsZWF2ZXMgdGhlIHJvb21cbiAgICogQHBhcmFtIHBhcnRpY2lwYW50IFBhcnRpY2lwYW50IGRpc2Nvbm5lY3RlZFxuICAgKi9cbiAgb25QYXJ0aWNpcGFudERpc2Nvbm5lY3RlZDogU3ViamVjdDxQYXJ0aWNpcGFudD47XG5cbiAgLyoqXG4gICAqIEBldmVudCBvblJlbW90ZU1lZGlhXG4gICAqIEBkZXNjcmlwdGlvbiBFdmVudCBlbWl0dGVkIHdoZW4gYSByZW1vdGUgbWVkaWEgaXMgYWRkZWRcbiAgICogQHBhcmFtIHBhcnRpY2lwYW50IFBhcnRpY2lwYW50IGFkZGVkIG1lZGlhXG4gICAqIEBwYXJhbSB0cmFjayBUcmFjayBvZiBldmVudFxuICAgKi9cbiAgb25SZW1vdGVNZWRpYTogU3ViamVjdDxbUGFydGljaXBhbnQsIFRyYWNrXT47XG5cbiAgLyoqXG4gICAqIEBldmVudCBvblJlbW92ZUxvY2FsTWVkaWFcbiAgICogQGRlc2NyaXB0aW9uIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIGxvY2FsIG1lZGlhIGlzIHJlbW92ZWRcbiAgICogQHBhcmFtIHBhcnRpY2lwYW50IFBhcnRpY2lwYW50IGxvY2FsIGFkZGVkIG1lZGlhXG4gICAqIEBwYXJhbSB0cmFjayBUcmFjayByZW1vdmVkIG9mIGV2ZW50XG4gICAqL1xuICBvblJlbW92ZUxvY2FsTWVkaWE6IFN1YmplY3Q8W1BhcnRpY2lwYW50LCBUcmFja10+O1xuXG4gIC8qKlxuICAgKiBAZXZlbnQgb25SZW1vdmVSZW1vdGVNZWRpYVxuICAgKiBAZGVzY3JpcHRpb24gRXZlbnQgZW1pdHRlZCB3aGVuIGEgcmVtb3RlIG1lZGlhIGlzIGFkZGVkXG4gICAqIEBwYXJhbSBwYXJ0aWNpcGFudCBQYXJ0aWNpcGFudCByZW1vdGUgYWRkZWQgbWVkaWFcbiAgICogQHBhcmFtIHRyYWNrIFRyYWNrIHJlbW90ZSBvZiBldmVudFxuICAgKi9cbiAgb25SZW1vdmVSZW1vdGVNZWRpYTogU3ViamVjdDxbUGFydGljaXBhbnQsIFRyYWNrXT47XG5cblxuICAvKipcbiAgICogQGV2ZW50IG9uRGlzY29ubmVjdFxuICAgKiBAZGVzY3JpcHRpb24gRXZlbnQgZW1pdHRlZCB3aGVuIGEgc29ja2V0IGlzIGRpc2Nvbm5lY3RlZFxuICAgKiBAcGFyYW0gcmVhc29uIFJlYXNvbiBvZiBkaXNjb25uZWN0aW9uXG4gICAqL1xuICBvbkRpc2Nvbm5lY3Q6IFN1YmplY3Q8U29ja2V0LkRpc2Nvbm5lY3RSZWFzb24+O1xuXG5cbiAgLyoqXG4gICAqIEBldmVudCBvbk11dGVkXG4gICAqIEBkZXNjcmlwdGlvbiBFdmVudCBlbWl0dGVkIHdoZW4gYSBwYXJ0aWNpcGFudCBpcyBtdXRlZCAoT25seSBmb3IgbG9jYWwgcGFydGljaXBhbnRzIGZvciBub3cuKVxuICAgKiBAcGFyYW0gcGFydGljaXBhbnQgUGFydGljaXBhbnQgbXV0ZWRcbiAgICogQHBhcmFtIHRyYWNrIFRyYWNrIG11dGVkXG4gICAqL1xuICBvbk11dGVkOiBTdWJqZWN0PFtQYXJ0aWNpcGFudCwgVHJhY2tdPjtcblxuXG4gIC8qKlxuICAgKiBAZXZlbnQgb25Vbk11dGVkXG4gICAqIEBkZXNjcmlwdGlvbiBFdmVudCBlbWl0dGVkIHdoZW4gYSBwYXJ0aWNpcGFudCBpcyB1bm11dGVkIChPbmx5IGZvciBsb2NhbCBwYXJ0aWNpcGFudHMgZm9yIG5vdy4pXG4gICAqIEBwYXJhbSBwYXJ0aWNpcGFudCBQYXJ0aWNpcGFudCB1bm11dGVkXG4gICAqIEBwYXJhbSB0cmFjayBUcmFjayB1bm11dGVkXG4gICAqL1xuICBvblVuTXV0ZWQ6IFN1YmplY3Q8W1BhcnRpY2lwYW50LCBUcmFja10+O1xuXG5cblxuXG5cblxuICBjb25zdHJ1Y3RvcihcbiAgKSB7XG5cbiAgICAvKipcbiAgICAgKiBQYXJ0aWNpcGFudHNcbiAgICAgKi9cbiAgICB0aGlzLnBhcnRpY2lwYW50cyA9IFtdO1xuICAgIHRoaXMubG9jYWxQYXJ0aWNpcGFudCA9IG5ldyBQYXJ0aWNpcGFudCh0aGlzLCBcIlwiLCB0cnVlKTtcblxuXG5cbiAgICAvKipcbiAgICAgKiBFdmVudHNcbiAgICAgKi9cbiAgICB0aGlzLm9uRGlzY29ubmVjdCA9IG5ldyBTdWJqZWN0PFNvY2tldC5EaXNjb25uZWN0UmVhc29uPigpO1xuICAgIHRoaXMub25QYXJ0aWNpcGFudENvbm5lY3RlZCA9IG5ldyBTdWJqZWN0PFBhcnRpY2lwYW50PigpO1xuICAgIHRoaXMub25QYXJ0aWNpcGFudERpc2Nvbm5lY3RlZCA9IG5ldyBTdWJqZWN0PFBhcnRpY2lwYW50PigpO1xuICAgIHRoaXMub25SZW1vdGVNZWRpYSA9IG5ldyBTdWJqZWN0PFtQYXJ0aWNpcGFudCwgVHJhY2tdPigpO1xuICAgIHRoaXMub25SZW1vdmVMb2NhbE1lZGlhID0gbmV3IFN1YmplY3Q8W1BhcnRpY2lwYW50LCBUcmFja10+KCk7XG4gICAgdGhpcy5vblJlbW92ZVJlbW90ZU1lZGlhID0gbmV3IFN1YmplY3Q8W1BhcnRpY2lwYW50LCBUcmFja10+KCk7XG4gICAgdGhpcy5vbk11dGVkID0gbmV3IFN1YmplY3Q8W1BhcnRpY2lwYW50LCBUcmFja10+KCk7XG4gICAgdGhpcy5vblVuTXV0ZWQgPSBuZXcgU3ViamVjdDxbUGFydGljaXBhbnQsIFRyYWNrXT4oKTtcblxuXG5cblxuICAgIC8qKlxuICAgICAqIFJvb21cbiAgICAgKi9cbiAgICB0aGlzLnJvb21OYW1lID0gXCJcIjtcbiAgICB0aGlzLnJlY29ubmVjdCA9IHRydWU7XG4gICAgdGhpcy5yb29tID0gbmV3IFJvb20odGhpcyk7XG4gICAgdGhpcy5pc0Nvbm5lY3RlZCA9IGZhbHNlO1xuXG5cblxuXG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBTZXQgZGVmYXVsdCBiaXRyYXRlXG4gICAgICovXG4gICAgaWYgKHRoaXMubWVkaWFPcHRpb25zKSB7XG4gICAgICBpZiAodGhpcy5tZWRpYU9wdGlvbnMudmlkZW8pIHtcbiAgICAgICAgdGhpcy5tZWRpYU9wdGlvbnMudmlkZW8ubWF4Qml0cmF0ZSA9IHRoaXMubWVkaWFPcHRpb25zLnZpZGVvPy5tYXhCaXRyYXRlIHx8IHRoaXMubWVkaWFPcHRpb25zLnZpZGVvLm1heEJpdHJhdGU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tZWRpYU9wdGlvbnMuYXVkaW8pIHtcbiAgICAgICAgdGhpcy5tZWRpYU9wdGlvbnMuYXVkaW8ubWF4Qml0cmF0ZSA9IHRoaXMubWVkaWFPcHRpb25zLmF1ZGlvPy5tYXhCaXRyYXRlIHx8IHRoaXMubWVkaWFPcHRpb25zLmF1ZGlvLm1heEJpdHJhdGU7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBDb25uZWN0IHdpdGggYSBzZXJ2ZXJcbiAgICogQGRlc2NyaXB0aW9uIENvbm5lY3Qgd2l0aCBhIHNlcnZlclxuICAgKiBAcGFyYW0gc2VydmVyIFNlcnZlciB1cmxcbiAgICogQHJldHVybnMgUHJvbWlzZTxib29sZWFuPlxuICAgKi9cbiAgYXN5bmMgY29ubmVjdChzZXJ2ZXI6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICghc2VydmVyKSB7XG4gICAgICB0aGlzLmxvZ2dlci5sb2coTG9nZ2VyQ29sb3JzLlJFRCwgeyBldmVudDogXCJjb25uZWN0XCIsIG1lc3NhZ2U6IFwic2VydmVyIGlzIG5vdCBkZWZpbmVkXCJ9KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvL2Nvbm5lY3QgdG8gc2VydmVyIHdpdGggc29ja2V0XG4gICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuc29ja2V0ID0gaW8odGhpcy5zZXJ2ZXIsIHtcbiAgICAgICAgdHJhbnNwb3J0czogW1wid2Vic29ja2V0XCJdLFxuICAgICAgICBwYXRoOiBcIi9cIixcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmxvY2FsUGFydGljaXBhbnQgPSBuZXcgUGFydGljaXBhbnQodGhpcywgdGhpcy5zb2NrZXQ/LmlkIHx8IFwiXCIsIHRydWUpO1xuICAgICAgdGhpcy5oYW5kbGluZ0V2ZW50c1NlcnZlcigpXG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRoaXMuc29ja2V0Py5vbmNlKFwiY29ubmVjdFwiLCAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc29ja2V0Py5vbmNlKFwiY29ubmVjdF9lcnJvclwiLCAoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ2dlckNvbG9ycy5SRUQsIHsgZXZlbnQ6IFwiY29ubmVjdGVycm9yXCIsIG1lc3NhZ2U6IGVycm9yIH0pO1xuICAgICAgICAgIC8vY2xlYXIgc29ja2V0IG9uY2UgZXZlbnRzXG4gICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKHRoaXMuaXNEZWJ1ZykgY29uc29sZS5sb2coYE1lZGlhS2l0QXBwOiBlcnJvciBjb25uZWN0aW5nIHRvIHNlcnZlciAoJHtlcnJvcn0pYCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gIH1cblxuXG5cblxuXG5cblxuICAvKipcbiAgICogSGFuZGxlIGV2ZW50cyBmcm9tIHNlcnZlclxuICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlIGV2ZW50cyBmcm9tIHNlcnZlclxuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGluZ0V2ZW50c1NlcnZlcigpIHtcblxuICAgIHRoaXMuc29ja2V0Py5vbihcImNvbm5lY3RcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ2dlckNvbG9ycy5HUkVFTiwgeyBldmVudDogXCJjb25uZWN0XCIsIG1lc3NhZ2U6IFwiY29ubmVjdGVkIHRvIHNlcnZlclwiIH0pO1xuICAgICAgdGhpcy5pc0Nvbm5lY3RlZCA9IHRydWU7XG5cbiAgICAgIC8qKlxuICAgICAgICogUmVjb25uZWN0IHRvIHJvb21cbiAgICAgICAqL1xuICAgICAgaWYodGhpcy5yb29tTmFtZSAmJiB0aGlzLnJlY29ubmVjdCl7XG4gICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dnZXJDb2xvcnMuQkxVRSwgeyBldmVudDogXCJyZWNvbm5lY3RcIiwgbWVzc2FnZTogXCJyZWNvbm5lY3RpbmcgdG8gcm9vbVwiIH0pO1xuICAgICAgICB0aGlzLnJvb20uam9pbih0aGlzLnJvb21OYW1lKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmKHJlc3BvbnNlKXtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dnZXJDb2xvcnMuR1JFRU4sIHsgZXZlbnQ6IFwicmVjb25uZWN0XCIsIG1lc3NhZ2U6IFwicmVjb25uZWN0ZWQgdG8gcm9vbVwiIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nZ2VyQ29sb3JzLlJFRCwgeyBldmVudDogXCJyZWNvbm5lY3RcIiwgbWVzc2FnZTogXCJlcnJvciByZWNvbm5lY3RlZCB0byByb29tXCIgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nZ2VyQ29sb3JzLlJFRCwgeyBldmVudDogXCJyZWNvbm5lY3RcIiwgbWVzc2FnZTogZXJyb3J9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9KTtcblxuXG4gICAgdGhpcy5zb2NrZXQ/Lm9uKFwiZGlzY29ubmVjdFwiLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dnZXJDb2xvcnMuUkVELCB7IGV2ZW50OiBcImRpc2Nvbm5lY3RcIiwgbWVzc2FnZTogZXZlbnQgfSk7XG4gICAgICB0aGlzLm9uRGlzY29ubmVjdC5uZXh0KGV2ZW50KTtcbiAgICAgIHRoaXMuaXNDb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB9KTtcblxuXG4gICAgdGhpcy5zb2NrZXQ/Lm9uKFwicGFydGljaXBhbnRzXCIsIGFzeW5jIChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAvL2NyZWF0ZSBwYXJ0aWNpcGFudHMgbGlzdHNcbiAgICAgIHRoaXMucGFydGljaXBhbnRzID0gcmVzcG9uc2UubWFwKChwOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgcGFydGljaXBhbnQgPSBuZXcgUGFydGljaXBhbnQodGhpcywgcCwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgLy9FbWl0IGV2ZW50IG9uIGpvaW5lZCBwYXJ0aWNpcGFudFxuICAgICAgICB0aGlzLm9uUGFydGljaXBhbnRDb25uZWN0ZWQubmV4dChwYXJ0aWNpcGFudCk7XG4gICAgICAgIC8vYWRkIHRyYWNrIHRvIGNvbm5lY3Rpb25cbiAgICAgICAgcGFydGljaXBhbnQubmVnb3RpYXRlZCgpO1xuICAgICAgICByZXR1cm4gcGFydGljaXBhbnQ7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuc29ja2V0Py5vbihcInBhcnRpY2lwYW50LWpvaW5cIiwgYXN5bmMgKGlkOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICh0aGlzLnBhcnRpY2lwYW50cy5maW5kKChwKSA9PiBwLmlkID09PSBpZCkpIHsgcmV0dXJuOyB9XG5cbiAgICAgIC8vY3JlYXRlIHBhcnRpY2lwYW50XG4gICAgICBjb25zdCBwYXJ0aWNpcGFudCA9IG5ldyBQYXJ0aWNpcGFudCh0aGlzLCBpZCwgZmFsc2UsIHRydWUpO1xuICAgICAgdGhpcy5wYXJ0aWNpcGFudHMucHVzaChwYXJ0aWNpcGFudCk7XG5cbiAgICAgIC8vRW1pdCBldmVudCBvbiBqb2luZWQgcGFydGljaXBhbnRcbiAgICAgIHRoaXMub25QYXJ0aWNpcGFudENvbm5lY3RlZC5uZXh0KHBhcnRpY2lwYW50KTtcblxuICAgICAgLy9hZGQgdHJhY2sgdG8gY29ubmVjdGlvbiAoZGVwcmVjYXRlZClcbiAgICAgIC8vcGFydGljaXBhbnQuc3RhcnROZWdvdGlhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zb2NrZXQ/Lm9uKFwicGFydGljaXBhbnQtbGVmdFwiLCAoaWQ6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgcGFydGljaXBhbnQgPSB0aGlzLnBhcnRpY2lwYW50cy5maW5kKChwKSA9PiBwLmlkID09PSBpZCk7XG4gICAgICBpZiAocGFydGljaXBhbnQpIHtcbiAgICAgICAgcGFydGljaXBhbnQuY2xvc2UoKVxuICAgICAgICB0aGlzLnBhcnRpY2lwYW50cyA9IHRoaXMucGFydGljaXBhbnRzLmZpbHRlcigocCkgPT4gcC5pZCAhPT0gaWQpO1xuICAgICAgICB0aGlzLm9uUGFydGljaXBhbnREaXNjb25uZWN0ZWQubmV4dChwYXJ0aWNpcGFudCk7XG4gICAgICB9XG4gICAgfSk7XG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBXZWJSVEMgZXZlbnRzXG4gICAgICovXG4gICAgdGhpcy5zb2NrZXQ/Lm9uKFwiY2FuZGlkYXRlXCIsIChldmVudDogYW55LCBpZDogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBwYXJ0aWNpcGFudCA9IHRoaXMucGFydGljaXBhbnRzLmZpbmQoKHApID0+IHAuaWQgPT09IGV2ZW50LmlkKTtcbiAgICAgIGlmIChwYXJ0aWNpcGFudCkge1xuICAgICAgICBwYXJ0aWNpcGFudC5oYW5kbGVDYW5kaWRhdGUoZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5zb2NrZXQ/Lm9uKFwib2ZmZXJcIiwgKG9mZmVyOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHBhcnRpY2lwYW50ID0gdGhpcy5wYXJ0aWNpcGFudHMuZmluZCgocCkgPT4gcC5pZCA9PT0gb2ZmZXIuaWQpO1xuICAgICAgaWYgKHBhcnRpY2lwYW50KSB7XG4gICAgICAgIHBhcnRpY2lwYW50LmhhbmRsZU9mZmVyKG9mZmVyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuc29ja2V0Py5vbihcImFuc3dlclwiLCAoYW5zd2VyOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHBhcnRpY2lwYW50ID0gdGhpcy5wYXJ0aWNpcGFudHMuZmluZCgocCkgPT4gcC5pZCA9PT0gYW5zd2VyLmlkKTtcbiAgICAgIGlmIChwYXJ0aWNpcGFudCkge1xuICAgICAgICBwYXJ0aWNpcGFudC5oYW5kbGVBbnN3ZXIoYW5zd2VyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuXG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldCBzb2NrZXQgaW5zdGFuY2VcbiAgICogQHJldHVybnMgU29ja2V0XG4gICAqL1xuICBnZXRTb2NrZXQoKTogU29ja2V0IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5zb2NrZXQ7XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIEF1dG8gcGxheSBhbGwgdHJhY2tzXG4gICAqIEBkZXNjcmlwdGlvbiBNYW51YWwgYXV0byBwbGF5IGZvciBhbGwgcGFydGljaXBhbnRzLlxuICAgKi9cbiAgYXV0b1BsYXlQb2xpY3koKTogdm9pZHtcbiAgICBmb3IgKGNvbnN0IHBhcnRpY2lwYW50IG9mIHRoaXMucGFydGljaXBhbnRzKSB7XG4gICAgICBmb3IgKGNvbnN0IHRyYWNrIG9mIHBhcnRpY2lwYW50LnRyYWNrcykge1xuICAgICAgICBpZih0cmFjay50cmFja0NvbXBvbmVudCkgdHJhY2sudHJhY2tDb21wb25lbnQuYXV0b1BsYXkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==