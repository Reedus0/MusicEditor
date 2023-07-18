export class Note {
    constructor(public horizontalPosition: number, public verticalPosition: number, public duration: number, public half: noteHalf) { }
}

export enum noteHalf {
    FLAT = 'flat',
    SHARP = 'sharp',
    NONE = 'none'
}