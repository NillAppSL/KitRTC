import { Component } from '@angular/core';
import { IconType } from '../icon/icon.component';
import { TrackKind } from '../../interfaces/tracks';
import * as i0 from "@angular/core";
import * as i1 from "../../services/kitrtc.service";
import * as i2 from "@angular/common";
import * as i3 from "./participant/participant.component";
class ParticipantsComponent {
    constructor(kitRtc) {
        this.kitRtc = kitRtc;
        this.iconType = IconType;
        this._kitRtc = kitRtc;
    }
    get participants() {
        return this._kitRtc.participants;
    }
    isMuted(participant) {
        const getAudioTrack = participant.tracks.find(track => track.kind === TrackKind.AUDIO);
        if (getAudioTrack) {
            return getAudioTrack.track.muted;
        }
        return false;
    }
    trackById(index, item) {
        return item.id;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: ParticipantsComponent, deps: [{ token: i1.KitRtc }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.11", type: ParticipantsComponent, selector: "kitrtc-participants", ngImport: i0, template: "<ng-container *ngIf=\"kitRtc.participants\">\n  <kitrtc-participant [participant]=\"participant\" *ngFor=\"let participant of kitRtc.participants, trackBy: trackById\" />\n</ng-container>\n\n", styles: [":host{display:grid;grid-template-columns:repeat(auto-fill,minmax(400px,1fr));grid-gap:16px}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.ParticipantComponent, selector: "kitrtc-participant", inputs: ["participant"] }] }); }
}
export { ParticipantsComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: ParticipantsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'kitrtc-participants', template: "<ng-container *ngIf=\"kitRtc.participants\">\n  <kitrtc-participant [participant]=\"participant\" *ngFor=\"let participant of kitRtc.participants, trackBy: trackById\" />\n</ng-container>\n\n", styles: [":host{display:grid;grid-template-columns:repeat(auto-fill,minmax(400px,1fr));grid-gap:16px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.KitRtc }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGljaXBhbnRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlha2l0YXBwanMvc3JjL2xpYi9jb21wb25lbnRzL3BhcnRpY2lwYW50cy9wYXJ0aWNpcGFudHMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFraXRhcHBqcy9zcmMvbGliL2NvbXBvbmVudHMvcGFydGljaXBhbnRzL3BhcnRpY2lwYW50cy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7O0FBRXBELE1BS2EscUJBQXFCO0lBSTlCLFlBQ1MsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFIdkIsYUFBUSxHQUFHLFFBQVEsQ0FBQztRQUtsQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBR0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztJQUNuQyxDQUFDO0lBR0QsT0FBTyxDQUFDLFdBQXdCO1FBQzlCLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkYsSUFBRyxhQUFhLEVBQUM7WUFDZixPQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFBO1NBQ2pDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQWEsRUFBRSxJQUFpQjtRQUN4QyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUE7SUFDaEIsQ0FBQzsrR0ExQlEscUJBQXFCO21HQUFyQixxQkFBcUIsMkRDWGxDLGlNQUlBOztTRE9hLHFCQUFxQjs0RkFBckIscUJBQXFCO2tCQUxqQyxTQUFTOytCQUNFLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS2l0UnRjIH0gZnJvbSAnLi4vLi4vc2VydmljZXMva2l0cnRjLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWNvblR5cGUgfSBmcm9tICcuLi9pY29uL2ljb24uY29tcG9uZW50JztcbmltcG9ydCB7IFBhcnRpY2lwYW50IH0gZnJvbSAnLi4vLi4vY2xhc3MvcGFydGljaXBhbnQnO1xuaW1wb3J0IHsgVHJhY2tLaW5kIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90cmFja3MnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdraXRydGMtcGFydGljaXBhbnRzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BhcnRpY2lwYW50cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3BhcnRpY2lwYW50cy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBhcnRpY2lwYW50c0NvbXBvbmVudCB7XG4gICAgX2tpdFJ0YzogS2l0UnRjO1xuICAgIGljb25UeXBlID0gSWNvblR5cGU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBraXRSdGM6IEtpdFJ0YyxcbiAgICApIHtcbiAgICAgIHRoaXMuX2tpdFJ0YyA9IGtpdFJ0YztcbiAgICB9XG5cblxuICAgIGdldCBwYXJ0aWNpcGFudHMoKXtcbiAgICAgIHJldHVybiB0aGlzLl9raXRSdGMucGFydGljaXBhbnRzO1xuICAgIH1cblxuXG4gICAgaXNNdXRlZChwYXJ0aWNpcGFudDogUGFydGljaXBhbnQpOiBib29sZWFue1xuICAgICAgY29uc3QgZ2V0QXVkaW9UcmFjayA9IHBhcnRpY2lwYW50LnRyYWNrcy5maW5kKHRyYWNrID0+IHRyYWNrLmtpbmQgPT09IFRyYWNrS2luZC5BVURJTyk7XG4gICAgICBpZihnZXRBdWRpb1RyYWNrKXtcbiAgICAgICAgcmV0dXJuIGdldEF1ZGlvVHJhY2sudHJhY2subXV0ZWRcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0cmFja0J5SWQoaW5kZXg6IG51bWJlciwgaXRlbTogUGFydGljaXBhbnQpIHtcbiAgICAgIHJldHVybiBpdGVtLmlkXG4gICAgfVxuXG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwia2l0UnRjLnBhcnRpY2lwYW50c1wiPlxuICA8a2l0cnRjLXBhcnRpY2lwYW50IFtwYXJ0aWNpcGFudF09XCJwYXJ0aWNpcGFudFwiICpuZ0Zvcj1cImxldCBwYXJ0aWNpcGFudCBvZiBraXRSdGMucGFydGljaXBhbnRzLCB0cmFja0J5OiB0cmFja0J5SWRcIiAvPlxuPC9uZy1jb250YWluZXI+XG5cbiJdfQ==