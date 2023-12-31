import { clearHoverObjects, getOffset } from "../../../utils"
import { Song } from "../../Song"
import { IHoverer } from "../interfaces/IHoverer"
import { IInstrument } from "../interfaces/IInsrument"

export class NotesHoverer implements IInstrument, IHoverer {
    name: string = 'notesHoverer'
    private step: number = 1

    constructor(step: number){
        this.step = step
    }

    public action = (mouseMoveEvent: MouseEvent, song: Song) => {
        const drawerElement: HTMLElement = document.querySelector('.editor-drawer')!
        const matrix = new WebKitCSSMatrix((window.getComputedStyle(drawerElement)).transform)
        const scale = matrix['a']

        const cursorX = mouseMoveEvent.clientX;
        const cursorY = mouseMoveEvent.clientY;

        const currentTrackFake = document.elementFromPoint(cursorX, cursorY)

        if (!currentTrackFake?.classList.contains('editor-drawer-track__fake')) clearHoverObjects()
        if (currentTrackFake?.classList.contains('editor-drawer-track__fake')) {

            const tactElement = currentTrackFake.closest('.editor-drawer-tact')
            const trackElement = currentTrackFake.closest('.editor-drawer-track')

            const currentTactNumber = Number(tactElement!.id.split('-')[1])
            const currentTrackNumber = Number(trackElement!.id.split('-')[1])

            const currentTact = song['tacts'][currentTactNumber]
            const currentTrack = song['tacts'][currentTactNumber]['tracks'][currentTrackNumber]

            const step = this.step * Number(currentTrack.getTimeSignature()[0]) / currentTact.getDuration()

            const { elementX, elementY } = getOffset(currentTrackFake)

            const tactOffsetX = (cursorX - elementX) / scale
            const tactOffsetY = (cursorY - elementY) / scale

            const cordsXExpresion = currentTrackFake!.clientWidth / step
            const cordsYExpresion = tactOffsetY / 6

            // TODO: currentTrackFake!.clientWidth / signatureMap[timeSignature[0]] - 10

            const cordsX = Math.round((Math.floor((tactOffsetX + 0.001) / (cordsXExpresion))) * cordsXExpresion + 6)
            const cordsY = ((60 - (Math.floor(cordsYExpresion)) * 6) + 60)

            clearHoverObjects()
            if (cordsY < 54) {
                currentTrackFake.innerHTML = 
                `
                <div class="editor-drawer-note _top _edit " id="editing-object-${currentTrackNumber}" style="bottom: ${cordsY}px; left: ${cordsX > 0 ? cordsX : 0}px;">
                <img class='editor-drawer-note__img _edit' src=${require('./../../../img/notes/note-2.png')} />
                </div>
                `

            } else {
                currentTrackFake.innerHTML = 
                `
                <div class="editor-drawer-note _bottom _edit " id="editing-object-${currentTrackNumber}" style="bottom: ${cordsY}px; left: ${cordsX > 0 ? cordsX : 0}px;">
                <img class='editor-drawer-note__img _edit' src=${require('./../../../img/notes/note-2.png')} />
                </div>
                `
            }

            const editingNote: any = document.getElementById(`editing-object-${currentTrackNumber}`)

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