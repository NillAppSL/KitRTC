import * as i0 from '@angular/core';
import { Component, Input, Injectable, ViewChild, NgModule } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import { io } from 'socket.io-client';
import { BehaviorSubject, Subject } from 'rxjs';

var IconType;
(function (IconType) {
    IconType["muted"] = "muted";
    IconType["maximized"] = "maximized";
    IconType["logo"] = "logo";
    IconType["CAMERA"] = "CAMERA";
    IconType["CAMERA_OFF"] = "CAMERA_OFF";
    IconType["MICROPHONE"] = "MICROPHONE";
    IconType["MICROPHONE_OFF"] = "MICROPHONE_OFF";
    IconType["LOGOUT"] = "LOGOUT";
})(IconType || (IconType = {}));
class IconComponent {
    constructor() {
        this.icon = IconType.muted;
        this.size = "24px";
        this.color = "#ffffff";
        this.iconType = IconType;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: IconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.11", type: IconComponent, selector: "kitrtc-icon", inputs: { icon: "icon", size: "size", color: "color" }, ngImport: i0, template: "<ng-container *ngIf=\"icon === iconType.muted\">\n  <svg width=\"32px\" height=\"32px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <g clip-path=\"url(#clip0_15_183)\">\n      <path d=\"M3 16V8H6L11 4V20L6 16H3Z\" stroke=\"#FFFFFF\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n      <path d=\"M14.5 15L20.5 9\" stroke=\"#FFFFFF\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n      <path d=\"M14.5 9L20.5 15\" stroke=\"#FFFFFF\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n    </g>\n    <defs>\n      <clipPath id=\"clip0_15_183\">\n        <rect width=\"24\" height=\"24\" fill=\"white\" />\n      </clipPath>\n    </defs>\n  </svg>\n</ng-container>\n\n<ng-container *ngIf=\"icon === iconType.maximized\">\n  <svg fill=\"#FFFFFF\" width=\"24px\" height=\"24px\" viewBox=\"0 0 32 32\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path\n      d=\"M12 28.75h-8.75v-8.75c0-0.69-0.56-1.25-1.25-1.25s-1.25 0.56-1.25 1.25v0 10c0 0.69 0.56 1.25 1.25 1.25h10c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM30 18.75c-0.69 0.001-1.249 0.56-1.25 1.25v8.75h-8.75c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h10c0.69-0.001 1.249-0.56 1.25-1.25v-10c-0.001-0.69-0.56-1.249-1.25-1.25h-0zM12 0.75h-10c-0.69 0-1.25 0.56-1.25 1.25v0 10c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-8.75h8.75c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM30 0.75h-10c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h8.75v8.75c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-10c-0-0.69-0.56-1.25-1.25-1.25h-0z\">\n    </path>\n  </svg>\n</ng-container>\n\n\n\n<ng-container *ngIf=\"icon === iconType.CAMERA\">\n  <svg [attr.fill]=\"color\" width=\"100%\" height=\"100%\" viewBox=\"0 0 1920 1920\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M0 240v1440h1500.536v-438.89L1920 1574.062V346.051L1500.536 678.89V240H0Zm109.779 109.779h1280.979v556.348l177.995-141.29 241.468-191.66v773.646l-241.468-191.549-177.995-141.29v556.236H109.778V349.78Z\" fill-rule=\"evenodd\"/>\n  </svg>\n</ng-container>\n\n<ng-container *ngIf=\"icon === iconType.CAMERA_OFF\">\n  <svg [attr.fill]=\"color\" width=\"100%\" height=\"100%\" viewBox=\"0 0 1920 1920\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"m1421.141 2.417 91.775 64.262L215.481 1918.962l.595.416-.378.54-92.37-64.678L246.074 1680H0V240h1254.726L1421.141 2.416Zm79.395 278.487V678.89L1920 346.052v1228.01l-419.464-332.951V1680H520.538l76.895-109.78 793.325.001v-556.235l177.995 141.29 241.468 191.548V573.176l-241.468 191.662-177.995 141.29-.001-468.498 109.779-156.726Zm-322.705 68.874H109.779v1220.443h213.19l854.862-1220.443Z\" fill-rule=\"evenodd\"/>\n  </svg>\n</ng-container>\n\n\n<ng-container *ngIf=\"icon === iconType.MICROPHONE\">\n  <svg width=\"100%\" height=\"100%\" viewBox=\"-0.5 0 25 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path [attr.stroke]=\"color\" d=\"M7 7.40991C7 6.08383 7.52677 4.81207 8.46445 3.87439C9.40213 2.93671 10.6739 2.40991 12 2.40991C13.3261 2.40991 14.5978 2.93671 15.5355 3.87439C16.4732 4.81207 17 6.08383 17 7.40991V13.4099C17 14.736 16.4732 16.0079 15.5355 16.9456C14.5978 17.8832 13.3261 18.4099 12 18.4099C10.6739 18.4099 9.40213 17.8832 8.46445 16.9456C7.52677 16.0079 7 14.736 7 13.4099V7.40991Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path [attr.stroke]=\"color\" d=\"M21 13.4099C21 15.7969 20.0518 18.0861 18.364 19.7739C16.6761 21.4618 14.3869 22.4099 12 22.4099C9.61305 22.4099 7.32384 21.4618 5.63602 19.7739C3.94819 18.0861 3 15.7969 3 13.4099\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n</ng-container>\n\n<ng-container *ngIf=\"icon === iconType.MICROPHONE_OFF\">\n  <svg width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path [attr.stroke]=\"color\" d=\"M17.0005 11.24V13C17.0005 14.3261 16.4737 15.5978 15.536 16.5355C14.5983 17.4732 13.3266 18 12.0005 18C11.4846 17.9975 10.972 17.9166 10.4805 17.76\"  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path [attr.stroke]=\"color\" d=\"M8 16C7.35089 15.1345 7 14.0819 7 13V7C7 5.67392 7.52677 4.40216 8.46445 3.46448C9.40213 2.5268 10.6739 2 12 2C13.3261 2 14.5978 2.5268 15.5355 3.46448C16.4732 4.40216 17 5.67392 17 7\"  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path [attr.stroke]=\"color\" d=\"M5.21081 18.84C3.81268 17.216 3.04593 15.1429 3.0508 13\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path [attr.stroke]=\"color\" d=\"M21.0007 13C20.9995 14.5822 20.5812 16.1361 19.788 17.5051C18.9948 18.8741 17.8547 20.0098 16.4827 20.7977C15.1107 21.5857 13.5551 21.9979 11.973 21.993C10.3908 21.9882 8.83786 21.5664 7.4707 20.77\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path [attr.stroke]=\"color\" d=\"M22 2L2 22\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n</ng-container>\n\n\n\n<ng-container *ngIf=\"icon === iconType.LOGOUT\">\n  <svg width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M15 12L6 12M6 12L8 14M6 12L8 10\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M12 21.9827C10.4465 21.9359 9.51995 21.7626 8.87865 21.1213C8.11027 20.3529 8.01382 19.175 8.00171 17M16 21.9983C18.175 21.9862 19.3529 21.8897 20.1213 21.1213C21 20.2426 21 18.8284 21 16V14V10V8C21 5.17157 21 3.75736 20.1213 2.87868C19.2426 2 17.8284 2 15 2H14C11.1715 2 9.75733 2 8.87865 2.87868C8.11027 3.64706 8.01382 4.82497 8.00171 7\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>\n    <path d=\"M3 9.5V14.5C3 16.857 3 18.0355 3.73223 18.7678C4.46447 19.5 5.64298 19.5 8 19.5M3.73223 5.23223C4.46447 4.5 5.64298 4.5 8 4.5\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>\n  </svg>\n</ng-container>\n\n\n<ng-container *ngIf=\"icon === iconType.logo\">\n  <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\"\n    y=\"0px\" width=\"100%\" height=\"100%\" viewBox=\"0 0 2818 1388\" enable-background=\"new 0 0 2818 1388\"\n    xml:space=\"preserve\">\n    <path fill=\"#FDFDFD\" opacity=\"1.000000\" stroke=\"none\" d=\"\nM1352.983398,753.003418\n\tC1342.993042,753.003418 1333.500122,753.003418 1323.623291,753.003418\n\tC1323.518555,751.563477 1323.345337,750.296509 1323.345825,749.029541\n\tC1323.370239,681.393311 1323.392334,613.757080 1323.459351,546.120850\n\tC1323.475342,529.914612 1331.518677,521.974915 1347.753540,521.972107\n\tC1399.417114,521.963257 1451.080933,521.921631 1502.744385,521.990417\n\tC1526.723755,522.022278 1544.305420,534.056763 1551.272705,555.269775\n\tC1552.759155,559.795593 1553.984863,564.658142 1553.999756,569.369812\n\tC1554.047729,584.503235 1554.849609,599.821533 1552.867798,614.737305\n\tC1547.869751,652.355591 1517.885132,671.197510 1491.126343,675.980103\n\tC1487.061646,676.706543 1482.932129,677.070801 1477.521973,677.772583\n\tC1506.809814,703.078003 1535.309326,727.702209 1564.591553,753.002808\n\tC1542.875977,753.002808 1522.266235,753.052246 1501.658081,752.904907\n\tC1500.081055,752.893677 1498.255859,751.790894 1496.980225,750.691711\n\tC1469.855103,727.320618 1442.839478,703.822144 1415.626221,680.554688\n\tC1413.495728,678.733215 1410.105591,677.691162 1407.240479,677.554565\n\tC1398.973022,677.160645 1390.674927,677.415405 1382.194946,677.415405\n\tC1382.194946,663.345276 1382.194946,649.588135 1382.194946,635.455017\n\tC1394.161499,635.455017 1405.943604,635.446655 1417.725708,635.456909\n\tC1436.495972,635.473206 1455.266357,635.517944 1474.036621,635.517517\n\tC1482.000122,635.517334 1489.536865,633.735352 1496.409424,629.629944\n\tC1505.941895,623.935913 1511.441528,615.480103 1512.031982,604.422119\n\tC1512.582275,594.117432 1512.530640,583.766602 1512.365234,573.442200\n\tC1512.239380,565.598572 1510.260498,563.902222 1502.378540,563.898376\n\tC1474.048584,563.884644 1445.718750,563.923157 1417.388794,563.941345\n\tC1401.391357,563.951599 1385.393921,563.956360 1369.396484,563.978455\n\tC1368.084351,563.980286 1366.772461,564.097229 1365.199463,564.173279\n\tC1365.199463,627.153015 1365.199463,689.930298 1365.199463,753.003418\n\tC1361.114136,753.003418 1357.297363,753.003418 1352.983398,753.003418\nz\" />\n    <path fill=\"#FEFEFE\" opacity=\"1.000000\" stroke=\"none\" d=\"\nM1836.672363,717.265076\n\tC1835.250854,709.753479 1832.974854,702.602417 1832.918335,695.433899\n\tC1832.607544,655.955505 1832.255371,616.460815 1833.069458,576.995422\n\tC1833.721802,545.375977 1858.479004,522.109802 1890.000488,522.026123\n\tC1939.497925,521.894714 1988.995972,521.976685 2038.493774,521.978149\n\tC2039.780273,521.978149 2041.066772,522.091492 2042.544922,522.160950\n\tC2042.544922,536.062500 2042.544922,549.665100 2042.544922,563.968628\n\tC2040.770508,563.968628 2039.020264,563.969543 2037.269897,563.968506\n\tC1989.950195,563.939880 1942.630371,563.909180 1895.310669,563.887756\n\tC1892.978638,563.886658 1890.634766,563.829529 1888.316895,564.033325\n\tC1880.788208,564.695190 1875.792114,569.547241 1874.883911,577.077515\n\tC1874.585449,579.551758 1874.437744,582.059326 1874.435791,584.551880\n\tC1874.407837,620.050293 1874.415283,655.548767 1874.422974,691.047180\n\tC1874.423218,692.376831 1874.452271,693.711792 1874.569946,695.035217\n\tC1875.554565,706.117493 1880.846069,711.052551 1892.071411,711.061523\n\tC1925.725586,711.088379 1959.379639,711.033203 1993.033813,711.013184\n\tC2007.866211,711.004333 2022.698608,711.002869 2037.531006,710.998230\n\tC2039.143433,710.997742 2040.755859,710.998169 2042.557129,710.998169\n\tC2042.557129,725.113831 2042.557129,738.714417 2042.557129,752.704468\n\tC2041.075562,752.806030 2039.647949,752.989075 2038.220337,752.989502\n\tC1989.889160,753.004333 1941.557739,753.047913 1893.226685,752.983398\n\tC1866.860718,752.948181 1845.677002,739.569580 1836.672363,717.265076\nz\" />\n    <path fill=\"#FEFEFE\" opacity=\"1.000000\" stroke=\"none\" d=\"\nM1712.891846,649.000000\n\tC1712.891113,683.803040 1712.891113,718.106018 1712.891113,752.704834\n\tC1698.876221,752.704834 1685.136841,752.704834 1670.950439,752.704834\n\tC1670.950439,690.009705 1670.950439,627.284485 1670.950439,564.167603\n\tC1639.923828,564.167603 1609.336914,564.167603 1578.420898,564.167603\n\tC1578.420898,550.049744 1578.420898,536.318909 1578.420898,522.278381\n\tC1653.732544,522.278381 1729.123535,522.278381 1804.769043,522.278381\n\tC1804.769043,536.018250 1804.769043,549.759338 1804.769043,563.863037\n\tC1774.296387,563.863037 1743.878662,563.863037 1712.892578,563.863037\n\tC1712.892578,592.313782 1712.892578,620.406860 1712.891846,649.000000\nz\" />\n    <path fill=\"#FEFDFE\" opacity=\"1.000000\" stroke=\"none\" d=\"\nM1162.983643,578.840393\n\tC1167.269897,578.853027 1171.059570,578.853027 1175.206299,578.853027\n\tC1175.206299,559.746521 1175.206299,541.153503 1175.206299,522.266968\n\tC1189.495361,522.266968 1203.416992,522.266968 1217.813110,522.266968\n\tC1217.813110,540.815796 1217.813110,559.546814 1217.813110,578.691528\n\tC1242.346558,578.691528 1266.412720,578.691528 1290.739502,578.691528\n\tC1290.739502,592.855591 1290.739502,606.604431 1290.739502,620.762268\n\tC1266.654541,620.762268 1242.586670,620.762268 1218.158691,620.762268\n\tC1218.158691,664.916687 1218.158691,708.666565 1218.158691,752.708984\n\tC1203.757935,752.708984 1189.718628,752.708984 1175.276733,752.708984\n\tC1175.276733,708.790649 1175.276733,665.059509 1175.276733,620.993042\n\tC1157.118652,620.993042 1139.356934,620.993042 1121.297729,620.993042\n\tC1121.297729,606.922119 1121.297729,593.183655 1121.297729,578.827759\n\tC1134.986572,578.827759 1148.736816,578.827759 1162.983643,578.840393\nz\" />\n    <path fill=\"#FDFDFD\" opacity=\"1.000000\" stroke=\"none\" d=\"\nM993.000000,753.004028\n\tC984.512207,752.910095 975.650757,754.940186 968.785889,752.116333\n\tC962.107544,749.369202 957.474915,741.649292 951.943542,736.113464\n\tC927.452026,711.601990 902.905090,687.145386 878.542786,662.506165\n\tC875.687500,659.618469 872.889465,658.492371 868.933655,658.628601\n\tC861.146179,658.896667 853.342957,658.707520 845.272461,658.707520\n\tC845.272461,644.547485 845.272461,630.629944 845.272461,616.222534\n\tC853.163818,616.222534 861.101685,616.015381 869.020935,616.309753\n\tC872.992737,616.457458 875.761658,615.256531 878.577026,612.416077\n\tC907.430420,583.304871 936.460083,554.368408 965.329163,525.272705\n\tC967.764709,522.818054 970.146484,521.856689 973.571960,521.887695\n\tC991.520752,522.050659 1009.471802,521.963928 1028.419434,521.963928\n\tC988.429810,560.826660 949.100525,599.047791 909.630737,637.405457\n\tC949.138428,675.819458 988.417542,714.011230 1028.520508,753.004028\n\tC1016.241211,753.004028 1004.870605,753.004028 993.000000,753.004028\nz\" />\n    <path fill=\"#FDFDFD\" opacity=\"1.000000\" stroke=\"none\" d=\"\nM828.221252,689.000732\n\tC828.221252,710.471741 828.221252,731.442627 828.221252,752.708069\n\tC814.273682,752.708069 800.551453,752.708069 786.508423,752.708069\n\tC786.508423,676.015808 786.508423,599.254456 786.508423,522.230713\n\tC800.316956,522.230713 814.067932,522.230713 828.221252,522.230713\n\tC828.221252,577.658752 828.221252,633.079773 828.221252,689.000732\nz\" />\n    <path fill=\"#FDFDFD\" opacity=\"1.000000\" stroke=\"none\" d=\"\nM1050.808594,741.259644\n\tC1050.800659,687.103271 1050.800659,633.197327 1050.800659,579.075195\n\tC1064.851562,579.075195 1078.592041,579.075195 1092.576416,579.075195\n\tC1092.576416,636.956787 1092.576416,694.654175 1092.576416,752.677612\n\tC1078.794434,752.677612 1065.050903,752.677612 1050.816528,752.677612\n\tC1050.816528,749.084717 1050.816528,745.297424 1050.808594,741.259644\nz\" />\n    <path fill=\"#FDFDFD\" opacity=\"1.000000\" stroke=\"none\" d=\"\nM1057.138672,543.008545\n\tC1054.851562,543.010559 1053.041016,543.010559 1051.008667,543.010559\n\tC1051.008667,530.332275 1051.008667,517.885925 1051.008667,505.217773\n\tC1064.752930,505.217773 1078.507080,505.217773 1092.537842,505.217773\n\tC1092.537842,517.709045 1092.537842,530.099915 1092.537842,543.006592\n\tC1080.821777,543.006592 1069.218628,543.006592 1057.138672,543.008545\nz\" />\n  </svg>\n</ng-container>\n", styles: [""], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: IconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'kitrtc-icon', template: "<ng-container *ngIf=\"icon === iconType.muted\">\n  <svg width=\"32px\" height=\"32px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <g clip-path=\"url(#clip0_15_183)\">\n      <path d=\"M3 16V8H6L11 4V20L6 16H3Z\" stroke=\"#FFFFFF\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n      <path d=\"M14.5 15L20.5 9\" stroke=\"#FFFFFF\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n      <path d=\"M14.5 9L20.5 15\" stroke=\"#FFFFFF\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n    </g>\n    <defs>\n      <clipPath id=\"clip0_15_183\">\n        <rect width=\"24\" height=\"24\" fill=\"white\" />\n      </clipPath>\n    </defs>\n  </svg>\n</ng-container>\n\n<ng-container *ngIf=\"icon === iconType.maximized\">\n  <svg fill=\"#FFFFFF\" width=\"24px\" height=\"24px\" viewBox=\"0 0 32 32\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path\n      d=\"M12 28.75h-8.75v-8.75c0-0.69-0.56-1.25-1.25-1.25s-1.25 0.56-1.25 1.25v0 10c0 0.69 0.56 1.25 1.25 1.25h10c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM30 18.75c-0.69 0.001-1.249 0.56-1.25 1.25v8.75h-8.75c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h10c0.69-0.001 1.249-0.56 1.25-1.25v-10c-0.001-0.69-0.56-1.249-1.25-1.25h-0zM12 0.75h-10c-0.69 0-1.25 0.56-1.25 1.25v0 10c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-8.75h8.75c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM30 0.75h-10c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h8.75v8.75c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-10c-0-0.69-0.56-1.25-1.25-1.25h-0z\">\n    </path>\n  </svg>\n</ng-container>\n\n\n\n<ng-container *ngIf=\"icon === iconType.CAMERA\">\n  <svg [attr.fill]=\"color\" width=\"100%\" height=\"100%\" viewBox=\"0 0 1920 1920\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M0 240v1440h1500.536v-438.89L1920 1574.062V346.051L1500.536 678.89V240H0Zm109.779 109.779h1280.979v556.348l177.995-141.29 241.468-191.66v773.646l-241.468-191.549-177.995-141.29v556.236H109.778V349.78Z\" fill-rule=\"evenodd\"/>\n  </svg>\n</ng-container>\n\n<ng-container *ngIf=\"icon === iconType.CAMERA_OFF\">\n  <svg [attr.fill]=\"color\" width=\"100%\" height=\"100%\" viewBox=\"0 0 1920 1920\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"m1421.141 2.417 91.775 64.262L215.481 1918.962l.595.416-.378.54-92.37-64.678L246.074 1680H0V240h1254.726L1421.141 2.416Zm79.395 278.487V678.89L1920 346.052v1228.01l-419.464-332.951V1680H520.538l76.895-109.78 793.325.001v-556.235l177.995 141.29 241.468 191.548V573.176l-241.468 191.662-177.995 141.29-.001-468.498 109.779-156.726Zm-322.705 68.874H109.779v1220.443h213.19l854.862-1220.443Z\" fill-rule=\"evenodd\"/>\n  </svg>\n</ng-container>\n\n\n<ng-container *ngIf=\"icon === iconType.MICROPHONE\">\n  <svg width=\"100%\" height=\"100%\" viewBox=\"-0.5 0 25 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path [attr.stroke]=\"color\" d=\"M7 7.40991C7 6.08383 7.52677 4.81207 8.46445 3.87439C9.40213 2.93671 10.6739 2.40991 12 2.40991C13.3261 2.40991 14.5978 2.93671 15.5355 3.87439C16.4732 4.81207 17 6.08383 17 7.40991V13.4099C17 14.736 16.4732 16.0079 15.5355 16.9456C14.5978 17.8832 13.3261 18.4099 12 18.4099C10.6739 18.4099 9.40213 17.8832 8.46445 16.9456C7.52677 16.0079 7 14.736 7 13.4099V7.40991Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path [attr.stroke]=\"color\" d=\"M21 13.4099C21 15.7969 20.0518 18.0861 18.364 19.7739C16.6761 21.4618 14.3869 22.4099 12 22.4099C9.61305 22.4099 7.32384 21.4618 5.63602 19.7739C3.94819 18.0861 3 15.7969 3 13.4099\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n</ng-container>\n\n<ng-container *ngIf=\"icon === iconType.MICROPHONE_OFF\">\n  <svg width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path [attr.stroke]=\"color\" d=\"M17.0005 11.24V13C17.0005 14.3261 16.4737 15.5978 15.536 16.5355C14.5983 17.4732 13.3266 18 12.0005 18C11.4846 17.9975 10.972 17.9166 10.4805 17.76\"  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path [attr.stroke]=\"color\" d=\"M8 16C7.35089 15.1345 7 14.0819 7 13V7C7 5.67392 7.52677 4.40216 8.46445 3.46448C9.40213 2.5268 10.6739 2 12 2C13.3261 2 14.5978 2.5268 15.5355 3.46448C16.4732 4.40216 17 5.67392 17 7\"  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path [attr.stroke]=\"color\" d=\"M5.21081 18.84C3.81268 17.216 3.04593 15.1429 3.0508 13\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path [attr.stroke]=\"color\" d=\"M21.0007 13C20.9995 14.5822 20.5812 16.1361 19.788 17.5051C18.9948 18.8741 17.8547 20.0098 16.4827 20.7977C15.1107 21.5857 13.5551 21.9979 11.973 21.993C10.3908 21.9882 8.83786 21.5664 7.4707 20.77\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path [attr.stroke]=\"color\" d=\"M22 2L2 22\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n</ng-container>\n\n\n\n<ng-container *ngIf=\"icon === iconType.LOGOUT\">\n  <svg width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M15 12L6 12M6 12L8 14M6 12L8 10\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M12 21.9827C10.4465 21.9359 9.51995 21.7626 8.87865 21.1213C8.11027 20.3529 8.01382 19.175 8.00171 17M16 21.9983C18.175 21.9862 19.3529 21.8897 20.1213 21.1213C21 20.2426 21 18.8284 21 16V14V10V8C21 5.17157 21 3.75736 20.1213 2.87868C19.2426 2 17.8284 2 15 2H14C11.1715 2 9.75733 2 8.87865 2.87868C8.11027 3.64706 8.01382 4.82497 8.00171 7\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>\n    <path d=\"M3 9.5V14.5C3 16.857 3 18.0355 3.73223 18.7678C4.46447 19.5 5.64298 19.5 8 19.5M3.73223 5.23223C4.46447 4.5 5.64298 4.5 8 4.5\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>\n  </svg>\n</ng-container>\n\n\n<ng-container *ngIf=\"icon === iconType.logo\">\n  <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\"\n    y=\"0px\" width=\"100%\" height=\"100%\" viewBox=\"0 0 2818 1388\" enable-background=\"new 0 0 2818 1388\"\n    xml:space=\"preserve\">\n    <path fill=\"#FDFDFD\" opacity=\"1.000000\" stroke=\"none\" d=\"\nM1352.983398,753.003418\n\tC1342.993042,753.003418 1333.500122,753.003418 1323.623291,753.003418\n\tC1323.518555,751.563477 1323.345337,750.296509 1323.345825,749.029541\n\tC1323.370239,681.393311 1323.392334,613.757080 1323.459351,546.120850\n\tC1323.475342,529.914612 1331.518677,521.974915 1347.753540,521.972107\n\tC1399.417114,521.963257 1451.080933,521.921631 1502.744385,521.990417\n\tC1526.723755,522.022278 1544.305420,534.056763 1551.272705,555.269775\n\tC1552.759155,559.795593 1553.984863,564.658142 1553.999756,569.369812\n\tC1554.047729,584.503235 1554.849609,599.821533 1552.867798,614.737305\n\tC1547.869751,652.355591 1517.885132,671.197510 1491.126343,675.980103\n\tC1487.061646,676.706543 1482.932129,677.070801 1477.521973,677.772583\n\tC1506.809814,703.078003 1535.309326,727.702209 1564.591553,753.002808\n\tC1542.875977,753.002808 1522.266235,753.052246 1501.658081,752.904907\n\tC1500.081055,752.893677 1498.255859,751.790894 1496.980225,750.691711\n\tC1469.855103,727.320618 1442.839478,703.822144 1415.626221,680.554688\n\tC1413.495728,678.733215 1410.105591,677.691162 1407.240479,677.554565\n\tC1398.973022,677.160645 1390.674927,677.415405 1382.194946,677.415405\n\tC1382.194946,663.345276 1382.194946,649.588135 1382.194946,635.455017\n\tC1394.161499,635.455017 1405.943604,635.446655 1417.725708,635.456909\n\tC1436.495972,635.473206 1455.266357,635.517944 1474.036621,635.517517\n\tC1482.000122,635.517334 1489.536865,633.735352 1496.409424,629.629944\n\tC1505.941895,623.935913 1511.441528,615.480103 1512.031982,604.422119\n\tC1512.582275,594.117432 1512.530640,583.766602 1512.365234,573.442200\n\tC1512.239380,565.598572 1510.260498,563.902222 1502.378540,563.898376\n\tC1474.048584,563.884644 1445.718750,563.923157 1417.388794,563.941345\n\tC1401.391357,563.951599 1385.393921,563.956360 1369.396484,563.978455\n\tC1368.084351,563.980286 1366.772461,564.097229 1365.199463,564.173279\n\tC1365.199463,627.153015 1365.199463,689.930298 1365.199463,753.003418\n\tC1361.114136,753.003418 1357.297363,753.003418 1352.983398,753.003418\nz\" />\n    <path fill=\"#FEFEFE\" opacity=\"1.000000\" stroke=\"none\" d=\"\nM1836.672363,717.265076\n\tC1835.250854,709.753479 1832.974854,702.602417 1832.918335,695.433899\n\tC1832.607544,655.955505 1832.255371,616.460815 1833.069458,576.995422\n\tC1833.721802,545.375977 1858.479004,522.109802 1890.000488,522.026123\n\tC1939.497925,521.894714 1988.995972,521.976685 2038.493774,521.978149\n\tC2039.780273,521.978149 2041.066772,522.091492 2042.544922,522.160950\n\tC2042.544922,536.062500 2042.544922,549.665100 2042.544922,563.968628\n\tC2040.770508,563.968628 2039.020264,563.969543 2037.269897,563.968506\n\tC1989.950195,563.939880 1942.630371,563.909180 1895.310669,563.887756\n\tC1892.978638,563.886658 1890.634766,563.829529 1888.316895,564.033325\n\tC1880.788208,564.695190 1875.792114,569.547241 1874.883911,577.077515\n\tC1874.585449,579.551758 1874.437744,582.059326 1874.435791,584.551880\n\tC1874.407837,620.050293 1874.415283,655.548767 1874.422974,691.047180\n\tC1874.423218,692.376831 1874.452271,693.711792 1874.569946,695.035217\n\tC1875.554565,706.117493 1880.846069,711.052551 1892.071411,711.061523\n\tC1925.725586,711.088379 1959.379639,711.033203 1993.033813,711.013184\n\tC2007.866211,711.004333 2022.698608,711.002869 2037.531006,710.998230\n\tC2039.143433,710.997742 2040.755859,710.998169 2042.557129,710.998169\n\tC2042.557129,725.113831 2042.557129,738.714417 2042.557129,752.704468\n\tC2041.075562,752.806030 2039.647949,752.989075 2038.220337,752.989502\n\tC1989.889160,753.004333 1941.557739,753.047913 1893.226685,752.983398\n\tC1866.860718,752.948181 1845.677002,739.569580 1836.672363,717.265076\nz\" />\n    <path fill=\"#FEFEFE\" opacity=\"1.000000\" stroke=\"none\" d=\"\nM1712.891846,649.000000\n\tC1712.891113,683.803040 1712.891113,718.106018 1712.891113,752.704834\n\tC1698.876221,752.704834 1685.136841,752.704834 1670.950439,752.704834\n\tC1670.950439,690.009705 1670.950439,627.284485 1670.950439,564.167603\n\tC1639.923828,564.167603 1609.336914,564.167603 1578.420898,564.167603\n\tC1578.420898,550.049744 1578.420898,536.318909 1578.420898,522.278381\n\tC1653.732544,522.278381 1729.123535,522.278381 1804.769043,522.278381\n\tC1804.769043,536.018250 1804.769043,549.759338 1804.769043,563.863037\n\tC1774.296387,563.863037 1743.878662,563.863037 1712.892578,563.863037\n\tC1712.892578,592.313782 1712.892578,620.406860 1712.891846,649.000000\nz\" />\n    <path fill=\"#FEFDFE\" opacity=\"1.000000\" stroke=\"none\" d=\"\nM1162.983643,578.840393\n\tC1167.269897,578.853027 1171.059570,578.853027 1175.206299,578.853027\n\tC1175.206299,559.746521 1175.206299,541.153503 1175.206299,522.266968\n\tC1189.495361,522.266968 1203.416992,522.266968 1217.813110,522.266968\n\tC1217.813110,540.815796 1217.813110,559.546814 1217.813110,578.691528\n\tC1242.346558,578.691528 1266.412720,578.691528 1290.739502,578.691528\n\tC1290.739502,592.855591 1290.739502,606.604431 1290.739502,620.762268\n\tC1266.654541,620.762268 1242.586670,620.762268 1218.158691,620.762268\n\tC1218.158691,664.916687 1218.158691,708.666565 1218.158691,752.708984\n\tC1203.757935,752.708984 1189.718628,752.708984 1175.276733,752.708984\n\tC1175.276733,708.790649 1175.276733,665.059509 1175.276733,620.993042\n\tC1157.118652,620.993042 1139.356934,620.993042 1121.297729,620.993042\n\tC1121.297729,606.922119 1121.297729,593.183655 1121.297729,578.827759\n\tC1134.986572,578.827759 1148.736816,578.827759 1162.983643,578.840393\nz\" />\n    <path fill=\"#FDFDFD\" opacity=\"1.000000\" stroke=\"none\" d=\"\nM993.000000,753.004028\n\tC984.512207,752.910095 975.650757,754.940186 968.785889,752.116333\n\tC962.107544,749.369202 957.474915,741.649292 951.943542,736.113464\n\tC927.452026,711.601990 902.905090,687.145386 878.542786,662.506165\n\tC875.687500,659.618469 872.889465,658.492371 868.933655,658.628601\n\tC861.146179,658.896667 853.342957,658.707520 845.272461,658.707520\n\tC845.272461,644.547485 845.272461,630.629944 845.272461,616.222534\n\tC853.163818,616.222534 861.101685,616.015381 869.020935,616.309753\n\tC872.992737,616.457458 875.761658,615.256531 878.577026,612.416077\n\tC907.430420,583.304871 936.460083,554.368408 965.329163,525.272705\n\tC967.764709,522.818054 970.146484,521.856689 973.571960,521.887695\n\tC991.520752,522.050659 1009.471802,521.963928 1028.419434,521.963928\n\tC988.429810,560.826660 949.100525,599.047791 909.630737,637.405457\n\tC949.138428,675.819458 988.417542,714.011230 1028.520508,753.004028\n\tC1016.241211,753.004028 1004.870605,753.004028 993.000000,753.004028\nz\" />\n    <path fill=\"#FDFDFD\" opacity=\"1.000000\" stroke=\"none\" d=\"\nM828.221252,689.000732\n\tC828.221252,710.471741 828.221252,731.442627 828.221252,752.708069\n\tC814.273682,752.708069 800.551453,752.708069 786.508423,752.708069\n\tC786.508423,676.015808 786.508423,599.254456 786.508423,522.230713\n\tC800.316956,522.230713 814.067932,522.230713 828.221252,522.230713\n\tC828.221252,577.658752 828.221252,633.079773 828.221252,689.000732\nz\" />\n    <path fill=\"#FDFDFD\" opacity=\"1.000000\" stroke=\"none\" d=\"\nM1050.808594,741.259644\n\tC1050.800659,687.103271 1050.800659,633.197327 1050.800659,579.075195\n\tC1064.851562,579.075195 1078.592041,579.075195 1092.576416,579.075195\n\tC1092.576416,636.956787 1092.576416,694.654175 1092.576416,752.677612\n\tC1078.794434,752.677612 1065.050903,752.677612 1050.816528,752.677612\n\tC1050.816528,749.084717 1050.816528,745.297424 1050.808594,741.259644\nz\" />\n    <path fill=\"#FDFDFD\" opacity=\"1.000000\" stroke=\"none\" d=\"\nM1057.138672,543.008545\n\tC1054.851562,543.010559 1053.041016,543.010559 1051.008667,543.010559\n\tC1051.008667,530.332275 1051.008667,517.885925 1051.008667,505.217773\n\tC1064.752930,505.217773 1078.507080,505.217773 1092.537842,505.217773\n\tC1092.537842,517.709045 1092.537842,530.099915 1092.537842,543.006592\n\tC1080.821777,543.006592 1069.218628,543.006592 1057.138672,543.008545\nz\" />\n  </svg>\n</ng-container>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { icon: [{
                type: Input
            }], size: [{
                type: Input
            }], color: [{
                type: Input
            }] } });

