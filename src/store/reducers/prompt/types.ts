export interface PromptState {
  prompt: JSX.Element;
}

export enum PromptActionEnum {
  SET_PROMPT = "SET_PROMPT",
}

export interface SetPromptAction {
  type: PromptActionEnum.SET_PROMPT;
  payload: JSX.Element;
}


export type PromptAction =
  SetPromptAction 