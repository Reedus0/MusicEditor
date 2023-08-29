import { IInstrument } from "../../../editor/models/instruments/interfaces/IInsrument";

export interface EditorState {
    isEditing: boolean;
    isPlaying: boolean;
    position: number;
    notesCounter: number;
    instrument: IInstrument
}

export enum EditorActionEnum {
    SET_IS_EDITING = "SET_IS_EDITING",
    SET_IS_PLAYING = "SET_IS_PLAYING",
    SET_POSITION = "SET_POSITION",
    SET_NOTES_COUNTER = "SET_NOTES_COUNTER",
    SET_INSTRUMNET = "SET_INSTRUMNET"
}

export interface SetIsEditingAction {
    type: EditorActionEnum.SET_IS_EDITING;
    payload: boolean;
}

export interface SetIsPlayingAction {
    type: EditorActionEnum.SET_IS_PLAYING;
    payload: boolean;
}

export interface SetPositionAction {
    type: EditorActionEnum.SET_POSITION;
    payload: number;
}

export interface SetNotesCounterAction {
    type: EditorActionEnum.SET_NOTES_COUNTER;
    payload: number;
}

export interface SetInstrumentAction {
    type: EditorActionEnum.SET_INSTRUMNET;
    payload: IInstrument;
}


export type EditorAction =
    SetIsEditingAction |
    SetIsPlayingAction |
    SetPositionAction |
    SetNotesCounterAction |
    SetInstrumentAction
