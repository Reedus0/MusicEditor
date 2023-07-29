import { getNoteFromHTML } from "../../utils"
import { Song } from "../Song"
import { Track } from "../Track"
import { IInstrument } from "./IInsrument"


export class ObjectsDeleter implements IInstrument {
    name: string = 'objectsDeleter'
    public action = (element: HTMLElement, song: Song) => {

        const { cordsX, cordsY, currentTrack } = getNoteFromHTML(element, song)

        console.log(cordsX, cordsY)

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