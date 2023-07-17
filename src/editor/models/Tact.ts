import { Note } from "./Note"

export class Tact {
    duration: number = 64
    constructor(public notes: Note[]) { }
}