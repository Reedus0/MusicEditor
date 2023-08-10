import { Track } from "./Track"

export class Tact {
    private duration: number = 1
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

    getDuration() {
        return this.duration
    }

    setDuration(duration: number) {
        if (duration >= 1 && duration <= 4) {
            this.duration = duration
        } else {
            throw new Error('Duration out of range: ' + duration)
        }
    }

    getTempo() {
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