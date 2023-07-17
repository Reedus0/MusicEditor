import { NotificationActionEnum, NotificationAction, NotificationState } from "./types";



const initialState = {
  notification: <></>,
}

export default function notificationReducer(state = initialState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case NotificationActionEnum.SET_NOTIFICATION:
      return { ...state, notification: action.payload }
    default:
      return state;
  }
}