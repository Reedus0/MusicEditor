export interface NotificationState {
  notification: JSX.Element;
}

export enum NotificationActionEnum {
  SET_NOTIFICATION = "SET_NOTIFICATION",
}

export interface SetNotificationAction {
  type: NotificationActionEnum.SET_NOTIFICATION;
  payload: JSX.Element;
}


export type NotificationAction =
  SetNotificationAction 