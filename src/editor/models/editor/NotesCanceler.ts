import { FlatMap, SharpMap, calculateHalfNote, getNoteFromHTML, halfMaps } from "../../utils"
import { noteHalf } from "../Note"
import { Song } from "../Song"
import { Track } from "../Track"
import { IInstrument } from "./IInsrument"

export class NotesCanceler implements IInstrument {
    name: string = 'notesCanceler'


    public action = (element: HTMLElement, song: Song) => {

        const { cordsX, cordsY, currentTrack } = getNoteFromHTML(element, song)

        this.cancelNote(cordsX, cordsY, currentTrack)
    }

    private cancelNote = (cordsX: number, cordsY: number, currentTrack: Track) => {
        const currentNote = currentTrack.getNote(cordsX, cordsY)
        if (currentNote['half'] !== noteHalf.NONE) {
            const oldSound = currentNote.getSound()
            const oldOctave = oldSound[oldSound.length - 1]
            let newNote: string = ''
            if (currentNote['half'] === noteHalf.SHARP) {
                newNote = FlatMap[oldSound.slice(0, -1)] + oldOctave.toString()
            } else if (currentNote['half'] === noteHalf.FLAT) {
                newNote = SharpMap[oldSound.slice(0, -1)] + oldOctave.toString()
            }
            currentNote.setSound(newNote, noteHalf.NONE)
        }
    }
}