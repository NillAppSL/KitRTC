import { TracksEvents } from "../class/tracks";
/**
 * Track kind enum
 * @description The kind of track
 */
export declare enum TrackKind {
    AUDIO = "audio",
    VIDEO = "video"
}
/**
 * Track interface
 * @description The track interface
 */
export interface Track {
    /**
     * Track kind
     * @description Track kind
     */
    kind: TrackKind;
    /**
     * Track id
     * @description Track id
     */
    id: string;
    /**
     * Track id
     * @description Track id
     */
    trackId: string;
    /**
     * Track label
     * @description Track label
     */
    label: string;
    /**
     * Track stream
     * @description MediaStream
     */
    stream: MediaStream;
    /**
     * Track
     * @description MediaStreamTrack
     */
    track: MediaStreamTrack;
    /**
     * Participant id
     * @description Participant id
     */
    participantId: string;
    /**
     * Get auto source
     * @description Get auto source from <kitrtc-track />
     */
    getAutoSource?: HTMLVideoElement | HTMLAudioElement | undefined;
    /**
     * Track component
     * @description Track component
     */
    trackComponent?: any;
    /**
     * Track events
     * @description Track events
     */
    trackEvents?: TracksEvents;
    /**
     * Get source
     * @description Generate source from track
     */
    getSource: () => HTMLVideoElement | HTMLAudioElement | undefined;
}
/**
 * Media options interface
 * @description The media options interface
 */
export interface MediaOptions {
    video?: {
        maxBitrate?: number;
    };
    audio?: {
        maxBitrate?: number;
    };
}
/**
 * Tracks events interface
 * @description The tracks events interface
 */
export interface TracksEventsConstructorOptions {
    MediaStream: MediaStream;
    RTCTrackEvent?: RTCTrackEvent;
}
