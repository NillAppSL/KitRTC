import { KitRtc } from '../../../services/kitrtc.service';
import * as i0 from "@angular/core";
export declare class LocalParticipantComponent {
    kitRtc: KitRtc;
    _kitRtc: KitRtc;
    constructor(kitRtc: KitRtc);
    get localParticipant(): import("kitrtcjs").Participant;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocalParticipantComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LocalParticipantComponent, "kitrtc-local-participant", never, {}, {}, never, never, false, never>;
}
