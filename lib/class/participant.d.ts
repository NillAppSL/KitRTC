import { Track } from "../interfaces/tracks";
import { KitRtc } from "../services/kitrtc.service";
import { LocalTracks } from "./localtracks";
import { Logger } from "./logger";
/**
 * Participant
 * @description Participant from room
 */
export declare class Participant {
    kitRtc: KitRtc;
    private isLocal;
    private autoCreateOffer;
    /**
     * Participant id
     */
    id: string;
    /**
     * Local participant
     */
    local: boolean;
    /**
     * Rtc peer connection
     */
    rtcPeerConnection?: RTCPeerConnection;
    /**
     * Local tracks
     */
    localTracks: LocalTracks;
    /**
     * Tracks
     */
    tracks: Track[];
    /**
     * Logger
     * @description Logger
     */
    protected logger: Logger;
    /**
     * Making offer
     * @description Making offer
     */
    private makingOffer;
    /**
     * Participant constructor
     * @param kitRtc
     * @param id
     * @param isLocal
     * @param autoCreateOffer
     */
    constructor(kitRtc: KitRtc, id: string, isLocal?: boolean, autoCreateOffer?: boolean);
    /**
     * Config webrtc
     * @description Config webrtc
     * @returns Promise<void>
     * @private
     */
    protected configWebRtc(): Promise<void>;
    /**
     * Error handler
     * @param error is error from webrtc
     */
    protected errorHandler(error: any): void;
    /**
     * Created description
     * @description Created description for other participant
     * @param description as RTCSessionDescriptionInit
     * @param type as string (offer|answer)
     */
    protected createdDescription(description: RTCSessionDescriptionInit, type: string): void;
    /**
     * Create offer
     * @description Create offer for other participant
     * @private
     */
    createOffer(): void;
    /**
     * Handle offer
     * @description Handle offer from other participant
     * @param offer offer from other participant
     */
    handleOffer(offer: any): Promise<void>;
    /**
     * Handle answer
     * @description Handle answer from other participant
     * @param answer answer from other participant
     */
    handleAnswer(answer: any): void;
    /**
     * Handle candidate
     * @description Handle candidate from other participant
     * @param event candidate from other participant
     */
    handleCandidate(event: any): void;
    /**
     * Create track
     * @description Create track from stream and add to tracks
     * @param stream stream of track
     * @param rtcTrackEvent track event
     * @param MediaStreamTrack track
     * @returns Track | undefined
     */
    createTrack(stream: MediaStream, rtcTrackEvent?: RTCTrackEvent | MediaStreamTrack): Track | undefined;
    /**
     * Set bitrate
     * @description Set bitrate for video and audio
     * @returns Promise<void>
     */
    protected setBitRate(): Promise<void>;
    /**
     * Get source
     * @description Get source from track
     * @param track track
     * @returns HTMLVideoElement | HTMLAudioElement | undefined
     */
    getSource(track: Track): HTMLVideoElement | HTMLAudioElement | undefined;
    /**
     * Start negotiation
     * @description Start negotiation with other participant
     */
    negotiated(): void;
    /**
     * Close peer connection
     * @description Close peer connection
     */
    close(): void;
    /**
     * Add tracks to peer connection
     * @description Add tracks to peer connection
     */
    private addTracksToPeerConnection;
}
