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
    CANCEL_MAP =CancelMap
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
    const oldOctave = sound[sound.length - 1]

    return (halfMap as any)[oldSound] + oldOctave
}