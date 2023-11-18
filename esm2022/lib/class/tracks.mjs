import { LoggerColors } from "../interfaces/logger";
import { TrackKind } from "../interfaces/tracks";
import { Logger } from "./logger";
/**
 * TracksEvents
 * @description Tracks events control
 */
export class TracksEvents {
    constructor(constructorOptions, participant) {
        /**
         * Id
         * @description Id for track event
         */
        this.id = this.randomId();
        /**
         * Logger
         * @description Logger for track events
         */
        this.logger = new Logger();
        //Remote tracks events
        if (constructorOptions.RTCTrackEvent) {
            this.RTCTrackEvent = constructorOptions.RTCTrackEvent;
            //detect event ended track
            this.RTCTrackEvent.track.onended = (e) => {
                this.logger.log(LoggerColors.YELLOW, { event: 'onended', e });
            };
            this.RTCTrackEvent.track.onmute = (e) => {
                this.logger.log(LoggerColors.YELLOW, { event: 'onended', e });
            };
            this.RTCTrackEvent.track.onunmute = (e) => {
                this.logger.log(LoggerColors.YELLOW, { event: 'onended', e });
            };
            //detect event ended track
            for (const stream of this.RTCTrackEvent.streams) {
                stream.onremovetrack = (e) => {
                    this.logger.log(LoggerColors.YELLOW, { event: 'onremovetrack', e });
                    this.handleTrackEnded(e);
                };
                for (const track of stream.getTracks()) {
                    track.onended = (e) => {
                        this.logger.log(LoggerColors.YELLOW, { event: 'onended', e });
                        const trackEndedEvent = new MediaStreamTrackEvent('ended', { track });
                        this.handleTrackEnded(trackEndedEvent);
                    };
                    track.onmute = (e) => {
                        this.logger.log(LoggerColors.YELLOW, { event: 'onmute', e });
                    };
                    track.onunmute = (e) => {
                        this.logger.log(LoggerColors.YELLOW, { event: 'onunmute', e });
                    };
                }
            }
        }
        this.participant = participant;
        this.stream = constructorOptions.MediaStream;
        //on add track
        this.stream.onaddtrack = (e) => {
            this.logger.log(LoggerColors.YELLOW, { event: 'onaddtrack', e });
        };
        //on remove track
        this.stream.onremovetrack = (e) => {
            this.logger.log(LoggerColors.YELLOW, { event: 'onremovetrack', e });
            this.handleTrackEnded(e);
        };
    }
    /**
     * Random id
     * @returns generate random id
     */
    randomId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    /**
     * Handle track ended
     * @param mediaStreamTrackEvent
     */
    handleTrackEnded(mediaStreamTrackEvent) {
        const trackRemoved = this.participant.tracks.find((track) => track.id === mediaStreamTrackEvent.track.id);
        this.participant.tracks = this.participant.tracks.filter((track) => track.id !== mediaStreamTrackEvent.track.id);
        //emit event
        trackRemoved && this.participant.kitRtc.onRemoveRemoteMedia.next([this.participant, trackRemoved]);
    }
    /**
     * Get source from track
     * @param track is track for get source
     * @returns
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
     * Remove all tracks events
     * @description Remove all tracks events
     */
    removeAllTracksEvents() {
        this.stream.onaddtrack = null;
        this.stream.onremovetrack = null;
        for (const stream of this.stream.getTracks()) {
            stream.onended = null;
            stream.onmute = null;
            stream.onunmute = null;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFraXRhcHBqcy9zcmMvbGliL2NsYXNzL3RyYWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsT0FBTyxFQUFTLFNBQVMsRUFBa0MsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBSWxDOzs7R0FHRztBQUNILE1BQU0sT0FBTyxZQUFZO0lBaUN2QixZQUNFLGtCQUFrRCxFQUNsRCxXQUF3QjtRQWpDMUI7OztXQUdHO1FBQ0gsT0FBRSxHQUFXLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQW9CN0I7OztXQUdHO1FBQ0ssV0FBTSxHQUFXLElBQUksTUFBTSxFQUFFLENBQUM7UUFTcEMsc0JBQXNCO1FBQ3RCLElBQUksa0JBQWtCLENBQUMsYUFBYSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsa0JBQWtCLENBQUMsYUFBYSxDQUFDO1lBRXRELDBCQUEwQjtZQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRSxDQUFDLENBQUE7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZ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QUFDO2dCQUM5QyxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQy9CLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDdEIsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN6QixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFHRDs7O09BR0c7SUFDSCxxQkFBcUI7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUNqQyxLQUFLLE1BQU0sTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDNUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDdEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDckIsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7SUFDSCxDQUFDO0NBR0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXJDb2xvcnMgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9sb2dnZXJcIjtcclxuaW1wb3J0IHsgVHJhY2ssIFRyYWNrS2luZCwgVHJhY2tzRXZlbnRzQ29uc3RydWN0b3JPcHRpb25zIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvdHJhY2tzXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuL2xvZ2dlclwiO1xyXG5pbXBvcnQgeyBQYXJ0aWNpcGFudCB9IGZyb20gXCIuL3BhcnRpY2lwYW50XCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIFRyYWNrc0V2ZW50c1xyXG4gKiBAZGVzY3JpcHRpb24gVHJhY2tzIGV2ZW50cyBjb250cm9sXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVHJhY2tzRXZlbnRzIHtcclxuXHJcbiAgLyoqXHJcbiAgICogSWRcclxuICAgKiBAZGVzY3JpcHRpb24gSWQgZm9yIHRyYWNrIGV2ZW50XHJcbiAgICovXHJcbiAgaWQ6IHN0cmluZyA9IHRoaXMucmFuZG9tSWQoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogUGFydGljaXBhbnRcclxuICAgKiBAZGVzY3JpcHRpb24gUGFydGljaXBhbnRcclxuICAgKi9cclxuICBwYXJ0aWNpcGFudDogUGFydGljaXBhbnQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0cmVhbVxyXG4gICAqIEBkZXNjcmlwdGlvbiBTdHJlYW1cclxuICAgKi9cclxuICBzdHJlYW06IE1lZGlhU3RyZWFtO1xyXG5cclxuICAvKipcclxuICAgKiBSVENUcmFja0V2ZW50XHJcbiAgICogQGRlc2NyaXB0aW9uIFJUQ1RyYWNrRXZlbnRcclxuICAgKi9cclxuICBSVENUcmFja0V2ZW50PzogUlRDVHJhY2tFdmVudDtcclxuXHJcbiAgLyoqXHJcbiAgICogTG9nZ2VyXHJcbiAgICogQGRlc2NyaXB0aW9uIExvZ2dlciBmb3IgdHJhY2sgZXZlbnRzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsb2dnZXI6IExvZ2dlciA9IG5ldyBMb2dnZXIoKTtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgY29uc3RydWN0b3JPcHRpb25zOiBUcmFja3NFdmVudHNDb25zdHJ1Y3Rvck9wdGlvbnMsXHJcbiAgICBwYXJ0aWNpcGFudDogUGFydGljaXBhbnRcclxuICApIHtcclxuXHJcblxyXG4gICAgLy9SZW1vdGUgdHJhY2tzIGV2ZW50c1xyXG4gICAgaWYgKGNvbnN0cnVjdG9yT3B0aW9ucy5SVENUcmFja0V2ZW50KSB7XHJcbiAgICAgIHRoaXMuUlRDVHJhY2tFdmVudCA9IGNvbnN0cnVjdG9yT3B0aW9ucy5SVENUcmFja0V2ZW50O1xyXG5cclxuICAgICAgLy9kZXRlY3QgZXZlbnQgZW5kZWQgdHJhY2tcclxuICAgICAgdGhpcy5SVENUcmFja0V2ZW50LnRyYWNrLm9uZW5kZWQgPSAoZSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dnZXJDb2xvcnMuWUVMTE9XLCB7IGV2ZW50OiAnb25lbmRlZCcsIGUgfSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5SVENUcmFja0V2ZW50LnRyYWNrLm9ubXV0ZSA9IChlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ2dlckNvbG9ycy5ZRUxMT1csIHsgZXZlbnQ6ICdvbmVuZGVkJywgZSB9KTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLlJUQ1RyYWNrRXZlbnQudHJhY2sub251bm11dGUgPSAoZSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dnZXJDb2xvcnMuWUVMTE9XLCB7IGV2ZW50OiAnb25lbmRlZCcsIGUgfSk7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICAvL2RldGVjdCBldmVudCBlbmRlZCB0cmFja1xyXG4gICAgICBmb3IgKGNvbnN0IHN0cmVhbSBvZiB0aGlzLlJUQ1RyYWNrRXZlbnQuc3RyZWFtcykge1xyXG4gICAgICAgIHN0cmVhbS5vbnJlbW92ZXRyYWNrID0gKGUpID0+IHtcclxuICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dnZXJDb2xvcnMuWUVMTE9XLCB7IGV2ZW50OiAnb25yZW1vdmV0cmFjaycsIGUgfSk7XHJcbiAgICAgICAgICB0aGlzLmhhbmRsZVRyYWNrRW5kZWQoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoY29uc3QgdHJhY2sgb2Ygc3RyZWFtLmdldFRyYWNrcygpKSB7XHJcbiAgICAgICAgICB0cmFjay5vbmVuZGVkID0gKGU6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dnZXJDb2xvcnMuWUVMTE9XLCB7IGV2ZW50OiAnb25lbmRlZCcsIGUgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrRW5kZWRFdmVudCA9IG5ldyBNZWRpYVN0cmVhbVRyYWNrRXZlbnQoJ2VuZGVkJywgeyB0cmFjayB9KTtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVUcmFja0VuZGVkKHRyYWNrRW5kZWRFdmVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0cmFjay5vbm11dGUgPSAoZTogRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ2dlckNvbG9ycy5ZRUxMT1csIHsgZXZlbnQ6ICdvbm11dGUnLCBlIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdHJhY2sub251bm11dGUgPSAoZTogRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ2dlckNvbG9ycy5ZRUxMT1csIHsgZXZlbnQ6ICdvbnVubXV0ZScsIGUgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wYXJ0aWNpcGFudCA9IHBhcnRpY2lwYW50O1xyXG4gICAgdGhpcy5zdHJlYW0gPSBjb25zdHJ1Y3Rvck9wdGlvbnMuTWVkaWFTdHJlYW07XHJcblxyXG5cclxuICAgIC8vb24gYWRkIHRyYWNrXHJcbiAgICB0aGlzLnN0cmVhbS5vbmFkZHRyYWNrID0gKGU6IEV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dnZXJDb2xvcnMuWUVMTE9XLCB7IGV2ZW50OiAnb25hZGR0cmFjaycsIGUgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vb24gcmVtb3ZlIHRyYWNrXHJcbiAgICB0aGlzLnN0cmVhbS5vbnJlbW92ZXRyYWNrID0gKGUpID0+IHtcclxuICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ2dlckNvbG9ycy5ZRUxMT1csIHsgZXZlbnQ6ICdvbnJlbW92ZXRyYWNrJywgZSB9KTtcclxuICAgICAgdGhpcy5oYW5kbGVUcmFja0VuZGVkKGUpO1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuXHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFJhbmRvbSBpZFxyXG4gICAqIEByZXR1cm5zIGdlbmVyYXRlIHJhbmRvbSBpZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmFuZG9tSWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBgJHtEYXRlLm5vdygpfS0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KX1gO1xyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIHRyYWNrIGVuZGVkXHJcbiAgICogQHBhcmFtIG1lZGlhU3RyZWFtVHJhY2tFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgaGFuZGxlVHJhY2tFbmRlZChtZWRpYVN0cmVhbVRyYWNrRXZlbnQ6IE1lZGlhU3RyZWFtVHJhY2tFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgdHJhY2tSZW1vdmVkID0gdGhpcy5wYXJ0aWNpcGFudC50cmFja3MuZmluZCgodHJhY2spID0+IHRyYWNrLmlkID09PSBtZWRpYVN0cmVhbVRyYWNrRXZlbnQudHJhY2suaWQpO1xyXG4gICAgdGhpcy5wYXJ0aWNpcGFudC50cmFja3MgPSB0aGlzLnBhcnRpY2lwYW50LnRyYWNrcy5maWx0ZXIoKHRyYWNrKSA9PiB0cmFjay5pZCAhPT0gbWVkaWFTdHJlYW1UcmFja0V2ZW50LnRyYWNrLmlkKTtcclxuXHJcblxyXG4gICAgLy9lbWl0IGV2ZW50XHJcbiAgICB0cmFja1JlbW92ZWQgJiYgdGhpcy5wYXJ0aWNpcGFudC5raXRSdGMub25SZW1vdmVSZW1vdGVNZWRpYS5uZXh0KFt0aGlzLnBhcnRpY2lwYW50LCB0cmFja1JlbW92ZWRdKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBHZXQgc291cmNlIGZyb20gdHJhY2tcclxuICAgKiBAcGFyYW0gdHJhY2sgaXMgdHJhY2sgZm9yIGdldCBzb3VyY2VcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqL1xyXG4gIGdldFNvdXJjZSh0cmFjazogVHJhY2spOiBIVE1MVmlkZW9FbGVtZW50IHwgSFRNTEF1ZGlvRWxlbWVudCB8IHVuZGVmaW5lZCB7XHJcbiAgICBzd2l0Y2ggKHRyYWNrPy5raW5kKSB7XHJcbiAgICAgIGNhc2UgVHJhY2tLaW5kLkFVRElPOlxyXG4gICAgICAgIGNvbnN0IGF1ZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImF1ZGlvXCIpO1xyXG4gICAgICAgIGF1ZGlvLnNyY09iamVjdCA9IHRyYWNrLnN0cmVhbTtcclxuICAgICAgICBhdWRpby5hdXRvcGxheSA9IHRydWU7XHJcbiAgICAgICAgYXVkaW8uY29udHJvbHMgPSB0cnVlO1xyXG4gICAgICAgIGF1ZGlvLm11dGVkID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIGF1ZGlvO1xyXG4gICAgICBjYXNlIFRyYWNrS2luZC5WSURFTzpcclxuICAgICAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ2aWRlb1wiKTtcclxuICAgICAgICB2aWRlby5zcmNPYmplY3QgPSB0cmFjay5zdHJlYW07XHJcbiAgICAgICAgdmlkZW8uYXV0b3BsYXkgPSB0cnVlO1xyXG4gICAgICAgIHZpZGVvLmNvbnRyb2xzID0gdHJ1ZTtcclxuICAgICAgICB2aWRlby5tdXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHZpZGVvLnBsYXlzSW5saW5lID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdmlkZW87XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhbGwgdHJhY2tzIGV2ZW50c1xyXG4gICAqIEBkZXNjcmlwdGlvbiBSZW1vdmUgYWxsIHRyYWNrcyBldmVudHNcclxuICAgKi9cclxuICByZW1vdmVBbGxUcmFja3NFdmVudHMoKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0cmVhbS5vbmFkZHRyYWNrID0gbnVsbDtcclxuICAgIHRoaXMuc3RyZWFtLm9ucmVtb3ZldHJhY2sgPSBudWxsO1xyXG4gICAgZm9yIChjb25zdCBzdHJlYW0gb2YgdGhpcy5zdHJlYW0uZ2V0VHJhY2tzKCkpIHtcclxuICAgICAgc3RyZWFtLm9uZW5kZWQgPSBudWxsO1xyXG4gICAgICBzdHJlYW0ub25tdXRlID0gbnVsbDtcclxuICAgICAgc3RyZWFtLm9udW5tdXRlID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxufVxyXG5cclxuIl19