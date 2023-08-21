export class Note {
    public horizontalPosition: number = 0
    public verticalPosition: number = 0
    private duration: number = 0
    private halfPosition: number = 1
    private sound: string = 'C4'
    private style: number = 1
    private unionNote: Note = {} as Note
    private half: noteHalf = noteHalf.NONE
    constructor(horizontalPosition: number, verticalPosition: number, duration: number, style: number, sound: string, half: noteHalf) {
        this.verticalPosition = verticalPosition
        this.sound = sound
        this.half = half

        if (horizontalPosition >= 0) {
            this.horizontalPosition = horizontalPosition
        } else {
            throw new Error('Horizontal Position out of range: ' + horizontalPosition)
        }

        if (style >= 1 && style <= 4) {
            this.style = style
        } else {
            throw new Error('Style is not valid: ' + style)
        }

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

    getStyle() {
        return this.style
    }

    setStyle(style: number) {
        if (style >= 1 && style <= 4) {
            this.style = style
        } else {
            throw new Error('Style is not valid: ' + style)
        }
    }

    getSound() {
        return this.sound
    }

    setUnionNote(unionNote: Note) {
        this.unionNote = unionNote
    }

    getUnionNote() {
        return this.unionNote
    }
    getHalfPosition() {
        return this.halfPosition
    }

    setHalfPosition(halfPosition: number) {
        if (this.halfPosition > 0 && this.halfPosition < 6) {
            this.halfPosition = halfPosition
        } else {
            throw new Error('Half position is not valid: ' + halfPosition)
        }
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

export const noteStylesClasses: any = {
    1: '_top',
    2: '_bottom',
    3: '_bottom _rotated',
    4: '_top _rotated'
}