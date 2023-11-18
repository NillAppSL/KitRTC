/**
 * Track kind enum
 * @description The kind of track
 */
export var TrackKind;
(function (TrackKind) {
    TrackKind["AUDIO"] = "audio";
    TrackKind["VIDEO"] = "video";
})(TrackKind || (TrackKind = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFraXRhcHBqcy9zcmMvbGliL2ludGVyZmFjZXMvdHJhY2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7R0FHRztBQUNILE1BQU0sQ0FBTixJQUFZLFNBR1g7QUFIRCxXQUFZLFNBQVM7SUFDbkIsNEJBQWUsQ0FBQTtJQUNmLDRCQUFlLENBQUE7QUFDakIsQ0FBQyxFQUhXLFNBQVMsS0FBVCxTQUFTLFFBR3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhY2tzRXZlbnRzIH0gZnJvbSBcIi4uL2NsYXNzL3RyYWNrc1wiO1xyXG5cclxuLyoqXHJcbiAqIFRyYWNrIGtpbmQgZW51bVxyXG4gKiBAZGVzY3JpcHRpb24gVGhlIGtpbmQgb2YgdHJhY2tcclxuICovXHJcbmV4cG9ydCBlbnVtIFRyYWNrS2luZCB7XHJcbiAgQVVESU8gPSAnYXVkaW8nLFxyXG4gIFZJREVPID0gJ3ZpZGVvJ1xyXG59XHJcblxyXG4vKipcclxuICogVHJhY2sgaW50ZXJmYWNlXHJcbiAqIEBkZXNjcmlwdGlvbiBUaGUgdHJhY2sgaW50ZXJmYWNlXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRyYWNrIHtcclxuICAvKipcclxuICAgKiBUcmFjayBraW5kXHJcbiAgICogQGRlc2NyaXB0aW9uIFRyYWNrIGtpbmRcclxuICAgKi9cclxuICBraW5kOiBUcmFja0tpbmQ7XHJcbiAgLyoqXHJcbiAgICogVHJhY2sgaWRcclxuICAgKiBAZGVzY3JpcHRpb24gVHJhY2sgaWRcclxuICAgKi9cclxuICBpZDogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIFRyYWNrIGlkXHJcbiAgICogQGRlc2NyaXB0aW9uIFRyYWNrIGlkXHJcbiAgICovXHJcbiAgdHJhY2tJZDogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIFRyYWNrIGxhYmVsXHJcbiAgICogQGRlc2NyaXB0aW9uIFRyYWNrIGxhYmVsXHJcbiAgICovXHJcbiAgbGFiZWw6IHN0cmluZztcclxuICAvKipcclxuICAgKiBUcmFjayBzdHJlYW1cclxuICAgKiBAZGVzY3JpcHRpb24gTWVkaWFTdHJlYW1cclxuICAgKi9cclxuICBzdHJlYW06IE1lZGlhU3RyZWFtO1xyXG4gIC8qKlxyXG4gICAqIFRyYWNrXHJcbiAgICogQGRlc2NyaXB0aW9uIE1lZGlhU3RyZWFtVHJhY2tcclxuICAgKi9cclxuICB0cmFjazogTWVkaWFTdHJlYW1UcmFjaztcclxuICAvKipcclxuICAgKiBQYXJ0aWNpcGFudCBpZFxyXG4gICAqIEBkZXNjcmlwdGlvbiBQYXJ0aWNpcGFudCBpZFxyXG4gICAqL1xyXG4gIHBhcnRpY2lwYW50SWQ6IHN0cmluZztcclxuICAvKipcclxuICAgKiBHZXQgYXV0byBzb3VyY2VcclxuICAgKiBAZGVzY3JpcHRpb24gR2V0IGF1dG8gc291cmNlIGZyb20gPGtpdHJ0Yy10cmFjayAvPlxyXG4gICAqL1xyXG4gIGdldEF1dG9Tb3VyY2U/OiBIVE1MVmlkZW9FbGVtZW50IHwgSFRNTEF1ZGlvRWxlbWVudCB8IHVuZGVmaW5lZDtcclxuICAvKipcclxuICAgKiBUcmFjayBjb21wb25lbnRcclxuICAgKiBAZGVzY3JpcHRpb24gVHJhY2sgY29tcG9uZW50XHJcbiAgICovXHJcbiAgdHJhY2tDb21wb25lbnQ/OiBhbnk7XHJcbiAgLyoqXHJcbiAgICogVHJhY2sgZXZlbnRzXHJcbiAgICogQGRlc2NyaXB0aW9uIFRyYWNrIGV2ZW50c1xyXG4gICAqL1xyXG4gIHRyYWNrRXZlbnRzPzogVHJhY2tzRXZlbnRzLFxyXG4gIC8qKlxyXG4gICAqIEdldCBzb3VyY2VcclxuICAgKiBAZGVzY3JpcHRpb24gR2VuZXJhdGUgc291cmNlIGZyb20gdHJhY2tcclxuICAgKi9cclxuICBnZXRTb3VyY2U6ICgpID0+IEhUTUxWaWRlb0VsZW1lbnQgfCBIVE1MQXVkaW9FbGVtZW50IHwgdW5kZWZpbmVkO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIE1lZGlhIG9wdGlvbnMgaW50ZXJmYWNlXHJcbiAqIEBkZXNjcmlwdGlvbiBUaGUgbWVkaWEgb3B0aW9ucyBpbnRlcmZhY2VcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWVkaWFPcHRpb25zIHtcclxuICB2aWRlbz86IHtcclxuICAgIG1heEJpdHJhdGU/OiBudW1iZXI7XHJcbiAgfVxyXG4gIGF1ZGlvPzoge1xyXG4gICAgbWF4Qml0cmF0ZT86IG51bWJlcjtcclxuICB9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogVHJhY2tzIGV2ZW50cyBpbnRlcmZhY2VcclxuICogQGRlc2NyaXB0aW9uIFRoZSB0cmFja3MgZXZlbnRzIGludGVyZmFjZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUcmFja3NFdmVudHNDb25zdHJ1Y3Rvck9wdGlvbnMge1xyXG4gIE1lZGlhU3RyZWFtOiBNZWRpYVN0cmVhbTtcclxuICBSVENUcmFja0V2ZW50PzogUlRDVHJhY2tFdmVudDtcclxufVxyXG4iXX0=