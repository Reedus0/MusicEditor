import { clefs } from "../utils";
import { keys } from "../utils/keys";
import { Note } from "./Note";

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

    getTimeSignature() {
        return this.timeSignature
    }

    addNote(note: Note) {
        this.notes.push(note)
    }

    deleteNote(horizontalPosition: number, verticalPosition: number) {
        this.notes = this.notes.filter((note: Note) => !(note['horizontalPosition'] === horizontalPosition && note['verticalPosition'] === verticalPosition))
    }

    getNote(horizontalPosition: number, verticalPosition: number) {
        return this.notes.filter((note: Note) => note['horizontalPosition'] === horizontalPosition && note['verticalPosition'] === verticalPosition)[0]
    }

    getNotes() {
        return this.notes
    }
}