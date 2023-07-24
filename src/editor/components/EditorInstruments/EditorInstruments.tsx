import React, { FC } from 'react'
import { IInstrument } from '../../models/editor/IInsrument';
import { NotesAdder } from '../../models/editor/NotesAdder';
import { NotesCanceler } from '../../models/editor/NotesCanceler';
import { NotesDeleter } from '../../models/editor/NotesDeleter';
import { NotesFlatter } from '../../models/editor/NotesFlatter';
import { NotesNaturaler } from '../../models/editor/NotesNaturaler';
import { NotesSharper } from '../../models/editor/NotesSharper';

interface EditorInstrumentsProps {
    isEditing: boolean,
    setIsEditing: Function,
    instrument: IInstrument,
    setInstrument: Function
}

const EditorInstruments: FC<EditorInstrumentsProps> = ({ isEditing, instrument, setIsEditing, setInstrument }) => {

    const handleChangeInstrument = (newInstrument: IInstrument) => {
        if (newInstrument['name'] !== instrument['name']) {
            setIsEditing(true)
            setInstrument(newInstrument)
        } else {
            setInstrument({} as IInstrument)
            setIsEditing(false)
        }
    }

    return (
        <div className='editor-instruments'>
            <input onChange={(e) => (instrument as NotesAdder).setStep(Number(e.target.value)) }/>
            <button onClick={() => handleChangeInstrument(new NotesAdder())} >Add</button>
            <button onClick={() => handleChangeInstrument(new NotesDeleter())} >Delete</button>
            <button onClick={() => handleChangeInstrument(new NotesFlatter())} >Flat</button>
            <button onClick={() => handleChangeInstrument(new NotesSharper())} >Sharp</button>
            <button onClick={() => handleChangeInstrument(new NotesNaturaler())} >Natural</button>
            <button onClick={() => handleChangeInstrument(new NotesCanceler())} >Cancel</button>
            <h3>Editing: {isEditing ? 'yes' : 'no'}</h3>
            <h3>Instrument: {instrument['name']}</h3>
        </div>
    )
}

export default EditorInstruments;