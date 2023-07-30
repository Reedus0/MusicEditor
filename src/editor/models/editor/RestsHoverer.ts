import { clearHoverObjects, getOffset } from "../../utils";
import { IHoverer } from "./IHoverer";
import { IInstrument } from "./IInsrument";

export class RestsHoverer implements IInstrument, IHoverer {
    name: string = 'restsHoverer'
    public action = (mouseMoveEvent: MouseEvent, step: number) => {
        const drawerElement: HTMLElement = document.querySelector('.editor-drawer')!
        const matrix = new WebKitCSSMatrix((window.getComputedStyle(drawerElement)).transform)
        const scale = matrix['a']

        const cursorX = mouseMoveEvent.clientX;
        const cursorY = mouseMoveEvent.clientY + window.scrollY;

        const currentTrackFake = document.elementFromPoint(cursorX, cursorY - window.scrollY)

        if (currentTrackFake?.classList.contains('editor-drawer-track__fake')) {

            const { elementX, elementY } = getOffset(currentTrackFake)

            const tactOffsetX = cursorX - elementX

            const cordsXExpresion = currentTrackFake!.clientWidth / step

            const cordsX = (Math.floor((tactOffsetX / scale + 0.001) / (cordsXExpresion))) * cordsXExpresion + 6
            const cordsY = 66

            const currentTact = currentTrackFake.id[currentTrackFake.id.length - 1]

            clearHoverObjects()

            currentTrackFake.innerHTML = `
            <div class="editor-drawer-rest _edit " id="editing-rest-${currentTact}" style="bottom: ${cordsY}px; left: ${cordsX > 0 ? cordsX : 0}px;">
            <h3 class='editor-drawer-rest__symbol'>·</h3>
            </div>`

            const editingNote: any = document.getElementById(`editing-rest-${currentTact}`)

            // if (cordsY <= 18) {
            //     if (cordsY % 12 === 0) {
            //         editingNote.innerHTML += `<div class='editor-drawer__note-line-up-edit'></div>`
            //     } else {
            //         editingNote.innerHTML += `<div class='editor-drawer__note-line-edit'></div>`
            //     }
            // } else if (cordsY >= 90) {
            //     if (cordsY % 12 === 0) {
            //         editingNote.innerHTML += `<div class='editor-drawer__note-line-down-edit'></div>`
            //     } else {
            //         editingNote.innerHTML += `<div class='editor-drawer__note-line-edit'></div>`
            //     }
            // }
        }
    }
}