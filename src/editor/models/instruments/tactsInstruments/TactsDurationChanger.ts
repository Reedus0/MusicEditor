import { Song } from "../../Song";
import { IInstrument } from "../interfaces/IInsrument";

export class TactsDurationChanger implements IInstrument {
    name: string = 'tactsDurationChanger'
    public action = (element: HTMLElement, song: Song) => {
        const currentTactNumber = Number(element!.id.split('-')[1])
        const currentTact = song['tacts'][currentTactNumber]

        const currentDuration: number = currentTact.getDuration()

        if (currentDuration < 4) {
            currentTact.setDuration(currentDuration + 1)
        } else if (currentDuration >= 4) {
            currentTact.setDuration(1)
        }
    }
}