/**
 * Track kind enum
 * @description The kind of track
 */
var TrackKind;
(function (TrackKind) {
    TrackKind["AUDIO"] = "audio";
    TrackKind["VIDEO"] = "video";
})(TrackKind || (TrackKind = {}));

/**
 * Logger interface
 * @description Color of log
 */
var LoggerColors;
(function (LoggerColors) {
    LoggerColors["RED"] = "red";
    LoggerColors["GREEN"] = "green";
    LoggerColors["YELLOW"] = "yellow";
    LoggerColors["BLUE"] = "blue";
})(LoggerColors || (LoggerColors = {}));

/**
 * Logger
 * @description Logger for debug mode
 */
class Logger {
    /**
     * Show log in console
     * @param color color of log
     * @param message message to show
     */
    log(color, message) {
        const title = 'KitRTC Logging:';
        let colorString = '';
        switch (color) {
            case LoggerColors.RED:
                colorString = 'color: red';
                break;
            case LoggerColors.GREEN:
                colorString = 'color: green';
                break;
            case LoggerColors.YELLOW:
                colorString = 'color: yellow';
                break;
            case LoggerColors.BLUE:
                colorString = 'color: blue';
                break;
            default:
                colorString = 'color: blue';
                break;
        }
        console.log(`%c${title}`, colorString, message);
    }
}

