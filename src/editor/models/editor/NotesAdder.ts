import { globalOffset } from "../../utils"
import { Note, noteHalf } from "../Note"
import { Song } from "../Song"
import { IInstrument } from "./IInsrument"


export class NotesAdder implements IInstrument {
    name: string = 'notesAdder'
    public action = (element: HTMLElement, song: Song) => {

        console.log(element)

        const tactElement = element.closest('.editor__tact')
        const trackElement = element.closest('.editor__track')

        const currentTactNumber = Number(tactElement!.id[tactElement!.id.length - 1])
        const currentTrackNumber = Number(trackElement!.id[trackElement!.id.length - 1])

        const editingNote = document.getElementById('editing-note-' + currentTrackNumber)

        const noteBottom: number = (editingNote?.style['bottom'].split('px')[0] as any) || 0
        const noteLeft: number = (editingNote?.style['left'].split('px')[0] as any) || 0

        const clefOffset = song['tacts'][currentTactNumber as number]['tracks'][currentTrackNumber]['clef']

        const noteVerticalPosition = ((noteBottom / 12) - clefOffset) % 3.5
        const noteOctave = 5 + Math.floor(((noteBottom / 12) - globalOffset - clefOffset) / 3.5)

        console.log(document.body.scrollWidth * 0.20 / 64)

        const cordsX = noteLeft * 64 / 0.20 / document.body.scrollWidth
        const cordsY = noteBottom / 12

        song['tacts'][currentTactNumber]['tracks'][currentTrackNumber].addNote(
            new Note(
                cordsX,
                cordsY,
                4,
                ((song['key'] as any)[noteVerticalPosition >= 0 ? noteVerticalPosition : 3.5 + noteVerticalPosition] + noteOctave.toString()),
                noteHalf.NONE
            )
        )
    }
}