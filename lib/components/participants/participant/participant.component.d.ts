import { ElementRef } from '@angular/core';
import { Participant } from '../../../class/participant';
import { IconType } from '../../icon/icon.component';
import { Track } from '../../../interfaces/tracks';
import * as i0 from "@angular/core";
export declare class ParticipantComponent {
    participantElement?: ElementRef<HTMLDivElement>;
    participant?: Participant;
    iconType: typeof IconType;
    constructor();
    maximized(): void;
    /**
     * Have video participant
     * @description Check if the participant have video
     * @returns {boolean}
     */
    haveVideo(): boolean;
    trackById(index: number, track: Track): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ParticipantComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ParticipantComponent, "kitrtc-participant", never, { "participant": { "alias": "participant"; "required": false; }; }, {}, never, never, false, never>;
}