/**
 * Local tracks
 * @description Local tracks for participant
 */
class LocalTracks extends Logger {
    constructor(kitRtc, participant) {
        super();
        this.kitRtc = kitRtc;
        /**
         * Random id for track
         * @description Random id for track
         */
        this.id = this.randomId();
        this.participant = participant;
    }
    /**
     * Create local tracks
     * @description Create local tracks
     * @param constraints MediaStreamConstraints for getUserMedia
     * @returns Promise with MediaStream or undefined
     */
    async createLocalTracks(constraints) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            for (const track of stream.getTracks()) {
                this.participant.createTrack(stream, track);
            }
            this.log(LoggerColors.GREEN, { message: "Local tracks created", tracks: this.participant.tracks });
            return stream;
        }
        catch (error) {
            this.log(LoggerColors.RED, { message: "Error creating local tracks", error: error });
            return undefined;
        }
    }
    /**
     * Enable camera and mic
     * @description Enable local camera and mic
     */
    async enableCameraAndMic() {
        try {
            //find track in tracks with filter
            const trackSource = this.participant.tracks.find(track => track.stream.getTracks().find(track => track.kind === TrackKind.VIDEO));
            if (trackSource) {
                trackSource.stream.getTracks().forEach((track) => {
                    if (track.kind === TrackKind.VIDEO || track.kind === TrackKind.AUDIO) {
                        track.enabled = true;
                        this.kitRtc.onUnMuted.next([this.participant, trackSource]);
                    }
                });
                return true;
            }
            //create track
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            for (const track of stream.getTracks()) {
                this.participant.createTrack(stream, track);
            }
            await this.publish();
            return true;
        }
        catch (error) {
            this.log(LoggerColors.RED, { message: "Error enabling camera and mic", error: error });
            return false;
        }
    }
    /**
     * Enable camera
     * @description Enable local camera
     */
    async enableCamera() {
        //find track in tracks with filter
        const trackSource = this.participant.tracks.find(track => track.stream.getTracks().find(track => track.kind === TrackKind.VIDEO));
        if (trackSource) {
            trackSource.stream.getTracks().forEach((track) => {
                if (track.kind === TrackKind.VIDEO) {
                    track.enabled = true;
                    this.kitRtc.onUnMuted.next([this.participant, trackSource]);
                }
            });
            return;
        }
        //create track
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        for (const track of stream.getTracks()) {
            this.participant.createTrack(stream, track);
        }
        await this.publish();
    }
    /**
     * Disable camera
     * @description Disable local camera
     */
    async disableCamera() {
        //find track in tracks with filter
        const trackSource = this.participant.tracks.find(track => track.stream.getTracks().find(track => track.kind === TrackKind.VIDEO));
        if (trackSource) {
            trackSource.stream.getTracks().forEach((track) => {
                if (track.kind === TrackKind.VIDEO) {
                    track.enabled = false;
                    this.kitRtc.onMuted.next([this.participant, trackSource]);
                }
            });
        }
    }
    /**
     * Toogle camera
     * @description Toogle local camera
     */
    async toogleCamera() {
        try {
            const trackSource = this.participant.tracks.find(track => track.kind === TrackKind.VIDEO);
            if (trackSource) {
                trackSource.stream.getVideoTracks().forEach((track) => {
                    if (track.kind === TrackKind.VIDEO) {
                        track.enabled = !track.enabled;
                        if (track.enabled) {
                            this.kitRtc.onUnMuted.next([this.participant, trackSource]);
                        }
                        else {
                            this.kitRtc.onMuted.next([this.participant, trackSource]);
                        }
                    }
                });
                return true;
            }
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            for (const track of stream.getTracks()) {
                this.participant.createTrack(stream, track);
            }
            await this.publish();
            return true;
        }
        catch (error) {
            this.log(LoggerColors.RED, { message: "Error toogle camera", error: error });
            return false;
        }
    }
    /**
     * Enable mic
     * @description Enable local mic
     */
    async enableMic() {
        try {
            const trackSource = this.participant.tracks.find(track => track.stream.getTracks().find(track => track.kind === TrackKind.AUDIO));
            if (trackSource) {
                trackSource.stream.getTracks().forEach((track) => {
                    if (track.kind === TrackKind.AUDIO) {
                        track.enabled = true;
                        this.kitRtc.onUnMuted.next([this.participant, trackSource]);
                    }
                });
                return;
            }
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            for (const track of stream.getTracks()) {
                this.participant.createTrack(stream, track);
            }
            await this.publish();
        }
        catch (error) {
            this.log(LoggerColors.RED, { message: "Error enabling mic", error: error });
        }
    }
    /**
     * Disable mic
     * @description Disable local mic
     */
    async disableMic() {
        try {
            //find track in tracks with filter
            const trackSource = this.participant.tracks.find(track => track.stream.getTracks().find(track => track.kind === TrackKind.AUDIO));
            if (trackSource) {
                trackSource.stream.getTracks().forEach((track) => {
                    if (track.kind === TrackKind.AUDIO) {
                        track.enabled = false;
                        this.kitRtc.onMuted.next([this.participant, trackSource]);
                    }
                });
            }
        }
        catch (error) {
            this.log(LoggerColors.RED, { message: "Error disabling mic", error: error });
        }
    }
    /**
     * Toogle mic
     * @description Toogle local mic
     */
    async toogleMic() {
        try {
            const trackSource = this.participant.tracks.find(track => track.kind === TrackKind.AUDIO);
            if (trackSource) {
                trackSource.stream.getAudioTracks().forEach((track) => {
                    if (track.kind === TrackKind.AUDIO) {
                        track.enabled = !track.enabled;
                        if (track.enabled) {
                            this.kitRtc.onUnMuted.next([this.participant, trackSource]);
                        }
                        else {
                            this.kitRtc.onMuted.next([this.participant, trackSource]);
                        }
                    }
                });
                return;
            }
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            for (const track of stream.getTracks()) {
                this.participant.createTrack(stream, track);
            }
            await this.publish();
        }
        catch (error) {
            this.log(LoggerColors.RED, { message: "Error toogle mic", error: error });
        }
    }
    /**
     * Publish tracks
     * @description Publish tracks to all participants (Only local participant)
     */
    async publish() {
        if (!this.participant.local) {
            return;
        }
        try {
            for (const participant of this.kitRtc.participants) {
                const senders = participant.rtcPeerConnection?.getSenders();
                for (const track of this.participant.tracks) {
                    const mediaTrack = track;
                    if (senders) {
                        const sender = senders.find((sender) => {
                            return sender.track?.id === mediaTrack.id;
                        });
                        if (sender) {
                            this.log(LoggerColors.YELLOW, { message: "Track is already published", track: track });
                            continue;
                        }
                    }
                    participant.rtcPeerConnection?.addTrack(mediaTrack.track, track.stream);
                }
                participant.createOffer();
            }
        }
        catch (error) {
            this.log(LoggerColors.RED, { message: "Error publishing tracks", error: error });
        }
    }
    /**
     * Unpublish tracks (Only local participant)
     * @description Unpublish tracks to all participants
     * @param removeLocalTracks remove local tracks
     * @returns
     */
    async unpublish(removeLocalTracks = true) {
        if (!this.participant.local) {
            return;
        }
        //remove track from connection
        for (const track of this.participant.tracks) {
            const mediaTrack = track;
            for (const participant of this.kitRtc.participants) {
                const sender = participant.rtcPeerConnection?.getSenders().find(sender => sender.track === mediaTrack.track);
                if (sender) {
                    participant.rtcPeerConnection?.removeTrack(sender);
                }
            }
        }
        //stop tracks
        if (removeLocalTracks)
            this.stopLocalTracks();
    }
    /**
     * Stop local tracks
     * @description Stop local tracks (Only local participant)
     */
    stopLocalTracks() {
        if (!this.participant.local) {
            return;
        }
        this.unpublish(false);
        for (const track of this.participant.tracks) {
            const mediaTrack = track;
            mediaTrack.track.stop();
            this.kitRtc.onRemoveLocalMedia.next([this.participant, mediaTrack]);
        }
        this.participant.tracks = [];
    }
    /**
     * Toggle track
     * @param type track type
     */
    toggleTrack(type) {
        if (!this.participant.local) {
            return;
        }
        //find track
        const trackSource = this.participant.tracks.find(track => track.kind === type);
        if (!trackSource) {
            return;
        }
        trackSource.stream.getTracks().forEach((track) => {
            if (track.kind === type) {
                track.enabled = !track.enabled;
                if (track.enabled) {
                    this.kitRtc.onUnMuted.next([this.participant, trackSource]);
                }
                else {
                    this.kitRtc.onMuted.next([this.participant, trackSource]);
                }
            }
        });
    }
    /**
     * Add track to connection
     * @param rtcPeerConnection
     * @returns
     */
    addTrackToConnection(participant) {
        if (!this.participant.local) {
            return;
        }
        if (this.participant.tracks.length === 0)
            return;
        try {
            for (const track of this.participant.tracks) {
                //for (const mediaTrack of track.tracks) {
                const mediaTrack = track;
                participant.rtcPeerConnection?.addTrack(mediaTrack.track, track.stream);
                //}
            }
            console.log("Add track to connection", this.participant.tracks);
            participant.createOffer();
        }
        catch (error) {
            console.log("Add track to connection error:", error);
        }
    }
    /**
     * Get tracks
     * @description Get tracks of participant (Only local participant)
     * @returns Track[]
     */
    get getTracks() {
        return this.participant.tracks;
    }
    /**
     * Get source
     * @description Get element source for track
     * @param track Track
     * @returns HTMLVideoElement | HTMLAudioElement | undefined
     */
    getSource(track) {
        switch (track?.kind) {
            case TrackKind.AUDIO:
                const audio = document.createElement("audio");
                audio.srcObject = track.stream;
                audio.autoplay = true;
                audio.controls = true;
                audio.muted = false;
                return audio;
            case TrackKind.VIDEO:
                const video = document.createElement("video");
                video.srcObject = track.stream;
                video.autoplay = true;
                video.controls = true;
                video.muted = false;
                video.playsInline = true;
                return video;
        }
        return undefined;
    }
    /**
     * Random id
     * @description Random id
     * @returns string
     */
    randomId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    /**
     * Handle track ended
     * @param track Track
     */
    handleTrackEnded(track) {
        console.log('handleTrackEnded', track);
        this.kitRtc.onRemoveRemoteMedia.next([this.participant, track]);
    }
}

