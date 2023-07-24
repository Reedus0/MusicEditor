import { calculateNotePosition, clearHoverNote, globalOffset } from "../../utils"
import { Note, noteHalf } from "../Note"
import { Song } from "../Song"
import { Track } from "../Track"
import { IInstrument } from "./IInsrument"


export class NotesAdder implements IInstrument {
    name: string = 'notesAdder'
    private step: number = 4

    getStep() {
        return this.step
    }

    setStep(step: number) {
        if(step >= 0 && step <= 32){
            this.step = step
        }
    }

    public action = (element: HTMLElement, song: Song) => {

        const { cordsX, cordsY, currentTrack, noteSound } = calculateNotePosition(element, song)

        this.addNote(cordsX, cordsY, currentTrack, noteSound)
    }

    private addNote = (cordsX: number, cordsY: number, currentTrack: Track, noteSound: string) => {
        if(currentTrack.getNote(cordsX, cordsY)) return
        currentTrack.addNote(
            new Note(
                cordsX,
                cordsY,
                4,
                noteSound,
                noteHalf.NONE
            )
        )
        clearHoverNote()
    }
    

}