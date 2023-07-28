import { getTactFromHTML } from "../../utils";
import { Song } from "../Song";
import { IInstrument } from "./IInsrument";

export class TactWider implements IInstrument {
    name: string = 'tactWider'
    public action = (element: HTMLElement, song: Song) => {
        const { currentTact } = getTactFromHTML(element, song)
        const tactWidth: number = currentTact.getWidth()
        let newWidth: number = tactWidth
        if (tactWidth <= 36) {
            newWidth = tactWidth + 12
        } else if (tactWidth >= 48) {
            newWidth = tactWidth - 36
        }
        currentTact.setWidth(newWidth)
    }
}