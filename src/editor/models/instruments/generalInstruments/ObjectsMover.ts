import { clearHoverObjects, getNoteFromHTML, getRestFromHTML, globalOffset } from "../../../utils";
import { Note } from "../../Note";
import { Rest } from "../../Rest";
import { Song } from "../../Song";
import { IAdder } from "../interfaces/IAdder";
import { IHolder } from "../interfaces/IHolder";
import { IHoverer } from "../interfaces/IHoverer";
import { IInstrument } from "../interfaces/IInsrument";
import { NotesAdder } from "../notesInstruments/NotesAdder";
import { NotesHoverer } from "../notesInstruments/NotesHoverer";
import { RestsAdder } from "../restsInstruments/RestsAdder";
import { RestsHoverer } from "../restsInstruments/RestsHoverer";

export class ObjectsMover implements IInstrument, IHolder {
    name: string = 'objectsMover'
    adder: IAdder = {} as IAdder
    hoverer: IHoverer = {} as IHoverer

    public action = () => { }

    public onHoldAction = (element: HTMLElement, song: Song) => {
        if (element.classList.contains('editor-drawer-object')) {
            const { cordsX, cordsY, currentTrack } = getNoteFromHTML(element, song)
            if (element.classList.contains('editor-drawer-note')) {
                this.adder = new NotesAdder(1)
                this.hoverer = new NotesHoverer(1)
                currentTrack.deleteNote(cordsX, cordsY)
            } else if (element.classList.contains('editor-drawer-rest')) {
                this.adder = new RestsAdder(1)
                this.hoverer = new RestsHoverer(1)
                currentTrack.getRest(cordsX, cordsY)
            }
        }
    }

    public onRealeseAction = (element: HTMLElement, song: Song) => {

        this.adder.action(element, song)
        this.adder = {} as IAdder
        this.hoverer = {} as IHoverer

    }
}