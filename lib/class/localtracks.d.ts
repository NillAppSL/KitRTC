import { Track, TrackKind } from "../interfaces/tracks";
import { KitRtc } from "../services/kitrtc.service";
import { Participant } from "./participant";
import { Logger } from "./logger";
/**
 * Local tracks
 * @description Local tracks for participant
 */
export declare class LocalTracks extends Logger {
    private kitRtc;
    /**
     * Random id for track
     * @description Random id for track
     */
    id: string;
    /**
     * Participant for track
     * @description Participant owner of track
     */
    participant: Participant;
    constructor(kitRtc: KitRtc, participant: Participant);
    /**
     * Create local tracks
     * @description Create local tracks
     * @param constraints MediaStreamConstraints for getUserMedia
     * @returns Promise with MediaStream or undefined
     */
    createLocalTracks(constraints?: MediaStreamConstraints): Promise<MediaStream | undefined>;
    /**
     * Enable camera and mic
     * @description Enable local camera and mic
     */
    enableCameraAndMic(): Promise<boolean>;
    /**
     * Enable camera
     * @description Enable local camera
     */
    enableCamera(): Promise<void>;
    /**
     * Disable camera
     * @description Disable local camera
     */
    disableCamera(): Promise<void>;
    /**
     * Toogle camera
     * @description Toogle local camera
     */
    toogleCamera(): Promise<boolean>;
    /**
     * Enable mic
     * @description Enable local mic
     */
    enableMic(): Promise<void>;
    /**
     * Disable mic
     * @description Disable local mic
     */
    disableMic(): Promise<void>;
    /**
     * Toogle mic
     * @description Toogle local mic
     */
    toogleMic(): Promise<void>;
    /**
     * Publish tracks
     * @description Publish tracks to all participants (Only local participant)
     */
    publish(): Promise<void>;
    /**
     * Unpublish tracks (Only local participant)
     * @description Unpublish tracks to all participants
     * @param removeLocalTracks remove local tracks
     * @returns
     */
    unpublish(removeLocalTracks?: boolean): Promise<void>;
    /**
     * Stop local tracks
     * @description Stop local tracks (Only local participant)
     */
    stopLocalTracks(): void;
    /**
     * Toggle track
     * @param type track type
     */
    toggleTrack(type: TrackKind): void;
    /**
     * Add track to connection
     * @param rtcPeerConnection
     * @returns
     */
    addTrackToConnection(participant: Participant): void;
    /**
     * Get tracks
     * @description Get tracks of participant (Only local participant)
     * @returns Track[]
     */
    get getTracks(): Track[];
    /**
     * Get source
     * @description Get element source for track
     * @param track Track
     * @returns HTMLVideoElement | HTMLAudioElement | undefined
     */
    getSource(track: Track): HTMLVideoElement | HTMLAudioElement | undefined;
    /**
     * Random id
     * @description Random id
     * @returns string
     */
    private randomId;
    /**
     * Handle track ended
     * @param track Track
     */
    private handleTrackEnded;
}
