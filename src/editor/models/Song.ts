import { keys } from "../utils";
import { Tact } from "./Tact";

export class Song {
    private tacts: Tact[] = []
    private tempo: number = 80
    private key: keys = keys.C
    constructor(tacts: Tact[], tempo: number, key: keys) {
        this.tacts = tacts
        this.tempo = tempo
        this.key = key
    }
}