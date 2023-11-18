import { KitRtc } from '../../services/kitrtc.service';
import { IconType } from '../icon/icon.component';
import { Participant } from '../../class/participant';
import * as i0 from "@angular/core";
export declare class ParticipantsComponent {
    kitRtc: KitRtc;
    _kitRtc: KitRtc;
    iconType: typeof IconType;
    constructor(kitRtc: KitRtc);
    get participants(): Participant[];
    isMuted(participant: Participant): boolean;
    trackById(index: number, item: Participant): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ParticipantsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ParticipantsComponent, "kitrtc-participants", never, {}, {}, never, never, false, never>;
}
