import { getTactFromHTML } from "../../../utils"
import { Song } from "../../Song"
import { IInstrument } from "../interfaces/IInsrument"


export class TactsShorter implements IInstrument {
    name: string = 'tactsShorter'
    public action = (element: HTMLElement, song: Song) => {
        const currentTactNumber = Number(element!.id.split('-')[1])

        let lowerThreshold: number = 12
        let defaultValue: number = 36

        if (currentTactNumber === 0) {
            defaultValue -= 12
            lowerThreshold += 12
        }

        const { currentTact } = getTactFromHTML(element, song)
        const tactWidth: number = currentTact.getWidth()
        let newWidth: number = tactWidth
        if (tactWidth <= lowerThreshold) {
            newWidth = tactWidth + defaultValue
        } else if (tactWidth >= 24) {
            newWidth = tactWidth - 12
        }

        currentTact.setWidth(newWidth)
    }
}