import { IThemes } from "../../../models/ITheme";
import { ThemesAction, ThemesActionEnum, ThemesState } from "./types";


const initialState = {
  theme: IThemes.LIGHT
}

export default function themesReducer(state = initialState, action: ThemesAction): ThemesState {
  switch (action.type) {
    case ThemesActionEnum.SET_THEME:
      return { ...state, theme: action.payload }
    default:
      return state;
  }
}