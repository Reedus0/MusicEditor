import { calculateHalfNote, halfMaps } from "../../utils"
import { noteHalf } from "../Note"
import { Song } from "../Song"
import { IInstrument } from "./IInsrument"

export class NotesNaturaler implements IInstrument {
    name: string = 'notesNaturaler'


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
        if (currentTrack.getNote(cordsX, cordsY)['half'] === noteHalf.NONE && currentTrack.getNote(cordsX, cordsY)['sound'].length === 3) {
            const newNote = calculateHalfNote(currentTrack.getNote(cordsX, cordsY).getSound(), halfMaps.CANCEL_MAP)
            currentTrack.getNote(cordsX, cordsY).setSound(newNote, noteHalf.NATURAL)
        }
    }
}