import { IThemes } from "../../../models/ITheme";

export interface ThemesState {
  theme: IThemes
}

export enum ThemesActionEnum {
  SET_THEME = "SET_THEME",
}

export interface SetThemeAction {
  type: ThemesActionEnum.SET_THEME;
  payload: IThemes;
}


export type ThemesAction =
  SetThemeAction