/**
 * TracksEvents
 * @description Tracks events control
 */
class TracksEvents {
    constructor(constructorOptions, participant) {
        /**
         * Id
         * @description Id for track event
         */
        this.id = this.randomId();
        /**
         * Logger
         * @description Logger for track events
         */
        this.logger = new Logger();
        //Remote tracks events
        if (constructorOptions.RTCTrackEvent) {
            this.RTCTrackEvent = constructorOptions.RTCTrackEvent;
            //detect event ended track
            this.RTCTrackEvent.track.onended = (e) => {
                this.logger.log(LoggerColors.YELLOW, { event: 'onended', e });
            };
            this.RTCTrackEvent.track.onmute = (e) => {
                this.logger.log(LoggerColors.YELLOW, { event: 'onended', e });
            };
            this.RTCTrackEvent.track.onunmute = (e) => {
                this.logger.log(LoggerColors.YELLOW, { event: 'onended', e });
            };
            //detect event ended track
            for (const stream of this.RTCTrackEvent.streams) {
                stream.onremovetrack = (e) => {
                    this.logger.log(LoggerColors.YELLOW, { event: 'onremovetrack', e });
                    this.handleTrackEnded(e);
                };
                for (const track of stream.getTracks()) {
                    track.onended = (e) => {
                        this.logger.log(LoggerColors.YELLOW, { event: 'onended', e });
                        const trackEndedEvent = new MediaStreamTrackEvent('ended', { track });
                        this.handleTrackEnded(trackEndedEvent);
                    };
                    track.onmute = (e) => {
                        this.logger.log(LoggerColors.YELLOW, { event: 'onmute', e });
                    };
                    track.onunmute = (e) => {
                        this.logger.log(LoggerColors.YELLOW, { event: 'onunmute', e });
                    };
                }
            }
        }
        this.participant = participant;
        this.stream = constructorOptions.MediaStream;
        //on add track
        this.stream.onaddtrack = (e) => {
            this.logger.log(LoggerColors.YELLOW, { event: 'onaddtrack', e });
        };
        //on remove track
        this.stream.onremovetrack = (e) => {
            this.logger.log(LoggerColors.YELLOW, { event: 'onremovetrack', e });
            this.handleTrackEnded(e);
        };
    }
    /**
     * Random id
     * @returns generate random id
     */
    randomId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    /**
     * Handle track ended
     * @param mediaStreamTrackEvent
     */
    handleTrackEnded(mediaStreamTrackEvent) {
        const trackRemoved = this.participant.tracks.find((track) => track.id === mediaStreamTrackEvent.track.id);
        this.participant.tracks = this.participant.tracks.filter((track) => track.id !== mediaStreamTrackEvent.track.id);
        //emit event
        trackRemoved && this.participant.kitRtc.onRemoveRemoteMedia.next([this.participant, trackRemoved]);
    }
    /**
     * Get source from track
     * @param track is track for get source
     * @returns
     */
    getSource(track) {
        switch (track?.kind) {
            case TrackKind.AUDIO:
                const audio = document.createElement("audio");
                audio.srcObject = track.stream;
                audio.autoplay = true;
                audio.controls = true;
                audio.muted = false;
                return audio;
            case TrackKind.VIDEO:
                const video = document.createElement("video");
                video.srcObject = track.stream;
                video.autoplay = true;
                video.controls = true;
                video.muted = false;
                video.playsInline = true;
                return video;
        }
        return undefined;
    }
    /**
     * Remove all tracks events
     * @description Remove all tracks events
     */
    removeAllTracksEvents() {
        this.stream.onaddtrack = null;
        this.stream.onremovetrack = null;
        for (const stream of this.stream.getTracks()) {
            stream.onended = null;
            stream.onmute = null;
            stream.onunmute = null;
        }
    }
}

