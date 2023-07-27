import { clefs } from "../../../utils"
import { keys } from "../../../utils/keys"
import { Note, noteHalf } from "../../Note"
import { Track } from "../../Track"
import { NotesAdder } from "../NotesAdder"

const notesAdder = new NotesAdder()

describe('NotesAdder class tests', () => {

    it('Note add', () => {

        const cordsX = 0
        const cordsY = 1.5

        const currentTrack = new Track([], [], keys.C, '4/4', clefs.TREBLE)

        const noteSound = 'C5'

        notesAdder['addNote'](cordsX, cordsY, currentTrack, noteSound) // calling private method
        expect(currentTrack['notes'][0]).toEqual(new Note(0, 1.5, 4, 'C5', noteHalf.NONE))
    })

})