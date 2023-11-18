import { Component, Input, ViewChild } from '@angular/core';
import { Logger } from '../../class/logger';
import { LoggerColors } from '../../interfaces/logger';
import { IconType } from '../icon/icon.component';
import * as i0 from "@angular/core";
import * as i1 from "../../services/kitrtc.service";
import * as i2 from "@angular/common";
import * as i3 from "../icon/icon.component";
class TrackComponent {
    constructor(kitRtc) {
        this.kitRtc = kitRtc;
        this.logger = new Logger();
        this.iconType = IconType;
        this.autoPlayPolicySkip = true;
        this.isLoaded = false;
        this.onPlayed = false;
        this.local = true;
    }
    ngOnInit() {
        if (this.track)
            this.track.trackComponent = this;
    }
    ngAfterViewInit() {
        if (!this.stream)
            return;
        if (this.local) {
            this.stream.nativeElement.muted = true;
        }
        else {
            this.stream.nativeElement.muted = false;
        }
        this.stream.nativeElement.controls = false;
        this.stream.nativeElement.autoplay = true;
        if (this.stream.nativeElement instanceof HTMLVideoElement) {
            this.stream.nativeElement.playsInline = true;
        }
        if (this.track) {
            this.track.getAutoSource = this.stream.nativeElement;
            this.stream.nativeElement.srcObject = this.track.stream;
            this.autoPlay();
        }
    }
    loadeddata() {
        if (!this.stream)
            return;
        this.isLoaded = true;
    }
    onPlaying() {
        if (!this.stream)
            return;
        this.onPlayed = true;
    }
    /**
     * Auto play
     * @description Auto play media element
     * @returns {Promise<void>}
     */
    async autoPlay() {
        if (!this.stream)
            return;
        const media = this.stream.nativeElement;
        try {
            if (this.local) {
                media.muted = true;
            }
            else {
                media.muted = false;
            }
            media.play().then(() => {
                this.autoPlayPolicySkip = true;
            }, async (error) => {
                if (error.code === 20) {
                    return;
                }
                if (error.code !== 0)
                    this.logger.log(LoggerColors.RED, { event: 'auto-play', error });
                this.autoPlayPolicySkip = false;
                media.muted = true;
                await media.play().then(() => {
                }).catch((error) => {
                    if (error.code !== 0)
                        this.logger.log(LoggerColors.RED, { event: 'auto-play', message: error.message });
                });
            });
        }
        catch (error) {
            this.logger.log(LoggerColors.RED, { event: 'auto-play', message: error });
        }
    }
    /**
     * Auto play for policy
     */
    autoPlayForPolicy() {
        if (this.autoPlayPolicySkip)
            return;
        this.autoPlay();
        this.kitRtc.autoPlayPolicy();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: TrackComponent, deps: [{ token: i1.KitRtc }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.11", type: TrackComponent, selector: "kitrtc-track", inputs: { track: "track", local: "local" }, viewQueries: [{ propertyName: "stream", first: true, predicate: ["stream"], descendants: true }], ngImport: i0, template: "<video #stream *ngIf=\"track?.kind === 'video'\" (loadeddata)=\"loadeddata()\" (onplaying)=\"onPlaying()\"></video>\n<audio #stream *ngIf=\"track?.kind === 'audio'\" muted></audio>\n\n<!-- Icon for poster -->\n<kitrtc-icon [icon]=\"iconType.logo\" *ngIf=\"!isLoaded && !onPlayed && track?.kind === 'video'\"></kitrtc-icon>\n\n<!-- For autoplay policy -->\n<div class=\"dialog-silenced\" (click)=\"autoPlayForPolicy()\" *ngIf=\"!autoPlayPolicySkip\" [ngClass]=\"{\n    'track--video': track?.kind === 'video',\n  }\">\n  <div class=\"dialog-bg\">\n    <kitrtc-icon [icon]=\"iconType.logo\"></kitrtc-icon>\n  </div>\n  <button><kitrtc-icon [icon]=\"iconType.muted\"></kitrtc-icon></button>\n</div>\n", styles: [":host{width:100%;display:block;height:100%;position:absolute;inset:0}:host audio{display:none}:host .dialog-silenced{display:flex;justify-content:center;align-items:center;width:100%;height:100%;position:absolute;top:0;background-color:#0000007f;transition:.5s background-color;z-index:5}:host .dialog-silenced:hover{background-color:#0000004d}:host .dialog-silenced:hover button{background-color:#0000007f}:host .dialog-silenced.track--video{z-index:6}:host .dialog-silenced .dialog-bg{width:100%;height:100%;position:absolute;z-index:-1;opacity:.1;cursor:unset;pointer-events:none}:host .dialog-silenced button{border:none;background:none;box-shadow:unset;color:red;border-radius:100%;height:45px;width:45px;display:flex;justify-content:center;align-items:center;cursor:pointer}:host video{width:100%;height:100%;cursor:unset;-webkit-user-select:none;user-select:none;pointer-events:none;background-color:#000000e5}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "kitrtc-icon", inputs: ["icon", "size", "color"] }] }); }
}
export { TrackComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: TrackComponent, decorators: [{
            type: Component,
            args: [{ selector: 'kitrtc-track', template: "<video #stream *ngIf=\"track?.kind === 'video'\" (loadeddata)=\"loadeddata()\" (onplaying)=\"onPlaying()\"></video>\n<audio #stream *ngIf=\"track?.kind === 'audio'\" muted></audio>\n\n<!-- Icon for poster -->\n<kitrtc-icon [icon]=\"iconType.logo\" *ngIf=\"!isLoaded && !onPlayed && track?.kind === 'video'\"></kitrtc-icon>\n\n<!-- For autoplay policy -->\n<div class=\"dialog-silenced\" (click)=\"autoPlayForPolicy()\" *ngIf=\"!autoPlayPolicySkip\" [ngClass]=\"{\n    'track--video': track?.kind === 'video',\n  }\">\n  <div class=\"dialog-bg\">\n    <kitrtc-icon [icon]=\"iconType.logo\"></kitrtc-icon>\n  </div>\n  <button><kitrtc-icon [icon]=\"iconType.muted\"></kitrtc-icon></button>\n</div>\n", styles: [":host{width:100%;display:block;height:100%;position:absolute;inset:0}:host audio{display:none}:host .dialog-silenced{display:flex;justify-content:center;align-items:center;width:100%;height:100%;position:absolute;top:0;background-color:#0000007f;transition:.5s background-color;z-index:5}:host .dialog-silenced:hover{background-color:#0000004d}:host .dialog-silenced:hover button{background-color:#0000007f}:host .dialog-silenced.track--video{z-index:6}:host .dialog-silenced .dialog-bg{width:100%;height:100%;position:absolute;z-index:-1;opacity:.1;cursor:unset;pointer-events:none}:host .dialog-silenced button{border:none;background:none;box-shadow:unset;color:red;border-radius:100%;height:45px;width:45px;display:flex;justify-content:center;align-items:center;cursor:pointer}:host video{width:100%;height:100%;cursor:unset;-webkit-user-select:none;user-select:none;pointer-events:none;background-color:#000000e5}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.KitRtc }]; }, propDecorators: { stream: [{
                type: ViewChild,
                args: ['stream', { static: false }]
            }], track: [{
                type: Input
            }], local: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlha2l0YXBwanMvc3JjL2xpYi9jb21wb25lbnRzL3RyYWNrcy90cmFja3MuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFraXRhcHBqcy9zcmMvbGliL2NvbXBvbmVudHMvdHJhY2tzL3RyYWNrcy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7O0FBR2xELE1BS2EsY0FBYztJQWF6QixZQUNVLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBVHhCLFdBQU0sR0FBVyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQzlCLGFBQVEsR0FBRyxRQUFRLENBQUM7UUFDcEIsdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FBR25DLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUt4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUcsSUFBSSxDQUFDLEtBQUs7WUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDbEQsQ0FBQztJQUlELGVBQWU7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07WUFBRSxPQUFPO1FBQ3pCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxN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LEtBQUssRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDM0U7SUFDSCxDQUFDO0lBS0Q7O09BRUc7SUFDSCxpQkFBaUI7UUFDZixJQUFHLElBQUksQ0FBQyxrQkFBa0I7WUFBRSxPQUFPO1FBQ25DLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQy9CLENBQUM7K0dBeEdVLGNBQWM7bUdBQWQsY0FBYyxrTUNaM0IsMnJCQWVBOztTREhhLGNBQWM7NEZBQWQsY0FBYztrQkFMMUIsU0FBUzsrQkFDRSxjQUFjOzZGQUtnQixNQUFNO3NCQUE3QyxTQUFTO3VCQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBQzdCLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYWNrIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90cmFja3MnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi4vLi4vY2xhc3MvbG9nZ2VyJztcbmltcG9ydCB7IExvZ2dlckNvbG9ycyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvbG9nZ2VyJztcbmltcG9ydCB7IEljb25UeXBlIH0gZnJvbSAnLi4vaWNvbi9pY29uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBLaXRSdGMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9raXRydGMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tpdHJ0Yy10cmFjaycsXG4gIHRlbXBsYXRlVXJsOiAnLi90cmFja3MuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90cmFja3MuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRyYWNrQ29tcG9uZW50IHtcbiAgQFZpZXdDaGlsZCgnc3RyZWFtJywgeyBzdGF0aWM6IGZhbHNlIH0pIHN0cmVhbT86IEVsZW1lbnRSZWY8SFRNTFZpZGVvRWxlbWVudCB8IEhUTUxBdWRpb0VsZW1lbnQ+O1xuICBASW5wdXQoKSB0cmFjaz86IFRyYWNrXG4gIEBJbnB1dCgpIGxvY2FsOiBib29sZWFuXG5cbiAgbG9nZ2VyOiBMb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gIGljb25UeXBlID0gSWNvblR5cGU7XG4gIGF1dG9QbGF5UG9saWN5U2tpcDogYm9vbGVhbiA9IHRydWU7XG5cblxuICBpc0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBvblBsYXllZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUga2l0UnRjOiBLaXRSdGMsXG4gICkge1xuICAgIHRoaXMubG9jYWwgPSB0cnVlO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYodGhpcy50cmFjaykgdGhpcy50cmFjay50cmFja0NvbXBvbmVudCA9IHRoaXM7XG4gIH1cblxuXG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICghdGhpcy5zdHJlYW0pIHJldHVybjtcbiAgICBpZiAodGhpcy5sb2NhbCkge1xuICAgICAgdGhpcy5zdHJlYW0ubmF0aXZlRWxlbWVudC5tdXRlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RyZWFtLm5hdGl2ZUVsZW1lbnQubXV0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLnN0cmVhbS5uYXRpdmVFbGVtZW50LmNvbnRyb2xzID0gZmFsc2U7XG4gICAgdGhpcy5zdHJlYW0ubmF0aXZlRWxlbWVudC5hdXRvcGxheSA9IHRydWU7XG5cblxuICAgIGlmICh0aGlzLnN0cmVhbS5uYXRpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTFZpZGVvRWxlbWVudCkge1xuICAgICAgdGhpcy5zdHJlYW0ubmF0aXZlRWxlbWVudC5wbGF5c0lubGluZSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudHJhY2spIHtcbiAgICAgIHRoaXMudHJhY2suZ2V0QXV0b1NvdXJjZSA9IHRoaXMuc3RyZWFtLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLnN0cmVhbS5uYXRpdmVFbGVtZW50LnNyY09iamVjdCA9IHRoaXMudHJhY2suc3RyZWFtO1xuICAgICAgdGhpcy5hdXRvUGxheSgpO1xuICAgIH1cbiAgfVxuXG5cblxuXG4gIGxvYWRlZGRhdGEoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnN0cmVhbSkgcmV0dXJuO1xuICAgIHRoaXMuaXNMb2FkZWQgPSB0cnVlO1xuICB9XG5cbiAgb25QbGF5aW5nKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zdHJlYW0pIHJldHVybjtcbiAgICB0aGlzLm9uUGxheWVkID0gdHJ1ZTtcbiAgfVxuXG5cblxuICAvKipcbiAgICogQXV0byBwbGF5XG4gICAqIEBkZXNjcmlwdGlvbiBBdXRvIHBsYXkgbWVkaWEgZWxlbWVudFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIGFzeW5jIGF1dG9QbGF5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy5zdHJlYW0pIHJldHVybjtcbiAgICBjb25zdCBtZWRpYSA9IHRoaXMuc3RyZWFtLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLmxvY2FsKSB7XG4gICAgICAgIG1lZGlhLm11dGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lZGlhLm11dGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBtZWRpYS5wbGF5KCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuYXV0b1BsYXlQb2xpY3lTa2lwID0gdHJ1ZTtcbiAgICAgIH0sIGFzeW5jIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgIGlmIChlcnJvci5jb2RlID09PSAyMCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKGVycm9yLmNvZGUgIT09IDApIHRoaXMubG9nZ2VyLmxvZyhMb2dnZXJDb2xvcnMuUkVELCB7IGV2ZW50OiAnYXV0by1wbGF5JywgZXJyb3IgfSk7XG4gICAgICAgIHRoaXMuYXV0b1BsYXlQb2xpY3lTa2lwID0gZmFsc2U7XG4gICAgICAgIG1lZGlhLm11dGVkID0gdHJ1ZTtcbiAgICAgICAgYXdhaXQgbWVkaWEucGxheSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBpZiAoZXJyb3IuY29kZSAhPT0gMCkgdGhpcy5sb2dnZXIubG9nKExvZ2dlckNvbG9ycy5SRUQsIHsgZXZlbnQ6ICdhdXRvLXBsYXknLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmxvZ2dlci5sb2coTG9nZ2VyQ29sb3JzLlJFRCwgeyBldmVudDogJ2F1dG8tcGxheScsIG1lc3NhZ2U6IGVycm9yIH0pO1xuICAgIH1cbiAgfVxuXG5cblxuXG4gIC8qKlxuICAgKiBBdXRvIHBsYXkgZm9yIHBvbGljeVxuICAgKi9cbiAgYXV0b1BsYXlGb3JQb2xpY3koKTogdm9pZHtcbiAgICBpZih0aGlzLmF1dG9QbGF5UG9saWN5U2tpcCkgcmV0dXJuO1xuICAgIHRoaXMuYXV0b1BsYXkoKTtcbiAgICB0aGlzLmtpdFJ0Yy5hdXRvUGxheVBvbGljeSgpO1xuICB9XG5cblxufVxuIiwiPHZpZGVvICNzdHJlYW0gKm5nSWY9XCJ0cmFjaz8ua2luZCA9PT0gJ3ZpZGVvJ1wiIChsb2FkZWRkYXRhKT1cImxvYWRlZGRhdGEoKVwiIChvbnBsYXlpbmcpPVwib25QbGF5aW5nKClcIj48L3ZpZGVvPlxuPGF1ZGlvICNzdHJlYW0gKm5nSWY9XCJ0cmFjaz8ua2luZCA9PT0gJ2F1ZGlvJ1wiIG11dGVkPjwvYXVkaW8+XG5cbjwhLS0gSWNvbiBmb3IgcG9zdGVyIC0tPlxuPGtpdHJ0Yy1pY29uIFtpY29uXT1cImljb25UeXBlLmxvZ29cIiAqbmdJZj1cIiFpc0xvYWRlZCAmJiAhb25QbGF5ZWQgJiYgdHJhY2s/LmtpbmQgPT09ICd2aWRlbydcIj48L2tpdHJ0Yy1pY29uPlxuXG48IS0tIEZvciBhdXRvcGxheSBwb2xpY3kgLS0+XG48ZGl2IGNsYXNzPVwiZGlhbG9nLXNpbGVuY2VkXCIgKGNsaWNrKT1cImF1dG9QbGF5Rm9yUG9saWN5KClcIiAqbmdJZj1cIiFhdXRvUGxheVBvbGljeVNraXBcIiBbbmdDbGFzc109XCJ7XG4gICAgJ3RyYWNrLS12aWRlbyc6IHRyYWNrPy5raW5kID09PSAndmlkZW8nLFxuICB9XCI+XG4gIDxkaXYgY2xhc3M9XCJkaWFsb2ctYmdcIj5cbiAgICA8a2l0cnRjLWljb24gW2ljb25dPVwiaWNvblR5cGUubG9nb1wiPjwva2l0cnRjLWljb24+XG4gIDwvZGl2PlxuICA8YnV0dG9uPjxraXRydGMtaWNvbiBbaWNvbl09XCJpY29uVHlwZS5tdXRlZFwiPjwva2l0cnRjLWljb24+PC9idXR0b24+XG48L2Rpdj5cbiJdfQ==