/**
 * Participant
 * @description Participant from room
 */
class Participant {
    /**
     * Participant constructor
     * @param kitRtc
     * @param id
     * @param isLocal
     * @param autoCreateOffer
     */
    constructor(kitRtc, id, isLocal = true, autoCreateOffer = false) {
        this.kitRtc = kitRtc;
        this.isLocal = isLocal;
        this.autoCreateOffer = autoCreateOffer;
        /**
         * Local participant
         */
        this.local = false;
        /**
         * Local tracks
         */
        this.localTracks = new LocalTracks(this.kitRtc, this);
        /**
         * Tracks
         */
        this.tracks = [];
        /**
         * Logger
         * @description Logger
         */
        this.logger = new Logger();
        /**
         * Making offer
         * @description Making offer
         */
        this.makingOffer = false;
        this.id = id;
        this.local = isLocal;
        //this.tracks = new Tracks(kitRtc, this);
        //Setup webrtc
        this.configWebRtc();
    }
    /**
     * Config webrtc
     * @description Config webrtc
     * @returns Promise<void>
     * @private
     */
    async configWebRtc() {
        //ice servers
        const iceServers = [
            { urls: 'stun:stun.stunprotocol.org:3478' },
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:turn.nillapp.com:3478' },
            {
                urls: 'turn:turn.nillapp.com:3478?transport=udp',
                credential: "password",
                username: "username"
            }
        ];
        //create rtcPeerConnection
        this.rtcPeerConnection = new RTCPeerConnection({
            iceServers: iceServers,
            //iceTransportPolicy: 'all',
        });
        this.setBitRate();
        //on ice candidate
        this.rtcPeerConnection.onicecandidate = async (event) => {
            this.kitRtc.isDebug && console.log('onicecandidate', event);
            if (event.candidate) {
                this.kitRtc.getSocket()?.emit('candidate', { ice: event.candidate, uuid: this.id });
            }
        };
        //on track
        this.rtcPeerConnection.ontrack = (event) => {
            this.kitRtc.isDebug && console.log('p->ontrack', event);
            //find stream in tracks
            const mediaStream = this.createTrack(event.streams[0], event);
            //const track = mediaStream.addTrack(event.track);
            if (mediaStream)
                this.kitRtc.onRemoteMedia.next([this, mediaStream]);
        };
        //on connection state change
        this.rtcPeerConnection.onconnectionstatechange = (event) => {
            this.kitRtc.isDebug && console.log('onconnectionstatechange', event);
        };
        //on ice connection state change
        this.rtcPeerConnection.oniceconnectionstatechange = (event) => {
            this.kitRtc.isDebug && console.log('oniceconnectionstatechange', event);
            if (this.rtcPeerConnection?.iceConnectionState === "failed") {
                /* possibly reconfigure the connection in some way here */
                /* then request ICE restart */
                this.rtcPeerConnection.restartIce();
            }
        };
        //on ice gathering state change
        this.rtcPeerConnection.onicegatheringstatechange = (event) => {
            this.kitRtc.isDebug && console.log('onicegatheringstatechange', event);
        };
        //on ice candidate error
        this.rtcPeerConnection.onicecandidateerror = (e) => {
            this.kitRtc.isDebug && this.logger.log(LoggerColors.RED, { event: 'onicecandidateerror', e });
        };
        //on signaling state change
        this.rtcPeerConnection.onsignalingstatechange = (e) => {
            this.kitRtc.isDebug && console.log('onsignalingstatechange', e);
            this.logger.log(LoggerColors.YELLOW, { event: 'onsignalingstatechange', e, signalingState: this.rtcPeerConnection?.signalingState });
        };
        //on data channel
        this.rtcPeerConnection.ondatachannel = (event) => {
            this.kitRtc.isDebug && console.log('ondatachannel', event);
        };
        this.rtcPeerConnection.onnegotiationneeded = (e) => {
            this.logger.log(LoggerColors.YELLOW, { event: 'onnegotiationneeded', e });
            this.createOffer();
        };
    }
    /**
     * Error handler
     * @param error is error from webrtc
     */
    errorHandler(error) {
        console.error(error);
    }
    /**
     * Created description
     * @description Created description for other participant
     * @param description as RTCSessionDescriptionInit
     * @param type as string (offer|answer)
     */
    createdDescription(description, type) {
        this.kitRtc.isDebug && console.log('got description');
        this.rtcPeerConnection?.setLocalDescription(description).then(() => {
            this.kitRtc.getSocket()?.emit(type, { sdp: this.rtcPeerConnection?.localDescription, uuid: this.id });
            if (type === 'offer')
                this.makingOffer = false;
        }).catch(this.errorHandler);
    }
    /**
     * Create offer
     * @description Create offer for other participant
     * @private
     */
    createOffer() {
        //Cancel if we are already making an offer
        if (this.makingOffer)
            return;
        this.makingOffer = true;
        this.kitRtc.isDebug && console.log("createOffer", this.id);
        this.rtcPeerConnection?.createOffer().then((description) => {
            if (this.rtcPeerConnection?.signalingState != "stable")
                return;
            this.createdDescription(description, 'offer');
        }, this.errorHandler);
    }
    /**
     * Handle offer
     * @description Handle offer from other participant
     * @param offer offer from other participant
     */
    async handleOffer(offer) {
        //Cancel if we are already making an offer
        if (this.makingOffer) {
            console.log("skip nested offer", this.id);
            return;
        }
        ;
        //if we are answering a offer, we need to add tracks to peer connection
        this.addTracksToPeerConnection();
        await this.rtcPeerConnection?.setRemoteDescription(new RTCSessionDescription(offer.sdp)).then(() => {
            if (offer.sdp.type !== 'offer')
                return;
            this.kitRtc.isDebug && console.log("createAnswer", { offer, id: this.id });
            this.rtcPeerConnection?.createAnswer().then((description) => {
                this.createdDescription(description, 'answer');
            }).catch(this.errorHandler);
        }, this.errorHandler);
    }
    /**
     * Handle answer
     * @description Handle answer from other participant
     * @param answer answer from other participant
     */
    handleAnswer(answer) {
        this.kitRtc.isDebug && console.log("handleAnswer", answer, this.id);
        this.rtcPeerConnection?.setRemoteDescription(new RTCSessionDescription(answer.sdp)).catch(this.errorHandler);
    }
    /**
     * Handle candidate
     * @description Handle candidate from other participant
     * @param event candidate from other participant
     */
    handleCandidate(event) {
        this.rtcPeerConnection?.addIceCandidate(new RTCIceCandidate(event.ice)).catch(this.errorHandler);
    }
    /**
     * Create track
     * @description Create track from stream and add to tracks
     * @param stream stream of track
     * @param rtcTrackEvent track event
     * @param MediaStreamTrack track
     * @returns Track | undefined
     */
    createTrack(stream, rtcTrackEvent) {
        if (!rtcTrackEvent) {
            return;
        }
        if (rtcTrackEvent instanceof MediaStreamTrack) {
            const track = {
                kind: rtcTrackEvent?.kind,
                id: rtcTrackEvent?.id,
                trackId: rtcTrackEvent?.id,
                label: rtcTrackEvent?.label,
                stream: stream,
                track: rtcTrackEvent,
                participantId: this.id,
                getAutoSource: undefined,
                trackEvents: new TracksEvents({
                    MediaStream: stream,
                }, this),
                getSource: () => this.getSource(track)
            };
            this.tracks.push(track);
            return track;
        }
        const track = {
            kind: rtcTrackEvent?.track.kind,
            id: rtcTrackEvent?.track.id,
            trackId: rtcTrackEvent?.track.id,
            label: rtcTrackEvent?.track.label,
            stream: stream,
            track: rtcTrackEvent?.track,
            participantId: this.id,
            getAutoSource: undefined,
            trackEvents: new TracksEvents({
                MediaStream: stream,
                RTCTrackEvent: rtcTrackEvent
            }, this),
            getSource: () => this.getSource(track)
        };
        this.tracks.push(track);
        return track;
    }
    /**
     * Set bitrate
     * @description Set bitrate for video and audio
     * @returns Promise<void>
     */
    async setBitRate() {
        const maxBitRateVideo = this.kitRtc.mediaOptions.video?.maxBitrate;
        //set video bitrate
        try {
            if (maxBitRateVideo) {
                const videoTransceiver = this.rtcPeerConnection?.getTransceivers().find(transceiver => transceiver.sender.track?.kind === 'video');
                if (videoTransceiver) {
                    //set bit rate
                    const parameters = videoTransceiver.sender.getParameters();
                    if (!parameters.encodings) {
                        parameters.encodings = [{}];
                    }
                    parameters.encodings[0].maxBitrate = maxBitRateVideo * 1000 || 1000000;
                    await videoTransceiver.sender.setParameters(parameters);
                }
            }
        }
        catch (error) {
            console.error('Set bitrate video error:', error);
        }
        //set audio bitrate
        try {
            const maxBitRateAudio = this.kitRtc.mediaOptions.audio?.maxBitrate;
            if (maxBitRateAudio) {
                const audioTransceiver = this.rtcPeerConnection?.getTransceivers().find(transceiver => transceiver.sender.track?.kind === 'audio');
                if (audioTransceiver) {
                    //set bit rate
                    const parameters = audioTransceiver.sender.getParameters();
                    if (!parameters.encodings) {
                        parameters.encodings = [{}];
                    }
                    parameters.encodings[0].maxBitrate = maxBitRateAudio * 1000 || 200000;
                    await audioTransceiver.sender.setParameters(parameters);
                }
            }
        }
        catch (error) {
            console.error('Set bitrate audio error:', error);
        }
    }
    /**
     * Get source
     * @description Get source from track
     * @param track track
     * @returns HTMLVideoElement | HTMLAudioElement | undefined
     */
    getSource(track) {
        if (track.track.kind === 'video') {
            const video = document.createElement('video');
            video.srcObject = track.stream;
            video.autoplay = true;
            video.muted = true;
            return video;
        }
        if (track.track.kind === 'audio') {
            const audio = document.createElement('audio');
            audio.srcObject = track.stream;
            audio.autoplay = true;
            audio.muted = true;
            return audio;
        }
        return;
    }
    /**
     * Start negotiation
     * @description Start negotiation with other participant
     */
    negotiated() {
        this.addTracksToPeerConnection();
        this.createOffer();
    }
    /**
     * Close peer connection
     * @description Close peer connection
     */
    close() {
        this.rtcPeerConnection?.close();
        //remove tracks and events
        this.rtcPeerConnection = undefined;
    }
    /**
     * Add tracks to peer connection
     * @description Add tracks to peer connection
     */
    addTracksToPeerConnection() {
        if (!this.rtcPeerConnection) {
            this.configWebRtc();
        }
        const tracks = this.kitRtc.localParticipant?.localTracks.getTracks;
        if (tracks) {
            for (const track of tracks) {
                const mediaTrack = track;
                //find track in peer connection
                const haveTrack = this.rtcPeerConnection?.getSenders().find(sender => sender.track?.id === mediaTrack.track.id);
                if (!haveTrack) {
                    if (this.kitRtc.isDebug)
                        this.logger.log(LoggerColors.YELLOW, { event: 'Add local track to connection', track: mediaTrack.track });
                    this.rtcPeerConnection?.addTrack(mediaTrack.track, track.stream);
                }
            }
        }
    }
}

