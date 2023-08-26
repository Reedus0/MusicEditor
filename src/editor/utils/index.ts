import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { Note } from "../models/Note"
import { Song } from "../models/Song"
import { Tact } from "../models/Tact"
import { Track } from "../models/Track"

export const globalOffset = 1.5

export const FlatMap: any = {
    'A': 'Ab',
    'B': 'Bb',
    'C': 'B',
    'D': 'Db',
    'E': 'Eb',
    'F': 'E',
    'G': 'Gb',

    'Ab': 'G',
    'Bb': 'A',
    'Cb': 'Bb',
    'Db': 'C',
    'Eb': 'D',
    'Fb': 'Eb',
    'Gb': 'F',

    'A#': 'A',
    'B#': 'B',
    'C#': 'C',
    'D#': 'D',
    'E#': 'E',
    'F#': 'F',
    'G#': 'G',
}

export const SharpMap: any = {
    'A': 'A#',
    'B': 'C',
    'C': 'C#',
    'D': 'D#',
    'E': 'F',
    'F': 'F#',
    'G': 'G#',

    'Ab': 'A',
    'Bb': 'B',
    'Cb': 'C',
    'Db': 'D',
    'Eb': 'E',
    'Fb': 'F',
    'Gb': 'G',

    'A#': 'B',
    'B#': 'C#',
    'C#': 'D',
    'D#': 'E',
    'E#': 'F#',
    'F#': 'G',
    'G#': 'A',
}

export const CancelMap: any = {
    'Ab': 'A',
    'Bb': 'B',
    'Cb': 'C',
    'Db': 'D',
    'Eb': 'E',
    'Fb': 'F',
    'Gb': 'G',

    'A#': 'A',
    'B#': 'B',
    'C#': 'C',
    'D#': 'D',
    'E#': 'E',
    'F#': 'F',
    'G#': 'G',
}

export const SharpToFlatMap: any = {
    'A#': 'Bb',
    'B#': 'C',
    'C#': 'Db',
    'D#': 'Eb',
    'E#': 'F',
    'F#': 'Gb',
    'G#': 'Ab',
}

export const FlatToSharpMap: any = {
    'Ab': 'G#',
    'Bb': 'A#',
    'Cb': 'B',
    'Db': 'C#',
    'Eb': 'D#',
    'Fb': 'E',
    'Gb': 'F#',
}

export const InvertMap: any = {
    'Ab': 'G#',
    'Bb': 'A#',
    'Cb': 'B',
    'Db': 'C#',
    'Eb': 'D#',
    'Fb': 'E',
    'Gb': 'F#',

    'A#': 'Bb',
    'B#': 'C',
    'C#': 'Db',
    'D#': 'Eb',
    'E#': 'F',
    'F#': 'Gb',
    'G#': 'Ab',
}

export enum halfMaps {
    SHARP_MAP = SharpMap,
    FLAT_MAP = FlatMap,
    CANCEL_MAP = CancelMap
}

export enum clefs {
    TREBLE = 0,
    BASS = 6,
    ALTO = 3
}

// TODO
export const signatureMap: any = {
    '4': 8,
    '3': 12
}

export const getOffset = (element: any): { elementX: number, elementY: number } => {
    const rect = element.getBoundingClientRect();
    return {
        elementX: rect.left + window.scrollX,
        elementY: rect.top + window.scrollY
    };
}


export const calculateHalfNote = (sound: string, halfMap: halfMaps) => {
    const oldSound = sound.slice(0, -1)
    let oldOctave = Number(sound[sound.length - 1])

    if (oldSound === 'B' && halfMap === halfMaps.SHARP_MAP) {
        oldOctave += 1
    }
    if (oldSound === 'C' && halfMap === halfMaps.FLAT_MAP) {
        oldOctave -= 1
    }

    return (halfMap as any)[oldSound] + oldOctave.toString()
}

export const getNoteFromHTML = (element: HTMLElement, song: Song): { cordsX: number, cordsY: number, currentTrack: Track } => {
    const editingNote = element
    const tactElement = element.closest('.editor-drawer-tact')
    const trackElement = element.closest('.editor-drawer-track')

    const currentTactNumber = Number(tactElement!.id.split('-')[1])
    const currentTrackNumber = Number(trackElement!.id.split('-')[1])

    const noteBottom: number = (editingNote?.style['bottom'].split('px')[0] as any) || 0
    const noteLeft: number = (editingNote?.style['left'].split('px')[0] as any) || 0

    const currentTrack = song['tacts'][currentTactNumber]['tracks'][currentTrackNumber]

    const cordsX = Math.round((noteLeft - 6) * (16 * Number(currentTrack.getTimeSignature()[0])) / trackElement!.clientWidth)
    const cordsY = noteBottom / 12


    return { cordsX, cordsY, currentTrack }
}

