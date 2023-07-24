import { clefs } from "../../../utils"
import { keys } from "../../../utils/keys"
import { Note, noteHalf } from "../../Note"
import { Track } from "../../Track"
import { NotesFlatter } from "../NotesFlatter"

const notesFlatter = new NotesFlatter()

const cordsX = 0
const cordsY = 1.5

describe('NotesFlatter class tests', () => {

    it('Note flat test 1', () => {
        const noteSound = 'F5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.NONE)], keys.C, '4/4', clefs.TREBLE)

        notesFlatter['flatNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 'E5', noteHalf.FLAT))
    })

    it('Note flat test 2', () => {
        const noteSound = 'C5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.NONE)], keys.C, '4/4', clefs.TREBLE)

        notesFlatter['flatNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 'B4', noteHalf.FLAT))
    })

    it('Note flat test 3', () => {
        const noteSound = 'E5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.NONE)], keys.C, '4/4', clefs.TREBLE)

        notesFlatter['flatNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 'Eb5', noteHalf.FLAT))
    })

    it('Note flat test 4', () => {
        const noteSound = 'E5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.NONE)], keys.C, '4/4', clefs.TREBLE)

        notesFlatter['flatNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).not.toEqual(new Note(0, 1.5, 4, 'Eb5', noteHalf.NONE))
    })

    it('Note flat octave test', () => {
        const noteSound = 'E5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.NONE)], keys.C, '4/4', clefs.TREBLE)

        notesFlatter['flatNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'][0]).not.toEqual(new Note(0, 1.5, 4, 'Eb4', noteHalf.FLAT))
    })

})