import { LoggerColors } from "../interfaces/logger";
import { LocalTracks } from "./localtracks";
import { Logger } from "./logger";
import { TracksEvents } from "./tracks";
/**
 * Participant
 * @description Participant from room
 */
export class Participant {
    /**
     * Participant constructor
     * @param kitRtc
     * @param id
     * @param isLocal
     * @param autoCreateOffer
     */
    constructor(kitRtc, id, isLocal = true, autoCreateOffer = false) {
        this.kitRtc = kitRtc;
        this.isLocal = isLocal;
        this.autoCreateOffer = autoCreateOffer;
        /**
         * Local participant
         */
        this.local = false;
        /**
         * Local tracks
         */
        this.localTracks = new LocalTracks(this.kitRtc, this);
        /**
         * Tracks
         */
        this.tracks = [];
        /**
         * Logger
         * @description Logger
         */
        this.logger = new Logger();
        /**
         * Making offer
         * @description Making offer
         */
        this.makingOffer = false;
        this.id = id;
        this.local = isLocal;
        //this.tracks = new Tracks(kitRtc, this);
        //Setup webrtc
        this.configWebRtc();
    }
    /**
     * Config webrtc
     * @description Config webrtc
     * @returns Promise<void>
     * @private
     */
    async configWebRtc() {
        //ice servers
        const iceServers = [
            { urls: 'stun:stun.stunprotocol.org:3478' },
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:turn.nillapp.com:3478' },
            {
                urls: 'turn:turn.nillapp.com:3478?transport=udp',
                credential: "password",
                username: "username"
            }
        ];
        //create rtcPeerConnection
        this.rtcPeerConnection = new RTCPeerConnection({
            iceServers: iceServers,
            //iceTransportPolicy: 'all',
        });
        this.setBitRate();
        //on ice candidate
        this.rtcPeerConnection.onicecandidate = async (event) => {
            this.kitRtc.isDebug && console.log('onicecandidate', event);
            if (event.candidate) {
                this.kitRtc.getSocket()?.emit('candidate', { ice: event.candidate, uuid: this.id });
            }
        };
        //on track
        this.rtcPeerConnection.ontrack = (event) => {
            this.kitRtc.isDebug && console.log('p->ontrack', event);
            //find stream in tracks
            const mediaStream = this.createTrack(event.streams[0], event);
            //const track = mediaStream.addTrack(event.track);
            if (mediaStream)
                this.kitRtc.onRemoteMedia.next([this, mediaStream]);
        };
        //on connection state change
        this.rtcPeerConnection.onconnectionstatechange = (event) => {
            this.kitRtc.isDebug && console.log('onconnectionstatechange', event);
        };
        //on ice connection state change
        this.rtcPeerConnection.oniceconnectionstatechange = (event) => {
            this.kitRtc.isDebug && console.log('oniceconnectionstatechange', event);
            if (this.rtcPeerConnection?.iceConnectionState === "failed") {
                /* possibly reconfigure the connection in some way here */
                /* then request ICE restart */
                this.rtcPeerConnection.restartIce();
            }
        };
        //on ice gathering state change
        this.rtcPeerConnection.onicegatheringstatechange = (event) => {
            this.kitRtc.isDebug && console.log('onicegatheringstatechange', event);
        };
        //on ice candidate error
        this.rtcPeerConnection.onicecandidateerror = (e) => {
            this.kitRtc.isDebug && this.logger.log(LoggerColors.RED, { event: 'onicecandidateerror', e });
        };
        //on signaling state change
        this.rtcPeerConnection.onsignalingstatechange = (e) => {
            this.kitRtc.isDebug && console.log('onsignalingstatechange', e);
            this.logger.log(LoggerColors.YELLOW, { event: 'onsignalingstatechange', e, signalingState: this.rtcPeerConnection?.signalingState });
        };
        //on data channel
        this.rtcPeerConnection.ondatachannel = (event) => {
            this.kitRtc.isDebug && console.log('ondatachannel', event);
        };
        this.rtcPeerConnection.onnegotiationneeded = (e) => {
            this.logger.log(LoggerColors.YELLOW, { event: 'onnegotiationneeded', e });
            this.createOffer();
        };
    }
    /**
     * Error handler
     * @param error is error from webrtc
     */
    errorHandler(error) {
        console.error(error);
    }
    /**
     * Created description
     * @description Created description for other participant
     * @param description as RTCSessionDescriptionInit
     * @param type as string (offer|answer)
     */
    createdDescription(description, type) {
        this.kitRtc.isDebug && console.log('got description');
        this.rtcPeerConnection?.setLocalDescription(description).then(() => {
            this.kitRtc.getSocket()?.emit(type, { sdp: this.rtcPeerConnection?.localDescription, uuid: this.id });
            if (type === 'offer')
                this.makingOffer = false;
        }).catch(this.errorHandler);
    }
    /**
     * Create offer
     * @description Create offer for other participant
     * @private
     */
    createOffer() {
        //Cancel if we are already making an offer
        if (this.makingOffer)
            return;
        this.makingOffer = true;
        this.kitRtc.isDebug && console.log("createOffer", this.id);
        this.rtcPeerConnection?.createOffer().then((description) => {
            if (this.rtcPeerConnection?.signalingState != "stable")
                return;
            this.createdDescription(description, 'offer');
        }, this.errorHandler);
    }
    /**
     * Handle offer
     * @description Handle offer from other participant
     * @param offer offer from other participant
     */
    async handleOffer(offer) {
        //Cancel if we are already making an offer
        if (this.makingOffer) {
            console.log("skip nested offer", this.id);
            return;
        }
        ;
        //if we are answering a offer, we need to add tracks to peer connection
        this.addTracksToPeerConnection();
        await this.rtcPeerConnection?.setRemoteDescription(new RTCSessionDescription(offer.sdp)).then(() => {
            if (offer.sdp.type !== 'offer')
                return;
            this.kitRtc.isDebug && console.log("createAnswer", { offer, id: this.id });
            this.rtcPeerConnection?.createAnswer().then((description) => {
                this.createdDescription(description, 'answer');
            }).catch(this.errorHandler);
        }, this.errorHandler);
    }
    /**
     * Handle answer
     * @description Handle answer from other participant
     * @param answer answer from other participant
     */
    handleAnswer(answer) {
        this.kitRtc.isDebug && console.log("handleAnswer", answer, this.id);
        this.rtcPeerConnection?.setRemoteDescription(new RTCSessionDescription(answer.sdp)).catch(this.errorHandler);
    }
    /**
     * Handle candidate
     * @description Handle candidate from other participant
     * @param event candidate from other participant
     */
    handleCandidate(event) {
        this.rtcPeerConnection?.addIceCandidate(new RTCIceCandidate(event.ice)).catch(this.errorHandler);
    }
    /**
     * Create track
     * @description Create track from stream and add to tracks
     * @param stream stream of track
     * @param rtcTrackEvent track event
     * @param MediaStreamTrack track
     * @returns Track | undefined
     */
    createTrack(stream, rtcTrackEvent) {
        if (!rtcTrackEvent) {
            return;
        }
        if (rtcTrackEvent instanceof MediaStreamTrack) {
            const track = {
                kind: rtcTrackEvent?.kind,
                id: rtcTrackEvent?.id,
                trackId: rtcTrackEvent?.id,
                label: rtcTrackEvent?.label,
                stream: stream,
                track: rtcTrackEvent,
                participantId: this.id,
                getAutoSource: undefined,
                trackEvents: new TracksEvents({
                    MediaStream: stream,
                }, this),
                getSource: () => this.getSource(track)
            };
            this.tracks.push(track);
            return track;
        }
        const track = {
            kind: rtcTrackEvent?.track.kind,
            id: rtcTrackEvent?.track.id,
            trackId: rtcTrackEvent?.track.id,
            label: rtcTrackEvent?.track.label,
            stream: stream,
            track: rtcTrackEvent?.track,
            participantId: this.id,
            getAutoSource: undefined,
            trackEvents: new TracksEvents({
                MediaStream: stream,
                RTCTrackEvent: rtcTrackEvent
            }, this),
            getSource: () => this.getSource(track)
        };
        this.tracks.push(track);
        return track;
    }
    /**
     * Set bitrate
     * @description Set bitrate for video and audio
     * @returns Promise<void>
     */
    async setBitRate() {
        const maxBitRateVideo = this.kitRtc.mediaOptions.video?.maxBitrate;
        //set video bitrate
        try {
            if (maxBitRateVideo) {
                const videoTransceiver = this.rtcPeerConnection?.getTransceivers().find(transceiver => transceiver.sender.track?.kind === 'video');
                if (videoTransceiver) {
                    //set bit rate
                    const parameters = videoTransceiver.sender.getParameters();
                    if (!parameters.encodings) {
                        parameters.encodings = [{}];
                    }
                    parameters.encodings[0].maxBitrate = maxBitRateVideo * 1000 || 1000000;
                    await videoTransceiver.sender.setParameters(parameters);
                }
            }
        }
        catch (error) {
            console.error('Set bitrate video error:', error);
        }
        //set audio bitrate
        try {
            const maxBitRateAudio = this.kitRtc.mediaOptions.audio?.maxBitrate;
            if (maxBitRateAudio) {
                const audioTransceiver = this.rtcPeerConnection?.getTransceivers().find(transceiver => transceiver.sender.track?.kind === 'audio');
                if (audioTransceiver) {
                    //set bit rate
                    const parameters = audioTransceiver.sender.getParameters();
                    if (!parameters.encodings) {
                        parameters.encodings = [{}];
                    }
                    parameters.encodings[0].maxBitrate = maxBitRateAudio * 1000 || 200000;
                    await audioTransceiver.sender.setParameters(parameters);
                }
            }
        }
        catch (error) {
            console.error('Set bitrate audio error:', error);
        }
    }
    /**
     * Get source
     * @description Get source from track
     * @param track track
     * @returns HTMLVideoElement | HTMLAudioElement | undefined
     */
    getSource(track) {
        if (track.track.kind === 'video') {
            const video = document.createElement('video');
            video.srcObject = track.stream;
            video.autoplay = true;
            video.muted = true;
            return video;
        }
        if (track.track.kind === 'audio') {
            const audio = document.createElement('audio');
            audio.srcObject = track.stream;
            audio.autoplay = true;
            audio.muted = true;
            return audio;
        }
        return;
    }
    /**
     * Start negotiation
     * @description Start negotiation with other participant
     */
    negotiated() {
        this.addTracksToPeerConnection();
        this.createOffer();
    }
    /**
     * Close peer connection
     * @description Close peer connection
     */
    close() {
        this.rtcPeerConnection?.close();
        //remove tracks and events
        this.rtcPeerConnection = undefined;
    }
    /**
     * Add tracks to peer connection
     * @description Add tracks to peer connection
     */
    addTracksToPeerConnection() {
        if (!this.rtcPeerConnection) {
            this.configWebRtc();
        }
        const tracks = this.kitRtc.localParticipant?.localTracks.getTracks;
        if (tracks) {
            for (const track of tracks) {
                const mediaTrack = track;
                //find track in peer connection
                const haveTrack = this.rtcPeerConnection?.getSenders().find(sender => sender.track?.id === mediaTrack.track.id);
                if (!haveTrack) {
                    if (this.kitRtc.isDebug)
                        this.logger.log(LoggerColors.YELLOW, { event: 'Add local track to connection', track: mediaTrack.track });
                    this.rtcPeerConnection?.addTrack(mediaTrack.track, track.stream);
                }
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGljaXBhbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYWtpdGFwcGpzL3NyYy9saWIvY2xhc3MvcGFydGljaXBhbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBSXhDOzs7R0FHRztBQUNILE1BQU0sT0FBTyxXQUFXO0lBNkN0Qjs7Ozs7O09BTUc7SUFDSCxZQUNTLE1BQWMsRUFDckIsRUFBVSxFQUNGLFVBQW1CLElBQUksRUFDdkIsa0JBQTJCLEtBQUs7UUFIakMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUViLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3ZCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQWpEMUM7O1dBRUc7UUFDSCxVQUFLLEdBQVksS0FBSyxDQUFDO1FBUXZCOztXQUVHO1FBQ0gsZ0JBQVcsR0FBZ0IsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUU5RDs7V0FFRztRQUNILFdBQU0sR0FBWSxFQUFFLENBQUM7UUFNckI7OztXQUdHO1FBQ08sV0FBTSxHQUFXLElBQUksTUFBTSxFQUFFLENBQUM7UUFFeEM7OztXQUdHO1FBQ0ssZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFrQm5DLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDckIseUNBQXlDO1FBRXpDLGNBQWM7UUFDZCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFFdEIsQ0FBQztJQUlEOzs7OztPQUtHO0lBQ08sS0FBSyxDQUFDLFlBQVk7UUFFMUIsYUFBYTtRQUNiLE1BQU0sVUFBVSxHQUFtQjtZQUNqQyxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRTtZQUMzQyxFQUFFLElBQUksRUFBRSw4QkFBOEIsRUFBRTtZQUN4QyxFQUFFLElBQUksRUFBRSw0QkFBNEIsRUFBRTtZQUN0QztnQkFDRSxJQUFJLEVBQUUsMENBQTBDO2dCQUNoRCxVQUFVLEVBQUUsVUFBVTtnQkFDdEIsUUFBUSxFQUFFLFVBQVU7YUFDckI7U0FDRixDQUFBO1FBRUQsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixDQUFDO1lBQzdDLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLDRCQUE0QjtTQUM3QixDQUFDLENBQUM7UUFHSCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFHbEIsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEdBQUcsS0FBSyxFQUFFLEtBQWdDLEVBQUUsRUFBRTtZQUNqRixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzVELElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3JGO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsVUFBVTtRQUNWLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxLQUFvQixFQUFFLEVBQUU7WUFDeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFeEQsdUJBQXVCO1lBQ3ZCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5RCxrREFBa0Q7WUFFbEQsSUFBSSxXQUFXO2dCQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQztRQUlGLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsaUJBQWlCLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRTtZQUNoRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQztRQUVGLGdDQUFnQztRQUNoQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsMEJBQTBCLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRTtZQUNuRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3hFLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixLQUFLLFFBQVEsRUFBRTtnQkFDM0QsMERBQTBEO2dCQUMxRCw4QkFBOEI7Z0JBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNyQztRQUNILENBQUMsQ0FBQztRQU1GLCtCQUErQjtRQUMvQixJQUFJLENBQUMsaUJBQWlCLENBQUMseUJBQXlCLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRTtZQUNsRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQztRQUVGLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEcsQ0FBQyxDQUFDO1FBRUYsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0IsR0FBRyxDQUFDLENBQVEsRUFBRSxFQUFFO1lBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBRSxDQUFDLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZJLENBQUMsQ0FBQztRQUVGLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxHQUFHLENBQUMsS0FBMEIsRUFBRSxFQUFFO1lBQ3BFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdELENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQVEsRUFBRSxFQUFFO1lBQ3hELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDO0lBSUosQ0FBQztJQUtEOzs7T0FHRztJQUNPLFlBQVksQ0FBQyxLQUFVO1FBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUtEOzs7OztPQUtHO0lBQ08sa0JBQWtCLENBQUMsV0FBc0MsRUFBRSxJQUFZO1FBQy9FLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNqRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN0RyxJQUFHLElBQUksS0FBSyxPQUFPO2dCQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUtEOzs7O09BSUc7SUFDSCxXQUFXO1FBQ1QsMENBQTBDO1FBQzFDLElBQUcsSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPO1FBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDekQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxJQUFJLFFBQVE7Z0JBQUUsT0FBTztZQUMvRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUdEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQVU7UUFDMUIsMENBQTBDO1FBQzFDLElBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQyxPQUFNO1NBQ1A7UUFBQSxDQUFDO1FBRUYsdUVBQXVFO1FBQ3ZFLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBRWpDLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixFQUFFLG9CQUFvQixDQUFDLElBQUkscUJBQXFCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNqRyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLE9BQU87Z0JBQUUsT0FBTztZQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUMxRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBR0Q7Ozs7T0FJRztJQUNILFlBQVksQ0FBQyxNQUFXO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLG9CQUFvQixDQUFDLElBQUkscUJBQXFCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMvRyxDQUFDO0lBR0Q7Ozs7T0FJRztJQUNILGVBQWUsQ0FBQyxLQUFVO1FBQ3hCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLENBQUMsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNuRyxDQUFDO0lBSUQ7Ozs7Ozs7T0FPRztJQUNILFdBQVcsQ0FBQyxNQUFtQixFQUFFLGFBQWdEO1FBQy9FLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFL0IsSUFBSSxhQUFhLFlBQVksZ0JBQWdCLEVBQUU7WUFDN0MsTUFBTSxLQUFLLEdBQVU7Z0JBQ25CLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBaUI7Z0JBQ3RDLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRTtnQkFDckIsT0FBTyxFQUFFLGFBQWEsRUFBRSxFQUFFO2dCQUMxQixLQUFLLEVBQUUsYUFBYSxFQUFFLEtBQUs7Z0JBQzNCLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEtBQUssRUFBRSxhQUFhO2dCQUNwQixhQUFhLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQ3RCLGFBQWEsRUFBRSxTQUFTO2dCQUN4QixXQUFXLEVBQUcsSUFBSSxZQUFZLENBQUM7b0JBQzdCLFdBQVcsRUFBRSxNQUFNO2lCQUNwQixFQUFFLElBQUksQ0FBQztnQkFDUixTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7YUFDdkMsQ0FHRDtZQUVBLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxNQUFNLEtBQUssR0FBVTtZQUNuQixJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssQ0FBQyxJQUFpQjtZQUM1QyxFQUFFLEVBQUUsYUFBYSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQzNCLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDaEMsS0FBSyxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUMsS0FBSztZQUNqQyxNQUFNLEVBQUUsTUFBTTtZQUNkLEtBQUssRUFBRSxhQUFhLEVBQUUsS0FBSztZQUMzQixhQUFhLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDdEIsYUFBYSxFQUFFLFNBQVM7WUFDeEIsV0FBVyxFQUFHLElBQUksWUFBWSxDQUFDO2dCQUM3QixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsYUFBYSxFQUFFLGFBQWE7YUFDN0IsRUFBRSxJQUFJLENBQUM7WUFDUixTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDdkMsQ0FBQTtRQUdELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUdEOzs7O09BSUc7SUFDTyxLQUFLLENBQUMsVUFBVTtRQUN4QixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDO1FBRW5FLG1CQUFtQjtRQUNuQixJQUFJO1lBQ0YsSUFBRyxlQUFlLEVBQUM7Z0JBQ2pCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQztnQkFDbkksSUFBSSxnQkFBZ0IsRUFBRTtvQkFDcEIsY0FBYztvQkFDZCxNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQzNELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFO3dCQUN6QixVQUFVLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQzdCO29CQUNELFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLGVBQWUsR0FBRyxJQUFJLElBQUksT0FBTyxDQUFDO29CQUN2RSxNQUFNLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ3pEO2FBQ0Y7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNsRDtRQUdELG1CQUFtQjtRQUNuQixJQUFJO1lBQ0YsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQztZQUNuRSxJQUFHLGVBQWUsRUFBQztnQkFDakIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDO2dCQUNuSSxJQUFJLGdCQUFnQixFQUFFO29CQUNwQixjQUFjO29CQUNkLE1BQU0sVUFBVSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDM0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUU7d0JBQ3pCLFVBQVUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDN0I7b0JBQ0QsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsZUFBZSxHQUFHLElBQUksSUFBSSxNQUFNLENBQUM7b0JBQ3RFLE1BQU0sZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDekQ7YUFDRjtTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUEwQixFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2xEO0lBR0gsQ0FBQztJQUdEOzs7OztPQUtHO0lBQ0gsU0FBUyxDQUFDLEtBQVk7UUFDcEIsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDaEMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QyxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDL0IsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDdEIsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbkIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQ2hDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQy9CLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ25CLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPO0lBQ1QsQ0FBQztJQUlEOzs7T0FHRztJQUNILFVBQVU7UUFDUixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUdEOzs7T0FHRztJQUNILEtBQUs7UUFDSCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFFaEMsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7T0FHRztJQUNLLHlCQUF5QjtRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzNCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtRQUNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUNuRSxJQUFJLE1BQU0sRUFBRTtZQUNWLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO2dCQUMxQixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ3pCLCtCQUErQjtnQkFDL0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2hILElBQUcsQ0FBQyxTQUFTLEVBQUM7b0JBQ1osSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87d0JBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSwrQkFBK0IsRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQ2xJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ2xFO2FBQ0Y7U0FDRjtJQUNILENBQUM7Q0FLRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlckNvbG9ycyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2xvZ2dlclwiO1xyXG5pbXBvcnQgeyBUcmFjaywgVHJhY2tLaW5kIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvdHJhY2tzXCI7XHJcbmltcG9ydCB7IEtpdFJ0YyB9IGZyb20gXCIuLi9zZXJ2aWNlcy9raXRydGMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBMb2NhbFRyYWNrcyB9IGZyb20gXCIuL2xvY2FsdHJhY2tzXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuL2xvZ2dlclwiO1xyXG5pbXBvcnQgeyBUcmFja3NFdmVudHMgfSBmcm9tIFwiLi90cmFja3NcIjtcclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFBhcnRpY2lwYW50XHJcbiAqIEBkZXNjcmlwdGlvbiBQYXJ0aWNpcGFudCBmcm9tIHJvb21cclxuICovXHJcbmV4cG9ydCBjbGFzcyBQYXJ0aWNpcGFudCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhcnRpY2lwYW50IGlkXHJcbiAgICovXHJcbiAgaWQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogTG9jYWwgcGFydGljaXBhbnRcclxuICAgKi9cclxuICBsb2NhbDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBSdGMgcGVlciBjb25uZWN0aW9uXHJcbiAgICovXHJcbiAgcnRjUGVlckNvbm5lY3Rpb24/OiBSVENQZWVyQ29ubmVjdGlvbjtcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIExvY2FsIHRyYWNrc1xyXG4gICAqL1xyXG4gIGxvY2FsVHJhY2tzOiBMb2NhbFRyYWNrcyA9IG5ldyBMb2NhbFRyYWNrcyh0aGlzLmtpdFJ0YywgdGhpcyk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYWNrc1xyXG4gICAqL1xyXG4gIHRyYWNrczogVHJhY2tbXSA9IFtdO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogTG9nZ2VyXHJcbiAgICogQGRlc2NyaXB0aW9uIExvZ2dlclxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBsb2dnZXI6IExvZ2dlciA9IG5ldyBMb2dnZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWFraW5nIG9mZmVyXHJcbiAgICogQGRlc2NyaXB0aW9uIE1ha2luZyBvZmZlclxyXG4gICAqL1xyXG4gIHByaXZhdGUgbWFraW5nT2ZmZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFBhcnRpY2lwYW50IGNvbnN0cnVjdG9yXHJcbiAgICogQHBhcmFtIGtpdFJ0Y1xyXG4gICAqIEBwYXJhbSBpZFxyXG4gICAqIEBwYXJhbSBpc0xvY2FsXHJcbiAgICogQHBhcmFtIGF1dG9DcmVhdGVPZmZlclxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGtpdFJ0YzogS2l0UnRjLFxyXG4gICAgaWQ6IHN0cmluZyxcclxuICAgIHByaXZhdGUgaXNMb2NhbDogYm9vbGVhbiA9IHRydWUsXHJcbiAgICBwcml2YXRlIGF1dG9DcmVhdGVPZmZlcjogYm9vbGVhbiA9IGZhbHNlXHJcbiAgKSB7XHJcblxyXG5cclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIHRoaXMubG9jYWwgPSBpc0xvY2FsO1xyXG4gICAgLy90aGlzLnRyYWNrcyA9IG5ldyBUcmFja3Moa2l0UnRjLCB0aGlzKTtcclxuXHJcbiAgICAvL1NldHVwIHdlYnJ0Y1xyXG4gICAgdGhpcy5jb25maWdXZWJSdGMoKTtcclxuXHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIENvbmZpZyB3ZWJydGNcclxuICAgKiBAZGVzY3JpcHRpb24gQ29uZmlnIHdlYnJ0Y1xyXG4gICAqIEByZXR1cm5zIFByb21pc2U8dm9pZD5cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBhc3luYyBjb25maWdXZWJSdGMoKTogUHJvbWlzZTx2b2lkPiB7XHJcblxyXG4gICAgLy9pY2Ugc2VydmVyc1xyXG4gICAgY29uc3QgaWNlU2VydmVyczogUlRDSWNlU2VydmVyW10gPSBbXHJcbiAgICAgIHsgdXJsczogJ3N0dW46c3R1bi5zdHVucHJvdG9jb2wub3JnOjM0NzgnIH0sXHJcbiAgICAgIHsgdXJsczogJ3N0dW46c3R1bi5sLmdvb2dsZS5jb206MTkzMDInIH0sXHJcbiAgICAgIHsgdXJsczogJ3N0dW46dHVybi5uaWxsYXBwLmNvbTozNDc4JyB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdXJsczogJ3R1cm46dHVybi5uaWxsYXBwLmNvbTozNDc4P3RyYW5zcG9ydD11ZHAnLFxyXG4gICAgICAgIGNyZWRlbnRpYWw6IFwicGFzc3dvcmRcIixcclxuICAgICAgICB1c2VybmFtZTogXCJ1c2VybmFtZVwiXHJcbiAgICAgIH1cclxuICAgIF1cclxuXHJcbiAgICAvL2NyZWF0ZSBydGNQZWVyQ29ubmVjdGlvblxyXG4gICAgdGhpcy5ydGNQZWVyQ29ubmVjdGlvbiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbih7XHJcbiAgICAgIGljZVNlcnZlcnM6IGljZVNlcnZlcnMsXHJcbiAgICAgIC8vaWNlVHJhbnNwb3J0UG9saWN5OiAnYWxsJyxcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICB0aGlzLnNldEJpdFJhdGUoKTtcclxuXHJcblxyXG4gICAgLy9vbiBpY2UgY2FuZGlkYXRlXHJcbiAgICB0aGlzLnJ0Y1BlZXJDb25uZWN0aW9uLm9uaWNlY2FuZGlkYXRlID0gYXN5bmMgKGV2ZW50OiBSVENQZWVyQ29ubmVjdGlvbkljZUV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMua2l0UnRjLmlzRGVidWcgJiYgY29uc29sZS5sb2coJ29uaWNlY2FuZGlkYXRlJywgZXZlbnQpO1xyXG4gICAgICBpZiAoZXZlbnQuY2FuZGlkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5raXRSdGMuZ2V0U29ja2V0KCk/LmVtaXQoJ2NhbmRpZGF0ZScsIHsgaWNlOiBldmVudC5jYW5kaWRhdGUsIHV1aWQ6IHRoaXMuaWQgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9vbiB0cmFja1xyXG4gICAgdGhpcy5ydGNQZWVyQ29ubmVjdGlvbi5vbnRyYWNrID0gKGV2ZW50OiBSVENUcmFja0V2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMua2l0UnRjLmlzRGVidWcgJiYgY29uc29sZS5sb2coJ3AtPm9udHJhY2snLCBldmVudCk7XHJcblxyXG4gICAgICAvL2ZpbmQgc3RyZWFtIGluIHRyYWNrc1xyXG4gICAgICBjb25zdCBtZWRpYVN0cmVhbSA9IHRoaXMuY3JlYXRlVHJhY2soZXZlbnQuc3RyZWFtc1swXSwgZXZlbnQpO1xyXG4gICAgICAvL2NvbnN0IHRyYWNrID0gbWVkaWFTdHJlYW0uYWRkVHJhY2soZXZlbnQudHJhY2spO1xyXG5cclxuICAgICAgaWYgKG1lZGlhU3RyZWFtKSB0aGlzLmtpdFJ0Yy5vblJlbW90ZU1lZGlhLm5leHQoW3RoaXMsIG1lZGlhU3RyZWFtXSk7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgLy9vbiBjb25uZWN0aW9uIHN0YXRlIGNoYW5nZVxyXG4gICAgdGhpcy5ydGNQZWVyQ29ubmVjdGlvbi5vbmNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5raXRSdGMuaXNEZWJ1ZyAmJiBjb25zb2xlLmxvZygnb25jb25uZWN0aW9uc3RhdGVjaGFuZ2UnLCBldmVudCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vb24gaWNlIGNvbm5lY3Rpb24gc3RhdGUgY2hhbmdlXHJcbiAgICB0aGlzLnJ0Y1BlZXJDb25uZWN0aW9uLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLmtpdFJ0Yy5pc0RlYnVnICYmIGNvbnNvbGUubG9nKCdvbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZScsIGV2ZW50KTtcclxuICAgICAgaWYgKHRoaXMucnRjUGVlckNvbm5lY3Rpb24/LmljZUNvbm5lY3Rpb25TdGF0ZSA9PT0gXCJmYWlsZWRcIikge1xyXG4gICAgICAgIC8qIHBvc3NpYmx5IHJlY29uZmlndXJlIHRoZSBjb25uZWN0aW9uIGluIHNvbWUgd2F5IGhlcmUgKi9cclxuICAgICAgICAvKiB0aGVuIHJlcXVlc3QgSUNFIHJlc3RhcnQgKi9cclxuICAgICAgICB0aGlzLnJ0Y1BlZXJDb25uZWN0aW9uLnJlc3RhcnRJY2UoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgLy9vbiBpY2UgZ2F0aGVyaW5nIHN0YXRlIGNoYW5nZVxyXG4gICAgdGhpcy5ydGNQZWVyQ29ubmVjdGlvbi5vbmljZWdhdGhlcmluZ3N0YXRlY2hhbmdlID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLmtpdFJ0Yy5pc0RlYnVnICYmIGNvbnNvbGUubG9nKCdvbmljZWdhdGhlcmluZ3N0YXRlY2hhbmdlJywgZXZlbnQpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL29uIGljZSBjYW5kaWRhdGUgZXJyb3JcclxuICAgIHRoaXMucnRjUGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGVlcnJvciA9IChlKSA9PiB7XHJcbiAgICAgIHRoaXMua2l0UnRjLmlzRGVidWcgJiYgdGhpcy5sb2dnZXIubG9nKExvZ2dlckNvbG9ycy5SRUQsIHsgZXZlbnQ6ICdvbmljZWNhbmRpZGF0ZWVycm9yJywgZSB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy9vbiBzaWduYWxpbmcgc3RhdGUgY2hhbmdlXHJcbiAgICB0aGlzLnJ0Y1BlZXJDb25uZWN0aW9uLm9uc2lnbmFsaW5nc3RhdGVjaGFuZ2UgPSAoZTogRXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5raXRSdGMuaXNEZWJ1ZyAmJiBjb25zb2xlLmxvZygnb25zaWduYWxpbmdzdGF0ZWNoYW5nZScsIGUpO1xyXG4gICAgICB0aGlzLmxvZ2dlci5sb2coTG9nZ2VyQ29sb3JzLllFTExPVywgeyBldmVudDogJ29uc2lnbmFsaW5nc3RhdGVjaGFuZ2UnLCBlLCBzaWduYWxpbmdTdGF0ZTogdGhpcy5ydGNQZWVyQ29ubmVjdGlvbj8uc2lnbmFsaW5nU3RhdGUgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vb24gZGF0YSBjaGFubmVsXHJcbiAgICB0aGlzLnJ0Y1BlZXJDb25uZWN0aW9uLm9uZGF0YWNoYW5uZWwgPSAoZXZlbnQ6IFJUQ0RhdGFDaGFubmVsRXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5raXRSdGMuaXNEZWJ1ZyAmJiBjb25zb2xlLmxvZygnb25kYXRhY2hhbm5lbCcsIGV2ZW50KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5ydGNQZWVyQ29ubmVjdGlvbi5vbm5lZ290aWF0aW9ubmVlZGVkID0gKGU6IEV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dnZXJDb2xvcnMuWUVMTE9XLCB7IGV2ZW50OiAnb25uZWdvdGlhdGlvbm5lZWRlZCcsIGUgfSk7XHJcbiAgICAgIHRoaXMuY3JlYXRlT2ZmZXIoKTtcclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuICAvKipcclxuICAgKiBFcnJvciBoYW5kbGVyXHJcbiAgICogQHBhcmFtIGVycm9yIGlzIGVycm9yIGZyb20gd2VicnRjXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGVycm9ySGFuZGxlcihlcnJvcjogYW55KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZWQgZGVzY3JpcHRpb25cclxuICAgKiBAZGVzY3JpcHRpb24gQ3JlYXRlZCBkZXNjcmlwdGlvbiBmb3Igb3RoZXIgcGFydGljaXBhbnRcclxuICAgKiBAcGFyYW0gZGVzY3JpcHRpb24gYXMgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uSW5pdFxyXG4gICAqIEBwYXJhbSB0eXBlIGFzIHN0cmluZyAob2ZmZXJ8YW5zd2VyKVxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBjcmVhdGVkRGVzY3JpcHRpb24oZGVzY3JpcHRpb246IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbkluaXQsIHR5cGU6IHN0cmluZykge1xyXG4gICAgdGhpcy5raXRSdGMuaXNEZWJ1ZyAmJiBjb25zb2xlLmxvZygnZ290IGRlc2NyaXB0aW9uJyk7XHJcbiAgICB0aGlzLnJ0Y1BlZXJDb25uZWN0aW9uPy5zZXRMb2NhbERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5raXRSdGMuZ2V0U29ja2V0KCk/LmVtaXQodHlwZSwgeyBzZHA6IHRoaXMucnRjUGVlckNvbm5lY3Rpb24/LmxvY2FsRGVzY3JpcHRpb24sIHV1aWQ6IHRoaXMuaWQgfSk7XHJcbiAgICAgIGlmKHR5cGUgPT09ICdvZmZlcicpIHRoaXMubWFraW5nT2ZmZXIgPSBmYWxzZTtcclxuICAgIH0pLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyKTtcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBvZmZlclxyXG4gICAqIEBkZXNjcmlwdGlvbiBDcmVhdGUgb2ZmZXIgZm9yIG90aGVyIHBhcnRpY2lwYW50XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBjcmVhdGVPZmZlcigpOiB2b2lkIHtcclxuICAgIC8vQ2FuY2VsIGlmIHdlIGFyZSBhbHJlYWR5IG1ha2luZyBhbiBvZmZlclxyXG4gICAgaWYodGhpcy5tYWtpbmdPZmZlcikgcmV0dXJuO1xyXG4gICAgdGhpcy5tYWtpbmdPZmZlciA9IHRydWU7XHJcbiAgICB0aGlzLmtpdFJ0Yy5pc0RlYnVnICYmIGNvbnNvbGUubG9nKFwiY3JlYXRlT2ZmZXJcIiwgdGhpcy5pZCk7XHJcbiAgICB0aGlzLnJ0Y1BlZXJDb25uZWN0aW9uPy5jcmVhdGVPZmZlcigpLnRoZW4oKGRlc2NyaXB0aW9uKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnJ0Y1BlZXJDb25uZWN0aW9uPy5zaWduYWxpbmdTdGF0ZSAhPSBcInN0YWJsZVwiKSByZXR1cm47XHJcbiAgICAgIHRoaXMuY3JlYXRlZERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uLCAnb2ZmZXInKTtcclxuICAgIH0sIHRoaXMuZXJyb3JIYW5kbGVyKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgb2ZmZXJcclxuICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlIG9mZmVyIGZyb20gb3RoZXIgcGFydGljaXBhbnRcclxuICAgKiBAcGFyYW0gb2ZmZXIgb2ZmZXIgZnJvbSBvdGhlciBwYXJ0aWNpcGFudFxyXG4gICAqL1xyXG4gIGFzeW5jIGhhbmRsZU9mZmVyKG9mZmVyOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIC8vQ2FuY2VsIGlmIHdlIGFyZSBhbHJlYWR5IG1ha2luZyBhbiBvZmZlclxyXG4gICAgaWYodGhpcy5tYWtpbmdPZmZlcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNraXAgbmVzdGVkIG9mZmVyXCIsIHRoaXMuaWQpO1xyXG4gICAgICByZXR1cm5cclxuICAgIH07XHJcblxyXG4gICAgLy9pZiB3ZSBhcmUgYW5zd2VyaW5nIGEgb2ZmZXIsIHdlIG5lZWQgdG8gYWRkIHRyYWNrcyB0byBwZWVyIGNvbm5lY3Rpb25cclxuICAgIHRoaXMuYWRkVHJhY2tzVG9QZWVyQ29ubmVjdGlvbigpO1xyXG5cclxuICAgIGF3YWl0IHRoaXMucnRjUGVlckNvbm5lY3Rpb24/LnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24ob2ZmZXIuc2RwKSkudGhlbigoKSA9PiB7XHJcbiAgICAgIGlmIChvZmZlci5zZHAudHlwZSAhPT0gJ29mZmVyJykgcmV0dXJuO1xyXG4gICAgICB0aGlzLmtpdFJ0Yy5pc0RlYnVnICYmIGNvbnNvbGUubG9nKFwiY3JlYXRlQW5zd2VyXCIsIHsgb2ZmZXIsIGlkOiB0aGlzLmlkIH0pO1xyXG4gICAgICB0aGlzLnJ0Y1BlZXJDb25uZWN0aW9uPy5jcmVhdGVBbnN3ZXIoKS50aGVuKChkZXNjcmlwdGlvbikgPT4ge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlZERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uLCAnYW5zd2VyJyk7XHJcbiAgICAgIH0pLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyKTtcclxuICAgIH0sIHRoaXMuZXJyb3JIYW5kbGVyKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgYW5zd2VyXHJcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZSBhbnN3ZXIgZnJvbSBvdGhlciBwYXJ0aWNpcGFudFxyXG4gICAqIEBwYXJhbSBhbnN3ZXIgYW5zd2VyIGZyb20gb3RoZXIgcGFydGljaXBhbnRcclxuICAgKi9cclxuICBoYW5kbGVBbnN3ZXIoYW5zd2VyOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMua2l0UnRjLmlzRGVidWcgJiYgY29uc29sZS5sb2coXCJoYW5kbGVBbnN3ZXJcIiwgYW5zd2VyLCB0aGlzLmlkKTtcclxuICAgIHRoaXMucnRjUGVlckNvbm5lY3Rpb24/LnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oYW5zd2VyLnNkcCkpLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgY2FuZGlkYXRlXHJcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZSBjYW5kaWRhdGUgZnJvbSBvdGhlciBwYXJ0aWNpcGFudFxyXG4gICAqIEBwYXJhbSBldmVudCBjYW5kaWRhdGUgZnJvbSBvdGhlciBwYXJ0aWNpcGFudFxyXG4gICAqL1xyXG4gIGhhbmRsZUNhbmRpZGF0ZShldmVudDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnJ0Y1BlZXJDb25uZWN0aW9uPy5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZShldmVudC5pY2UpKS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlcik7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0cmFja1xyXG4gICAqIEBkZXNjcmlwdGlvbiBDcmVhdGUgdHJhY2sgZnJvbSBzdHJlYW0gYW5kIGFkZCB0byB0cmFja3NcclxuICAgKiBAcGFyYW0gc3RyZWFtIHN0cmVhbSBvZiB0cmFja1xyXG4gICAqIEBwYXJhbSBydGNUcmFja0V2ZW50IHRyYWNrIGV2ZW50XHJcbiAgICogQHBhcmFtIE1lZGlhU3RyZWFtVHJhY2sgdHJhY2tcclxuICAgKiBAcmV0dXJucyBUcmFjayB8IHVuZGVmaW5lZFxyXG4gICAqL1xyXG4gIGNyZWF0ZVRyYWNrKHN0cmVhbTogTWVkaWFTdHJlYW0sIHJ0Y1RyYWNrRXZlbnQ/OiBSVENUcmFja0V2ZW50IHwgTWVkaWFTdHJlYW1UcmFjayk6IFRyYWNrIHwgdW5kZWZpbmVkIHtcclxuICAgIGlmICghcnRjVHJhY2tFdmVudCkgeyByZXR1cm47IH1cclxuXHJcbiAgICBpZiAocnRjVHJhY2tFdmVudCBpbnN0YW5jZW9mIE1lZGlhU3RyZWFtVHJhY2spIHtcclxuICAgICAgY29uc3QgdHJhY2s6IFRyYWNrID0ge1xyXG4gICAgICAgIGtpbmQ6IHJ0Y1RyYWNrRXZlbnQ/LmtpbmQgYXMgVHJhY2tLaW5kLFxyXG4gICAgICAgIGlkOiBydGNUcmFja0V2ZW50Py5pZCxcclxuICAgICAgICB0cmFja0lkOiBydGNUcmFja0V2ZW50Py5pZCxcclxuICAgICAgICBsYWJlbDogcnRjVHJhY2tFdmVudD8ubGFiZWwsXHJcbiAgICAgICAgc3RyZWFtOiBzdHJlYW0sXHJcbiAgICAgICAgdHJhY2s6IHJ0Y1RyYWNrRXZlbnQsXHJcbiAgICAgICAgcGFydGljaXBhbnRJZDogdGhpcy5pZCxcclxuICAgICAgICBnZXRBdXRvU291cmNlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgdHJhY2tFdmVudHM6ICBuZXcgVHJhY2tzRXZlbnRzKHtcclxuICAgICAgICAgIE1lZGlhU3RyZWFtOiBzdHJlYW0sXHJcbiAgICAgICAgfSwgdGhpcyksXHJcbiAgICAgICAgZ2V0U291cmNlOiAoKSA9PiB0aGlzLmdldFNvdXJjZSh0cmFjaylcclxuICAgICAgfVxyXG5cclxuICAgICAgLy9FdmVudHMgZm9yIHRyYWNrc1xyXG4gICAgIDtcclxuXHJcbiAgICAgIHRoaXMudHJhY2tzLnB1c2godHJhY2spO1xyXG4gICAgICByZXR1cm4gdHJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdHJhY2s6IFRyYWNrID0ge1xyXG4gICAgICBraW5kOiBydGNUcmFja0V2ZW50Py50cmFjay5raW5kIGFzIFRyYWNrS2luZCxcclxuICAgICAgaWQ6IHJ0Y1RyYWNrRXZlbnQ/LnRyYWNrLmlkLFxyXG4gICAgICB0cmFja0lkOiBydGNUcmFja0V2ZW50Py50cmFjay5pZCxcclxuICAgICAgbGFiZWw6IHJ0Y1RyYWNrRXZlbnQ/LnRyYWNrLmxhYmVsLFxyXG4gICAgICBzdHJlYW06IHN0cmVhbSxcclxuICAgICAgdHJhY2s6IHJ0Y1RyYWNrRXZlbnQ/LnRyYWNrLFxyXG4gICAgICBwYXJ0aWNpcGFudElkOiB0aGlzLmlkLFxyXG4gICAgICBnZXRBdXRvU291cmNlOiB1bmRlZmluZWQsXHJcbiAgICAgIHRyYWNrRXZlbnRzOiAgbmV3IFRyYWNrc0V2ZW50cyh7XHJcbiAgICAgICAgTWVkaWFTdHJlYW06IHN0cmVhbSxcclxuICAgICAgICBSVENUcmFja0V2ZW50OiBydGNUcmFja0V2ZW50XHJcbiAgICAgIH0sIHRoaXMpLFxyXG4gICAgICBnZXRTb3VyY2U6ICgpID0+IHRoaXMuZ2V0U291cmNlKHRyYWNrKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0aGlzLnRyYWNrcy5wdXNoKHRyYWNrKTtcclxuICAgIHJldHVybiB0cmFjaztcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBTZXQgYml0cmF0ZVxyXG4gICAqIEBkZXNjcmlwdGlvbiBTZXQgYml0cmF0ZSBmb3IgdmlkZW8gYW5kIGF1ZGlvXHJcbiAgICogQHJldHVybnMgUHJvbWlzZTx2b2lkPlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBhc3luYyBzZXRCaXRSYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3QgbWF4Qml0UmF0ZVZpZGVvID0gdGhpcy5raXRSdGMubWVkaWFPcHRpb25zLnZpZGVvPy5tYXhCaXRyYXRlO1xyXG5cclxuICAgIC8vc2V0IHZpZGVvIGJpdHJhdGVcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmKG1heEJpdFJhdGVWaWRlbyl7XHJcbiAgICAgICAgY29uc3QgdmlkZW9UcmFuc2NlaXZlciA9IHRoaXMucnRjUGVlckNvbm5lY3Rpb24/LmdldFRyYW5zY2VpdmVycygpLmZpbmQodHJhbnNjZWl2ZXIgPT4gdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrPy5raW5kID09PSAndmlkZW8nKTtcclxuICAgICAgICBpZiAodmlkZW9UcmFuc2NlaXZlcikge1xyXG4gICAgICAgICAgLy9zZXQgYml0IHJhdGVcclxuICAgICAgICAgIGNvbnN0IHBhcmFtZXRlcnMgPSB2aWRlb1RyYW5zY2VpdmVyLnNlbmRlci5nZXRQYXJhbWV0ZXJzKCk7XHJcbiAgICAgICAgICBpZiAoIXBhcmFtZXRlcnMuZW5jb2RpbmdzKSB7XHJcbiAgICAgICAgICAgIHBhcmFtZXRlcnMuZW5jb2RpbmdzID0gW3t9XTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHBhcmFtZXRlcnMuZW5jb2RpbmdzWzBdLm1heEJpdHJhdGUgPSBtYXhCaXRSYXRlVmlkZW8gKiAxMDAwIHx8IDEwMDAwMDA7XHJcbiAgICAgICAgICBhd2FpdCB2aWRlb1RyYW5zY2VpdmVyLnNlbmRlci5zZXRQYXJhbWV0ZXJzKHBhcmFtZXRlcnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignU2V0IGJpdHJhdGUgdmlkZW8gZXJyb3I6JywgZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL3NldCBhdWRpbyBiaXRyYXRlXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBtYXhCaXRSYXRlQXVkaW8gPSB0aGlzLmtpdFJ0Yy5tZWRpYU9wdGlvbnMuYXVkaW8/Lm1heEJpdHJhdGU7XHJcbiAgICAgIGlmKG1heEJpdFJhdGVBdWRpbyl7XHJcbiAgICAgICAgY29uc3QgYXVkaW9UcmFuc2NlaXZlciA9IHRoaXMucnRjUGVlckNvbm5lY3Rpb24/LmdldFRyYW5zY2VpdmVycygpLmZpbmQodHJhbnNjZWl2ZXIgPT4gdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrPy5raW5kID09PSAnYXVkaW8nKTtcclxuICAgICAgICBpZiAoYXVkaW9UcmFuc2NlaXZlcikge1xyXG4gICAgICAgICAgLy9zZXQgYml0IHJhdGVcclxuICAgICAgICAgIGNvbnN0IHBhcmFtZXRlcnMgPSBhdWRpb1RyYW5zY2VpdmVyLnNlbmRlci5nZXRQYXJhbWV0ZXJzKCk7XHJcbiAgICAgICAgICBpZiAoIXBhcmFtZXRlcnMuZW5jb2RpbmdzKSB7XHJcbiAgICAgICAgICAgIHBhcmFtZXRlcnMuZW5jb2RpbmdzID0gW3t9XTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHBhcmFtZXRlcnMuZW5jb2RpbmdzWzBdLm1heEJpdHJhdGUgPSBtYXhCaXRSYXRlQXVkaW8gKiAxMDAwIHx8IDIwMDAwMDtcclxuICAgICAgICAgIGF3YWl0IGF1ZGlvVHJhbnNjZWl2ZXIuc2VuZGVyLnNldFBhcmFtZXRlcnMocGFyYW1ldGVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdTZXQgYml0cmF0ZSBhdWRpbyBlcnJvcjonLCBlcnJvcik7XHJcbiAgICB9XHJcblxyXG5cclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBHZXQgc291cmNlXHJcbiAgICogQGRlc2NyaXB0aW9uIEdldCBzb3VyY2UgZnJvbSB0cmFja1xyXG4gICAqIEBwYXJhbSB0cmFjayB0cmFja1xyXG4gICAqIEByZXR1cm5zIEhUTUxWaWRlb0VsZW1lbnQgfCBIVE1MQXVkaW9FbGVtZW50IHwgdW5kZWZpbmVkXHJcbiAgICovXHJcbiAgZ2V0U291cmNlKHRyYWNrOiBUcmFjayk6IEhUTUxWaWRlb0VsZW1lbnQgfCBIVE1MQXVkaW9FbGVtZW50IHwgdW5kZWZpbmVkIHtcclxuICAgIGlmICh0cmFjay50cmFjay5raW5kID09PSAndmlkZW8nKSB7XHJcbiAgICAgIGNvbnN0IHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgdmlkZW8uc3JjT2JqZWN0ID0gdHJhY2suc3RyZWFtO1xyXG4gICAgICB2aWRlby5hdXRvcGxheSA9IHRydWU7XHJcbiAgICAgIHZpZGVvLm11dGVkID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuIHZpZGVvO1xyXG4gICAgfVxyXG4gICAgaWYgKHRyYWNrLnRyYWNrLmtpbmQgPT09ICdhdWRpbycpIHtcclxuICAgICAgY29uc3QgYXVkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpO1xyXG4gICAgICBhdWRpby5zcmNPYmplY3QgPSB0cmFjay5zdHJlYW07XHJcbiAgICAgIGF1ZGlvLmF1dG9wbGF5ID0gdHJ1ZTtcclxuICAgICAgYXVkaW8ubXV0ZWQgPSB0cnVlO1xyXG4gICAgICByZXR1cm4gYXVkaW87XHJcbiAgICB9XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0IG5lZ290aWF0aW9uXHJcbiAgICogQGRlc2NyaXB0aW9uIFN0YXJ0IG5lZ290aWF0aW9uIHdpdGggb3RoZXIgcGFydGljaXBhbnRcclxuICAgKi9cclxuICBuZWdvdGlhdGVkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5hZGRUcmFja3NUb1BlZXJDb25uZWN0aW9uKCk7XHJcbiAgICB0aGlzLmNyZWF0ZU9mZmVyKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2UgcGVlciBjb25uZWN0aW9uXHJcbiAgICogQGRlc2NyaXB0aW9uIENsb3NlIHBlZXIgY29ubmVjdGlvblxyXG4gICAqL1xyXG4gIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5ydGNQZWVyQ29ubmVjdGlvbj8uY2xvc2UoKTtcclxuXHJcbiAgICAvL3JlbW92ZSB0cmFja3MgYW5kIGV2ZW50c1xyXG4gICAgdGhpcy5ydGNQZWVyQ29ubmVjdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0cmFja3MgdG8gcGVlciBjb25uZWN0aW9uXHJcbiAgICogQGRlc2NyaXB0aW9uIEFkZCB0cmFja3MgdG8gcGVlciBjb25uZWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRUcmFja3NUb1BlZXJDb25uZWN0aW9uKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLnJ0Y1BlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgIHRoaXMuY29uZmlnV2ViUnRjKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0cmFja3MgPSB0aGlzLmtpdFJ0Yy5sb2NhbFBhcnRpY2lwYW50Py5sb2NhbFRyYWNrcy5nZXRUcmFja3M7XHJcbiAgICBpZiAodHJhY2tzKSB7XHJcbiAgICAgIGZvciAoY29uc3QgdHJhY2sgb2YgdHJhY2tzKSB7XHJcbiAgICAgICAgY29uc3QgbWVkaWFUcmFjayA9IHRyYWNrO1xyXG4gICAgICAgIC8vZmluZCB0cmFjayBpbiBwZWVyIGNvbm5lY3Rpb25cclxuICAgICAgICBjb25zdCBoYXZlVHJhY2sgPSB0aGlzLnJ0Y1BlZXJDb25uZWN0aW9uPy5nZXRTZW5kZXJzKCkuZmluZChzZW5kZXIgPT4gc2VuZGVyLnRyYWNrPy5pZCA9PT0gbWVkaWFUcmFjay50cmFjay5pZCk7XHJcbiAgICAgICAgaWYoIWhhdmVUcmFjayl7XHJcbiAgICAgICAgICBpZih0aGlzLmtpdFJ0Yy5pc0RlYnVnKSB0aGlzLmxvZ2dlci5sb2coTG9nZ2VyQ29sb3JzLllFTExPVywgeyBldmVudDogJ0FkZCBsb2NhbCB0cmFjayB0byBjb25uZWN0aW9uJywgdHJhY2s6IG1lZGlhVHJhY2sudHJhY2sgfSk7XHJcbiAgICAgICAgICB0aGlzLnJ0Y1BlZXJDb25uZWN0aW9uPy5hZGRUcmFjayhtZWRpYVRyYWNrLnRyYWNrLCB0cmFjay5zdHJlYW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcbn1cclxuIl19