export const getRestFromHTML = (element: HTMLElement, song: Song): { cordsX: number, cordsY: number, currentTrack: Track } => {
    const editingNote = element
    const tactElement = element.closest('.editor-drawer-tact')
    const trackElement = element.closest('.editor-drawer-track')

    const currentTactNumber = Number(tactElement!.id.split('-')[1])
    const currentTrackNumber = Number(trackElement!.id.split('-')[1])

    const noteBottom: number = (editingNote?.style['bottom'].split('px')[0] as any) || 0
    const noteLeft: number = (editingNote?.style['left'].split('px')[0] as any) || 0

    const currentTrack = song['tacts'][currentTactNumber]['tracks'][currentTrackNumber]

    const cordsX = Math.round((noteLeft - 6) * (16 * Number(currentTrack.getTimeSignature()[0])) / trackElement!.clientWidth)
    const cordsY = noteBottom / 12


    return { cordsX, cordsY, currentTrack }
}


export const getTactFromHTML = (element: HTMLElement, song: Song): { currentTact: Tact } => {
    const editingTact = element

    const currentTactNumber = Number(editingTact!.id.split('-')[1])

    const currentTact = song['tacts'][currentTactNumber]

    return { currentTact }
}

export const formatNoteForPlay = (sound: string) => {
    const oldSound = sound.slice(0, -1)
    const oldOctave = Number(sound[sound.length - 1])
    let result = oldSound + oldOctave

    if (Object.keys(SharpToFlatMap).includes(oldSound)) {
        result = SharpToFlatMap[oldSound] + oldOctave.toString()
    }

    return result
}

export const clearHoverObjects = () => {
    Array.from(document.getElementsByClassName('editor-drawer-track__fake')).forEach((element: any) => element.innerHTML = '')
}


export const clearActiveTacts = () => {
    Array.from(document.getElementsByClassName('editor-drawer-tact')).forEach((element: any) => element.classList.remove('_active'))
}

export const clearAllInstrumentsDrop = () => {
    Array.from(document.getElementsByClassName('editor-instruments-instrument')).forEach((element: any) => element.classList.remove('_drop'))
}

export const highlightTact = (position: number) => {
    document.getElementById('tact-' + position)?.classList.add('_active')
    document.getElementById('tact-' + (position - 1))?.classList.remove('_active')
}

export const getNotesLine = (notes: Note[]): number[] => {
    let result = new Set()
    for (let i = 0; i < notes.length; i++) {
        result.add(notes[i]['horizontalPosition'])
    }
    return Array.from(result) as number[]
}

export const getNotesRow = (notes: Note[]): number[] => {
    let result = new Set()
    for (let i = 0; i < notes.length; i++) {
        result.add(notes[i]['verticalPosition'])
    }
    return Array.from(result) as number[]
}

export const getNoteSymbolElement = (element: HTMLElement) => {
    const elementChildNodes: HTMLElement[] = element.childNodes as any
    let noteElement: HTMLElement = null as any
    for (const node of elementChildNodes) {
        if (node!.classList.contains('editor-drawer-note__symbol')) {
            noteElement = node
        }
    }
    return noteElement
}

export const saveToFile = async () => {
    clearHoverObjects()

    const doc: jsPDF = new jsPDF('portrait', 'mm', 'a4')

    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    const drawerElement = document.getElementById("editor-drawer")!

    drawerElement.style.transform = 'scale(1.0)'
    drawerElement.style.top = '170px'
    drawerElement.style.left = `calc(50vw - 720px)`

    const pages = Array.from(document.getElementsByClassName('editor-drawer-page'))

    for (let i = 0; i < pages.length; i++) {
        const canvas: HTMLCanvasElement = await html2canvas(pages[i] as HTMLElement, {
            windowHeight: 3508,
            windowWidth: 2480,
            scale: 3
        })
        const imgData: any = canvas.toDataURL('image/png')

        if (i > 0) doc.addPage()

        doc.addImage(imgData, 'PNG', 0, 0, width, height)
    }

    doc.save('notes.pdf')
}