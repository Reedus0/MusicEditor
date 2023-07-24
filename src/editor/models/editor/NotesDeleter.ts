import { getNoteFromHTML, globalOffset } from "../../utils"
import { Note, noteHalf } from "../Note"
import { Song } from "../Song"
import { Track } from "../Track"
import { IInstrument } from "./IInsrument"


export class NotesDeleter implements IInstrument {
    name: string = 'notesDeleter'
    public action = (element: HTMLElement, song: Song) => {

        const { cordsX, cordsY, currentTrack } = getNoteFromHTML(element, song)

        this.deleteNote(cordsX, cordsY, currentTrack)
    }

    private deleteNote = (cordsX: number, cordsY: number, currentTrack: Track) => {
        currentTrack.deleteNote(cordsX, cordsY)
    }
}