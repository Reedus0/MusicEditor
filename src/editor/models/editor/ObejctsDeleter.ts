import { getNoteFromHTML, globalOffset } from "../../utils"
import { Note, noteHalf } from "../Note"
import { Rest } from "../Rest"
import { Song } from "../Song"
import { Track } from "../Track"
import { IInstrument } from "./IInsrument"


export class ObjectsDeleter implements IInstrument {
    name: string = 'objectsDeleter'
    public action = (element: HTMLElement, song: Song) => {

        const { cordsX, cordsY, currentTrack } = getNoteFromHTML(element, song)

        let obejctType: SongObject = '' as SongObject

        if (element.classList.contains('editor-drawer__rest')) {
            obejctType = 'rest'
        } else if (element.classList.contains('editor-drawer__note')) {
            obejctType = 'note'
        }

        this.deleteObejct(cordsX, cordsY, currentTrack, obejctType)
    }

    private deleteObejct = (cordsX: number, cordsY: number, currentTrack: Track, obejctType: SongObject) => {
        if (obejctType === 'rest') {
            currentTrack.deleteRest(cordsX, cordsY)
        } else if (obejctType === 'note') {
            currentTrack.deleteNote(cordsX, cordsY)
        }
    }
}

export type SongObject = 'note' | 'rest'