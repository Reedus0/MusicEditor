import { clearHoverObjects, getOffset } from "../../utils";
import { IHoverer } from "./IHoverer";
import { IInstrument } from "./IInsrument";

export class RestsHoverer implements IInstrument, IHoverer {
    name: string = 'restsHoverer'
    public action = (mouseMoveEvent: MouseEvent, step: number) => {
        const cursorX = mouseMoveEvent.clientX;
        const cursorY = mouseMoveEvent.clientY + window.scrollY;

        const currentTrackFake = document.elementFromPoint(cursorX, cursorY - window.scrollY)

        if (currentTrackFake?.classList.contains('editor-drawer__track-fake')) {

            const { elementX, elementY } = getOffset(currentTrackFake)

            const tactOffsetX = cursorX - elementX

            const newStep = step * 2

            const cordsXExpresion = currentTrackFake!.clientWidth / newStep
            const cordsX = Math.floor((tactOffsetX + 0.001) / cordsXExpresion / 2) * cordsXExpresion * 2 + (currentTrackFake!.clientWidth / newStep) - 8
            const cordsY = 66

            const currentTact = currentTrackFake.id[currentTrackFake.id.length - 1]

            clearHoverObjects()

            currentTrackFake.innerHTML = `
            <div class="editor-drawer__rest-edit " id="editing-rest-${currentTact}" style="bottom: ${cordsY}px; left: ${cordsX > 0 ? cordsX : 0}px;">
            <h3 class='editor-drawer__rest-symbol'>·</h3>
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