import { NgModule } from '@angular/core';
import { ParticipantsComponent } from './components/participants/participants.component';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { ParticipantComponent } from './components/participants/participant/participant.component';
import { LocalParticipantComponent } from './components/participants/local-participant/local-participant.component';
import { TrackComponent } from './components/tracks/tracks.component';
import { MediaControlsComponent } from './components/media-controls/media-controls.component';
import * as i0 from "@angular/core";
class KitRtcModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: KitRtcModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.11", ngImport: i0, type: KitRtcModule, declarations: [ParticipantsComponent,
            IconComponent,
            ParticipantComponent,
            LocalParticipantComponent,
            TrackComponent,
            MediaControlsComponent], imports: [CommonModule], exports: [ParticipantsComponent,
            LocalParticipantComponent,
            MediaControlsComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: KitRtcModule, imports: [CommonModule] }); }
}
export { KitRtcModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: KitRtcModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ParticipantsComponent,
                        IconComponent,
                        ParticipantComponent,
                        LocalParticipantComponent,
                        TrackComponent,
                        MediaControlsComponent
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        ParticipantsComponent,
                        LocalParticipantComponent,
                        MediaControlsComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2l0cnRjLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlha2l0YXBwanMvc3JjL2xpYi9raXRydGMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDekYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUNuRyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx5RUFBeUUsQ0FBQztBQUNwSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0RBQXNELENBQUM7O0FBSTlGLE1BbUJhLFlBQVk7K0dBQVosWUFBWTtnSEFBWixZQUFZLGlCQWpCckIscUJBQXFCO1lBQ3JCLGFBQWE7WUFDYixvQkFBb0I7WUFDcEIseUJBQXlCO1lBQ3pCLGNBQWM7WUFDZCxzQkFBc0IsYUFHdEIsWUFBWSxhQUdaLHFCQUFxQjtZQUNyQix5QkFBeUI7WUFDekIsc0JBQXNCO2dIQUliLFlBQVksWUFUckIsWUFBWTs7U0FTSCxZQUFZOzRGQUFaLFlBQVk7a0JBbkJ4QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixxQkFBcUI7d0JBQ3JCLGFBQWE7d0JBQ2Isb0JBQW9CO3dCQUNwQix5QkFBeUI7d0JBQ3pCLGNBQWM7d0JBQ2Qsc0JBQXNCO3FCQUN2QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTtxQkFDYjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AscUJBQXFCO3dCQUNyQix5QkFBeUI7d0JBQ3pCLHNCQUFzQjtxQkFDdkI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFydGljaXBhbnRzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3BhcnRpY2lwYW50cy9wYXJ0aWNpcGFudHMuY29tcG9uZW50JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJY29uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ljb24vaWNvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFydGljaXBhbnRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcGFydGljaXBhbnRzL3BhcnRpY2lwYW50L3BhcnRpY2lwYW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2NhbFBhcnRpY2lwYW50Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3BhcnRpY2lwYW50cy9sb2NhbC1wYXJ0aWNpcGFudC9sb2NhbC1wYXJ0aWNpcGFudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhY2tDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJhY2tzL3RyYWNrcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVkaWFDb250cm9sc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tZWRpYS1jb250cm9scy9tZWRpYS1jb250cm9scy5jb21wb25lbnQnO1xuXG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgUGFydGljaXBhbnRzQ29tcG9uZW50LFxuICAgIEljb25Db21wb25lbnQsXG4gICAgUGFydGljaXBhbnRDb21wb25lbnQsXG4gICAgTG9jYWxQYXJ0aWNpcGFudENvbXBvbmVudCxcbiAgICBUcmFja0NvbXBvbmVudCxcbiAgICBNZWRpYUNvbnRyb2xzQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFBhcnRpY2lwYW50c0NvbXBvbmVudCxcbiAgICBMb2NhbFBhcnRpY2lwYW50Q29tcG9uZW50LFxuICAgIE1lZGlhQ29udHJvbHNDb21wb25lbnRcbiAgXVxufSlcblxuZXhwb3J0IGNsYXNzIEtpdFJ0Y01vZHVsZSB7IH1cbiJdfQ==