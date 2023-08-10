import { getOffset, clearHoverObjects } from "../../../utils"
import { Song } from "../../Song"
import { IHoverer } from "../interfaces/IHoverer"
import { IInstrument } from "../interfaces/IInsrument"


export class RestsHoverer implements IInstrument, IHoverer {
    name: string = 'restsHoverer'
    private step: number = 1

    constructor(step: number) {
        this.step = step
    }

    public action = (mouseMoveEvent: MouseEvent, song: Song) => {
        const drawerElement: HTMLElement = document.querySelector('.editor-drawer')!
        const matrix = new WebKitCSSMatrix((window.getComputedStyle(drawerElement)).transform)
        const scale = matrix['a']

        const cursorX = mouseMoveEvent.clientX;
        const cursorY = mouseMoveEvent.clientY + window.scrollY;

        const currentTrackFake = document.elementFromPoint(cursorX, cursorY - window.scrollY)

        if (!currentTrackFake?.classList.contains('editor-drawer-track__fake')) clearHoverObjects()
        if (currentTrackFake?.classList.contains('editor-drawer-track__fake')) {

            const tactElement = currentTrackFake.closest('.editor-drawer-tact')
            const trackElement = currentTrackFake.closest('.editor-drawer-track')

            const currentTactNumber = Number(tactElement!.id.split('-')[1])
            const currentTrackNumber = Number(trackElement!.id.split('-')[1])

            const currentTact = song['tacts'][currentTactNumber]
            const currentTrack = song['tacts'][currentTactNumber]['tracks'][currentTrackNumber]

            const step = (this.step * Number(currentTrack.getTimeSignature()[0])) / currentTact.getDuration()

            const { elementX, elementY } = getOffset(currentTrackFake)

            const tactOffsetX = (cursorX - elementX) / scale

            const cordsXExpresion = currentTrackFake!.clientWidth / step

            const cordsX = (Math.floor((tactOffsetX + 0.001) / (cordsXExpresion))) * cordsXExpresion + 6
            const cordsY = 66

            clearHoverObjects()

            currentTrackFake.innerHTML =
                `
            <div class="editor-drawer-rest _edit " id="editing-object-${currentTrackNumber}" style="bottom: ${cordsY}px; left: ${cordsX > 0 ? cordsX : 0}px;">
            <h3 class='editor-drawer-rest__symbol'>·</h3>
            </div>
            `
        }
    }
}