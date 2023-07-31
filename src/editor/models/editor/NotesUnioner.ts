import { getNoteSymbolElement } from "../../utils";
import { Song } from "../Song";
import { IInstrument } from "./IInsrument";
import { IUnion } from "./IUnion";

export class NotesUnioner implements IInstrument, IUnion {
    firstElement: HTMLElement = null as any
    secondElement: HTMLElement = null as any
    currentTrack: HTMLElement = null as any
    name: string = 'notesUnioner'
    public action = (element: HTMLElement, song: Song) => {
        if (this.firstElement !== null && this.firstElement !== element) {
            this.secondElement = element
        } else {
            this.firstElement = element
        }
        if (this.firstElement !== null && this.secondElement !== null) {
            if (!this.checkIfHasUnion()) {
                this.unionNotes()
            } else {
                this.breakeUnion()
            }
        }
    }

    private checkIfHasUnion = () => {
        let firstResult: boolean = false
        let secondResult: boolean = false
        const firstElementChildNodes: HTMLElement[] = this.firstElement.childNodes as any
        for (const node of firstElementChildNodes) {
            if (node!.classList.contains('editor-drawer-note__union')) {
                firstResult = true
            }
        }
        const secondElementChildNodes: HTMLElement[] = this.secondElement.childNodes as any
        for (const node of secondElementChildNodes) {
            if (node!.classList.contains('editor-drawer-note__union')) {
                secondResult = true
            }
        }
        return firstResult && secondResult
    }

    private unionNotes = () => {

        let notesOrientation: string = 'top'

        if ((getNoteSymbolElement(this.firstElement).innerHTML !== getNoteSymbolElement(this.secondElement).innerHTML) || (getNoteSymbolElement(this.firstElement).classList.contains('_rotated') || getNoteSymbolElement(this.secondElement).classList.contains('_rotated'))) return
        if (getNoteSymbolElement(this.firstElement).innerHTML === 'Q') {
            notesOrientation = 'bottom'
        }

        const firstElementLeft: number = Number(window.getComputedStyle(this.firstElement).left.split('px')[0])
        const firstElementTop: number = Number(window.getComputedStyle(this.firstElement).top.split('px')[0])

        const secondElementLeft: number = Number(window.getComputedStyle(this.secondElement).left.split('px')[0])
        const secondElementTop: number = Number(window.getComputedStyle(this.secondElement).top.split('px')[0])

        const lastElementRighter = firstElementLeft > secondElementLeft
        const lastElementLower = firstElementTop > secondElementTop

        const unionWidth: number = Math.sqrt(Math.abs(firstElementLeft - secondElementLeft) ** 2 + Math.abs(firstElementTop - secondElementTop) ** 2)

        const rotateAngle: number = -Math.sin((firstElementTop - secondElementTop) / unionWidth)


        const unionElement: string = `<div class="editor-drawer-note__union" style="right: ${notesOrientation === 'bottom' ? 15 : 0}px; top: ${notesOrientation === 'bottom' ? 42 : -32}px; width: ${unionWidth + 0.5}px; transform: rotate(${lastElementRighter ? -rotateAngle : rotateAngle}rad)"></div>`

        if (lastElementRighter) {
            this.firstElement.innerHTML += unionElement
            this.secondElement.innerHTML += `<div class="editor-drawer-note__union"></div>`
        } else {
            this.firstElement.innerHTML += `<div class="editor-drawer-note__union"></div>`
            this.secondElement.innerHTML += unionElement
        }

        this.firstElement = null as any
        this.secondElement = null as any
    }

    private getUnionElement = (element: HTMLElement) => {
        const elementChildNodes: HTMLElement[] = element.childNodes as any
        let unionElement: HTMLElement = null as any
        for (const node of elementChildNodes) {
            if (node!.classList.contains('editor-drawer-note__union')) {
                unionElement = node
            }
        }
        return unionElement
    }

    private breakeUnion = () => {
        const firstElementLeft: number = Number(window.getComputedStyle(this.firstElement).left.split('px')[0])
        const secondElementLeft: number = Number(window.getComputedStyle(this.secondElement).left.split('px')[0])

        const lastElementRighter = firstElementLeft > secondElementLeft
        if (lastElementRighter) {
            this.firstElement.removeChild(this.getUnionElement(this.firstElement))
            this.secondElement.removeChild(this.getUnionElement(this.secondElement))
        } else {
            this.firstElement.removeChild(this.getUnionElement(this.firstElement))
            this.secondElement.removeChild(this.getUnionElement(this.secondElement))
        }

        this.firstElement = null as any
        this.secondElement = null as any
    }
}