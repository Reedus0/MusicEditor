import { Song } from "../models/Song"
import { Track } from "../models/Track"

export const globalOffset = 1.5

export const CMajorMap: any = {
    '0': 'G',
    '0.5': 'A',
    '1': 'B',
    '1.5': 'C',
    '2': 'D',
    '2.5': 'E',
    '3': 'F',
}


export const FMajorMap: any = {
    '0': 'G',
    '0.5': 'A',
    '1': 'Bb',
    '1.5': 'C',
    '2': 'D',
    '2.5': 'E',
    '3': 'F',
}

export const GMajorMap: any = {
    '0': 'G',
    '0.5': 'A',
    '1': 'B',
    '1.5': 'C',
    '2': 'D',
    '2.5': 'E',
    '3': 'Gb',
}

export const DMajorMap: any = {
    '0': 'G',
    '0.5': 'A',
    '1': 'B',
    '1.5': 'Db',
    '2': 'D',
    '2.5': 'E',
    '3': 'Gb',
}

export const BbMajorMap: any = {
    '0': 'G',
    '0.5': 'A',
    '1': 'Bb',
    '1.5': 'C',
    '2': 'D',
    '2.5': 'Eb',
    '3': 'F',
}

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
}

export const SharpMap: any = {
    'A': 'Bb',
    'B': 'C',
    'C': 'Db',
    'D': 'Eb',
    'E': 'F',
    'F': 'Gb',
    'G': 'Ab',

    'Ab': 'A',
    'Bb': 'B',
    'Cb': 'C',
    'Db': 'D',
    'Eb': 'E',
    'Fb': 'F',
    'Gb': 'G',
}

export const CancelMap: any = {
    'Ab': 'A',
    'Bb': 'B',
    'Cb': 'C',
    'Db': 'D',
    'Eb': 'E',
    'Fb': 'F',
    'Gb': 'G',
}

export enum halfMaps {
    SHARP_MAP = SharpMap,
    FLAT_MAP = FlatMap,
    CANCEL_MAP = CancelMap
}


export enum keys {
    C = CMajorMap,
    Am = CMajorMap,

    F = FMajorMap,
    Dm = FMajorMap,

    G = GMajorMap,
    Em = GMajorMap,

    D = DMajorMap,
    Bm = DMajorMap,

    Bb = BbMajorMap,
    Gm = BbMajorMap,
}

export enum clefs {
    TREBLE = 0,
    BASS = 6
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

    return (halfMap as any)[oldSound] + oldOctave
}

export const getNoteFromHTML = (element: HTMLElement, song: Song): { cordsX: number, cordsY: number, currentTrack: Track } => {
    const editingNote = element
    const tactElement = element.closest('.editor__tact')
    const trackElement = element.closest('.editor__track')

    const currentTactNumber = Number(tactElement!.id[tactElement!.id.length - 1])
    const currentTrackNumber = Number(trackElement!.id[trackElement!.id.length - 1])

    const noteBottom: number = (editingNote?.style['bottom'].split('px')[0] as any) || 0
    const noteLeft: number = (editingNote?.style['left'].split('px')[0] as any) || 0

    const cordsX = noteLeft * 64 / 0.20 / document.body.scrollWidth
    const cordsY = noteBottom / 12

    const currentTrack = song['tacts'][currentTactNumber]['tracks'][currentTrackNumber]

    return { cordsX, cordsY, currentTrack }
}

export const calculateNotePosition = (element: HTMLElement, song: Song): { cordsX: number, cordsY: number, currentTrack: Track, noteSound: string } => {
    const tactElement = element.closest('.editor__tact')
    const trackElement = element.closest('.editor__track')

    const currentTactNumber = Number(tactElement!.id[tactElement!.id.length - 1])
    const currentTrackNumber = Number(trackElement!.id[trackElement!.id.length - 1])

    const editingNote = document.getElementById('editing-note-' + currentTrackNumber)

    const noteBottom: number = (editingNote?.style['bottom'].split('px')[0] as any) || 0
    const noteLeft: number = (editingNote?.style['left'].split('px')[0] as any) || 0

    const clefOffset = song['tacts'][currentTactNumber as number]['tracks'][currentTrackNumber]['clef']

    const noteVerticalPosition = ((noteBottom / 12) - clefOffset) % 3.5
    const noteOctave = 5 + Math.floor(((noteBottom / 12) - globalOffset - clefOffset) / 3.5)

    const cordsX = noteLeft * 64 / 0.20 / document.body.scrollWidth
    const cordsY = noteBottom / 12

    const currentTrack = song['tacts'][currentTactNumber]['tracks'][currentTrackNumber]

    const noteSound = ((song['key'] as any)[noteVerticalPosition >= 0 ? noteVerticalPosition : 3.5 + noteVerticalPosition] + noteOctave.toString())

    return { cordsX, cordsY, currentTrack, noteSound }
}