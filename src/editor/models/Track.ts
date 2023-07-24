import { clefs } from "../utils";
import { keys } from "../utils/keys";
import { Note } from "./Note";

export class Track {
    private notes: Note[] = []
    private key: keys = keys.C
    private clef: clefs = clefs.TREBLE
    constructor(notes: Note[], key: keys, clef: clefs) {
        this.notes = notes
        this.key = key
        this.clef = clef
    }

    getKey() {
        return this.key
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