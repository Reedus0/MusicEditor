import { getNoteFromHTML, getNoteSymbolElement } from "../../utils";
import { Note } from "../Note";
import { Song } from "../Song";
import { Track } from "../Track";
import { IInstrument } from "./IInsrument";
import { IUnion } from "./IUnion";

export class NotesUnioner implements IInstrument, IUnion {
    firstNote: Note = {} as Note
    secondNote: Note = {} as Note
    currentTrack: Track = {} as Track
    name: string = 'notesUnioner'
    public action = (element: HTMLElement, song: Song) => {
        const { cordsX, cordsY, currentTrack } = getNoteFromHTML(element, song)
        if (Object.keys(this.firstNote).length !== 0) {
            this.secondNote = currentTrack.getNote(cordsX, cordsY)
        } else {
            this.firstNote = currentTrack.getNote(cordsX, cordsY)
        }
        if (Object.keys(this.firstNote).length !== 0 && Object.keys(this.secondNote).length !== 0) {
            if (!this.checkIfHasUnion()) {

                this.unionNotes()
            } else {
                this.breakUnion()
            }
        }

        // if (this.firstElement !== null && this.firstElement !== element) {
        //     this.secondElement = element
        // } else {
        //     this.firstElement = element
        // }
        // if (this.firstElement !== null && this.secondElement !== null) {
        //     if (!this.checkIfHasUnion()) {
        //         this.unionNotes()
        //     } else {
        //         this.breakeUnion()
        //     }
        // }
    }

    private checkIfHasUnion = () => {
        const firstHasUnion: boolean =
            this.firstNote.getUnionNote()['horizontalPosition'] === this.secondNote['horizontalPosition'] &&
            this.firstNote.getUnionNote()['verticalPosition'] === this.secondNote['verticalPosition']
        const secondHasUnion: boolean =
            this.secondNote.getUnionNote()['horizontalPosition'] === this.firstNote['horizontalPosition'] &&
            this.secondNote.getUnionNote()['verticalPosition'] === this.firstNote['verticalPosition']

        return firstHasUnion && secondHasUnion
    }

    private unionNotes = () => {
        try{

            this.firstNote.getUnionNote().setUnionNote({} as Note)
            this.secondNote.getUnionNote().setUnionNote({} as Note)
        } catch (e) {
            
        }

        this.firstNote.setUnionNote(this.secondNote)
        this.secondNote.setUnionNote(this.firstNote)

        console.log(this.firstNote, this.secondNote)

        this.firstNote = {} as Note
        this.secondNote = {} as Note

        // `
        // <div class="editor-drawer-note__union" 
        //     style="
        //         left: ${notesOrientation === 'top' ? 15 + 'px' : 0 + 'px'};
        //         top: ${notesOrientation === 'top' ? -42 + (shitExpression ? Math.abs(firstElementTop - secondElementTop) * (shitExpression ? -Math.round(rotateAngle) : Math.round(rotateAngle)) - (shitExpression ? -Math.abs(firstElementTop - secondElementTop) : Math.abs(firstElementTop - secondElementTop)) : 0) + 'px' : 'unset'};
        //         bottom: ${notesOrientation === 'bottom' ? -30 + (!shitExpression ? 0 : Math.abs(firstElementTop - secondElementTop) * (!shitExpression ? -Math.round(rotateAngle) : Math.round(rotateAngle)) - (!shitExpression ? -Math.abs(firstElementTop - secondElementTop) : Math.abs(firstElementTop - secondElementTop))) + 'px' : 'unset'};
        //         width: ${unionWidth + 1}px; transform: rotate(${lastElementRighter ? -rotateAngle : rotateAngle}rad)
        //     ">
        // </div>`
    }

    private breakUnion = () => {
        this.firstNote.setUnionNote({} as Note)
        this.secondNote.setUnionNote({} as Note)

        this.firstNote = {} as Note
        this.secondNote = {} as Note
    }

}