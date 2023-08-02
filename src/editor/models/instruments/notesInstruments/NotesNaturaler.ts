import { getNoteFromHTML, calculateHalfNote, halfMaps } from "../../../utils"
import { noteHalf } from "../../Note"
import { Song } from "../../Song"
import { Track } from "../../Track"
import { IInstrument } from "../interfaces/IInsrument"


export class NotesNaturaler implements IInstrument {
    name: string = 'notesNaturaler'


    public action = (element: HTMLElement, song: Song) => {

        const { cordsX, cordsY, currentTrack } = getNoteFromHTML(element, song)

        this.naturalNote(cordsX, cordsY, currentTrack)
    }

    private naturalNote = (cordsX: number, cordsY: number, currentTrack: Track) => {
        const currentNote = currentTrack.getNote(cordsX, cordsY)
        if (currentNote['half'] === noteHalf.NONE && currentNote['sound'].length === 3) {
            const newNote = calculateHalfNote(currentNote.getSound(), halfMaps.CANCEL_MAP)
            currentNote.setSound(newNote, noteHalf.NATURAL)
        }
    }
}