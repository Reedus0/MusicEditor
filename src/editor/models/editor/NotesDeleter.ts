import { globalOffset } from "../../utils"
import { Note, noteHalf } from "../Note"
import { Song } from "../Song"
import { IInstrument } from "./IInsrument"


export class NotesDeleter implements IInstrument {
    name: string = 'notesDeleter'
    public action = (element: HTMLElement, song: Song) => {

        const editingNote = element
        const tactElement = element.closest('.editor__tact')
        const trackElement = element.closest('.editor__track')

        const currentTactNumber = Number(tactElement!.id[tactElement!.id.length - 1])
        const currentTrackNumber = Number(trackElement!.id[trackElement!.id.length - 1])

        const noteBottom: number = (editingNote?.style['bottom'].split('px')[0] as any) || 0
        const noteLeft: number = (editingNote?.style['left'].split('px')[0] as any) || 0

        const cordsX = noteLeft * 64 / 0.20 / document.body.scrollWidth
        const cordsY = noteBottom / 12

        const currentTrack = song['tacts'][currentTactNumber]['tracks'][currentTrackNumber]
        currentTrack.deleteNote(cordsX, cordsY)
    }
}