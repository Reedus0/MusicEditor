import { PromptAction, PromptActionEnum, PromptState } from "./types";



const initialState = {
  prompt: <></>,
}

export default function promptReducer(state = initialState, action: PromptAction): PromptState {
  switch (action.type) {
    case PromptActionEnum.SET_PROMPT:
      return { ...state, prompt: action.payload }
    default:
      return state;
  }
}