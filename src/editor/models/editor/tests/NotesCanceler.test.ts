import { clefs } from "../../../utils"
import { keys } from "../../../utils/keys"
import { Note, noteHalf } from "../../Note"
import { Track } from "../../Track"
import { NotesCanceler } from "../NotesCanceler"

const notesCanceler = new NotesCanceler()

const cordsX = 0
const cordsY = 1.5

describe('NotesCanceler class tests', () => {

    it('Note cancel test 1', () => {
        const noteSound = 'Gb5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1, noteSound, noteHalf.FLAT)], [], keys.C, '4/4', clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1, 'G5', noteHalf.NONE))
    })

    it('Note cancel test 2', () => {
        const noteSound = 'Bb5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1, noteSound, noteHalf.FLAT)], [], keys.C, '4/4', clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1, 'B5', noteHalf.NONE))
    })

    it('Note cancel test 3', () => {
        const noteSound = 'Eb5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1, noteSound, noteHalf.FLAT)], [], keys.C, '4/4', clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1, 'E5', noteHalf.NONE))
    })

    it('Note cancel test 4', () => {
        const noteSound = 'Gb5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1, noteSound, noteHalf.FLAT)], [], keys.C, '4/4', clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).not.toEqual(new Note(0, 1.5, 4, 1, 'G5', noteHalf.SHARP))
    })

    it('Note cancel octave test', () => {
        const noteSound = 'Ab5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1, noteSound, noteHalf.SHARP)], [], keys.C, '4/4', clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).not.toEqual(new Note(0, 1.5, 4, 1, 'G4', noteHalf.NONE))
    })


    it('Note cancel test Bm 1', () => {
        const noteSound = 'G5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1, noteSound, noteHalf.SHARP)], [], keys.Bm, '4/4', clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1, 'F#5', noteHalf.NONE))
    })

    it('Note cancel test Bm 2', () => {
        const noteSound = 'D5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1, noteSound, noteHalf.SHARP)], [], keys.Bm, '4/4', clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1, 'C#5', noteHalf.NONE))
    })

    it('Note cancel test Bm 3', () => {
        const noteSound = 'G5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1, noteSound, noteHalf.SHARP)], [], keys.Bm, '4/4', clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1, 'F#5', noteHalf.NONE))
    })

    it('Note cancel test Bm 4', () => {
        const noteSound = 'Gb5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1, noteSound, noteHalf.NONE)], [], keys.Bm, '4/4', clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1, 'Gb5', noteHalf.NONE))
    })


    it('Note cancel test Dm 1', () => {
        const noteSound = 'B5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1, noteSound, noteHalf.SHARP)], [], keys.Dm, '4/4', clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1, 'Bb5', noteHalf.NONE))
    })

    it('Note cancel test Dm 2', () => {
        const noteSound = 'Cb5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1, noteSound, noteHalf.FLAT)], [], keys.Dm, '4/4', clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1, 'C5', noteHalf.NONE))
    })

    it('Note cancel test Dm 3', () => {
        const noteSound = 'G5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1, noteSound, noteHalf.NONE)], [], keys.Dm, '4/4', clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1, 'G5', noteHalf.NONE))
    })

    it('Note cancel test Dm 4', () => {
        const noteSound = 'Db5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1, noteSound, noteHalf.FLAT)], [], keys.Dm, '4/4', clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1, 'D5', noteHalf.NONE))
    })

    it('Note cancel test natural 1 ', () => {
        const noteSound = 'F5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1, noteSound, noteHalf.NATURAL)], [], keys.D, '4/4', clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1, 'F#5', noteHalf.NONE))
    })

    it('Note cancel test natural 2', () => {
        const noteSound = 'C6'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1, noteSound, noteHalf.NATURAL)], [], keys.D, '4/4', clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1, 'C#6', noteHalf.NONE))
    })

    it('Note cancel test octave 1', () => {
        const noteSound = 'B4'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1, noteSound, noteHalf.FLAT)], [], keys.C, '4/4', clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1, 'C5', noteHalf.NONE))
    })

    it('Note cancel test octave 2', () => {
        const noteSound = 'C5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1, noteSound, noteHalf.SHARP)], [], keys.C, '4/4', clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1, 'B4', noteHalf.NONE))
    })

})
