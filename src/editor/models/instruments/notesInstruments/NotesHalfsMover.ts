import { getNoteFromHTML } from "../../../utils"
import { Song } from "../../Song"
import { Track } from "../../Track"
import { IInstrument } from "../interfaces/IInsrument"

export class HalfsMover implements IInstrument {
    name: string = 'notesHalfsMover'


    public action = (element: HTMLElement, song: Song) => {

        const { cordsX, cordsY, currentTrack } = getNoteFromHTML(element, song)

        this.moveHlaf(cordsX, cordsY, currentTrack)
    }

    private moveHlaf = (cordsX: number, cordsY: number, currentTrack: Track) => {
        const currentNote = currentTrack.getNote(cordsX, cordsY)
        if(currentNote.getHalfPosition() === 5){
            currentNote.setHalfPosition(1)
        } else {
            currentNote.setHalfPosition(currentNote.getHalfPosition() + 1)
        }
    }
}