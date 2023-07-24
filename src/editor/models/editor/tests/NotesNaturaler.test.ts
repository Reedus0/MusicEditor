import { clefs, keys } from "../../../utils"
import { Note, noteHalf } from "../../Note"
import { Track } from "../../Track"
import { NotesNaturaler } from "../NotesNaturaler"

const notesNaturaler = new NotesNaturaler()

const cordsX = 0
const cordsY = 1.5

describe('NotesNaturaler class tests', () => {

    it('Note natural test 1', () => {
        const noteSound = 'Db5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.NONE)], keys.Bm, clefs.TREBLE)

        notesNaturaler['naturalNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 'D5', noteHalf.NATURAL))
    })

    it('Note natural test 2', () => {
        const noteSound = 'Gb5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.NONE)], keys.Bm, clefs.TREBLE)

        notesNaturaler['naturalNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 'F5', noteHalf.NATURAL))
    })

    it('Note natural test 3', () => {
        const noteSound = 'Bb5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.NONE)], keys.Gm, clefs.TREBLE)

        notesNaturaler['naturalNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 'B5', noteHalf.NATURAL))
    })

    it('Note natural test 4', () => {
        const noteSound = 'Eb5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.NONE)], keys.Gm, clefs.TREBLE)

        notesNaturaler['naturalNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 'E5', noteHalf.NATURAL))
    })


})