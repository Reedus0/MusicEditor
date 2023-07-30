import { Song } from "../Song";
import { IInstrument } from "./IInsrument";

export class NotesViewChanger implements IInstrument {
    name: string = 'notesViewChanger'
    public action = (element: HTMLElement, song: Song) => {
        const elementChildNodes: HTMLElement[] = element.childNodes as any
        for (const node of elementChildNodes) {
            if (node!.classList.contains('editor-drawer-note__symbol')) {
                const noteElement: HTMLElement = node

                if (noteElement.innerHTML === 'Q' && noteElement.classList.contains('_rotated')) {
                    noteElement.innerHTML = 'q'
                } else if (noteElement.innerHTML === 'q' && noteElement.classList.contains('_rotated')) {
                    noteElement.classList.remove('_rotated')
                } else if (noteElement.innerHTML === 'q') {
                    noteElement.innerHTML = 'Q'
                } else if (noteElement.innerHTML === 'Q') {
                    noteElement.classList.add('_rotated')
                }
            }
        }
    }
}