import { clearHoverObjects, getOffset } from "../../utils";
import { IHoverer } from "./IHoverer";
import { IInstrument } from "./IInsrument";

export class NotesHoverer implements IInstrument, IHoverer {
    name: string = 'notesHoverer'
    public action = (mouseMoveEvent: MouseEvent, step: number) => {
        const cursorX = mouseMoveEvent.clientX;
        const cursorY = mouseMoveEvent.clientY + window.scrollY;

        const currentTrackFake = document.elementFromPoint(cursorX, cursorY - window.scrollY)

        if (currentTrackFake?.classList.contains('editor-drawer-track__fake')) {

            const { elementX, elementY } = getOffset(currentTrackFake)

            const tactOffsetX = cursorX - elementX
            const tactOffsetY = cursorY - elementY

            const cordsXExpresion = currentTrackFake!.clientWidth / step
            const cordsYExpresion = tactOffsetY / 6

            // TODO: currentTrackFake!.clientWidth / signatureMap[timeSignature[0]] - 10

            const cordsX = (Math.floor((tactOffsetX + 0.001) / (cordsXExpresion))) * cordsXExpresion + 4
            const cordsY = (60 - (Math.floor(cordsYExpresion)) * 6) + 60

            const currentTrack = currentTrackFake.id[currentTrackFake.id.length - 1]

            clearHoverObjects()

            if (cordsY < 54) {
                currentTrackFake.innerHTML = `
                <div class="editor-drawer-note _edit " id="editing-note-${currentTrack}" style="bottom: ${cordsY}px; left: ${cordsX > 0 ? cordsX : 0}px;">
                <h3 class='editor-drawer-note__symbol'>q</h3>
                </div>`

            } else {
                currentTrackFake.innerHTML = `
                <div class="editor-drawer-note _edit " id="editing-note-${currentTrack}" style="bottom: ${cordsY}px; left: ${cordsX > 0 ? cordsX : 0}px;">
                <h3 class='editor-drawer-note__symbol'>Q</h3>
                </div>`
            }


            const editingNote: any = document.getElementById(`editing-note-${currentTrack}`)

            if (cordsY <= 18) {
                if (cordsY % 12 === 0) {
                    editingNote.innerHTML += `<div class='editor-drawer-note__line-up-edit'></div>`
                } else {
                    editingNote.innerHTML += `<div class='editor-drawer-note__line-edit'></div>`
                }
            } else if (cordsY >= 90) {
                if (cordsY % 12 === 0) {
                    editingNote.innerHTML += `<div class='editor-drawer-note__line-down-edit'></div>`
                } else {
                    editingNote.innerHTML += `<div class='editor-drawer-note__line-edit'></div>`
                }
            }
        }
    }
}