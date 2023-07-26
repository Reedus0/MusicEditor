import { clefs, getNotesLine, getNotesRow } from "../utils";
import { keys } from "../utils/keys";
import { Note, noteHalf } from "./Note";

export class Track {
    private notes: Note[] = []
    private key: keys = keys.C
    private clef: clefs = clefs.TREBLE
    private timeSignature: string = '4/4'
    private instrument: string = ''
    constructor(notes: Note[], key: keys, timeSignature: string, clef: clefs, instrument?: string) {
        this.notes = notes
        this.key = key
        this.clef = clef
        if (/[0-9]{1,2}(\/)[1-9]{1,2}/gm.test(timeSignature)) {
            this.timeSignature = timeSignature
        }
        if (instrument !== undefined) {
            this.instrument = instrument
        }
    }

    getKey() {
        return this.key
    }

    getClef() {
        return this.clef
    }

    getInstrument() {
        return this.instrument
    }

    getTimeSignature() {
        return this.timeSignature
    }

    addNote(note: Note) {
        this.notes.push(note)
    }


    deleteNote(horizontalPosition: number, verticalPosition: number) {
        this.notes = this.notes.filter((note: Note) => !(note['horizontalPosition'] === horizontalPosition && note['verticalPosition'] === verticalPosition))
    }

    getClosestVerticalNote(horizontalPosition: number, verticalPosition: number) {
        const result = this.getNote(horizontalPosition, getNotesRow(this.notes.filter((note: Note) => note['horizontalPosition'] === horizontalPosition && note['verticalPosition'] !== verticalPosition)).reduce((previous, current) => {
            return (Math.abs(current - verticalPosition) < Math.abs(previous - verticalPosition) ? current : previous);
        }))
        console.log(Math.abs(verticalPosition - result['verticalPosition']))
        return result
    }

    getNote(horizontalPosition: number, verticalPosition: number) {
        return this.notes.filter((note: Note) => note['horizontalPosition'] === horizontalPosition && note['verticalPosition'] === verticalPosition)[0]
    }

    getNotes() {
        return this.notes
    }
}