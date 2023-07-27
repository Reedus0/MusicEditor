import { clearHoverObjects, globalOffset } from "../../utils"
import { Rest } from "../Rest"
import { Song } from "../Song"
import { Track } from "../Track"
import { IAdder } from "./IAdder"
import { IHoverer } from "./IHoverer"
import { IInstrument } from "./IInsrument"
import { RestsHoverer } from "./RestsHoverer"


export class RestsAdder implements IInstrument, IAdder {
    step: number = 4
    name: string = 'restsAdder'
    hoverer: IHoverer = new RestsHoverer()

    getStep() {
        return this.step
    }

    setStep(step: number) {
        if (step >= 0 && step <= 32) {
            this.step = step
        }
    }

    public action = (element: HTMLElement, song: Song) => {

        const { cordsX, cordsY, currentTrack } = this.calculateRestPosition(element, song)

        this.addRest(cordsX, cordsY, currentTrack)
    }

    private addRest = (cordsX: number, cordsY: number, currentTrack: Track) => {
        if (currentTrack.getRest(cordsX, cordsY)) return
        currentTrack.addRest(
            new Rest(
                cordsX,
                cordsY,
                this.step
            )
        )
        clearHoverObjects()
    }

    private calculateRestPosition = (element: HTMLElement, song: Song): { cordsX: number, cordsY: number, currentTrack: Track } => {
        const tactElement = element.closest('.editor-drawer__tact')
        const trackElement = element.closest('.editor-drawer__track')

        const currentTactNumber = Number(tactElement!.id.split('-')[1])
        const currentTrackNumber = Number(trackElement!.id.split('-')[1])

        const editingNote = document.getElementById('editing-rest-' + currentTrackNumber)

        const noteBottom: number = (editingNote?.style['bottom'].split('px')[0] as any) || 0
        const noteLeft: number = (editingNote?.style['left'].split('px')[0] as any) || 0

        const cordsX = noteLeft * 64 / trackElement!.clientWidth
        const cordsY = noteBottom / 12

        const currentTrack = song['tacts'][currentTactNumber]['tracks'][currentTrackNumber]


        return { cordsX, cordsY, currentTrack }
    }


}