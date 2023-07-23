export class Note {
    private horizontalPosition: number = 0
    private verticalPosition: number = 0
    private duration: number = 0
    private sound: string = 'C5'
    private half: noteHalf = noteHalf.NONE
    constructor(horizontalPosition: number, verticalPosition: number, duration: number, sound: string, half: noteHalf) {
        this.verticalPosition = verticalPosition
        this.sound = sound
        this.half = half

        if (horizontalPosition >= 0 && horizontalPosition <= 63) {
            this.horizontalPosition = horizontalPosition
        }

        if (duration >= 0 && duration <= 63) {
            this.duration = duration
        }
    }
}

export enum noteHalf {
    FLAT = 'flat',
    SHARP = 'sharp',
    NONE = 'none'
}