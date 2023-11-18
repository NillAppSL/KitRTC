/**
 * Room codes interface
 * @description The room codes interface
 */
export var RoomCodes;
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
export var RoomEvent;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlha2l0YXBwanMvc3JjL2xpYi9pbnRlcmZhY2VzL3Jvb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7OztHQUdHO0FBQ0gsTUFBTSxDQUFOLElBQVksU0FTWDtBQVRELFdBQVksU0FBUztJQUNuQjs7T0FFRztJQUNILDZCQUFnQixDQUFBO0lBQ2hCOztPQUVHO0lBQ0gsNEJBQWUsQ0FBQTtBQUNqQixDQUFDLEVBVFcsU0FBUyxLQUFULFNBQVMsUUFTcEI7QUEwQkQ7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxTQXlCWDtBQXpCRCxXQUFZLFNBQVM7SUFDbkI7O09BRUc7SUFDSCxpREFBb0MsQ0FBQTtJQUNwQzs7T0FFRztJQUNILHFEQUF3QyxDQUFBO0lBQ3hDOztPQUVHO0lBQ0gsaUVBQW9ELENBQUE7SUFDcEQ7O09BRUc7SUFDSCwyREFBOEMsQ0FBQTtJQUM5Qzs7T0FFRztJQUNILHFEQUF3QyxDQUFBO0lBQ3hDOztPQUVHO0lBQ0gsaURBQW9DLENBQUE7QUFDdEMsQ0FBQyxFQXpCVyxTQUFTLEtBQVQsU0FBUyxRQXlCcEIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyoqXHJcbiAqIFJvb20gY29kZXMgaW50ZXJmYWNlXHJcbiAqIEBkZXNjcmlwdGlvbiBUaGUgcm9vbSBjb2RlcyBpbnRlcmZhY2VcclxuICovXHJcbmV4cG9ydCBlbnVtIFJvb21Db2RlcyB7XHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uIFRoZSByb29tIHdhcyBjcmVhdGVkIHN1Y2Nlc3NmdWxseVxyXG4gICAqL1xyXG4gIFNVQ0NFU1MgPSAndHJ1ZScsXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uIFRoZSByb29tIHdhcyBub3QgY3JlYXRlZCBzdWNjZXNzZnVsbHlcclxuICAgKi9cclxuICBFUlJPUiA9ICdmYWxzZSdcclxufVxyXG5cclxuLyoqXHJcbiAqIEpvaW4gcm9vbSBpbnRlcmZhY2VcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSm9pblJvb20ge1xyXG4gIC8qKlxyXG4gICAqIFJvb20gY29kZVxyXG4gICAqIEBkZXNjcmlwdGlvbiBUaGUgcm9vbSBjb2RlXHJcbiAgICovXHJcbiAgY29kZTogUm9vbUNvZGVzO1xyXG5cclxuICAvKipcclxuICAgKiBSb29tIG5hbWVcclxuICAgKiBAZGVzY3JpcHRpb24gVGhlIHJvb20gbmFtZVxyXG4gICAqL1xyXG4gIHJvb206IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogTWVzc2FnZVxyXG4gICAqIEBkZXNjcmlwdGlvbiBUaGUgbWVzc2FnZVxyXG4gICAqL1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBSb29tIGV2ZW50cyBpbnRlcmZhY2VcclxuICovXHJcbmV4cG9ydCBlbnVtIFJvb21FdmVudCB7XHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uIFRoZSByb29tIHdhcyBjcmVhdGVkIHN1Y2Nlc3NmdWxseVxyXG4gICAqL1xyXG4gIFRyYWNrU3Vic2NyaWJlZCA9ICd0cmFjay1zdWJzY3JpYmVkJyxcclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb24gVGhlIHJvb20gd2FzIG5vdCBjcmVhdGVkIHN1Y2Nlc3NmdWxseVxyXG4gICAqL1xyXG4gIFRyYWNrVW5zdWJzY3JpYmVkID0gJ3RyYWNrLXVuc3Vic2NyaWJlZCcsXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uIFRoZSBwYXJ0aWNpcGFudCB3YXMgZGlzY29ubmVjdGVkXHJcbiAgICovXHJcbiAgUGFydGljaXBhbnREaXNjb25uZWN0ZWQgPSAncGFydGljaXBhbnQtZGlzY29ubmVjdGVkJyxcclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb24gVGhlIHBhcnRpY2lwYW50IHdhcyBjb25uZWN0ZWRcclxuICAgKi9cclxuICBQYXJ0aWNpcGFudENvbm5lY3RlZCA9ICdwYXJ0aWNpcGFudC1jb25uZWN0ZWQnLFxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvbiBUaGUgcGFydGljaXBhbnQgd2FzIGpvaW5lZFxyXG4gICAqL1xyXG4gIFBhcnRpY2lwYW50Sm9pbmVkID0gJ3BhcnRpY2lwYW50LWpvaW5lZCcsXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uIFRoZSBwYXJ0aWNpcGFudCB3YXMgbGVmdFxyXG4gICAqL1xyXG4gIFBhcnRpY2lwYW50TGVmdCA9ICdwYXJ0aWNpcGFudC1sZWZ0JyxcclxufVxyXG4iXX0=