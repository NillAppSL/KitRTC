import { LoggerColors } from "../interfaces/logger";
/**
 * Logger
 * @description Logger for debug mode
 */
export class Logger {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFraXRhcHBqcy9zcmMvbGliL2NsYXNzL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLE1BQU07SUFFakI7Ozs7T0FJRztJQUNILEdBQUcsQ0FBQyxLQUFtQixFQUFFLE9BQW9CO1FBQzNDLE1BQU0sS0FBSyxHQUFHLGlCQUFpQixDQUFDO1FBQ2hDLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUVyQixRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssWUFBWSxDQUFDLEdBQUc7Z0JBQ25CLFdBQVcsR0FBRyxZQUFZLENBQUM7Z0JBQzNCLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxLQUFLO2dCQUNyQixXQUFXLEdBQUcsY0FBYyxDQUFDO2dCQUM3QixNQUFNO1lBQ1IsS0FBSyxZQUFZLENBQUMsTUFBTTtnQkFDdEIsV0FBVyxHQUFHLGVBQWUsQ0FBQztnQkFDOUIsTUFBTTtZQUNSLEtBQUssWUFBWSxDQUFDLElBQUk7Z0JBQ3BCLFdBQVcsR0FBRyxhQUFhLENBQUM7Z0JBQzVCLE1BQU07WUFDUjtnQkFDRSxXQUFXLEdBQUcsYUFBYSxDQUFDO2dCQUM1QixNQUFNO1NBQ1Q7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FFRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlckNvbG9ycyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2xvZ2dlclwiO1xyXG5cclxuLyoqXHJcbiAqIExvZ2dlclxyXG4gKiBAZGVzY3JpcHRpb24gTG9nZ2VyIGZvciBkZWJ1ZyBtb2RlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTG9nZ2VyIHtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBsb2cgaW4gY29uc29sZVxyXG4gICAqIEBwYXJhbSBjb2xvciBjb2xvciBvZiBsb2dcclxuICAgKiBAcGFyYW0gbWVzc2FnZSBtZXNzYWdlIHRvIHNob3dcclxuICAgKi9cclxuICBsb2coY29sb3I6IExvZ2dlckNvbG9ycywgbWVzc2FnZToge30gfCBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRpdGxlID0gJ0tpdFJUQyBMb2dnaW5nOic7XHJcbiAgICBsZXQgY29sb3JTdHJpbmcgPSAnJztcclxuXHJcbiAgICBzd2l0Y2ggKGNvbG9yKSB7XHJcbiAgICAgIGNhc2UgTG9nZ2VyQ29sb3JzLlJFRDpcclxuICAgICAgICBjb2xvclN0cmluZyA9ICdjb2xvcjogcmVkJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBMb2dnZXJDb2xvcnMuR1JFRU46XHJcbiAgICAgICAgY29sb3JTdHJpbmcgPSAnY29sb3I6IGdyZWVuJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBMb2dnZXJDb2xvcnMuWUVMTE9XOlxyXG4gICAgICAgIGNvbG9yU3RyaW5nID0gJ2NvbG9yOiB5ZWxsb3cnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIExvZ2dlckNvbG9ycy5CTFVFOlxyXG4gICAgICAgIGNvbG9yU3RyaW5nID0gJ2NvbG9yOiBibHVlJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb2xvclN0cmluZyA9ICdjb2xvcjogYmx1ZSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coYCVjJHt0aXRsZX1gLCBjb2xvclN0cmluZywgbWVzc2FnZSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=