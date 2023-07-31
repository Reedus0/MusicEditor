import { getNoteSymbolElement } from "../../utils";
import { Song } from "../Song";
import { IInstrument } from "./IInsrument";

export class NotesViewChanger implements IInstrument {
    name: string = 'notesViewChanger'
    public action = (element: HTMLElement, song: Song) => {
        const noteSymbolElement: HTMLElement = getNoteSymbolElement(element)
        if (noteSymbolElement.innerHTML === 'Q' && noteSymbolElement.classList.contains('_rotated')) {
            noteSymbolElement.innerHTML = 'q'
        } else if (noteSymbolElement.innerHTML === 'q' && noteSymbolElement.classList.contains('_rotated')) {
            noteSymbolElement.classList.remove('_rotated')
        } else if (noteSymbolElement.innerHTML === 'q') {
            noteSymbolElement.innerHTML = 'Q'
        } else if (noteSymbolElement.innerHTML === 'Q') {
            noteSymbolElement.classList.add('_rotated')
        }
    }
}