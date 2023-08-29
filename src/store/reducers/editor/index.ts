import { IInstrument } from "../../../editor/models/instruments/interfaces/IInsrument";
import { EditorAction, EditorActionEnum, EditorState } from "./types";


const initialState = {
    isEditing: false,
    isPlaying: false,
    position: 0,
    notesCounter: 0,

    instrument: {} as IInstrument
}

export default function editorReducer(state = initialState, action: EditorAction): EditorState {
    switch (action.type) {
        case EditorActionEnum.SET_IS_EDITING:
            return { ...state, isEditing: action.payload }
        case EditorActionEnum.SET_IS_PLAYING:
            return { ...state, isPlaying: action.payload }
        case EditorActionEnum.SET_POSITION:
            return { ...state, position: action.payload }
        case EditorActionEnum.SET_NOTES_COUNTER:
            return { ...state, notesCounter: action.payload }
        case EditorActionEnum.SET_INSTRUMNET:
            return { ...state, instrument: action.payload }
        default:
            return state;
    }
}