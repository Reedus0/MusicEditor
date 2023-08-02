import { Song } from "../../Song";
import { IInstrument } from "../interfaces/IInsrument";

export class ObjectsMover implements IInstrument {
    name: string = 'objectsMover'
    public action = (element: HTMLElement, song: Song) => {

    }
}