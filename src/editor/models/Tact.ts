import { Track } from "./Track"

export class Tact {
    private duration: number = 64
    private tracks: Track[] = []
    private tempo: number = 120
    private width: number = 12
    constructor(tracks: Track[], tempo: number, width: number) {
        this.tracks = tracks
        this.tempo = tempo
        if (width >= 12 && width <= 48) {
            this.width = width
        } else {
            throw new Error('Width out of range: ' + width)
        }
    }

    getTempo(){
        return this.tempo
    }

    getWidth() {
        return this.width
    }

    setWidth(width: number) {
        if (width >= 12 && width <= 48) {
            this.width = width
        } else {
            throw new Error('Width out of range: ' + width)
        }
    }
}