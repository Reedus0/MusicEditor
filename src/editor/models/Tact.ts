import { Note } from "./Note"
import { Track } from "./Track"

export class Tact {
    private duration: number = 63
    private tracks: Track[] = []
    constructor(tracks: Track[]) {
        this.tracks = tracks
    }
}