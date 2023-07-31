export class Rest {
    private horizontalPosition: number = 0
    private verticalPosition: number = 0
    private duration: number = 0
    constructor(horizontalPosition: number, verticalPosition: number, duration: number) {
        this.verticalPosition = verticalPosition
        this.horizontalPosition = horizontalPosition

        if (duration >= 0 && duration <= 63) {
            this.duration = duration
        } else {
            throw new Error('Duration out of range: ' + duration)
        }
    }
}
