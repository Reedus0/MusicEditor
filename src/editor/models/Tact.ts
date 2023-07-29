import { Track } from "./Track"

export class Tact {
    private duration: number = 63
    private tracks: Track[] = []
    private width: number = 12
    constructor(tracks: Track[], width: number) {
        this.tracks = tracks
        if (width >= 12 && width <= 48) {
            this.width = width
        } else {
            throw new Error('Width out of range: ' + width)
        }
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