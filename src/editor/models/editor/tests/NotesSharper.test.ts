import { clefs } from "../../../utils"
import { keys } from "../../../utils/keys"
import { Note, noteHalf } from "../../Note"
import { Track } from "../../Track"
import { NotesSharper } from "../NotesSharper"

const notesSharper = new NotesSharper()

const cordsX = 0
const cordsY = 1.5

describe('NotesFlatter class tests', () => {

    it('Note sharp test 1', () => {
        const noteSound = 'F5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1,noteSound, noteHalf.NONE)], [], keys.C, '4/4', clefs.TREBLE)

        notesSharper['sharpNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1,'F#5', noteHalf.SHARP))
    })

    it('Note sharp test 2', () => {
        const noteSound = 'B5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1,noteSound, noteHalf.NONE)], [], keys.C, '4/4', clefs.TREBLE)

        notesSharper['sharpNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1,'C6', noteHalf.SHARP))
    })

    it('Note sharp test 3', () => {
        const noteSound = 'E5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1,noteSound, noteHalf.NONE)], [], keys.C, '4/4', clefs.TREBLE)

        notesSharper['sharpNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 1,'F5', noteHalf.SHARP))
    })

    it('Note sharp test 4', () => {
        const noteSound = 'G5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1,noteSound, noteHalf.NONE)], [], keys.C, '4/4', clefs.TREBLE)

        notesSharper['sharpNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).not.toEqual(new Note(0, 1.5, 4, 1,'G#5', noteHalf.NONE))
    })

    it('Note sharp octave test', () => {
        const noteSound = 'E5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1,noteSound, noteHalf.NONE)], [], keys.C, '4/4', clefs.TREBLE)

        notesSharper['sharpNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).not.toEqual(new Note(0, 1.5, 4, 1,'F#4', noteHalf.SHARP))
    })

})