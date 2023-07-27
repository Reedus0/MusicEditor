import { clearHoverObjects, getOffset } from "../../utils";
import { IHoverer } from "./IHoverer";
import { IInstrument } from "./IInsrument";

export class NotesHoverer implements IInstrument, IHoverer {
    name: string = 'notesHoverer'
    public action = (mouseMoveEvent: MouseEvent, step: number) => {
        const cursorX = mouseMoveEvent.clientX;
        const cursorY = mouseMoveEvent.clientY + window.scrollY;

        const currentTrackFake = document.elementFromPoint(cursorX, cursorY - window.scrollY)

        if (currentTrackFake?.classList.contains('editor-drawer__track-fake')) {

            const { elementX, elementY } = getOffset(currentTrackFake)

            const tactOffsetX = cursorX - elementX
            const tactOffsetY = cursorY - elementY

            const cordsXExpresion = currentTrackFake!.clientWidth / step
            const cordsYExpresion = tactOffsetY / 6

            // TODO: currentTrackFake!.clientWidth / signatureMap[timeSignature[0]] - 10

            const cordsX = (Math.floor((tactOffsetX + 0.001) / (cordsXExpresion))) * cordsXExpresion
            const cordsY = (60 - (Math.floor(cordsYExpresion)) * 6) + 60

            const currentTrack = currentTrackFake.id[currentTrackFake.id.length - 1]

            clearHoverObjects()

            currentTrackFake.innerHTML = `
            <div class="editor-drawer__note-edit " id="editing-note-${currentTrack}" style="bottom: ${cordsY}px; left: ${cordsX > 0 ? cordsX : 0}px;">
            <h3 class='editor-drawer__note-symbol'>w</h3>
            </div>`

            const editingNote: any = document.getElementById(`editing-note-${currentTrack}`)

            if (cordsY <= 18) {
                if (cordsY % 12 === 0) {
                    editingNote.innerHTML += `<div class='editor-drawer__note-line-up-edit'></div>`
                } else {
                    editingNote.innerHTML += `<div class='editor-drawer__note-line-edit'></div>`
                }
            } else if (cordsY >= 90) {
                if (cordsY % 12 === 0) {
                    editingNote.innerHTML += `<div class='editor-drawer__note-line-down-edit'></div>`
                } else {
                    editingNote.innerHTML += `<div class='editor-drawer__note-line-edit'></div>`
                }
            }
        }
    }
}