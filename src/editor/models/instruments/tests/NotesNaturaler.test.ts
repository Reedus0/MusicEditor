import { clefs } from "../../../utils"
import { keys } from "../../../utils/keys"
import { Note, noteHalf } from "../../Note"
import { Track } from "../../Track"
import { NotesNaturaler } from "../notesInstruments/NotesNaturaler"

const notesNaturaler = new NotesNaturaler()

const cordsX = 0
const cordsY = 1.5

describe('NotesNaturaler class tests', () => {

    it('Note natural test 1', () => {
        const noteSound = 'Db5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1,noteSound, noteHalf.NONE)], [], keys.Bm, '4/4', clefs.TREBLE)

        notesNaturaler['naturalNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1,'D5', noteHalf.NATURAL))
    })

    it('Note natural test 2', () => {
        const noteSound = 'F#5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1,noteSound, noteHalf.NONE)], [], keys.Bm, '4/4', clefs.TREBLE)

        notesNaturaler['naturalNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1,'F5', noteHalf.NATURAL))
    })

    it('Note natural test 3', () => {
        const noteSound = 'B#5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1,noteSound, noteHalf.NONE)], [], keys.Gm, '4/4', clefs.TREBLE)

        notesNaturaler['naturalNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1,'B5', noteHalf.NATURAL))
    })

    it('Note natural test 4', () => {
        const noteSound = 'E#5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1,noteSound, noteHalf.NONE)], [], keys.Gm, '4/4', clefs.TREBLE)

        notesNaturaler['naturalNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1,'E5', noteHalf.NATURAL))
    })
})