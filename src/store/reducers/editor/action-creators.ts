import { IInstrument } from "../../../editor/models/instruments/interfaces/IInsrument";
import { EditorActionEnum, SetInstrumentAction, SetIsEditingAction, SetIsPlayingAction, SetNotesCounterAction, SetPositionAction } from "./types";

export const EditorActionCreators = {
    setIsEditing: (isEditing: boolean): SetIsEditingAction => ({ type: EditorActionEnum.SET_IS_EDITING, payload: isEditing }),
    setIsPlaying: (isPlaying: boolean): SetIsPlayingAction => ({ type: EditorActionEnum.SET_IS_PLAYING, payload: isPlaying }),
    setPosition: (position: number): SetPositionAction => ({ type: EditorActionEnum.SET_POSITION, payload: position }),
    setNotesCounter: (notesCounter: number): SetNotesCounterAction => ({ type: EditorActionEnum.SET_NOTES_COUNTER, payload: notesCounter }),
    setInstrument: (instrument: IInstrument): SetInstrumentAction => ({ type: EditorActionEnum.SET_INSTRUMNET, payload: instrument }),
}