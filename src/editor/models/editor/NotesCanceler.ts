import { CancelMap, FlatMap, InvertMap, SharpMap, calculateHalfNote, getNoteFromHTML, halfMaps } from "../../utils"
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
            let newOctave: string = oldOctave
            let newNote: string = ''
            let newSound: string = ''

            if (currentNote['half'] === noteHalf.SHARP) {
                const calculatedNote = calculateHalfNote(oldSound, halfMaps.FLAT_MAP)
                newSound = calculatedNote.slice(0, -1)
                newOctave = calculatedNote[calculatedNote.length - 1]
            } else if (currentNote['half'] === noteHalf.FLAT) {
                const calculatedNote = calculateHalfNote(oldSound, halfMaps.SHARP_MAP)
                newSound = calculatedNote.slice(0, -1)
                newOctave = calculatedNote[calculatedNote.length - 1]
            } else if (currentNote['half'] === noteHalf.NATURAL) {
                const keyNotes = Object.values(currentTrack.getKey())
                for (let i = 0; i < 7; i++) {
                    if (oldSound.slice(0, -1) === keyNotes[i][0]) {
                        newSound = keyNotes[i]
                    }
                }
            }
            if (!Object.values(currentTrack.getKey()).includes(newSound)) {
                newNote = InvertMap[newSound] + newOctave.toString()
            } else {
                newNote = newSound + newOctave.toString()
            }
            currentTrack.getNote(cordsX, cordsY).setSound(newNote, noteHalf.NONE)
        }
    }
}