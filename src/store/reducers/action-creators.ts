import { AuthActionCreators } from "./auth/action-creators";
import { NotificationActionCreators } from "./notification/action-creators";
import { PromptActionCreators } from "./prompt/action-creators";
import { ThemesActionCreators } from "./themes/action-creators";

export const allActionCreators = {
  ...AuthActionCreators,
  ...PromptActionCreators,
  ...NotificationActionCreators,
  ...ThemesActionCreators
}