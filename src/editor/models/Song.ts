import { keys } from "../utils";
import { Tact } from "./Tact";

export class Song {
    constructor(public tacts: Tact[], public tempo: number, public key: keys) { }
}