import { getTactFromHTML } from "../../../utils"
import { Song } from "../../Song"
import { IInstrument } from "../interfaces/IInsrument"


export class TactsWider implements IInstrument {
    name: string = 'tactsWider'
    public action = (element: HTMLElement, song: Song) => {
        const currentTactNumber = Number(element!.id.split('-')[1])

        let defaultValue: number = 36

        if (currentTactNumber === 0) {
            defaultValue -= 12
        }

        
        const { currentTact } = getTactFromHTML(element, song)
        const tactWidth: number = currentTact.getWidth()
        let newWidth: number = tactWidth
        if (tactWidth <= 36) {
            newWidth = tactWidth + 12
        } else if (tactWidth >= 48) {
            newWidth = tactWidth - defaultValue
        }
        currentTact.setWidth(newWidth)
    }
}