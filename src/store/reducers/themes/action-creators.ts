import { IThemes } from "../../../models/ITheme";
import { SetThemeAction, ThemesActionEnum } from "./types";

export const ThemesActionCreators = {
  setTheme: (theme: IThemes): SetThemeAction => ({ type: ThemesActionEnum.SET_THEME, payload: theme }),
}