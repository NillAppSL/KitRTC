import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/kitrtc.service";
import * as i2 from "@angular/common";
import * as i3 from "../participant/participant.component";
class LocalParticipantComponent {
    constructor(kitRtc) {
        this.kitRtc = kitRtc;
        this._kitRtc = kitRtc;
    }
    get localParticipant() {
        return this._kitRtc.localParticipant;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: LocalParticipantComponent, deps: [{ token: i1.KitRtc }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.11", type: LocalParticipantComponent, selector: "kitrtc-local-participant", ngImport: i0, template: "<ng-container *ngIf=\"localParticipant\">\n    <kitrtc-participant [participant]=\"localParticipant\" />\n</ng-container>\n", styles: [":host{height:128px;width:128px;display:block}:host ::ng-deep kitrtc-participant>.participant{padding:0;width:100%;display:block;height:100%;min-height:100%}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.ParticipantComponent, selector: "kitrtc-participant", inputs: ["participant"] }] }); }
}
export { LocalParticipantComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: LocalParticipantComponent, decorators: [{
            type: Component,
            args: [{ selector: 'kitrtc-local-participant', template: "<ng-container *ngIf=\"localParticipant\">\n    <kitrtc-participant [participant]=\"localParticipant\" />\n</ng-container>\n", styles: [":host{height:128px;width:128px;display:block}:host ::ng-deep kitrtc-participant>.participant{padding:0;width:100%;display:block;height:100%;min-height:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.KitRtc }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtcGFydGljaXBhbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFraXRhcHBqcy9zcmMvbGliL2NvbXBvbmVudHMvcGFydGljaXBhbnRzL2xvY2FsLXBhcnRpY2lwYW50L2xvY2FsLXBhcnRpY2lwYW50LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlha2l0YXBwanMvc3JjL2xpYi9jb21wb25lbnRzL3BhcnRpY2lwYW50cy9sb2NhbC1wYXJ0aWNpcGFudC9sb2NhbC1wYXJ0aWNpcGFudC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQUcxQyxNQU1hLHlCQUF5QjtJQUdwQyxZQUNTLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRXJCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7SUFDdkMsQ0FBQzsrR0FYVSx5QkFBeUI7bUdBQXpCLHlCQUF5QixnRUNUdEMsNkhBR0E7O1NETWEseUJBQXlCOzRGQUF6Qix5QkFBeUI7a0JBTnJDLFNBQVM7K0JBQ0UsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLaXRSdGMgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9raXRydGMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tpdHJ0Yy1sb2NhbC1wYXJ0aWNpcGFudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9sb2NhbC1wYXJ0aWNpcGFudC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xvY2FsLXBhcnRpY2lwYW50LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBMb2NhbFBhcnRpY2lwYW50Q29tcG9uZW50IHtcbiAgX2tpdFJ0YzogS2l0UnRjO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBraXRSdGM6IEtpdFJ0YyxcbiAgKSB7XG4gICAgdGhpcy5fa2l0UnRjID0ga2l0UnRjO1xuICB9XG5cbiAgZ2V0IGxvY2FsUGFydGljaXBhbnQoKXtcbiAgICByZXR1cm4gdGhpcy5fa2l0UnRjLmxvY2FsUGFydGljaXBhbnQ7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJsb2NhbFBhcnRpY2lwYW50XCI+XG4gICAgPGtpdHJ0Yy1wYXJ0aWNpcGFudCBbcGFydGljaXBhbnRdPVwibG9jYWxQYXJ0aWNpcGFudFwiIC8+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==