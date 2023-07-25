import { Note } from "../models/Note"
import { Song } from "../models/Song"
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
    const tactElement = element.closest('.editor-drawer__tact')
    const trackElement = element.closest('.editor-drawer__track')

    const currentTactNumber = Number(tactElement!.id.split('-')[1])
    const currentTrackNumber = Number(trackElement!.id.split('-')[1])

    const noteBottom: number = (editingNote?.style['bottom'].split('px')[0] as any) || 0
    const noteLeft: number = (editingNote?.style['left'].split('px')[0] as any) || 0

    const cordsX = noteLeft * 64 / trackElement!.clientWidth
    const cordsY = noteBottom / 12

    const currentTrack = song['tacts'][currentTactNumber]['tracks'][currentTrackNumber]

    return { cordsX, cordsY, currentTrack }
}

export const calculateNotePosition = (element: HTMLElement, song: Song): { cordsX: number, cordsY: number, currentTrack: Track, noteSound: string } => {
    const tactElement = element.closest('.editor-drawer__tact')
    const trackElement = element.closest('.editor-drawer__track')

    const currentTactNumber = Number(tactElement!.id.split('-')[1])
    const currentTrackNumber = Number(trackElement!.id.split('-')[1])

    const editingNote = document.getElementById('editing-note-' + currentTrackNumber)

    const noteBottom: number = (editingNote?.style['bottom'].split('px')[0] as any) || 0
    const noteLeft: number = (editingNote?.style['left'].split('px')[0] as any) || 0

    const clefOffset = song['tacts'][currentTactNumber as number]['tracks'][currentTrackNumber]['clef']

    const noteVerticalPosition = ((noteBottom / 12) - clefOffset) % 3.5
    const noteOctave = 4 + Math.floor(((noteBottom / 12) - globalOffset - clefOffset) / 3.5)

    const cordsX = noteLeft * 64 / trackElement!.clientWidth
    const cordsY = noteBottom / 12

    const currentTrack = song['tacts'][currentTactNumber]['tracks'][currentTrackNumber]

    const noteSound = ((song['key'] as any)[noteVerticalPosition >= 0 ? noteVerticalPosition : 3.5 + noteVerticalPosition] + noteOctave.toString())

    return { cordsX, cordsY, currentTrack, noteSound }
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

export const clearHoverNote = () => {
    Array.from(document.getElementsByClassName('editor-drawer__track-fake')).forEach((element: any) => element.innerHTML = '')
}

export const clearActiveTacts = () => {
    Array.from(document.getElementsByClassName('editor-drawer__tact')).forEach((element: any) => element.classList.remove('_active'))
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

export const arraySort = (array: any[]): any[] => {
    const half = array.length / 2

    if (array.length < 2) {
        return array
    }

    const left = array.splice(0, half)
    return mergeArrays(arraySort(left), arraySort(array))
}

export const mergeArrays = (left: any[], right: any[]): any[] => {
    let arr = []
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            arr.push(left.shift())
        } else {
            arr.push(right.shift())
        }
    }
    return [...arr, ...left, ...right]
}