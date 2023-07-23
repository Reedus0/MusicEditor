import { getOffset } from "../../../utils";
import { IInstrument } from "./IInsrument";

export class NotesHoverer implements IInstrument {
    name: string = 'notesHoverer'
    public action = (mouseMoveEvent: MouseEvent) => {
        const cursorX = mouseMoveEvent.clientX;
        const cursorY = mouseMoveEvent.clientY + window.scrollY;

        const currentTactFake = document.elementFromPoint(cursorX, cursorY - window.scrollY)

        if (currentTactFake?.classList.contains('editor__note')) return
        if (currentTactFake?.classList.contains('editor__track-fake')) {


            const { elementX, elementY } = getOffset(currentTactFake)

            const tactOffsetX = cursorX - elementX
            const tactOffsetY = cursorY - elementY


            const cordsX = (Math.floor(tactOffsetX / (document.body.scrollWidth * 0.20 / 4))) * document.body.scrollWidth * 0.20 / 4
            const cordsY = (60 - (Math.floor(tactOffsetY / 6)) * 6) + 60

            const currentTact = currentTactFake.id[currentTactFake.id.length - 1]
            Array.from(document.getElementsByClassName('editor__track-fake')).forEach((element: any) => element.innerHTML = '')

            currentTactFake.innerHTML = `<div class="editor__note-edit " id="editing-note-${currentTact}" style="bottom: ${cordsY}px; left: ${cordsX}px;"></div>`

            const editingNote: any = document.getElementById(`editing-note-${currentTact}`)

            if (cordsY <= 18) {
                if (cordsY % 12 === 0) {
                    editingNote.innerHTML = `<div class='editor__note-line-up-edit'></div>`
                } else {
                    editingNote.innerHTML = `<div class='editor__note-line-edit'></div>`
                }
            } else if (cordsY >= 90) {
                if (cordsY % 12 === 0) {
                    editingNote.innerHTML = `<div class='editor__note-line-down-edit'></div>`
                } else {
                    editingNote.innerHTML = `<div class='editor__note-line-edit'></div>`
                }
            }
        }
    }
}