/**
 * Room codes interface
 * @description The room codes interface
 */
var RoomCodes;
(function (RoomCodes) {
    /**
     * @description The room was created successfully
     */
    RoomCodes["SUCCESS"] = "true";
    /**
     * @description The room was not created successfully
     */
    RoomCodes["ERROR"] = "false";
})(RoomCodes || (RoomCodes = {}));
/**
 * Room events interface
 */
var RoomEvent;
(function (RoomEvent) {
    /**
     * @description The room was created successfully
     */
    RoomEvent["TrackSubscribed"] = "track-subscribed";
    /**
     * @description The room was not created successfully
     */
    RoomEvent["TrackUnsubscribed"] = "track-unsubscribed";
    /**
     * @description The participant was disconnected
     */
    RoomEvent["ParticipantDisconnected"] = "participant-disconnected";
    /**
     * @description The participant was connected
     */
    RoomEvent["ParticipantConnected"] = "participant-connected";
    /**
     * @description The participant was joined
     */
    RoomEvent["ParticipantJoined"] = "participant-joined";
    /**
     * @description The participant was left
     */
    RoomEvent["ParticipantLeft"] = "participant-left";
})(RoomEvent || (RoomEvent = {}));

/**
 * Room for manage room in signaling server
 * @description Room class for manage room
 */
class Room {
    constructor(kitRtc) {
        this.kitRtc = kitRtc;
        /**
         * Is connected
         * @description Is connected to room
         */
        this._isConnected = false;
        /**
         * Is connected (Observable)
         * @description Is connected to room
         */
        this.isConnected = new BehaviorSubject(false);
        /**
         * Logger
         * @description Logger
         */
        this.logger = new Logger();
        this._isConnected = false;
    }
    /**
     * Join room
     * @param room room name for join, if not defined use room name from kitrtc or latest room name
     * @returns {Promise<boolean>}
     */
    async join(room) {
        const socket = this.kitRtc.getSocket();
        this.kitRtc.roomName = room || this.kitRtc.roomName;
        if (!socket) {
            this.logger.log(LoggerColors.RED, { event: "join-room", message: "socket is not defined" });
            return false;
        }
        if (!this.kitRtc.roomName) {
            this.logger.log(LoggerColors.RED, { event: "join-room", message: "room is not defined" });
            return false;
        }
        try {
            await this.leave(false);
            return new Promise((resolve, reject) => {
                socket?.emit("join-room", this.kitRtc.roomName, (response) => {
                    if (response.code === RoomCodes.SUCCESS) {
                        this.logger.log(LoggerColors.GREEN, { event: "join-room", message: `joined to room (${this.kitRtc.roomName})` });
                        this._isConnected = true;
                        this.isConnected.next(true);
                        resolve(true);
                    }
                    else {
                        this.logger.log(LoggerColors.RED, { event: "join-room", message: `error joining to room (${this.kitRtc.roomName})` });
                        this._isConnected = false;
                        this.isConnected.next(false);
                        reject(response);
                    }
                });
            });
        }
        catch (error) {
            this.logger.log(LoggerColors.RED, { event: "join-room", message: `error joining to room` });
            return false;
        }
    }
    /**
     * Leave room
     * @description Leave room
     * @returns {Promise<boolean>}
     * @param clearConnections clear connections
     */
    async leave(clearConnections = true) {
        if (!this.isConnected) {
            return false;
        }
        const socket = this.kitRtc.getSocket();
        if (!socket) {
            this.logger.log(LoggerColors.RED, { event: "leave-room", message: "socket is not defined" });
            return false;
        }
        try {
            return new Promise((resolve, reject) => {
                socket?.emit("leave-room", async (response) => {
                    if (response.code === RoomCodes.SUCCESS) {
                        this.logger.log(LoggerColors.GREEN, { event: "leave-room", message: `leaved to room` });
                        //clear connections
                        if (clearConnections)
                            await this.clearConnections(true);
                        this._isConnected = false;
                        this.isConnected.next(false);
                        resolve(true);
                    }
                    else {
                        this.logger.log(LoggerColors.RED, { event: "leave-room", message: `error leaved to room` });
                        reject(response);
                    }
                });
            });
        }
        catch (error) {
            this.logger.log(LoggerColors.RED, { event: "leave-room", message: `error leaved to room` });
            return false;
        }
    }
    /**
     * Clear connections
     * @description Clear connections, participants and local tracks
     * @param isLeaved is leaved to room
     */
    async clearConnections(isLeaved) {
        //clear participants
        for (const participant of this.kitRtc.participants) {
            participant.close();
        }
        this.kitRtc.participants = [];
        if (isLeaved) {
            await this.kitRtc.localParticipant.localTracks.unpublish(true);
            this.kitRtc.localParticipant.tracks = [];
        }
    }
    get connected() {
        return this._isConnected;
    }
}

/**
 * KitRtc is the main service of the library.
 * It allows you to connect to a server and create a room.
 * @description This service is the main entry point for using the library. It provides methods for connecting to a server and creating rooms for real-time communication.
 */
