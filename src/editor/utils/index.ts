
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