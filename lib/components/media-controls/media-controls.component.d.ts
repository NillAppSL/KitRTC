import { Renderer2 } from '@angular/core';
import { IconType } from '../icon/icon.component';
import { KitRtc } from '../../services/kitrtc.service';
import * as i0 from "@angular/core";
export declare class MediaControlsComponent {
    private renderer;
    private kitRtc;
    iconType: typeof IconType;
    backgroundColor: boolean;
    haveLocalVideo: boolean;
    haveLocalAudio: boolean;
    requestCamera: boolean;
    requestMic: boolean;
    requestJoin: boolean;
    requestLeave: boolean;
    constructor(renderer: Renderer2, kitRtc: KitRtc);
    /**
     * Destroy the component
     */
    ngOnDestroy(): void;
    /**
     * Is connected in room
     * @description Check if we are connected in room
     * @returns {boolean}
     */
    get isConnected(): boolean;
    get showJoinButton(): boolean;
    /**
     * Toogle video
     * @returns {boolean}
     */
    toogleVideo(): Promise<void>;
    /**
     * Toogle audio
     * @returns {boolean}
     */
    toogleAudio(): Promise<void>;
    /**
     * Leave room
     */
    leaveRoom(): Promise<void>;
    /**
     * Have video
     * @description Check if we have video
     * @returns {boolean}
     */
    haveVideo(): boolean;
    /**
     * Have audio
     * @description Check if we have audio
     * @returns {boolean}
     */
    haveAudio(): boolean;
    joinRoom(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MediaControlsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MediaControlsComponent, "kitrtc-media-controls", never, {}, {}, never, never, false, never>;
}
