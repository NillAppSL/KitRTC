/**
 * Room codes interface
 * @description The room codes interface
 */
export declare enum RoomCodes {
    /**
     * @description The room was created successfully
     */
    SUCCESS = "true",
    /**
     * @description The room was not created successfully
     */
    ERROR = "false"
}
/**
 * Join room interface
 */
export interface JoinRoom {
    /**
     * Room code
     * @description The room code
     */
    code: RoomCodes;
    /**
     * Room name
     * @description The room name
     */
    room: string;
    /**
     * Message
     * @description The message
     */
    message: string;
}
/**
 * Room events interface
 */
export declare enum RoomEvent {
    /**
     * @description The room was created successfully
     */
    TrackSubscribed = "track-subscribed",
    /**
     * @description The room was not created successfully
     */
    TrackUnsubscribed = "track-unsubscribed",
    /**
     * @description The participant was disconnected
     */
    ParticipantDisconnected = "participant-disconnected",
    /**
     * @description The participant was connected
     */
    ParticipantConnected = "participant-connected",
    /**
     * @description The participant was joined
     */
    ParticipantJoined = "participant-joined",
    /**
     * @description The participant was left
     */
    ParticipantLeft = "participant-left"
}
