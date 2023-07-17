import { NotificationActionEnum, SetNotificationAction } from "./types";

export const NotificationActionCreators = {
	setNotification: (notification: JSX.Element): SetNotificationAction => ({ type: NotificationActionEnum.SET_NOTIFICATION, payload: notification }),
}