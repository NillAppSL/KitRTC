import { Track, TracksEventsConstructorOptions } from "../interfaces/tracks";
import { Participant } from "./participant";
/**
 * TracksEvents
 * @description Tracks events control
 */
export declare class TracksEvents {
    /**
     * Id
     * @description Id for track event
     */
    id: string;
    /**
     * Participant
     * @description Participant
     */
    participant: Participant;
    /**
     * Stream
     * @description Stream
     */
    stream: MediaStream;
    /**
     * RTCTrackEvent
     * @description RTCTrackEvent
     */
    RTCTrackEvent?: RTCTrackEvent;
    /**
     * Logger
     * @description Logger for track events
     */
    private logger;
    constructor(constructorOptions: TracksEventsConstructorOptions, participant: Participant);
    /**
     * Random id
     * @returns generate random id
     */
    private randomId;
    /**
     * Handle track ended
     * @param mediaStreamTrackEvent
     */
    private handleTrackEnded;
    /**
     * Get source from track
     * @param track is track for get source
     * @returns
     */
    getSource(track: Track): HTMLVideoElement | HTMLAudioElement | undefined;
    /**
     * Remove all tracks events
     * @description Remove all tracks events
     */
    removeAllTracksEvents(): void;
}
