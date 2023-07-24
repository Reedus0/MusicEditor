import { clefs } from "../../../utils"
import { keys } from "../../../utils/keys"
import { Note, noteHalf } from "../../Note"
import { Track } from "../../Track"
import { NotesDeleter } from "../NotesDeleter"

const notesDeleter = new NotesDeleter()

const cordsX = 0
const cordsY = 1.5

describe('NotesDeleter class tests', () => {

    it('Note delete test 1', () => {
        const noteSound = 'D5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.NONE)], keys.C, clefs.TREBLE)

        notesDeleter['deleteNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'].length).toEqual(0)
    })

    it('Note natudeleteral test 2', () => {
        const noteSound = 'G#5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.SHARP)], keys.C, clefs.TREBLE)

        notesDeleter['deleteNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'].length).toEqual(0)
    })

    it('Note delete test 3', () => {
        const noteSound = 'Bb5'

        const currentTrack = new Track([new Note(cordsX, cordsY, 4, noteSound, noteHalf.FLAT)], keys.C, clefs.TREBLE)

        notesDeleter['deleteNote'](cordsX, cordsY, currentTrack) // calling private method
        expect(currentTrack['notes'].length).toEqual(0)
    })



})