import { Component } from '@angular/core';
import { IconType } from '../icon/icon.component';
import { TrackKind } from '../../interfaces/tracks';
import * as i0 from "@angular/core";
import * as i1 from "../../services/kitrtc.service";
import * as i2 from "@angular/common";
import * as i3 from "../icon/icon.component";
class MediaControlsComponent {
    constructor(renderer, kitRtc) {
        this.renderer = renderer;
        this.kitRtc = kitRtc;
        this.iconType = IconType;
        this.backgroundColor = true;
        this.haveLocalVideo = false;
        this.haveLocalAudio = false;
        //Preving double click
        this.requestCamera = false;
        this.requestMic = false;
        this.requestJoin = false;
        this.requestLeave = false;
        this.renderer.setStyle(document.body, 'background-color', '#121212');
        //check if we have local video and audio
        for (const localtracks of this.kitRtc.localParticipant.tracks) {
            if (localtracks.kind === TrackKind.VIDEO) {
                this.haveLocalVideo = true;
            }
            if (localtracks.kind === TrackKind.AUDIO) {
                this.haveLocalAudio = true;
            }
        }
    }
    /**
     * Destroy the component
     */
    ngOnDestroy() {
        this.renderer.removeStyle(document.body, 'background-color');
    }
    /**
     * Is connected in room
     * @description Check if we are connected in room
     * @returns {boolean}
     */
    get isConnected() {
        return this.kitRtc.isConnected && this.kitRtc.room.connected;
    }
    get showJoinButton() {
        return this.kitRtc.isConnected && !this.kitRtc.room.connected;
    }
    /**
     * Toogle video
     * @returns {boolean}
     */
    async toogleVideo() {
        if (this.requestCamera || !this.isConnected)
            return;
        this.requestCamera = true;
        await this.kitRtc.localParticipant.localTracks.toogleCamera();
        this.requestCamera = false;
    }
    /**
     * Toogle audio
     * @returns {boolean}
     */
    async toogleAudio() {
        if (this.requestMic || !this.isConnected)
            return;
        this.requestMic = true;
        await this.kitRtc.localParticipant.localTracks.toogleMic();
        this.requestMic = false;
    }
    /**
     * Leave room
     */
    async leaveRoom() {
        if (!this.isConnected || this.requestLeave)
            return;
        this.requestLeave = true;
        await this.kitRtc.room.leave();
        this.requestLeave = false;
    }
    /**
     * Have video
     * @description Check if we have video
     * @returns {boolean}
     */
    haveVideo() {
        const find = this.kitRtc.localParticipant.tracks.find((track) => track.kind === TrackKind.VIDEO);
        if (find) {
            if (find.track.enabled)
                return true;
        }
        return false;
    }
    /**
     * Have audio
     * @description Check if we have audio
     * @returns {boolean}
     */
    haveAudio() {
        const find = this.kitRtc.localParticipant.tracks.find((track) => track.kind === TrackKind.AUDIO);
        if (find) {
            if (find.track.enabled)
                return true;
        }
        return false;
    }
    async joinRoom() {
        if (this.requestJoin)
            return;
        this.requestJoin = true;
        await this.kitRtc.room.join();
        this.requestJoin = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: MediaControlsComponent, deps: [{ token: i0.Renderer2 }, { token: i1.KitRtc }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.11", type: MediaControlsComponent, selector: "kitrtc-media-controls", ngImport: i0, template: "<div class=\"kitrtc--container\">\n  <kitrtc-icon class=\"kitrtc--container--icon\" [icon]=\"iconType.logo\"></kitrtc-icon>\n  <div class=\"kitrtc--container--controls\">\n    <button *ngIf=\"!showJoinButton\" (click)=\"toogleVideo()\"\n      [ngClass]=\"{\n        'kitrtc--container--controls--disabled': this.requestCamera || !this.isConnected,\n        'kitrtc--container--controls--active': this.haveVideo()\n      }\">\n      <kitrtc-icon *ngIf=\"haveVideo()\" [icon]=\"iconType.CAMERA\" color=\"#cfcfcf\"></kitrtc-icon>\n      <kitrtc-icon *ngIf=\"!haveVideo()\" [icon]=\"iconType.CAMERA_OFF\" color=\"#cfcfcf\"></kitrtc-icon>\n    </button>\n    <button *ngIf=\"!showJoinButton\" (click)=\"toogleAudio()\"\n      [ngClass]=\"{\n        'kitrtc--container--controls--disabled': this.requestMic || !this.isConnected,\n        'kitrtc--container--controls--active': this.haveAudio()\n      }\">\n      <kitrtc-icon *ngIf=\"haveAudio()\" [icon]=\"iconType.MICROPHONE\" color=\"#cfcfcf\"></kitrtc-icon>\n      <kitrtc-icon *ngIf=\"!haveAudio()\" [icon]=\"iconType.MICROPHONE_OFF\" color=\"#cfcfcf\"></kitrtc-icon>\n    </button>\n    <button *ngIf=\"!showJoinButton\" (click)=\"leaveRoom()\"\n      [ngClass]=\"{\n        'kitrtc--container--controls--disabled': !this.isConnected\n      }\">\n      <kitrtc-icon [icon]=\"iconType.LOGOUT\" color=\"#cfcfcf\"></kitrtc-icon>\n    </button>\n    <button (click)=\"joinRoom()\" *ngIf=\"showJoinButton\" class=\"kitrtc--container--controls--connect\">Connect</button>\n  </div>\n</div>\n", styles: [".kitrtc--container{position:fixed;bottom:0;background-color:#000;right:0;left:0;display:flex;justify-content:center;align-items:center;box-shadow:0 0 6px 4px #0000005e}.kitrtc--container .kitrtc--container--icon{height:128px}.kitrtc--container .kitrtc--container--controls{justify-content:center;align-items:center;height:100%;gap:20px;display:flex}.kitrtc--container .kitrtc--container--controls button{background:none;border:none;color:#fff;background-color:#1c1c1c;padding:20px;border-radius:9px;cursor:pointer}.kitrtc--container .kitrtc--container--controls button:hover{background-color:#2c2c2c}.kitrtc--container .kitrtc--container--controls button.kitrtc--container--controls--disabled{opacity:.3;cursor:not-allowed}.kitrtc--container .kitrtc--container--controls button.kitrtc--container--controls--disabled:hover{background-color:#1c1c1c}.kitrtc--container .kitrtc--container--controls button.kitrtc--container--controls--active{background-color:#e91e63;color:#000}.kitrtc--container .kitrtc--container--controls button kitrtc-icon{width:24px;height:24px;display:block;fill:#cfcfcf}.kitrtc--container .kitrtc--container--controls button kitrtc-icon svg{fill:#cfcfcf}.kitrtc--container .kitrtc--container--controls .kitrtc--container--controls--connect{background:none;border:none;background-color:#e91e63;color:#fff;padding:10px;display:block;min-width:128px;border-radius:5px}.kitrtc--background--black{background-color:#121212}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "kitrtc-icon", inputs: ["icon", "size", "color"] }] }); }
}
export { MediaControlsComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: MediaControlsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'kitrtc-media-controls', template: "<div class=\"kitrtc--container\">\n  <kitrtc-icon class=\"kitrtc--container--icon\" [icon]=\"iconType.logo\"></kitrtc-icon>\n  <div class=\"kitrtc--container--controls\">\n    <button *ngIf=\"!showJoinButton\" (click)=\"toogleVideo()\"\n      [ngClass]=\"{\n        'kitrtc--container--controls--disabled': this.requestCamera || !this.isConnected,\n        'kitrtc--container--controls--active': this.haveVideo()\n      }\">\n      <kitrtc-icon *ngIf=\"haveVideo()\" [icon]=\"iconType.CAMERA\" color=\"#cfcfcf\"></kitrtc-icon>\n      <kitrtc-icon *ngIf=\"!haveVideo()\" [icon]=\"iconType.CAMERA_OFF\" color=\"#cfcfcf\"></kitrtc-icon>\n    </button>\n    <button *ngIf=\"!showJoinButton\" (click)=\"toogleAudio()\"\n      [ngClass]=\"{\n        'kitrtc--container--controls--disabled': this.requestMic || !this.isConnected,\n        'kitrtc--container--controls--active': this.haveAudio()\n      }\">\n      <kitrtc-icon *ngIf=\"haveAudio()\" [icon]=\"iconType.MICROPHONE\" color=\"#cfcfcf\"></kitrtc-icon>\n      <kitrtc-icon *ngIf=\"!haveAudio()\" [icon]=\"iconType.MICROPHONE_OFF\" color=\"#cfcfcf\"></kitrtc-icon>\n    </button>\n    <button *ngIf=\"!showJoinButton\" (click)=\"leaveRoom()\"\n      [ngClass]=\"{\n        'kitrtc--container--controls--disabled': !this.isConnected\n      }\">\n      <kitrtc-icon [icon]=\"iconType.LOGOUT\" color=\"#cfcfcf\"></kitrtc-icon>\n    </button>\n    <button (click)=\"joinRoom()\" *ngIf=\"showJoinButton\" class=\"kitrtc--container--controls--connect\">Connect</button>\n  </div>\n</div>\n", styles: [".kitrtc--container{position:fixed;bottom:0;background-color:#000;right:0;left:0;display:flex;justify-content:center;align-items:center;box-shadow:0 0 6px 4px #0000005e}.kitrtc--container .kitrtc--container--icon{height:128px}.kitrtc--container .kitrtc--container--controls{justify-content:center;align-items:center;height:100%;gap:20px;display:flex}.kitrtc--container .kitrtc--container--controls button{background:none;border:none;color:#fff;background-color:#1c1c1c;padding:20px;border-radius:9px;cursor:pointer}.kitrtc--container .kitrtc--container--controls button:hover{background-color:#2c2c2c}.kitrtc--container .kitrtc--container--controls button.kitrtc--container--controls--disabled{opacity:.3;cursor:not-allowed}.kitrtc--container .kitrtc--container--controls button.kitrtc--container--controls--disabled:hover{background-color:#1c1c1c}.kitrtc--container .kitrtc--container--controls button.kitrtc--container--controls--active{background-color:#e91e63;color:#000}.kitrtc--container .kitrtc--container--controls button kitrtc-icon{width:24px;height:24px;display:block;fill:#cfcfcf}.kitrtc--container .kitrtc--container--controls button kitrtc-icon svg{fill:#cfcfcf}.kitrtc--container .kitrtc--container--controls .kitrtc--container--controls--connect{background:none;border:none;background-color:#e91e63;color:#fff;padding:10px;display:block;min-width:128px;border-radius:5px}.kitrtc--background--black{background-color:#121212}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i1.KitRtc }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtY29udHJvbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFraXRhcHBqcy9zcmMvbGliL2NvbXBvbmVudHMvbWVkaWEtY29udHJvbHMvbWVkaWEtY29udHJvbHMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFraXRhcHBqcy9zcmMvbGliL2NvbXBvbmVudHMvbWVkaWEtY29udHJvbHMvbWVkaWEtY29udHJvbHMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7OztBQUVwRCxNQUthLHNCQUFzQjtJQWNqQyxZQUNVLFFBQW1CLEVBQ25CLE1BQWM7UUFEZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFmeEIsYUFBUSxHQUFHLFFBQVEsQ0FBQztRQUVwQixvQkFBZSxHQUFZLElBQUksQ0FBQztRQUVoQyxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUVoQyxzQkFBc0I7UUFDdEIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQU01QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXJFLHdDQUF3QztRQUN4QyxLQUFLLE1BQU0sV0FBVyxJQUFJLElBQUksQ0FBQyxN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QUFDO1NBQ3BDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBSUQsS0FBSyxDQUFDLFFBQVE7UUFDWixJQUFHLElBQUksQ0FBQyxXQUFXO1lBQUUsT0FBTztRQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7K0dBOUhVLHNCQUFzQjttR0FBdEIsc0JBQXNCLDZEQ1ZuQyxpZ0RBNEJBOztTRGxCYSxzQkFBc0I7NEZBQXRCLHNCQUFzQjtrQkFMbEMsU0FBUzsrQkFDRSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSWNvblR5cGUgfSBmcm9tICcuLi9pY29uL2ljb24uY29tcG9uZW50JztcbmltcG9ydCB7IEtpdFJ0YyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2tpdHJ0Yy5zZXJ2aWNlJztcbmltcG9ydCB7IFRyYWNrS2luZCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdHJhY2tzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna2l0cnRjLW1lZGlhLWNvbnRyb2xzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21lZGlhLWNvbnRyb2xzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWVkaWEtY29udHJvbHMuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNZWRpYUNvbnRyb2xzQ29tcG9uZW50IHtcbiAgaWNvblR5cGUgPSBJY29uVHlwZTtcblxuICBiYWNrZ3JvdW5kQ29sb3I6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGhhdmVMb2NhbFZpZGVvOiBib29sZWFuID0gZmFsc2U7XG4gIGhhdmVMb2NhbEF1ZGlvOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLy9QcmV2aW5nIGRvdWJsZSBjbGlja1xuICByZXF1ZXN0Q2FtZXJhOiBib29sZWFuID0gZmFsc2U7XG4gIHJlcXVlc3RNaWM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcmVxdWVzdEpvaW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgcmVxdWVzdExlYXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUga2l0UnRjOiBLaXRSdGNcbiAgKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShkb2N1bWVudC5ib2R5LCAnYmFja2dyb3VuZC1jb2xvcicsICcjMTIxMjEyJyk7XG5cbiAgICAvL2NoZWNrIGlmIHdlIGhhdmUgbG9jYWwgdmlkZW8gYW5kIGF1ZGlvXG4gICAgZm9yIChjb25zdCBsb2NhbHRyYWNrcyBvZiB0aGlzLmtpdFJ0Yy5sb2NhbFBhcnRpY2lwYW50LnRyYWNrcykge1xuICAgICAgaWYgKGxvY2FsdHJhY2tzLmtpbmQgPT09IFRyYWNrS2luZC5WSURFTykge1xuICAgICAgICB0aGlzLmhhdmVMb2NhbFZpZGVvID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChsb2NhbHRyYWNrcy5raW5kID09PSBUcmFja0tpbmQuQVVESU8pIHtcbiAgICAgICAgdGhpcy5oYXZlTG9jYWxBdWRpbyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG5cblxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZShkb2N1bWVudC5ib2R5LCAnYmFja2dyb3VuZC1jb2xvcicpO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBJcyBjb25uZWN0ZWQgaW4gcm9vbVxuICAgKiBAZGVzY3JpcHRpb24gQ2hlY2sgaWYgd2UgYXJlIGNvbm5lY3RlZCBpbiByb29tXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgZ2V0IGlzQ29ubmVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmtpdFJ0Yy5pc0Nvbm5lY3RlZCAmJiB0aGlzLmtpdFJ0Yy5yb29tLmNvbm5lY3RlZDtcbiAgfVxuXG4gIGdldCBzaG93Sm9pbkJ1dHRvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5raXRSdGMuaXNDb25uZWN0ZWQgJiYgIXRoaXMua2l0UnRjLnJvb20uY29ubmVjdGVkO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBUb29nbGUgdmlkZW9cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBhc3luYyB0b29nbGVWaWRlbygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZih0aGlzLnJlcXVlc3RDYW1lcmEgfHwgIXRoaXMuaXNDb25uZWN0ZWQpIHJldHVybjtcbiAgICB0aGlzLnJlcXVlc3RDYW1lcmEgPSB0cnVlO1xuICAgIGF3YWl0IHRoaXMua2l0UnRjLmxvY2FsUGFydGljaXBhbnQubG9jYWxUcmFja3MudG9vZ2xlQ2FtZXJhKCk7XG4gICAgdGhpcy5yZXF1ZXN0Q2FtZXJhID0gZmFsc2U7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBUb29nbGUgYXVkaW9cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBhc3luYyB0b29nbGVBdWRpbygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZih0aGlzLnJlcXVlc3RNaWMgfHwgIXRoaXMuaXNDb25uZWN0ZWQpIHJldHVybjtcbiAgICB0aGlzLnJlcXVlc3RNaWMgPSB0cnVlO1xuICAgIGF3YWl0IHRoaXMua2l0UnRjLmxvY2FsUGFydGljaXBhbnQubG9jYWxUcmFja3MudG9vZ2xlTWljKCk7XG4gICAgdGhpcy5yZXF1ZXN0TWljID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogTGVhdmUgcm9vbVxuICAgKi9cbiAgYXN5bmMgbGVhdmVSb29tKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkIHx8IHRoaXMucmVxdWVzdExlYXZlKSByZXR1cm47XG4gICAgdGhpcy5yZXF1ZXN0TGVhdmUgPSB0cnVlO1xuICAgIGF3YWl0IHRoaXMua2l0UnRjLnJvb20ubGVhdmUoKTtcbiAgICB0aGlzLnJlcXVlc3RMZWF2ZSA9IGZhbHNlO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBIYXZlIHZpZGVvXG4gICAqIEBkZXNjcmlwdGlvbiBDaGVjayBpZiB3ZSBoYXZlIHZpZGVvXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaGF2ZVZpZGVvKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGZpbmQgPSB0aGlzLmtpdFJ0Yy5sb2NhbFBhcnRpY2lwYW50LnRyYWNrcy5maW5kKCh0cmFjaykgPT4gdHJhY2sua2luZCA9PT0gVHJhY2tLaW5kLlZJREVPKTtcbiAgICBpZiAoZmluZCkge1xuICAgICAgaWYoZmluZC50cmFjay5lbmFibGVkKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhdmUgYXVkaW9cbiAgICogQGRlc2NyaXB0aW9uIENoZWNrIGlmIHdlIGhhdmUgYXVkaW9cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBoYXZlQXVkaW8oKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZmluZCA9IHRoaXMua2l0UnRjLmxvY2FsUGFydGljaXBhbnQudHJhY2tzLmZpbmQoKHRyYWNrKSA9PiB0cmFjay5raW5kID09PSBUcmFja0tpbmQuQVVESU8pO1xuICAgIGlmIChmaW5kKSB7XG4gICAgICBpZihmaW5kLnRyYWNrLmVuYWJsZWQpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuXG5cbiAgYXN5bmMgam9pblJvb20oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYodGhpcy5yZXF1ZXN0Sm9pbikgcmV0dXJuO1xuICAgIHRoaXMucmVxdWVzdEpvaW4gPSB0cnVlO1xuICAgIGF3YWl0IHRoaXMua2l0UnRjLnJvb20uam9pbigpO1xuICAgIHRoaXMucmVxdWVzdEpvaW4gPSBmYWxzZTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImtpdHJ0Yy0tY29udGFpbmVyXCI+XG4gIDxraXRydGMtaWNvbiBjbGFzcz1cImtpdHJ0Yy0tY29udGFpbmVyLS1pY29uXCIgW2ljb25dPVwiaWNvblR5cGUubG9nb1wiPjwva2l0cnRjLWljb24+XG4gIDxkaXYgY2xhc3M9XCJraXRydGMtLWNvbnRhaW5lci0tY29udHJvbHNcIj5cbiAgICA8YnV0dG9uICpuZ0lmPVwiIXNob3dKb2luQnV0dG9uXCIgKGNsaWNrKT1cInRvb2dsZVZpZGVvKClcIlxuICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAna2l0cnRjLS1jb250YWluZXItLWNvbnRyb2xzLS1kaXNhYmxlZCc6IHRoaXMucmVxdWVzdENhbWVyYSB8fCAhdGhpcy5pc0Nvbm5lY3RlZCxcbiAgICAgICAgJ2tpdHJ0Yy0tY29udGFpbmVyLS1jb250cm9scy0tYWN0aXZlJzogdGhpcy5oYXZlVmlkZW8oKVxuICAgICAgfVwiPlxuICAgICAgPGtpdHJ0Yy1pY29uICpuZ0lmPVwiaGF2ZVZpZGVvKClcIiBbaWNvbl09XCJpY29uVHlwZS5DQU1FUkFcIiBjb2xvcj1cIiNjZmNmY2ZcIj48L2tpdHJ0Yy1pY29uPlxuICAgICAgPGtpdHJ0Yy1pY29uICpuZ0lmPVwiIWhhdmVWaWRlbygpXCIgW2ljb25dPVwiaWNvblR5cGUuQ0FNRVJBX09GRlwiIGNvbG9yPVwiI2NmY2ZjZlwiPjwva2l0cnRjLWljb24+XG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvbiAqbmdJZj1cIiFzaG93Sm9pbkJ1dHRvblwiIChjbGljayk9XCJ0b29nbGVBdWRpbygpXCJcbiAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgJ2tpdHJ0Yy0tY29udGFpbmVyLS1jb250cm9scy0tZGlzYWJsZWQnOiB0aGlzLnJlcXVlc3RNaWMgfHwgIXRoaXMuaXNDb25uZWN0ZWQsXG4gICAgICAgICdraXRydGMtLWNvbnRhaW5lci0tY29udHJvbHMtLWFjdGl2ZSc6IHRoaXMuaGF2ZUF1ZGlvKClcbiAgICAgIH1cIj5cbiAgICAgIDxraXRydGMtaWNvbiAqbmdJZj1cImhhdmVBdWRpbygpXCIgW2ljb25dPVwiaWNvblR5cGUuTUlDUk9QSE9ORVwiIGNvbG9yPVwiI2NmY2ZjZlwiPjwva2l0cnRjLWljb24+XG4gICAgICA8a2l0cnRjLWljb24gKm5nSWY9XCIhaGF2ZUF1ZGlvKClcIiBbaWNvbl09XCJpY29uVHlwZS5NSUNST1BIT05FX09GRlwiIGNvbG9yPVwiI2NmY2ZjZlwiPjwva2l0cnRjLWljb24+XG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvbiAqbmdJZj1cIiFzaG93Sm9pbkJ1dHRvblwiIChjbGljayk9XCJsZWF2ZVJvb20oKVwiXG4gICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICdraXRydGMtLWNvbnRhaW5lci0tY29udHJvbHMtLWRpc2FibGVkJzogIXRoaXMuaXNDb25uZWN0ZWRcbiAgICAgIH1cIj5cbiAgICAgIDxraXRydGMtaWNvbiBbaWNvbl09XCJpY29uVHlwZS5MT0dPVVRcIiBjb2xvcj1cIiNjZmNmY2ZcIj48L2tpdHJ0Yy1pY29uPlxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b24gKGNsaWNrKT1cImpvaW5Sb29tKClcIiAqbmdJZj1cInNob3dKb2luQnV0dG9uXCIgY2xhc3M9XCJraXRydGMtLWNvbnRhaW5lci0tY29udHJvbHMtLWNvbm5lY3RcIj5Db25uZWN0PC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=