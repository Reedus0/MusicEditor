import { keys } from "../utils/keys";
import { Tact } from "./Tact";

export class Song {
    public name: string = 'Template'
    public subtitle: string = 'Template subtitle'
    public author: string = 'Anonymous'
    private tacts: Tact[] = []
    private tempo: number = 80
    private key: keys = keys.C
    private timeSignature: string = '4/4'
    constructor(name: string, subtitle: string, author: string, tacts: Tact[], tempo: number, key: keys, timeSignature: string) {
        this.name = name
        this.subtitle = subtitle
        this.author = author
        this.tacts = tacts
        this.tempo = tempo
        this.key = key
        if (/[0-9]{1,2}(\/)[0-9]{1,2}/gm.test(timeSignature)) {
            this.timeSignature = timeSignature
        }
    }
}