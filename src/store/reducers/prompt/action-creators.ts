import { PromptActionEnum, SetPromptAction } from "./types";

export const PromptActionCreators = {
	setPrompt: (prompt: JSX.Element): SetPromptAction => ({ type: PromptActionEnum.SET_PROMPT, payload: prompt }),
}