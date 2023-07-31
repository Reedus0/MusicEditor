export class Note {
    private horizontalPosition: number = 0
    private verticalPosition: number = 0
    private duration: number = 0
    private sound: string = 'C5'
    private half: noteHalf = noteHalf.NONE
    constructor(horizontalPosition: number, verticalPosition: number, duration: number, sound: string, half: noteHalf) {
        this.verticalPosition = verticalPosition
        this.horizontalPosition = horizontalPosition
        this.sound = sound
        this.half = half

        if (/[A-G]{1}[#b]?[0-7]{1}$/gm.test(sound)) {
            this.sound = sound
        } else {
            throw new Error('Sound is not valid: ' + sound)
        }

        if (duration >= 0 && duration <= 63) {
            this.duration = duration
        } else {
            throw new Error('Duration out of range: ' + duration)
        }
    }

    getSound() {
        return this.sound
    }

    setSound(sound: string, half?: noteHalf) {
        if (/[A-G]{1}[#b]?[0-7]{1}$/gm.test(sound)) {
            this.sound = sound
            if (half !== undefined) {
                this.half = half
            }
        } else {
            throw new Error('Sound is not valid: ' + sound)
        }
    }

    getHalf() {
        return this.half
    }
}

export enum noteHalf {
    FLAT = 'flat',
    SHARP = 'sharp',
    NATURAL = 'natural',
    NONE = 'none'
}