class KitRtc {
    constructor() {
        //Connection
        this.server = "http://localhost:3000";
        /**
         * Debug mode
         * @description Debug mode
         * @default false
         */
        this.isDebug = false;
        /**
         * Logger
         * @description Logger
         */
        this.logger = new Logger();
        /**
         * Media options
         * @description Media options for local participant
         */
        this.mediaOptions = {
            video: {
                maxBitrate: 2000
            },
            audio: {
                maxBitrate: 200
            }
        };
        /**
         * Participants
         */
        this.participants = [];
        this.localParticipant = new Participant(this, "", true);
        /**
         * Events
         */
        this.onDisconnect = new Subject();
        this.onParticipantConnected = new Subject();
        this.onParticipantDisconnected = new Subject();
        this.onRemoteMedia = new Subject();
        this.onRemoveLocalMedia = new Subject();
        this.onRemoveRemoteMedia = new Subject();
        this.onMuted = new Subject();
        this.onUnMuted = new Subject();
        /**
         * Room
         */
        this.roomName = "";
        this.reconnect = true;
        this.room = new Room(this);
        this.isConnected = false;
        /**
         * Set default bitrate
         */
        if (this.mediaOptions) {
            if (this.mediaOptions.video) {
                this.mediaOptions.video.maxBitrate = this.mediaOptions.video?.maxBitrate || this.mediaOptions.video.maxBitrate;
            }
            if (this.mediaOptions.audio) {
                this.mediaOptions.audio.maxBitrate = this.mediaOptions.audio?.maxBitrate || this.mediaOptions.audio.maxBitrate;
            }
        }
    }
    /**
     * Connect with a server
     * @description Connect with a server
     * @param server Server url
     * @returns Promise<boolean>
     */
    async connect(server) {
        if (!server) {
            this.logger.log(LoggerColors.RED, { event: "connect", message: "server is not defined" });
            return false;
        }
        //connect to server with socket
        this.server = server;
        try {
            this.socket = io(this.server, {
                transports: ["websocket"],
                path: "/",
            });
            this.localParticipant = new Participant(this, this.socket?.id || "", true);
            this.handlingEventsServer();
            return new Promise((resolve, reject) => {
                this.socket?.once("connect", () => {
                    resolve(true);
                });
                this.socket?.once("connect_error", (error) => {
                    this.logger.log(LoggerColors.RED, { event: "connecterror", message: error });
                    //clear socket once events
                    resolve(false);
                });
            });
        }
        catch (error) {
            if (this.isDebug)
                console.log(`MediaKitApp: error connecting to server (${error})`);
            return false;
        }
    }
    /**
     * Handle events from server
     * @description Handle events from server
     */
    handlingEventsServer() {
        this.socket?.on("connect", () => {
            this.logger.log(LoggerColors.GREEN, { event: "connect", message: "connected to server" });
            this.isConnected = true;
            /**
             * Reconnect to room
             */
            if (this.roomName && this.reconnect) {
                this.logger.log(LoggerColors.BLUE, { event: "reconnect", message: "reconnecting to room" });
                this.room.join(this.roomName).then((response) => {
                    if (response) {
                        this.logger.log(LoggerColors.GREEN, { event: "reconnect", message: "reconnected to room" });
                    }
                    else {
                        this.logger.log(LoggerColors.RED, { event: "reconnect", message: "error reconnected to room" });
                    }
                }).catch((error) => {
                    this.logger.log(LoggerColors.RED, { event: "reconnect", message: error });
                });
            }
        });
        this.socket?.on("disconnect", (event) => {
            this.logger.log(LoggerColors.RED, { event: "disconnect", message: event });
            this.onDisconnect.next(event);
            this.isConnected = false;
        });
        this.socket?.on("participants", async (response) => {
            //create participants lists
            this.participants = response.map((p) => {
                const participant = new Participant(this, p, false, false);
                //Emit event on joined participant
                this.onParticipantConnected.next(participant);
                //add track to connection
                participant.negotiated();
                return participant;
            });
        });
        this.socket?.on("participant-join", async (id) => {
            if (this.participants.find((p) => p.id === id)) {
                return;
            }
            //create participant
            const participant = new Participant(this, id, false, true);
            this.participants.push(participant);
            //Emit event on joined participant
            this.onParticipantConnected.next(participant);
            //add track to connection (deprecated)
            //participant.startNegotiation();
        });
        this.socket?.on("participant-left", (id) => {
            const participant = this.participants.find((p) => p.id === id);
            if (participant) {
                participant.close();
                this.participants = this.participants.filter((p) => p.id !== id);
                this.onParticipantDisconnected.next(participant);
            }
        });
        /**
         * WebRTC events
         */
        this.socket?.on("candidate", (event, id) => {
            const participant = this.participants.find((p) => p.id === event.id);
            if (participant) {
                participant.handleCandidate(event);
            }
        });
        this.socket?.on("offer", (offer) => {
            const participant = this.participants.find((p) => p.id === offer.id);
            if (participant) {
                participant.handleOffer(offer);
            }
        });
        this.socket?.on("answer", (answer) => {
            const participant = this.participants.find((p) => p.id === answer.id);
            if (participant) {
                participant.handleAnswer(answer);
            }
        });
    }
    /**
     * Get socket instance
     * @returns Socket
     */
    getSocket() {
        return this.socket;
    }
    /**
     * Auto play all tracks
     * @description Manual auto play for all participants.
     */
    autoPlayPolicy() {
        for (const participant of this.participants) {
            for (const track of participant.tracks) {
                if (track.trackComponent)
                    track.trackComponent.autoPlay();
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: KitRtc, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: KitRtc, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: KitRtc, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: TrackComponent, deps: [{ token: KitRtc }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.11", type: TrackComponent, selector: "kitrtc-track", inputs: { track: "track", local: "local" }, viewQueries: [{ propertyName: "stream", first: true, predicate: ["stream"], descendants: true }], ngImport: i0, template: "<video #stream *ngIf=\"track?.kind === 'video'\" (loadeddata)=\"loadeddata()\" (onplaying)=\"onPlaying()\"></video>\n<audio #stream *ngIf=\"track?.kind === 'audio'\" muted></audio>\n\n<!-- Icon for poster -->\n<kitrtc-icon [icon]=\"iconType.logo\" *ngIf=\"!isLoaded && !onPlayed && track?.kind === 'video'\"></kitrtc-icon>\n\n<!-- For autoplay policy -->\n<div class=\"dialog-silenced\" (click)=\"autoPlayForPolicy()\" *ngIf=\"!autoPlayPolicySkip\" [ngClass]=\"{\n    'track--video': track?.kind === 'video',\n  }\">\n  <div class=\"dialog-bg\">\n    <kitrtc-icon [icon]=\"iconType.logo\"></kitrtc-icon>\n  </div>\n  <button><kitrtc-icon [icon]=\"iconType.muted\"></kitrtc-icon></button>\n</div>\n", styles: [":host{width:100%;display:block;height:100%;position:absolute;inset:0}:host audio{display:none}:host .dialog-silenced{display:flex;justify-content:center;align-items:center;width:100%;height:100%;position:absolute;top:0;background-color:#0000007f;transition:.5s background-color;z-index:5}:host .dialog-silenced:hover{background-color:#0000004d}:host .dialog-silenced:hover button{background-color:#0000007f}:host .dialog-silenced.track--video{z-index:6}:host .dialog-silenced .dialog-bg{width:100%;height:100%;position:absolute;z-index:-1;opacity:.1;cursor:unset;pointer-events:none}:host .dialog-silenced button{border:none;background:none;box-shadow:unset;color:red;border-radius:100%;height:45px;width:45px;display:flex;justify-content:center;align-items:center;cursor:pointer}:host video{width:100%;height:100%;cursor:unset;-webkit-user-select:none;user-select:none;pointer-events:none;background-color:#000000e5}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: IconComponent, selector: "kitrtc-icon", inputs: ["icon", "size", "color"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: TrackComponent, decorators: [{
            type: Component,
            args: [{ selector: 'kitrtc-track', template: "<video #stream *ngIf=\"track?.kind === 'video'\" (loadeddata)=\"loadeddata()\" (onplaying)=\"onPlaying()\"></video>\n<audio #stream *ngIf=\"track?.kind === 'audio'\" muted></audio>\n\n<!-- Icon for poster -->\n<kitrtc-icon [icon]=\"iconType.logo\" *ngIf=\"!isLoaded && !onPlayed && track?.kind === 'video'\"></kitrtc-icon>\n\n<!-- For autoplay policy -->\n<div class=\"dialog-silenced\" (click)=\"autoPlayForPolicy()\" *ngIf=\"!autoPlayPolicySkip\" [ngClass]=\"{\n    'track--video': track?.kind === 'video',\n  }\">\n  <div class=\"dialog-bg\">\n    <kitrtc-icon [icon]=\"iconType.logo\"></kitrtc-icon>\n  </div>\n  <button><kitrtc-icon [icon]=\"iconType.muted\"></kitrtc-icon></button>\n</div>\n", styles: [":host{width:100%;display:block;height:100%;position:absolute;inset:0}:host audio{display:none}:host .dialog-silenced{display:flex;justify-content:center;align-items:center;width:100%;height:100%;position:absolute;top:0;background-color:#0000007f;transition:.5s background-color;z-index:5}:host .dialog-silenced:hover{background-color:#0000004d}:host .dialog-silenced:hover button{background-color:#0000007f}:host .dialog-silenced.track--video{z-index:6}:host .dialog-silenced .dialog-bg{width:100%;height:100%;position:absolute;z-index:-1;opacity:.1;cursor:unset;pointer-events:none}:host .dialog-silenced button{border:none;background:none;box-shadow:unset;color:red;border-radius:100%;height:45px;width:45px;display:flex;justify-content:center;align-items:center;cursor:pointer}:host video{width:100%;height:100%;cursor:unset;-webkit-user-select:none;user-select:none;pointer-events:none;background-color:#000000e5}\n"] }]
        }], ctorParameters: function () { return [{ type: KitRtc }]; }, propDecorators: { stream: [{
                type: ViewChild,
                args: ['stream', { static: false }]
            }], track: [{
                type: Input
            }], local: [{
                type: Input
            }] } });

class ParticipantComponent {
    constructor() {
        this.iconType = IconType;
    }
    maximized() {
        if (!this.participantElement?.nativeElement)
            return;
        // Obtener el elemento nativo
        const element = this.participantElement.nativeElement;
        //Verifica si el elemento está en pantalla completa
        if (document.fullscreenElement) {
            document.exitFullscreen();
            return;
        }
        // Verificar si el método requestFullscreen es compatible
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        else if (element.webkitRequestFullscreen) { /* Safari */
            element.webkitRequestFullscreen();
        }
        else if (element.msRequestFullscreen) { /* IE11 */
            element.msRequestFullscreen();
        }
    }
    /**
     * Have video participant
     * @description Check if the participant have video
     * @returns {boolean}
     */
    haveVideo() {
        if (!this.participant)
            return false;
        const find = this.participant.tracks.find(track => track.kind === TrackKind.VIDEO);
        if (find)
            return true;
        return false;
    }
    trackById(index, track) {
        return track.id;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: ParticipantComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.11", type: ParticipantComponent, selector: "kitrtc-participant", inputs: { participant: "participant" }, viewQueries: [{ propertyName: "participantElement", first: true, predicate: ["participantElement"], descendants: true }], ngImport: i0, template: "<div class=\"participant\" #participantElement *ngIf=\"participant\">\n  <div class=\"participant__name\">{{ participant.id }}</div>\n  <div class=\"participant__media\">\n    <ng-container *ngFor=\"let track of participant.tracks, trackBy: trackById\">\n      <kitrtc-track [track]=\"track\" [local]=\"participant.local\"></kitrtc-track>\n    </ng-container >\n    <ng-container *ngIf=\"!haveVideo()\">\n      <div class=\"paticipant__media__icon\">\n        <kitrtc-icon [icon]=\"iconType.logo\"></kitrtc-icon>\n      </div>\n    </ng-container>\n  </div>\n  <div class=\"participant__controls\">\n    <button class=\"muted\" *ngIf=\"false\">\n      <kitrtc-icon [icon]=\"iconType.muted\"></kitrtc-icon>\n    </button>\n    <button class=\"maximized\">\n      <kitrtc-icon (click)=\"maximized()\" [icon]=\"iconType.maximized\"></kitrtc-icon>\n    </button>\n  </div>\n</div>\n", styles: [".participant{border:none;padding:10px;min-height:200px;max-height:200px;position:relative;background-color:#000000e6;border-radius:9px;overflow:hidden;transition:.3s box-shadow ease-in-out}.participant:hover{box-shadow:0 0 7px 2px #00000080}.participant .participant__media{position:absolute;inset:0}.participant .participant__media .paticipant__media__icon{width:100%;height:100%;background-color:#000000e6;cursor:unset;pointer-events:none}.participant .participant__media .paticipant__media__icon kitrtc-icon{display:block;width:100%;height:100%}.participant .participant__controls{position:absolute;bottom:5px;left:5px;right:5px;display:flex;justify-content:space-between}.participant .participant__controls button{border:none;border-radius:100%;display:flex;width:42px;height:42px;align-items:center;justify-content:center;background-color:#00000080;cursor:pointer}.participant .participant__controls button:hover{background-color:#000000b3}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: IconComponent, selector: "kitrtc-icon", inputs: ["icon", "size", "color"] }, { kind: "component", type: TrackComponent, selector: "kitrtc-track", inputs: ["track", "local"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: ParticipantComponent, decorators: [{
            type: Component,
            args: [{ selector: 'kitrtc-participant', template: "<div class=\"participant\" #participantElement *ngIf=\"participant\">\n  <div class=\"participant__name\">{{ participant.id }}</div>\n  <div class=\"participant__media\">\n    <ng-container *ngFor=\"let track of participant.tracks, trackBy: trackById\">\n      <kitrtc-track [track]=\"track\" [local]=\"participant.local\"></kitrtc-track>\n    </ng-container >\n    <ng-container *ngIf=\"!haveVideo()\">\n      <div class=\"paticipant__media__icon\">\n        <kitrtc-icon [icon]=\"iconType.logo\"></kitrtc-icon>\n      </div>\n    </ng-container>\n  </div>\n  <div class=\"participant__controls\">\n    <button class=\"muted\" *ngIf=\"false\">\n      <kitrtc-icon [icon]=\"iconType.muted\"></kitrtc-icon>\n    </button>\n    <button class=\"maximized\">\n      <kitrtc-icon (click)=\"maximized()\" [icon]=\"iconType.maximized\"></kitrtc-icon>\n    </button>\n  </div>\n</div>\n", styles: [".participant{border:none;padding:10px;min-height:200px;max-height:200px;position:relative;background-color:#000000e6;border-radius:9px;overflow:hidden;transition:.3s box-shadow ease-in-out}.participant:hover{box-shadow:0 0 7px 2px #00000080}.participant .participant__media{position:absolute;inset:0}.participant .participant__media .paticipant__media__icon{width:100%;height:100%;background-color:#000000e6;cursor:unset;pointer-events:none}.participant .participant__media .paticipant__media__icon kitrtc-icon{display:block;width:100%;height:100%}.participant .participant__controls{position:absolute;bottom:5px;left:5px;right:5px;display:flex;justify-content:space-between}.participant .participant__controls button{border:none;border-radius:100%;display:flex;width:42px;height:42px;align-items:center;justify-content:center;background-color:#00000080;cursor:pointer}.participant .participant__controls button:hover{background-color:#000000b3}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { participantElement: [{
                type: ViewChild,
                args: ['participantElement', { static: false }]
            }], participant: [{
                type: Input
            }] } });

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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: ParticipantsComponent, deps: [{ token: KitRtc }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.11", type: ParticipantsComponent, selector: "kitrtc-participants", ngImport: i0, template: "<ng-container *ngIf=\"kitRtc.participants\">\n  <kitrtc-participant [participant]=\"participant\" *ngFor=\"let participant of kitRtc.participants, trackBy: trackById\" />\n</ng-container>\n\n", styles: [":host{display:grid;grid-template-columns:repeat(auto-fill,minmax(400px,1fr));grid-gap:16px}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ParticipantComponent, selector: "kitrtc-participant", inputs: ["participant"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: ParticipantsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'kitrtc-participants', template: "<ng-container *ngIf=\"kitRtc.participants\">\n  <kitrtc-participant [participant]=\"participant\" *ngFor=\"let participant of kitRtc.participants, trackBy: trackById\" />\n</ng-container>\n\n", styles: [":host{display:grid;grid-template-columns:repeat(auto-fill,minmax(400px,1fr));grid-gap:16px}\n"] }]
        }], ctorParameters: function () { return [{ type: KitRtc }]; } });

