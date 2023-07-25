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
    '3': 'F#',
}

export const DMajorMap: any = {
    '0': 'G',
    '0.5': 'A',
    '1': 'B',
    '1.5': 'C#',
    '2': 'D',
    '2.5': 'E',
    '3': 'F#',
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

export const keysHalfsMap = new Map()

keysHalfsMap.set(keys.C, 0)
keysHalfsMap.set(keys.F, -1)
keysHalfsMap.set(keys.Bb, -2)
keysHalfsMap.set(keys.G, 1)
keysHalfsMap.set(keys.D, 2)

export const keysHalfsPositionMap: any = {
    '-7' : -42,
    '-6' : -18,
    '-5' : -36,
    '-4' : -12,
    '-3' : -30,
    '-2' : -6,
    '-1': -24,
    '1': 0,
    '2': -18,
    '3': 6,
    '4': -12,
    '5': -30,
    '6': -6,
    '7': -24
}