import { ElementRef } from '@angular/core';
import { Track } from '../../interfaces/tracks';
import { Logger } from '../../class/logger';
import { IconType } from '../icon/icon.component';
import { KitRtc } from '../../services/kitrtc.service';
import * as i0 from "@angular/core";
export declare class TrackComponent {
    private kitRtc;
    stream?: ElementRef<HTMLVideoElement | HTMLAudioElement>;
    track?: Track;
    local: boolean;
    logger: Logger;
    iconType: typeof IconType;
    autoPlayPolicySkip: boolean;
    isLoaded: boolean;
    onPlayed: boolean;
    constructor(kitRtc: KitRtc);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    loadeddata(): void;
    onPlaying(): void;
    /**
     * Auto play
     * @description Auto play media element
     * @returns {Promise<void>}
     */
    autoPlay(): Promise<void>;
    /**
     * Auto play for policy
     */
    autoPlayForPolicy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TrackComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TrackComponent, "kitrtc-track", never, { "track": { "alias": "track"; "required": false; }; "local": { "alias": "local"; "required": false; }; }, {}, never, never, false, never>;
}
