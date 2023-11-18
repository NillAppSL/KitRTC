import { TrackKind } from "../interfaces/tracks";
import { LoggerColors } from "../interfaces/logger";
import { Logger } from "./logger";
/**
 * Local tracks
 * @description Local tracks for participant
 */
export class LocalTracks extends Logger {
    constructor(kitRtc, participant) {
        super();
        this.kitRtc = kitRtc;
        /**
         * Random id for track
         * @description Random id for track
         */
        this.id = this.randomId();
        this.participant = participant;
    }
    /**
     * Create local tracks
     * @description Create local tracks
     * @param constraints MediaStreamConstraints for getUserMedia
     * @returns Promise with MediaStream or undefined
     */
    async createLocalTracks(constraints) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            for (const track of stream.getTracks()) {
                this.participant.createTrack(stream, track);
            }
            this.log(LoggerColors.GREEN, { message: "Local tracks created", tracks: this.participant.tracks });
            return stream;
        }
        catch (error) {
            this.log(LoggerColors.RED, { message: "Error creating local tracks", error: error });
            return undefined;
        }
    }
    /**
     * Enable camera and mic
     * @description Enable local camera and mic
     */
    async enableCameraAndMic() {
        try {
            //find track in tracks with filter
            const trackSource = this.participant.tracks.find(track => track.stream.getTracks().find(track => track.kind === TrackKind.VIDEO));
            if (trackSource) {
                trackSource.stream.getTracks().forEach((track) => {
                    if (track.kind === TrackKind.VIDEO || track.kind === TrackKind.AUDIO) {
                        track.enabled = true;
                        this.kitRtc.onUnMuted.next([this.participant, trackSource]);
                    }
                });
                return true;
            }
            //create track
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            for (const track of stream.getTracks()) {
                this.participant.createTrack(stream, track);
            }
            await this.publish();
            return true;
        }
        catch (error) {
            this.log(LoggerColors.RED, { message: "Error enabling camera and mic", error: error });
            return false;
        }
    }
    /**
     * Enable camera
     * @description Enable local camera
     */
    async enableCamera() {
        //find track in tracks with filter
        const trackSource = this.participant.tracks.find(track => track.stream.getTracks().find(track => track.kind === TrackKind.VIDEO));
        if (trackSource) {
            trackSource.stream.getTracks().forEach((track) => {
                if (track.kind === TrackKind.VIDEO) {
                    track.enabled = true;
                    this.kitRtc.onUnMuted.next([this.participant, trackSource]);
                }
            });
            return;
        }
        //create track
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        for (const track of stream.getTracks()) {
            this.participant.createTrack(stream, track);
        }
        await this.publish();
    }
    /**
     * Disable camera
     * @description Disable local camera
     */
    async disableCamera() {
        //find track in tracks with filter
        const trackSource = this.participant.tracks.find(track => track.stream.getTracks().find(track => track.kind === TrackKind.VIDEO));
        if (trackSource) {
            trackSource.stream.getTracks().forEach((track) => {
                if (track.kind === TrackKind.VIDEO) {
                    track.enabled = false;
                    this.kitRtc.onMuted.next([this.participant, trackSource]);
                }
            });
        }
    }
    /**
     * Toogle camera
     * @description Toogle local camera
     */
    async toogleCamera() {
        try {
            const trackSource = this.participant.tracks.find(track => track.kind === TrackKind.VIDEO);
            if (trackSource) {
                trackSource.stream.getVideoTracks().forEach((track) => {
                    if (track.kind === TrackKind.VIDEO) {
                        track.enabled = !track.enabled;
                        if (track.enabled) {
                            this.kitRtc.onUnMuted.next([this.participant, trackSource]);
                        }
                        else {
                            this.kitRtc.onMuted.next([this.participant, trackSource]);
                        }
                    }
                });
                return true;
            }
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            for (const track of stream.getTracks()) {
                this.participant.createTrack(stream, track);
            }
            await this.publish();
            return true;
        }
        catch (error) {
            this.log(LoggerColors.RED, { message: "Error toogle camera", error: error });
            return false;
        }
    }
    /**
     * Enable mic
     * @description Enable local mic
     */
    async enableMic() {
        try {
            const trackSource = this.participant.tracks.find(track => track.stream.getTracks().find(track => track.kind === TrackKind.AUDIO));
            if (trackSource) {
                trackSource.stream.getTracks().forEach((track) => {
                    if (track.kind === TrackKind.AUDIO) {
                        track.enabled = true;
                        this.kitRtc.onUnMuted.next([this.participant, trackSource]);
                    }
                });
                return;
            }
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            for (const track of stream.getTracks()) {
                this.participant.createTrack(stream, track);
            }
            await this.publish();
        }
        catch (error) {
            this.log(LoggerColors.RED, { message: "Error enabling mic", error: error });
        }
    }
    /**
     * Disable mic
     * @description Disable local mic
     */
    async disableMic() {
        try {
            //find track in tracks with filter
            const trackSource = this.participant.tracks.find(track => track.stream.getTracks().find(track => track.kind === TrackKind.AUDIO));
            if (trackSource) {
                trackSource.stream.getTracks().forEach((track) => {
                    if (track.kind === TrackKind.AUDIO) {
                        track.enabled = false;
                        this.kitRtc.onMuted.next([this.participant, trackSource]);
                    }
                });
            }
        }
        catch (error) {
            this.log(LoggerColors.RED, { message: "Error disabling mic", error: error });
        }
    }
    /**
     * Toogle mic
     * @description Toogle local mic
     */
    async toogleMic() {
        try {
            const trackSource = this.participant.tracks.find(track => track.kind === TrackKind.AUDIO);
            if (trackSource) {
                trackSource.stream.getAudioTracks().forEach((track) => {
                    if (track.kind === TrackKind.AUDIO) {
                        track.enabled = !track.enabled;
                        if (track.enabled) {
                            this.kitRtc.onUnMuted.next([this.participant, trackSource]);
                        }
                        else {
                            this.kitRtc.onMuted.next([this.participant, trackSource]);
                        }
                    }
                });
                return;
            }
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            for (const track of stream.getTracks()) {
                this.participant.createTrack(stream, track);
            }
            await this.publish();
        }
        catch (error) {
            this.log(LoggerColors.RED, { message: "Error toogle mic", error: error });
        }
    }
    /**
     * Publish tracks
     * @description Publish tracks to all participants (Only local participant)
     */
    async publish() {
        if (!this.participant.local) {
            return;
        }
        try {
            for (const participant of this.kitRtc.participants) {
                const senders = participant.rtcPeerConnection?.getSenders();
                for (const track of this.participant.tracks) {
                    const mediaTrack = track;
                    if (senders) {
                        const sender = senders.find((sender) => {
                            return sender.track?.id === mediaTrack.id;
                        });
                        if (sender) {
                            this.log(LoggerColors.YELLOW, { message: "Track is already published", track: track });
                            continue;
                        }
                    }
                    participant.rtcPeerConnection?.addTrack(mediaTrack.track, track.stream);
                }
                participant.createOffer();
            }
        }
        catch (error) {
            this.log(LoggerColors.RED, { message: "Error publishing tracks", error: error });
        }
    }
    /**
     * Unpublish tracks (Only local participant)
     * @description Unpublish tracks to all participants
     * @param removeLocalTracks remove local tracks
     * @returns
     */
    async unpublish(removeLocalTracks = true) {
        if (!this.participant.local) {
            return;
        }
        //remove track from connection
        for (const track of this.participant.tracks) {
            const mediaTrack = track;
            for (const participant of this.kitRtc.participants) {
                const sender = participant.rtcPeerConnection?.getSenders().find(sender => sender.track === mediaTrack.track);
                if (sender) {
                    participant.rtcPeerConnection?.removeTrack(sender);
                }
            }
        }
        //stop tracks
        if (removeLocalTracks)
            this.stopLocalTracks();
    }
    /**
     * Stop local tracks
     * @description Stop local tracks (Only local participant)
     */
    stopLocalTracks() {
        if (!this.participant.local) {
            return;
        }
        this.unpublish(false);
        for (const track of this.participant.tracks) {
            const mediaTrack = track;
            mediaTrack.track.stop();
            this.kitRtc.onRemoveLocalMedia.next([this.participant, mediaTrack]);
        }
        this.participant.tracks = [];
    }
    /**
     * Toggle track
     * @param type track type
     */
    toggleTrack(type) {
        if (!this.participant.local) {
            return;
        }
        //find track
        const trackSource = this.participant.tracks.find(track => track.kind === type);
        if (!trackSource) {
            return;
        }
        trackSource.stream.getTracks().forEach((track) => {
            if (track.kind === type) {
                track.enabled = !track.enabled;
                if (track.enabled) {
                    this.kitRtc.onUnMuted.next([this.participant, trackSource]);
                }
                else {
                    this.kitRtc.onMuted.next([this.participant, trackSource]);
                }
            }
        });
    }
    /**
     * Add track to connection
     * @param rtcPeerConnection
     * @returns
     */
    addTrackToConnection(participant) {
        if (!this.participant.local) {
            return;
        }
        if (this.participant.tracks.length === 0)
            return;
        try {
            for (const track of this.participant.tracks) {
                //for (const mediaTrack of track.tracks) {
                const mediaTrack = track;
                participant.rtcPeerConnection?.addTrack(mediaTrack.track, track.stream);
                //}
            }
            console.log("Add track to connection", this.participant.tracks);
            participant.createOffer();
        }
        catch (error) {
            console.log("Add track to connection error:", error);
        }
    }
    /**
     * Get tracks
     * @description Get tracks of participant (Only local participant)
     * @returns Track[]
     */
    get getTracks() {
        return this.participant.tracks;
    }
    /**
     * Get source
     * @description Get element source for track
     * @param track Track
     * @returns HTMLVideoElement | HTMLAudioElement | undefined
     */
    getSource(track) {
        switch (track?.kind) {
            case TrackKind.AUDIO:
                const audio = document.createElement("audio");
                audio.srcObject = track.stream;
                audio.autoplay = true;
                audio.controls = true;
                audio.muted = false;
                return audio;
            case TrackKind.VIDEO:
                const video = document.createElement("video");
                video.srcObject = track.stream;
                video.autoplay = true;
                video.controls = true;
                video.muted = false;
                video.playsInline = true;
                return video;
        }
        return undefined;
    }
    /**
     * Random id
     * @description Random id
     * @returns string
     */
    randomId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    /**
     * Handle track ended
     * @param track Track
     */
    handleTrackEnded(track) {
        console.log('handleTrackEnded', track);
        this.kitRtc.onRemoveRemoteMedia.next([this.participant, track]);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWx0cmFja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYWtpdGFwcGpzL3NyYy9saWIvY2xhc3MvbG9jYWx0cmFja3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFTLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBSXhELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR2xDOzs7R0FHRztBQUNILE1BQU0sT0FBTyxXQUFZLFNBQVEsTUFBTTtJQWVyQyxZQUNVLE1BQWMsRUFDdEIsV0FBd0I7UUFFeEIsS0FBSyxFQUFFLENBQUM7UUFIQSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBZHhCOzs7V0FHRztRQUNILE9BQUUsR0FBVyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFjM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDakMsQ0FBQztJQUlEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFdBQW9DO1FBQzFELElBQUk7WUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLFNBQVMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztZQUVyRixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzdDO1lBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxD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QUM7Z0JBQ3BCLE9BQU8sS0FBSyxDQUFDO1lBQ2YsS0FBSyxTQUFTLENBQUMsS0FBSztnQkFDbEIsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDOUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUMvQixLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDdEIsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDekIsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBSUQ7Ozs7T0FJRztJQUNLLFFBQVE7UUFDZCxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3BFLENBQUM7SUFJRDs7O09BR0c7SUFDSyxnQkFBZ0IsQ0FBQyxLQUFZO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztDQUVGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhY2ssIFRyYWNrS2luZCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3RyYWNrc1wiO1xyXG5pbXBvcnQgeyBLaXRSdGMgfSBmcm9tIFwiLi4vc2VydmljZXMva2l0cnRjLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUGFydGljaXBhbnQgfSBmcm9tIFwiLi9wYXJ0aWNpcGFudFwiO1xyXG5pbXBvcnQgeyBUcmFja3NFdmVudHMgfSBmcm9tIFwiLi90cmFja3NcIjtcclxuaW1wb3J0IHsgTG9nZ2VyQ29sb3JzIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvbG9nZ2VyXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuL2xvZ2dlclwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBMb2NhbCB0cmFja3NcclxuICogQGRlc2NyaXB0aW9uIExvY2FsIHRyYWNrcyBmb3IgcGFydGljaXBhbnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBMb2NhbFRyYWNrcyBleHRlbmRzIExvZ2dlcntcclxuXHJcbiAgLyoqXHJcbiAgICogUmFuZG9tIGlkIGZvciB0cmFja1xyXG4gICAqIEBkZXNjcmlwdGlvbiBSYW5kb20gaWQgZm9yIHRyYWNrXHJcbiAgICovXHJcbiAgaWQ6IHN0cmluZyA9IHRoaXMucmFuZG9tSWQoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogUGFydGljaXBhbnQgZm9yIHRyYWNrXHJcbiAgICogQGRlc2NyaXB0aW9uIFBhcnRpY2lwYW50IG93bmVyIG9mIHRyYWNrXHJcbiAgICovXHJcbiAgcGFydGljaXBhbnQ6IFBhcnRpY2lwYW50O1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGtpdFJ0YzogS2l0UnRjLFxyXG4gICAgcGFydGljaXBhbnQ6IFBhcnRpY2lwYW50XHJcbiAgICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnBhcnRpY2lwYW50ID0gcGFydGljaXBhbnQ7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBsb2NhbCB0cmFja3NcclxuICAgKiBAZGVzY3JpcHRpb24gQ3JlYXRlIGxvY2FsIHRyYWNrc1xyXG4gICAqIEBwYXJhbSBjb25zdHJhaW50cyBNZWRpYVN0cmVhbUNvbnN0cmFpbnRzIGZvciBnZXRVc2VyTWVkaWFcclxuICAgKiBAcmV0dXJucyBQcm9taXNlIHdpdGggTWVkaWFTdHJlYW0gb3IgdW5kZWZpbmVkXHJcbiAgICovXHJcbiAgYXN5bmMgY3JlYXRlTG9jYWxUcmFja3MoY29uc3RyYWludHM/OiBNZWRpYVN0cmVhbUNvbnN0cmFpbnRzKTogUHJvbWlzZTxNZWRpYVN0cmVhbSB8IHVuZGVmaW5lZD57XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBzdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7YXVkaW86IHRydWUsIHZpZGVvOiB0cnVlfSk7XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IHRyYWNrIG9mIHN0cmVhbS5nZXRUcmFja3MoKSkge1xyXG4gICAgICAgIHRoaXMucGFydGljaXBhbnQuY3JlYXRlVHJhY2soc3RyZWFtLCB0cmFjayk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMubG9nKExvZ2dlckNvbG9ycy5HUkVFTiwgeyBtZXNzYWdlOiBcIkxvY2FsIHRyYWNrcyBjcmVhdGVkXCIsIHRyYWNrczogdGhpcy5wYXJ0aWNpcGFudC50cmFja3MgfSk7XHJcblxyXG4gICAgICByZXR1cm4gc3RyZWFtO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgdGhpcy5sb2coTG9nZ2VyQ29sb3JzLlJFRCwgeyBtZXNzYWdlOiBcIkVycm9yIGNyZWF0aW5nIGxvY2FsIHRyYWNrc1wiLCBlcnJvcjogZXJyb3IgfSk7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSBjYW1lcmEgYW5kIG1pY1xyXG4gICAqIEBkZXNjcmlwdGlvbiBFbmFibGUgbG9jYWwgY2FtZXJhIGFuZCBtaWNcclxuICAgKi9cclxuICBhc3luYyBlbmFibGVDYW1lcmFBbmRNaWMoKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvL2ZpbmQgdHJhY2sgaW4gdHJhY2tzIHdpdGggZmlsdGVyXHJcbiAgICAgIGNvbnN0IHRyYWNrU291cmNlID0gdGhpcy5wYXJ0aWNpcGFudC50cmFja3MuZmluZCh0cmFjayA9PiB0cmFjay5zdHJlYW0uZ2V0VHJhY2tzKCkuZmluZCh0cmFjayA9PiB0cmFjay5raW5kID09PSBUcmFja0tpbmQuVklERU8pKTtcclxuICAgICAgaWYgKHRyYWNrU291cmNlKSB7XHJcbiAgICAgICAgdHJhY2tTb3VyY2Uuc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB7XHJcbiAgICAgICAgICBpZiAodHJhY2sua2luZCA9PT0gVHJhY2tLaW5kLlZJREVPIHx8IHRyYWNrLmtpbmQgPT09IFRyYWNrS2luZC5BVURJTykge1xyXG4gICAgICAgICAgICB0cmFjay5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5raXRSdGMub25Vbk11dGVkLm5leHQoW3RoaXMucGFydGljaXBhbnQsIHRyYWNrU291cmNlXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vY3JlYXRlIHRyYWNrXHJcbiAgICAgIGNvbnN0IHN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHsgdmlkZW86IHRydWUsIGF1ZGlvOiB0cnVlIH0pO1xyXG5cclxuICAgICAgZm9yIChjb25zdCB0cmFjayBvZiBzdHJlYW0uZ2V0VHJhY2tzKCkpIHtcclxuICAgICAgICB0aGlzLnBhcnRpY2lwYW50LmNyZWF0ZVRyYWNrKHN0cmVhbSwgdHJhY2spO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhd2FpdCB0aGlzLnB1Ymxpc2goKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aGlzLmxvZyhMb2dnZXJDb2xvcnMuUkVELCB7IG1lc3NhZ2U6IFwiRXJyb3IgZW5hYmxpbmcgY2FtZXJhIGFuZCBtaWNcIiwgZXJyb3I6IGVycm9yIH0pO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogRW5hYmxlIGNhbWVyYVxyXG4gICAqIEBkZXNjcmlwdGlvbiBFbmFibGUgbG9jYWwgY2FtZXJhXHJcbiAgICovXHJcbiAgYXN5bmMgZW5hYmxlQ2FtZXJhKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgLy9maW5kIHRyYWNrIGluIHRyYWNrcyB3aXRoIGZpbHRlclxyXG4gICAgY29uc3QgdHJhY2tTb3VyY2UgPSB0aGlzLnBhcnRpY2lwYW50LnRyYWNrcy5maW5kKHRyYWNrID0+IHRyYWNrLnN0cmVhbS5nZXRUcmFja3MoKS5maW5kKHRyYWNrID0+IHRyYWNrLmtpbmQgPT09IFRyYWNrS2luZC5WSURFTykpO1xyXG4gICAgaWYgKHRyYWNrU291cmNlKSB7XHJcbiAgICAgIHRyYWNrU291cmNlLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKCh0cmFjaykgPT4ge1xyXG4gICAgICAgIGlmICh0cmFjay5raW5kID09PSBUcmFja0tpbmQuVklERU8pIHtcclxuICAgICAgICAgIHRyYWNrLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5raXRSdGMub25Vbk11dGVkLm5leHQoW3RoaXMucGFydGljaXBhbnQsIHRyYWNrU291cmNlXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY3JlYXRlIHRyYWNrXHJcbiAgICBjb25zdCBzdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7IHZpZGVvOiB0cnVlIH0pO1xyXG5cclxuICAgIGZvciAoY29uc3QgdHJhY2sgb2Ygc3RyZWFtLmdldFRyYWNrcygpKSB7XHJcbiAgICAgIHRoaXMucGFydGljaXBhbnQuY3JlYXRlVHJhY2soc3RyZWFtLCB0cmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgYXdhaXQgdGhpcy5wdWJsaXNoKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzYWJsZSBjYW1lcmFcclxuICAgKiBAZGVzY3JpcHRpb24gRGlzYWJsZSBsb2NhbCBjYW1lcmFcclxuICAgKi9cclxuICBhc3luYyBkaXNhYmxlQ2FtZXJhKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgLy9maW5kIHRyYWNrIGluIHRyYWNrcyB3aXRoIGZpbHRlclxyXG4gICAgY29uc3QgdHJhY2tTb3VyY2UgPSB0aGlzLnBhcnRpY2lwYW50LnRyYWNrcy5maW5kKHRyYWNrID0+IHRyYWNrLnN0cmVhbS5nZXRUcmFja3MoKS5maW5kKHRyYWNrID0+IHRyYWNrLmtpbmQgPT09IFRyYWNrS2luZC5WSURFTykpO1xyXG4gICAgaWYgKHRyYWNrU291cmNlKSB7XHJcbiAgICAgIHRyYWNrU291cmNlLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKCh0cmFjaykgPT4ge1xyXG4gICAgICAgIGlmICh0cmFjay5raW5kID09PSBUcmFja0tpbmQuVklERU8pIHtcclxuICAgICAgICAgIHRyYWNrLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMua2l0UnRjLm9uTXV0ZWQubmV4dChbdGhpcy5wYXJ0aWNpcGFudCwgdHJhY2tTb3VyY2VdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFRvb2dsZSBjYW1lcmFcclxuICAgKiBAZGVzY3JpcHRpb24gVG9vZ2xlIGxvY2FsIGNhbWVyYVxyXG4gICAqL1xyXG4gIGFzeW5jIHRvb2dsZUNhbWVyYSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIHRyeSB7XHJcblxyXG4gICAgICBjb25zdCB0cmFja1NvdXJjZSA9IHRoaXMucGFydGljaXBhbnQudHJhY2tzLmZpbmQodHJhY2sgPT4gdHJhY2sua2luZCA9PT0gVHJhY2tLaW5kLlZJREVPKTtcclxuICAgICAgaWYgKHRyYWNrU291cmNlKSB7XHJcblxyXG4gICAgICAgIHRyYWNrU291cmNlLnN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB7XHJcbiAgICAgICAgICBpZiAodHJhY2sua2luZCA9PT0gVHJhY2tLaW5kLlZJREVPKSB7XHJcbiAgICAgICAgICAgIHRyYWNrLmVuYWJsZWQgPSAhdHJhY2suZW5hYmxlZDtcclxuICAgICAgICAgICAgaWYodHJhY2suZW5hYmxlZCl7XHJcbiAgICAgICAgICAgICAgdGhpcy5raXRSdGMub25Vbk11dGVkLm5leHQoW3RoaXMucGFydGljaXBhbnQsIHRyYWNrU291cmNlXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5raXRSdGMub25NdXRlZC5uZXh0KFt0aGlzLnBhcnRpY2lwYW50LCB0cmFja1NvdXJjZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBzdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7IHZpZGVvOiB0cnVlIH0pO1xyXG4gICAgICBmb3IgKGNvbnN0IHRyYWNrIG9mIHN0cmVhbS5nZXRUcmFja3MoKSkge1xyXG4gICAgICAgIHRoaXMucGFydGljaXBhbnQuY3JlYXRlVHJhY2soc3RyZWFtLCB0cmFjayk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGF3YWl0IHRoaXMucHVibGlzaCgpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRoaXMubG9nKExvZ2dlckNvbG9ycy5SRUQsIHsgbWVzc2FnZTogXCJFcnJvciB0b29nbGUgY2FtZXJhXCIsIGVycm9yOiBlcnJvciB9KTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSBtaWNcclxuICAgKiBAZGVzY3JpcHRpb24gRW5hYmxlIGxvY2FsIG1pY1xyXG4gICAqL1xyXG4gIGFzeW5jIGVuYWJsZU1pYygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHRyYWNrU291cmNlID0gdGhpcy5wYXJ0aWNpcGFudC50cmFja3MuZmluZCh0cmFjayA9PiB0cmFjay5zdHJlYW0uZ2V0VHJhY2tzKCkuZmluZCh0cmFjayA9PiB0cmFjay5raW5kID09PSBUcmFja0tpbmQuQVVESU8pKTtcclxuXHJcbiAgICAgIGlmICh0cmFja1NvdXJjZSkge1xyXG4gICAgICAgIHRyYWNrU291cmNlLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKCh0cmFjaykgPT4ge1xyXG4gICAgICAgICAgaWYgKHRyYWNrLmtpbmQgPT09IFRyYWNrS2luZC5BVURJTykge1xyXG4gICAgICAgICAgICB0cmFjay5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5raXRSdGMub25Vbk11dGVkLm5leHQoW3RoaXMucGFydGljaXBhbnQsIHRyYWNrU291cmNlXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBzdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlIH0pO1xyXG5cclxuICAgICAgZm9yIChjb25zdCB0cmFjayBvZiBzdHJlYW0uZ2V0VHJhY2tzKCkpIHtcclxuICAgICAgICB0aGlzLnBhcnRpY2lwYW50LmNyZWF0ZVRyYWNrKHN0cmVhbSwgdHJhY2spO1xyXG4gICAgICB9XHJcbiAgICAgIGF3YWl0IHRoaXMucHVibGlzaCgpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgdGhpcy5sb2coTG9nZ2VyQ29sb3JzLlJFRCwgeyBtZXNzYWdlOiBcIkVycm9yIGVuYWJsaW5nIG1pY1wiLCBlcnJvcjogZXJyb3IgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzYWJsZSBtaWNcclxuICAgKiBAZGVzY3JpcHRpb24gRGlzYWJsZSBsb2NhbCBtaWNcclxuICAgKi9cclxuICBhc3luYyBkaXNhYmxlTWljKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy9maW5kIHRyYWNrIGluIHRyYWNrcyB3aXRoIGZpbHRlclxyXG4gICAgICBjb25zdCB0cmFja1NvdXJjZSA9IHRoaXMucGFydGljaXBhbnQudHJhY2tzLmZpbmQodHJhY2sgPT4gdHJhY2suc3RyZWFtLmdldFRyYWNrcygpLmZpbmQodHJhY2sgPT4gdHJhY2sua2luZCA9PT0gVHJhY2tLaW5kLkFVRElPKSk7XHJcbiAgICAgIGlmICh0cmFja1NvdXJjZSkge1xyXG4gICAgICAgIHRyYWNrU291cmNlLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKCh0cmFjaykgPT4ge1xyXG4gICAgICAgICAgaWYgKHRyYWNrLmtpbmQgPT09IFRyYWNrS2luZC5BVURJTykge1xyXG4gICAgICAgICAgICB0cmFjay5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMua2l0UnRjLm9uTXV0ZWQubmV4dChbdGhpcy5wYXJ0aWNpcGFudCwgdHJhY2tTb3VyY2VdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgdGhpcy5sb2coTG9nZ2VyQ29sb3JzLlJFRCwgeyBtZXNzYWdlOiBcIkVycm9yIGRpc2FibGluZyBtaWNcIiwgZXJyb3I6IGVycm9yIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFRvb2dsZSBtaWNcclxuICAgKiBAZGVzY3JpcHRpb24gVG9vZ2xlIGxvY2FsIG1pY1xyXG4gICAqL1xyXG4gIGFzeW5jIHRvb2dsZU1pYygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHRyeSB7XHJcblxyXG4gICAgICBjb25zdCB0cmFja1NvdXJjZSA9IHRoaXMucGFydGljaXBhbnQudHJhY2tzLmZpbmQodHJhY2sgPT4gdHJhY2sua2luZCA9PT0gVHJhY2tLaW5kLkFVRElPKTtcclxuICAgICAgaWYgKHRyYWNrU291cmNlKSB7XHJcblxyXG4gICAgICAgIHRyYWNrU291cmNlLnN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB7XHJcbiAgICAgICAgICBpZiAodHJhY2sua2luZCA9PT0gVHJhY2tLaW5kLkFVRElPKSB7XHJcbiAgICAgICAgICAgIHRyYWNrLmVuYWJsZWQgPSAhdHJhY2suZW5hYmxlZDtcclxuICAgICAgICAgICAgaWYodHJhY2suZW5hYmxlZCl7XHJcbiAgICAgICAgICAgICAgdGhpcy5raXRSdGMub25Vbk11dGVkLm5leHQoW3RoaXMucGFydGljaXBhbnQsIHRyYWNrU291cmNlXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5raXRSdGMub25NdXRlZC5uZXh0KFt0aGlzLnBhcnRpY2lwYW50LCB0cmFja1NvdXJjZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgc3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoeyBhdWRpbzogdHJ1ZSB9KTtcclxuICAgICAgZm9yIChjb25zdCB0cmFjayBvZiBzdHJlYW0uZ2V0VHJhY2tzKCkpIHtcclxuICAgICAgICB0aGlzLnBhcnRpY2lwYW50LmNyZWF0ZVRyYWNrKHN0cmVhbSwgdHJhY2spO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhd2FpdCB0aGlzLnB1Ymxpc2goKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRoaXMubG9nKExvZ2dlckNvbG9ycy5SRUQsIHsgbWVzc2FnZTogXCJFcnJvciB0b29nbGUgbWljXCIsIGVycm9yOiBlcnJvciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogUHVibGlzaCB0cmFja3NcclxuICAgKiBAZGVzY3JpcHRpb24gUHVibGlzaCB0cmFja3MgdG8gYWxsIHBhcnRpY2lwYW50cyAoT25seSBsb2NhbCBwYXJ0aWNpcGFudClcclxuICAgKi9cclxuICBhc3luYyBwdWJsaXNoKCk6IFByb21pc2U8dm9pZD57XHJcbiAgICBpZighdGhpcy5wYXJ0aWNpcGFudC5sb2NhbCl7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBmb3IgKGNvbnN0IHBhcnRpY2lwYW50IG9mIHRoaXMua2l0UnRjLnBhcnRpY2lwYW50cykge1xyXG4gICAgICAgIGNvbnN0IHNlbmRlcnMgPSBwYXJ0aWNpcGFudC5ydGNQZWVyQ29ubmVjdGlvbj8uZ2V0U2VuZGVycygpXHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgdHJhY2sgb2YgdGhpcy5wYXJ0aWNpcGFudC50cmFja3MpIHtcclxuICAgICAgICAgIGNvbnN0IG1lZGlhVHJhY2sgPSB0cmFjaztcclxuICAgICAgICAgIGlmKHNlbmRlcnMpe1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2VuZGVyID0gc2VuZGVycy5maW5kKChzZW5kZXIpID0+IHtcclxuICAgICAgICAgICAgICByZXR1cm4gc2VuZGVyLnRyYWNrPy5pZCA9PT0gbWVkaWFUcmFjay5pZDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZihzZW5kZXIpe1xyXG4gICAgICAgICAgICAgIHRoaXMubG9nKExvZ2dlckNvbG9ycy5ZRUxMT1csIHsgbWVzc2FnZTogXCJUcmFjayBpcyBhbHJlYWR5IHB1Ymxpc2hlZFwiLCB0cmFjazogdHJhY2sgfSk7XHJcbiAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBwYXJ0aWNpcGFudC5ydGNQZWVyQ29ubmVjdGlvbj8uYWRkVHJhY2sobWVkaWFUcmFjay50cmFjaywgdHJhY2suc3RyZWFtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBhcnRpY2lwYW50LmNyZWF0ZU9mZmVyKCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRoaXMubG9nKExvZ2dlckNvbG9ycy5SRUQsIHsgbWVzc2FnZTogXCJFcnJvciBwdWJsaXNoaW5nIHRyYWNrc1wiLCBlcnJvcjogZXJyb3IgfSk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcblxyXG5cclxuICAvKipcclxuICAgKiBVbnB1Ymxpc2ggdHJhY2tzIChPbmx5IGxvY2FsIHBhcnRpY2lwYW50KVxyXG4gICAqIEBkZXNjcmlwdGlvbiBVbnB1Ymxpc2ggdHJhY2tzIHRvIGFsbCBwYXJ0aWNpcGFudHNcclxuICAgKiBAcGFyYW0gcmVtb3ZlTG9jYWxUcmFja3MgcmVtb3ZlIGxvY2FsIHRyYWNrc1xyXG4gICAqIEByZXR1cm5zXHJcbiAgICovXHJcbiAgYXN5bmMgdW5wdWJsaXNoKHJlbW92ZUxvY2FsVHJhY2tzOiBib29sZWFuID0gdHJ1ZSk6IFByb21pc2U8dm9pZD57XHJcbiAgICBpZighdGhpcy5wYXJ0aWNpcGFudC5sb2NhbCl7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy9yZW1vdmUgdHJhY2sgZnJvbSBjb25uZWN0aW9uXHJcbiAgICBmb3IgKGNvbnN0IHRyYWNrIG9mIHRoaXMucGFydGljaXBhbnQudHJhY2tzKSB7XHJcbiAgICAgICAgY29uc3QgbWVkaWFUcmFjayA9IHRyYWNrO1xyXG4gICAgICAgIGZvciAoY29uc3QgcGFydGljaXBhbnQgb2YgdGhpcy5raXRSdGMucGFydGljaXBhbnRzKSB7XHJcbiAgICAgICAgICBjb25zdCBzZW5kZXIgPSBwYXJ0aWNpcGFudC5ydGNQZWVyQ29ubmVjdGlvbj8uZ2V0U2VuZGVycygpLmZpbmQoc2VuZGVyID0+IHNlbmRlci50cmFjayA9PT0gbWVkaWFUcmFjay50cmFjayk7XHJcbiAgICAgICAgICBpZiAoc2VuZGVyKSB7XHJcbiAgICAgICAgICAgIHBhcnRpY2lwYW50LnJ0Y1BlZXJDb25uZWN0aW9uPy5yZW1vdmVUcmFjayhzZW5kZXIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy9zdG9wIHRyYWNrc1xyXG4gICAgaWYgKHJlbW92ZUxvY2FsVHJhY2tzKSB0aGlzLnN0b3BMb2NhbFRyYWNrcygpO1xyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBsb2NhbCB0cmFja3NcclxuICAgKiBAZGVzY3JpcHRpb24gU3RvcCBsb2NhbCB0cmFja3MgKE9ubHkgbG9jYWwgcGFydGljaXBhbnQpXHJcbiAgICovXHJcbiAgc3RvcExvY2FsVHJhY2tzKCk6IHZvaWR7XHJcblxyXG4gICAgaWYoIXRoaXMucGFydGljaXBhbnQubG9jYWwpe1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51bnB1Ymxpc2goZmFsc2UpO1xyXG5cclxuICAgIGZvciAoY29uc3QgdHJhY2sgb2YgdGhpcy5wYXJ0aWNpcGFudC50cmFja3MpIHtcclxuICAgICAgICBjb25zdCBtZWRpYVRyYWNrID0gdHJhY2s7XHJcbiAgICAgICAgbWVkaWFUcmFjay50cmFjay5zdG9wKCk7XHJcbiAgICAgICAgdGhpcy5raXRSdGMub25SZW1vdmVMb2NhbE1lZGlhLm5leHQoW3RoaXMucGFydGljaXBhbnQsIG1lZGlhVHJhY2tdKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdGhpcy5wYXJ0aWNpcGFudC50cmFja3MgPSBbXTtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlIHRyYWNrXHJcbiAgICogQHBhcmFtIHR5cGUgdHJhY2sgdHlwZVxyXG4gICAqL1xyXG4gIHRvZ2dsZVRyYWNrKHR5cGU6IFRyYWNrS2luZCkge1xyXG4gICAgaWYoIXRoaXMucGFydGljaXBhbnQubG9jYWwpe1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy9maW5kIHRyYWNrXHJcbiAgICBjb25zdCB0cmFja1NvdXJjZSA9IHRoaXMucGFydGljaXBhbnQudHJhY2tzLmZpbmQodHJhY2sgPT4gdHJhY2sua2luZCA9PT0gdHlwZSk7XHJcblxyXG4gICAgaWYoIXRyYWNrU291cmNlKXtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYWNrU291cmNlLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKCh0cmFjaykgPT4ge1xyXG4gICAgICAgIGlmICh0cmFjay5raW5kID09PSB0eXBlKSB7XHJcbiAgICAgICAgICB0cmFjay5lbmFibGVkID0gIXRyYWNrLmVuYWJsZWQ7XHJcbiAgICAgICAgICBpZih0cmFjay5lbmFibGVkKXtcclxuICAgICAgICAgICAgdGhpcy5raXRSdGMub25Vbk11dGVkLm5leHQoW3RoaXMucGFydGljaXBhbnQsIHRyYWNrU291cmNlXSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmtpdFJ0Yy5vbk11dGVkLm5leHQoW3RoaXMucGFydGljaXBhbnQsIHRyYWNrU291cmNlXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuICAvKipcclxuICAgKiBBZGQgdHJhY2sgdG8gY29ubmVjdGlvblxyXG4gICAqIEBwYXJhbSBydGNQZWVyQ29ubmVjdGlvblxyXG4gICAqIEByZXR1cm5zXHJcbiAgICovXHJcbiAgYWRkVHJhY2tUb0Nvbm5lY3Rpb24ocGFydGljaXBhbnQ6IFBhcnRpY2lwYW50KTogdm9pZHtcclxuICAgIGlmKCF0aGlzLnBhcnRpY2lwYW50LmxvY2FsKXtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYodGhpcy5wYXJ0aWNpcGFudC50cmFja3MubGVuZ3RoID09PSAwKSByZXR1cm47XHJcbiAgICB0cnkge1xyXG4gICAgICBmb3IgKGNvbnN0IHRyYWNrIG9mIHRoaXMucGFydGljaXBhbnQudHJhY2tzKSB7XHJcbiAgICAgICAgLy9mb3IgKGNvbnN0IG1lZGlhVHJhY2sgb2YgdHJhY2sudHJhY2tzKSB7XHJcbiAgICAgICAgICBjb25zdCBtZWRpYVRyYWNrID0gdHJhY2s7XHJcbiAgICAgICAgICBwYXJ0aWNpcGFudC5ydGNQZWVyQ29ubmVjdGlvbj8uYWRkVHJhY2sobWVkaWFUcmFjay50cmFjaywgdHJhY2suc3RyZWFtKTtcclxuICAgICAgICAvL31cclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhcIkFkZCB0cmFjayB0byBjb25uZWN0aW9uXCIsIHRoaXMucGFydGljaXBhbnQudHJhY2tzKTtcclxuICAgICAgcGFydGljaXBhbnQuY3JlYXRlT2ZmZXIoKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiQWRkIHRyYWNrIHRvIGNvbm5lY3Rpb24gZXJyb3I6XCIsIGVycm9yKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdHJhY2tzXHJcbiAgICogQGRlc2NyaXB0aW9uIEdldCB0cmFja3Mgb2YgcGFydGljaXBhbnQgKE9ubHkgbG9jYWwgcGFydGljaXBhbnQpXHJcbiAgICogQHJldHVybnMgVHJhY2tbXVxyXG4gICAqL1xyXG4gIGdldCBnZXRUcmFja3MoKTogVHJhY2tbXXtcclxuICAgIHJldHVybiB0aGlzLnBhcnRpY2lwYW50LnRyYWNrcztcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBHZXQgc291cmNlXHJcbiAgICogQGRlc2NyaXB0aW9uIEdldCBlbGVtZW50IHNvdXJjZSBmb3IgdHJhY2tcclxuICAgKiBAcGFyYW0gdHJhY2sgVHJhY2tcclxuICAgKiBAcmV0dXJucyBIVE1MVmlkZW9FbGVtZW50IHwgSFRNTEF1ZGlvRWxlbWVudCB8IHVuZGVmaW5lZFxyXG4gICAqL1xyXG4gIGdldFNvdXJjZSh0cmFjazogVHJhY2spOiBIVE1MVmlkZW9FbGVtZW50IHwgSFRNTEF1ZGlvRWxlbWVudCB8IHVuZGVmaW5lZHtcclxuICAgIHN3aXRjaCh0cmFjaz8ua2luZCl7XHJcbiAgICAgIGNhc2UgVHJhY2tLaW5kLkFVRElPOlxyXG4gICAgICAgIGNvbnN0IGF1ZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImF1ZGlvXCIpO1xyXG4gICAgICAgIGF1ZGlvLnNyY09iamVjdCA9IHRyYWNrLnN0cmVhbTtcclxuICAgICAgICBhdWRpby5hdXRvcGxheSA9IHRydWU7XHJcbiAgICAgICAgYXVkaW8uY29udHJvbHMgPSB0cnVlO1xyXG4gICAgICAgIGF1ZGlvLm11dGVkID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIGF1ZGlvO1xyXG4gICAgICBjYXNlIFRyYWNrS2luZC5WSURFTzpcclxuICAgICAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ2aWRlb1wiKTtcclxuICAgICAgICB2aWRlby5zcmNPYmplY3QgPSB0cmFjay5zdHJlYW07XHJcbiAgICAgICAgdmlkZW8uYXV0b3BsYXkgPSB0cnVlO1xyXG4gICAgICAgIHZpZGVvLmNvbnRyb2xzID0gdHJ1ZTtcclxuICAgICAgICB2aWRlby5tdXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHZpZGVvLnBsYXlzSW5saW5lID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdmlkZW87XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICAvKipcclxuICAgKiBSYW5kb20gaWRcclxuICAgKiBAZGVzY3JpcHRpb24gUmFuZG9tIGlkXHJcbiAgICogQHJldHVybnMgc3RyaW5nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByYW5kb21JZCgpOiBzdHJpbmd7XHJcbiAgICByZXR1cm4gYCR7RGF0ZS5ub3coKX0tJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSl9YDtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIHRyYWNrIGVuZGVkXHJcbiAgICogQHBhcmFtIHRyYWNrIFRyYWNrXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBoYW5kbGVUcmFja0VuZGVkKHRyYWNrOiBUcmFjayk6IHZvaWR7XHJcbiAgICBjb25zb2xlLmxvZygnaGFuZGxlVHJhY2tFbmRlZCcsIHRyYWNrKTtcclxuICAgIHRoaXMua2l0UnRjLm9uUmVtb3ZlUmVtb3RlTWVkaWEubmV4dChbdGhpcy5wYXJ0aWNpcGFudCwgdHJhY2tdKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==