import React, { FC } from 'react'
import { IInstrument } from '../../models/editor/IInsrument';
import { NotesAdder } from '../../models/editor/NotesAdder';
import { NotesCanceler } from '../../models/editor/NotesCanceler';
import { ObjectsDeleter } from '../../models/editor/ObejctsDeleter';
import { NotesFlatter } from '../../models/editor/NotesFlatter';
import { NotesNaturaler } from '../../models/editor/NotesNaturaler';
import { NotesSharper } from '../../models/editor/NotesSharper';
import { HalfsMover } from '../../models/editor/HalfsMover';
import { RestsAdder } from '../../models/editor/RestsAdder';
import { IAdder } from '../../models/editor/IAdder';
import { TactWider } from '../../models/editor/TactWider';
import { TactShorter } from '../../models/editor/TactShorter';

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
            <input onChange={(e) => (instrument as IAdder).step = (Number(e.target.value)) }/>
            <button onClick={() => handleChangeInstrument(new NotesAdder())} >Add note</button>
            <button onClick={() => handleChangeInstrument(new RestsAdder())} >Add rest</button>
            <button onClick={() => handleChangeInstrument(new ObjectsDeleter())} >Delete</button>
            <button onClick={() => handleChangeInstrument(new NotesFlatter())} >Flat</button>
            <button onClick={() => handleChangeInstrument(new NotesSharper())} >Sharp</button>
            <button onClick={() => handleChangeInstrument(new NotesNaturaler())} >Natural</button>
            <button onClick={() => handleChangeInstrument(new HalfsMover())} >Move half</button>
            <button onClick={() => handleChangeInstrument(new TactWider())} >Wider tact</button>
            <button onClick={() => handleChangeInstrument(new TactShorter())} >Shorter tact</button>
            <button onClick={() => handleChangeInstrument(new NotesCanceler())} >Cancel</button>
            <h3>Editing: {isEditing ? 'yes' : 'no'}</h3>
            <h3>Instrument: {instrument['name']}</h3>
        </div>
    )
}

export default EditorInstruments;