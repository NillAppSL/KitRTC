import { Socket } from "socket.io-client";
import { Participant } from '../class/participant';
import { Room } from '../class/room';
import { Subject } from 'rxjs';
import { MediaOptions, Track } from '../interfaces/tracks';
import { Logger } from '../class/logger';
import * as i0 from "@angular/core";
/**
 * KitRtc is the main service of the library.
 * It allows you to connect to a server and create a room.
 * @description This service is the main entry point for using the library. It provides methods for connecting to a server and creating rooms for real-time communication.
 */
export declare class KitRtc {
    private server;
    private socket?;
    /**
     * Debug mode
     * @description Debug mode
     * @default false
     */
    isDebug: boolean;
    /**
     * Logger
     * @description Logger
     */
    protected logger: Logger;
    /**
     * Participants
     * @description List of participants
     */
    participants: Participant[];
    /**
     * Local participant
     * @description Local participant
     */
    localParticipant: Participant;
    /**
     * Room name
     * @description Room name for join
     */
    roomName: string;
    /**
     * Room instance
     * @description Room instance for manage room
     */
    room: Room;
    /**
     * Reconnect
     * @description Reconnect to room after disconnection
     */
    reconnect: boolean;
    /**
     * Is connected
     * @description Is connected to server
     */
    isConnected: boolean;
    /**
     * Media options
     * @description Media options for local participant
     */
    mediaOptions: MediaOptions;
    /**
     * @event onParticipantConnected
     * @description Event emitted when a participant joins the room
     * @param participant Participant connected
     */
    onParticipantConnected: Subject<Participant>;
    /**
     * @event onParticipantDisconnected
     * @description Event emitted when a participant leaves the room
     * @param participant Participant disconnected
     */
    onParticipantDisconnected: Subject<Participant>;
    /**
     * @event onRemoteMedia
     * @description Event emitted when a remote media is added
     * @param participant Participant added media
     * @param track Track of event
     */
    onRemoteMedia: Subject<[Participant, Track]>;
    /**
     * @event onRemoveLocalMedia
     * @description Event emitted when a local media is removed
     * @param participant Participant local added media
     * @param track Track removed of event
     */
    onRemoveLocalMedia: Subject<[Participant, Track]>;
    /**
     * @event onRemoveRemoteMedia
     * @description Event emitted when a remote media is added
     * @param participant Participant remote added media
     * @param track Track remote of event
     */
    onRemoveRemoteMedia: Subject<[Participant, Track]>;
    /**
     * @event onDisconnect
     * @description Event emitted when a socket is disconnected
     * @param reason Reason of disconnection
     */
    onDisconnect: Subject<Socket.DisconnectReason>;
    /**
     * @event onMuted
     * @description Event emitted when a participant is muted (Only for local participants for now.)
     * @param participant Participant muted
     * @param track Track muted
     */
    onMuted: Subject<[Participant, Track]>;
    /**
     * @event onUnMuted
     * @description Event emitted when a participant is unmuted (Only for local participants for now.)
     * @param participant Participant unmuted
     * @param track Track unmuted
     */
    onUnMuted: Subject<[Participant, Track]>;
    constructor();
    /**
     * Connect with a server
     * @description Connect with a server
     * @param server Server url
     * @returns Promise<boolean>
     */
    connect(server: string): Promise<boolean>;
    /**
     * Handle events from server
     * @description Handle events from server
     */
    private handlingEventsServer;
    /**
     * Get socket instance
     * @returns Socket
     */
    getSocket(): Socket | undefined;
    /**
     * Auto play all tracks
     * @description Manual auto play for all participants.
     */
    autoPlayPolicy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KitRtc, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<KitRtc>;
}
