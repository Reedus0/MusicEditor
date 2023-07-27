import { keys } from "../utils/keys";
import { Tact } from "./Tact";

export class Song {
    private tacts: Tact[] = []
    private tempo: number = 80
    private key: keys = keys.C
    private timeSignature: string = '4/4'
    constructor(tacts: Tact[], tempo: number, key: keys, timeSignature: string) {
        this.tacts = tacts
        this.tempo = tempo
        this.key = key
        if (/[0-9]{1,2}(\/)[1-9]{1,2}/gm.test(timeSignature)) {
            this.timeSignature = timeSignature
        }
    }
}