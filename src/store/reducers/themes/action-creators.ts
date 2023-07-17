import { IThemes } from "../../../models/ITheme";
import { IUser } from "../../../models/IUser";
import { SetThemeAction, ThemesActionEnum } from "./types";

export const ThemesActionCreators = {
  setTheme: (theme: IThemes): SetThemeAction => ({ type: ThemesActionEnum.SET_THEME, payload: theme }),
}