import { getTactFromHTML } from "../../utils";
import { Song } from "../Song";
import { IInstrument } from "./IInsrument";

export class TactShorter implements IInstrument {
    name: string = 'tactShorter'
    public action = (element: HTMLElement, song: Song) => {
        const { currentTact } = getTactFromHTML(element, song)
        const tactWidth: number = currentTact.getWidth()
        let newWidth: number = tactWidth
        if (tactWidth >= 24) {
            newWidth = tactWidth - 12
        } else if (tactWidth <= 12) {
            newWidth = tactWidth + 36
        }
        currentTact.setWidth(newWidth)
    }
}