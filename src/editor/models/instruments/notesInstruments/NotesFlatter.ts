import { getNoteFromHTML, calculateHalfNote, halfMaps } from "../../../utils"
import { noteHalf } from "../../Note"
import { Song } from "../../Song"
import { Track } from "../../Track"
import { IInstrument } from "../interfaces/IInsrument"

export class NotesFlatter implements IInstrument {
    name: string = 'notesFlatter'


    public action = (element: HTMLElement, song: Song) => {

        const { cordsX, cordsY, currentTrack } = getNoteFromHTML(element, song)

        this.flatNote(cordsX, cordsY, currentTrack)
    }

    private flatNote = (cordsX: number, cordsY: number, currentTrack: Track) => {
        const currentNote = currentTrack.getNote(cordsX, cordsY)
        if (currentNote['half'] === noteHalf.NONE) {
            const newNote = calculateHalfNote(currentNote.getSound(), halfMaps.FLAT_MAP)
            currentNote.setSound(newNote, noteHalf.FLAT)
        }
    }
}