class LocalParticipantComponent {
    constructor(kitRtc) {
        this.kitRtc = kitRtc;
        this._kitRtc = kitRtc;
    }
    get localParticipant() {
        return this._kitRtc.localParticipant;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: LocalParticipantComponent, deps: [{ token: KitRtc }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.11", type: LocalParticipantComponent, selector: "kitrtc-local-participant", ngImport: i0, template: "<ng-container *ngIf=\"localParticipant\">\n    <kitrtc-participant [participant]=\"localParticipant\" />\n</ng-container>\n", styles: [":host{height:128px;width:128px;display:block}:host ::ng-deep kitrtc-participant>.participant{padding:0;width:100%;display:block;height:100%;min-height:100%}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ParticipantComponent, selector: "kitrtc-participant", inputs: ["participant"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: LocalParticipantComponent, decorators: [{
            type: Component,
            args: [{ selector: 'kitrtc-local-participant', template: "<ng-container *ngIf=\"localParticipant\">\n    <kitrtc-participant [participant]=\"localParticipant\" />\n</ng-container>\n", styles: [":host{height:128px;width:128px;display:block}:host ::ng-deep kitrtc-participant>.participant{padding:0;width:100%;display:block;height:100%;min-height:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: KitRtc }]; } });

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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: MediaControlsComponent, deps: [{ token: i0.Renderer2 }, { token: KitRtc }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.11", type: MediaControlsComponent, selector: "kitrtc-media-controls", ngImport: i0, template: "<div class=\"kitrtc--container\">\n  <kitrtc-icon class=\"kitrtc--container--icon\" [icon]=\"iconType.logo\"></kitrtc-icon>\n  <div class=\"kitrtc--container--controls\">\n    <button *ngIf=\"!showJoinButton\" (click)=\"toogleVideo()\"\n      [ngClass]=\"{\n        'kitrtc--container--controls--disabled': this.requestCamera || !this.isConnected,\n        'kitrtc--container--controls--active': this.haveVideo()\n      }\">\n      <kitrtc-icon *ngIf=\"haveVideo()\" [icon]=\"iconType.CAMERA\" color=\"#cfcfcf\"></kitrtc-icon>\n      <kitrtc-icon *ngIf=\"!haveVideo()\" [icon]=\"iconType.CAMERA_OFF\" color=\"#cfcfcf\"></kitrtc-icon>\n    </button>\n    <button *ngIf=\"!showJoinButton\" (click)=\"toogleAudio()\"\n      [ngClass]=\"{\n        'kitrtc--container--controls--disabled': this.requestMic || !this.isConnected,\n        'kitrtc--container--controls--active': this.haveAudio()\n      }\">\n      <kitrtc-icon *ngIf=\"haveAudio()\" [icon]=\"iconType.MICROPHONE\" color=\"#cfcfcf\"></kitrtc-icon>\n      <kitrtc-icon *ngIf=\"!haveAudio()\" [icon]=\"iconType.MICROPHONE_OFF\" color=\"#cfcfcf\"></kitrtc-icon>\n    </button>\n    <button *ngIf=\"!showJoinButton\" (click)=\"leaveRoom()\"\n      [ngClass]=\"{\n        'kitrtc--container--controls--disabled': !this.isConnected\n      }\">\n      <kitrtc-icon [icon]=\"iconType.LOGOUT\" color=\"#cfcfcf\"></kitrtc-icon>\n    </button>\n    <button (click)=\"joinRoom()\" *ngIf=\"showJoinButton\" class=\"kitrtc--container--controls--connect\">Connect</button>\n  </div>\n</div>\n", styles: [".kitrtc--container{position:fixed;bottom:0;background-color:#000;right:0;left:0;display:flex;justify-content:center;align-items:center;box-shadow:0 0 6px 4px #0000005e}.kitrtc--container .kitrtc--container--icon{height:128px}.kitrtc--container .kitrtc--container--controls{justify-content:center;align-items:center;height:100%;gap:20px;display:flex}.kitrtc--container .kitrtc--container--controls button{background:none;border:none;color:#fff;background-color:#1c1c1c;padding:20px;border-radius:9px;cursor:pointer}.kitrtc--container .kitrtc--container--controls button:hover{background-color:#2c2c2c}.kitrtc--container .kitrtc--container--controls button.kitrtc--container--controls--disabled{opacity:.3;cursor:not-allowed}.kitrtc--container .kitrtc--container--controls button.kitrtc--container--controls--disabled:hover{background-color:#1c1c1c}.kitrtc--container .kitrtc--container--controls button.kitrtc--container--controls--active{background-color:#e91e63;color:#000}.kitrtc--container .kitrtc--container--controls button kitrtc-icon{width:24px;height:24px;display:block;fill:#cfcfcf}.kitrtc--container .kitrtc--container--controls button kitrtc-icon svg{fill:#cfcfcf}.kitrtc--container .kitrtc--container--controls .kitrtc--container--controls--connect{background:none;border:none;background-color:#e91e63;color:#fff;padding:10px;display:block;min-width:128px;border-radius:5px}.kitrtc--background--black{background-color:#121212}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: IconComponent, selector: "kitrtc-icon", inputs: ["icon", "size", "color"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: MediaControlsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'kitrtc-media-controls', template: "<div class=\"kitrtc--container\">\n  <kitrtc-icon class=\"kitrtc--container--icon\" [icon]=\"iconType.logo\"></kitrtc-icon>\n  <div class=\"kitrtc--container--controls\">\n    <button *ngIf=\"!showJoinButton\" (click)=\"toogleVideo()\"\n      [ngClass]=\"{\n        'kitrtc--container--controls--disabled': this.requestCamera || !this.isConnected,\n        'kitrtc--container--controls--active': this.haveVideo()\n      }\">\n      <kitrtc-icon *ngIf=\"haveVideo()\" [icon]=\"iconType.CAMERA\" color=\"#cfcfcf\"></kitrtc-icon>\n      <kitrtc-icon *ngIf=\"!haveVideo()\" [icon]=\"iconType.CAMERA_OFF\" color=\"#cfcfcf\"></kitrtc-icon>\n    </button>\n    <button *ngIf=\"!showJoinButton\" (click)=\"toogleAudio()\"\n      [ngClass]=\"{\n        'kitrtc--container--controls--disabled': this.requestMic || !this.isConnected,\n        'kitrtc--container--controls--active': this.haveAudio()\n      }\">\n      <kitrtc-icon *ngIf=\"haveAudio()\" [icon]=\"iconType.MICROPHONE\" color=\"#cfcfcf\"></kitrtc-icon>\n      <kitrtc-icon *ngIf=\"!haveAudio()\" [icon]=\"iconType.MICROPHONE_OFF\" color=\"#cfcfcf\"></kitrtc-icon>\n    </button>\n    <button *ngIf=\"!showJoinButton\" (click)=\"leaveRoom()\"\n      [ngClass]=\"{\n        'kitrtc--container--controls--disabled': !this.isConnected\n      }\">\n      <kitrtc-icon [icon]=\"iconType.LOGOUT\" color=\"#cfcfcf\"></kitrtc-icon>\n    </button>\n    <button (click)=\"joinRoom()\" *ngIf=\"showJoinButton\" class=\"kitrtc--container--controls--connect\">Connect</button>\n  </div>\n</div>\n", styles: [".kitrtc--container{position:fixed;bottom:0;background-color:#000;right:0;left:0;display:flex;justify-content:center;align-items:center;box-shadow:0 0 6px 4px #0000005e}.kitrtc--container .kitrtc--container--icon{height:128px}.kitrtc--container .kitrtc--container--controls{justify-content:center;align-items:center;height:100%;gap:20px;display:flex}.kitrtc--container .kitrtc--container--controls button{background:none;border:none;color:#fff;background-color:#1c1c1c;padding:20px;border-radius:9px;cursor:pointer}.kitrtc--container .kitrtc--container--controls button:hover{background-color:#2c2c2c}.kitrtc--container .kitrtc--container--controls button.kitrtc--container--controls--disabled{opacity:.3;cursor:not-allowed}.kitrtc--container .kitrtc--container--controls button.kitrtc--container--controls--disabled:hover{background-color:#1c1c1c}.kitrtc--container .kitrtc--container--controls button.kitrtc--container--controls--active{background-color:#e91e63;color:#000}.kitrtc--container .kitrtc--container--controls button kitrtc-icon{width:24px;height:24px;display:block;fill:#cfcfcf}.kitrtc--container .kitrtc--container--controls button kitrtc-icon svg{fill:#cfcfcf}.kitrtc--container .kitrtc--container--controls .kitrtc--container--controls--connect{background:none;border:none;background-color:#e91e63;color:#fff;padding:10px;display:block;min-width:128px;border-radius:5px}.kitrtc--background--black{background-color:#121212}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: KitRtc }]; } });

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

/*
 * Public API Surface of mediakitappjs
 */
//Module

/**
 * Generated bundle index. Do not edit.
 */

export { KitRtc, KitRtcModule, LocalParticipantComponent, LocalTracks, Logger, LoggerColors, MediaControlsComponent, Participant, ParticipantsComponent, Room, RoomCodes, RoomEvent, TrackKind, TracksEvents };
//# sourceMappingURL=KitRtcJs.mjs.map
