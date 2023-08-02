import { getNoteFromHTML } from "../../../utils"
import { Song } from "../../Song"
import { Track } from "../../Track"
import { IInstrument } from "../interfaces/IInsrument"

export class NotesViewChanger implements IInstrument {
    name: string = 'notesViewChanger'


    public action = (element: HTMLElement, song: Song) => {

        const { cordsX, cordsY, currentTrack } = getNoteFromHTML(element, song)

        this.changeStyle(cordsX, cordsY, currentTrack)

    }

    private changeStyle = (cordsX: number, cordsY: number, currentTrack: Track) => {
        const currentNote = currentTrack.getNote(cordsX, cordsY)
        if(currentNote.getStyle() === 4){
            currentNote.setStyle(1)
        } else if (currentNote.getStyle() < 4){
            currentNote.setStyle(currentNote.getStyle() + 1)
        }
    }
}