import { clefs } from "../../../utils"
import { keys } from "../../../utils/keys"
import { Note, noteHalf } from "../../Note"
import { Rest } from "../../Rest"
import { Track } from "../../Track"
import { ObjectsDeleter } from "../ObejctsDeleter"

const notesDeleter = new ObjectsDeleter()

const cordsX = 0
const cordsY = 1.5

describe('ObjectsDeleter class tests', () => {

    it('Note delete test 1', () => {
        const noteSound = 'D5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1,noteSound, noteHalf.NONE)], [], keys.C, '4/4', clefs.TREBLE)

        notesDeleter['deleteObejct'](cordsX, cordsY, currentTrack, 'note') // calling private method
        expect(currentTrack['notes'].length).toEqual(0)
    })

    it('Note natudeleteral test 2', () => {
        const noteSound = 'G#5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1,noteSound, noteHalf.SHARP)], [], keys.C, '4/4', clefs.TREBLE)

        notesDeleter['deleteObejct'](cordsX, cordsY, currentTrack, 'note') // calling private method

        expect(currentTrack['notes'].length).toEqual(0)
    })

    it('Note delete test 3', () => {
        const noteSound = 'Bb5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1,noteSound, noteHalf.FLAT)], [], keys.C, '4/4', clefs.TREBLE)

        notesDeleter['deleteObejct'](cordsX, cordsY, currentTrack, 'note') // calling private method
        expect(currentTrack['notes'].length).toEqual(0)
    })

    it('Rest delete test 4', () => {
        const noteSound = 'Bb5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, 1,noteSound, noteHalf.FLAT)], [new Rest(cordsX, cordsY, 4)], keys.C, '4/4', clefs.TREBLE)

        notesDeleter['deleteObejct'](cordsX, cordsY, currentTrack, 'rest') // calling private method
        expect(currentTrack['rests'].length).toEqual(0)
    })



})