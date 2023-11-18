import * as i0 from "@angular/core";
export declare enum IconType {
    muted = "muted",
    maximized = "maximized",
    logo = "logo",
    CAMERA = "CAMERA",
    CAMERA_OFF = "CAMERA_OFF",
    MICROPHONE = "MICROPHONE",
    MICROPHONE_OFF = "MICROPHONE_OFF",
    LOGOUT = "LOGOUT"
}
export declare class IconComponent {
    icon: IconType;
    size: string;
    color: string;
    iconType: typeof IconType;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<IconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconComponent, "kitrtc-icon", never, { "icon": { "alias": "icon"; "required": false; }; "size": { "alias": "size"; "required": false; }; "color": { "alias": "color"; "required": false; }; }, {}, never, never, false, never>;
}
