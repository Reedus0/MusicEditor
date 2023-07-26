import { Song } from "../Song"
import { IInstrument } from "./IInsrument"


export class HalfsMover implements IInstrument {
    name: string = 'halfsMover'


    public action = (element: HTMLElement, song: Song) => {

        const halfElement = this.getHalfElement(element)
        this.moveHlaf(halfElement)
    }

    private getHalfElement = (element: HTMLElement) => {
        let result: any = null
        for (const child of element.children) {
            if (child.classList.contains('editor-drawer__note-half')) {
                result = child as HTMLElement
            }
        }
        return result
    }

    private moveHlaf = (element: HTMLElement) => {
        let halfOffset: string = window.getComputedStyle(element).getPropertyValue('left')
        let halfOffsetValue = Number(halfOffset.split('px')[0])
        if (halfOffsetValue <= -60) {
            halfOffset = halfOffsetValue + (12 * 4) + 'px'
        } else {
            halfOffset = (halfOffsetValue - 12) + 'px'
        }
        element.style.left = halfOffset
    }
}