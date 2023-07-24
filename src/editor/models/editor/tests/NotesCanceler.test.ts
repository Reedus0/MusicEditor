import { clefs, keys } from "../../../utils"
import { Note, noteHalf } from "../../Note"
import { Track } from "../../Track"
import { NotesCanceler } from "../NotesCanceler"

const notesCanceler = new NotesCanceler()

const cordsX = 0
const cordsY = 1.5

describe('NotesCanceler class tests', () => {

    it('Note cancel test 1', () => {
        const noteSound = 'Gb5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.FLAT)], keys.C, clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 'G5', noteHalf.NONE))
    })

    it('Note cancel test 2', () => {
        const noteSound = 'Bb5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.FLAT)], keys.C, clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 'B5', noteHalf.NONE))
    })

    it('Note cancel test 3', () => {
        const noteSound = 'Eb5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.FLAT)], keys.C, clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 'E5', noteHalf.NONE))
    })

    it('Note cancel test 4', () => {
        const noteSound = 'Gb5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.FLAT)], keys.C, clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).not.toEqual(new Note(0, 1.5, 4, 'G5', noteHalf.SHARP))
    })

    it('Note cancel octave test', () => {
        const noteSound = 'Ab5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.SHARP)], keys.C, clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).not.toEqual(new Note(0, 1.5, 4, 'G4', noteHalf.NONE))
    })


    it('Note cancel test Bm 1', () => {
        const noteSound = 'Gb5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.FLAT)], keys.Bm, clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 'G5', noteHalf.NONE))
    })

    it('Note cancel test Bm 2', () => {
        const noteSound = 'D5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.SHARP)], keys.Bm, clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 'Db5', noteHalf.NONE))
    })

    it('Note cancel test Bm 3', () => {
        const noteSound = 'G5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.SHARP)], keys.Bm, clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 'Gb5', noteHalf.NONE))
    })

    it('Note cancel test Bm 4', () => {
        const noteSound = 'Gb5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.NONE)], keys.Bm, clefs.TREBLE)

        notesCanceler['cancelNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 'Gb5', noteHalf.NONE))
    })

})
