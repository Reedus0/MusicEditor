import { clearHoverObjects, globalOffset } from "../../utils"
import { Note, noteHalf } from "../Note"
import { Song } from "../Song"
import { Track } from "../Track"
import { IAdder } from "./IAdder"
import { IHoverer } from "./IHoverer"
import { IInstrument } from "./IInsrument"
import { NotesHoverer } from "./NotesHoverer"


export class NotesAdder implements IInstrument, IAdder {
    step: number = 1
    name: string = 'notesAdder'
    hoverer: IHoverer = new NotesHoverer()

    public action = (element: HTMLElement, song: Song) => {
        const { cordsX, cordsY, currentTrack, noteSound } = this.calculateNotePosition(element, song)

        this.addNote(cordsX, cordsY, currentTrack, noteSound)
    }

    private addNote = (cordsX: number, cordsY: number, currentTrack: Track, noteSound: string) => {
        if (currentTrack.getNote(cordsX, cordsY)) return
        currentTrack.addNote(
            new Note(
                cordsX,
                cordsY,
                this.step,
                noteSound,
                noteHalf.NONE
            )
        )
        clearHoverObjects()
    }

    private calculateNotePosition = (element: HTMLElement, song: Song): { cordsX: number, cordsY: number, currentTrack: Track, noteSound: string } => {
        const tactElement = element.closest('.editor-drawer-tact')
        const trackElement = element.closest('.editor-drawer-track')


        const currentTactNumber = Number(tactElement!.id.split('-')[1])
        const currentTrackNumber = Number(trackElement!.id.split('-')[1])

        const editingNote = document.getElementById('editing-note-' + currentTrackNumber)

        const noteBottom: number = (editingNote?.style['bottom'].split('px')[0] as any) || 0
        const noteLeft: number = (editingNote?.style['left'].split('px')[0] as any) || 0

        const clefOffset = song['tacts'][currentTactNumber as number]['tracks'][currentTrackNumber]['clef']

        const noteVerticalPosition = ((noteBottom / 12) - clefOffset) % 3.5
        const noteOctave = 4 + Math.floor(((noteBottom / 12) - globalOffset - clefOffset) / 3.5)

        const currentTrack = song['tacts'][currentTactNumber]['tracks'][currentTrackNumber]

        const cordsX = (noteLeft - 4) * (16 * Number(currentTrack.getTimeSignature()[0])) / trackElement!.clientWidth
        const cordsY = noteBottom / 12


        const noteSound = ((song['key'] as any)[noteVerticalPosition >= 0 ? noteVerticalPosition : 3.5 + noteVerticalPosition] + noteOctave.toString())

        return { cordsX, cordsY, currentTrack, noteSound }
    }
}