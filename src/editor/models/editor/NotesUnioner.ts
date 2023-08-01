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
        if (Object.keys(this.firstNote).length !== 0 && (this.firstNote['horizontalPosition'] !== cordsX && this.firstNote['verticalPosition'] !== cordsY)) {
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
        if (this.firstNote.getStyle() !== this.secondNote.getStyle()) return
        try {
            let currentUnionNote = this.firstNote.getUnionNote()
            this.firstNote.setUnionNote({} as Note)
            while(Object.keys(currentUnionNote).length !== 0){
                currentUnionNote.setUnionNote({} as Note)
                currentUnionNote = currentUnionNote.getUnionNote()
            }
            currentUnionNote = this.secondNote.getUnionNote()
            while(Object.keys(currentUnionNote).length !== 0){
                currentUnionNote.setUnionNote({} as Note)
                currentUnionNote = currentUnionNote.getUnionNote()
            }
        } catch (e) { }

        this.firstNote.setUnionNote(this.secondNote)
        this.secondNote.setUnionNote(this.firstNote)

        console.log(this.firstNote, this.secondNote)

        this.firstNote = {} as Note
        this.secondNote = {} as Note
    }

    private breakUnion = () => {
        this.firstNote.setUnionNote({} as Note)
        this.secondNote.setUnionNote({} as Note)

        this.firstNote = {} as Note
        this.secondNote = {} as Note
    }

}