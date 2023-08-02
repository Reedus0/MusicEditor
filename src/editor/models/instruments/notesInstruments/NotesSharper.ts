import { getNoteFromHTML, calculateHalfNote, halfMaps } from "../../../utils"
import { noteHalf } from "../../Note"
import { Song } from "../../Song"
import { Track } from "../../Track"
import { IInstrument } from "../interfaces/IInsrument"


export class NotesSharper implements IInstrument {
    name: string = 'notesSharper'


    public action = (element: HTMLElement, song: Song) => {

        const { cordsX, cordsY, currentTrack } = getNoteFromHTML(element, song)

        this.sharpNote(cordsX, cordsY, currentTrack)
    }

    private sharpNote = (cordsX: number, cordsY: number, currentTrack: Track) => {
        const currentNote = currentTrack.getNote(cordsX, cordsY)
        if (currentNote['half'] === noteHalf.NONE) {
            const newNote = calculateHalfNote(currentNote.getSound(), halfMaps.SHARP_MAP)
            currentNote.setSound(newNote, noteHalf.SHARP)
        }
    }
}