import React, { FC } from 'react'
import { ObjectsDeleter } from '../../models/instruments/generalInstruments/ObejctsDeleter'
import { IAdder } from '../../models/instruments/interfaces/IAdder'
import { IInstrument } from '../../models/instruments/interfaces/IInsrument'
import { HalfsMover } from '../../models/instruments/notesInstruments/NotesHalfsMover'
import { NotesAdder } from '../../models/instruments/notesInstruments/NotesAdder'
import { NotesCanceler } from '../../models/instruments/notesInstruments/NotesCanceler'
import { NotesFlatter } from '../../models/instruments/notesInstruments/NotesFlatter'
import { NotesNaturaler } from '../../models/instruments/notesInstruments/NotesNaturaler'
import { NotesSharper } from '../../models/instruments/notesInstruments/NotesSharper'
import { NotesUnioner } from '../../models/instruments/notesInstruments/NotesUnioner'
import { NotesViewChanger } from '../../models/instruments/notesInstruments/NotesViewChanger'
import { RestsAdder } from '../../models/instruments/restsInstruments/RestsAdder'
import { TactShorter } from '../../models/instruments/tactsInstruments/TactsShorter'
import { TactWider } from '../../models/instruments/tactsInstruments/TactsWider'

import './EditorInstruments.scss'
import { ObjectsMover } from '../../models/instruments/generalInstruments/ObjectsMover'

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
            <input onChange={(e) => (instrument as any).setStep(e.target.value) }/>
            <button onClick={() => handleChangeInstrument(new ObjectsMover())} >Move object</button>
            <button onClick={() => handleChangeInstrument(new NotesAdder(1))} >Add note</button>
            <button onClick={() => handleChangeInstrument(new RestsAdder(1))} >Add rest</button>
            <button onClick={() => handleChangeInstrument(new ObjectsDeleter())} >Delete</button>
            <button onClick={() => handleChangeInstrument(new NotesFlatter())} >Flat</button>
            <button onClick={() => handleChangeInstrument(new NotesSharper())} >Sharp</button>
            <button onClick={() => handleChangeInstrument(new NotesNaturaler())} >Natural</button>
            <button onClick={() => handleChangeInstrument(new HalfsMover())} >Move half</button>
            <button onClick={() => handleChangeInstrument(new TactWider())} >Wider tact</button>
            <button onClick={() => handleChangeInstrument(new TactShorter())} >Shorter tact</button>
            <button onClick={() => handleChangeInstrument(new NotesViewChanger())} >Change view</button>
            <button onClick={() => handleChangeInstrument(new NotesUnioner())} >Union notes</button>
            <button onClick={() => handleChangeInstrument(new NotesCanceler())} >Cancel</button>
            <h3>Editing: {isEditing ? 'yes' : 'no'}</h3>
            <h3>Instrument: {instrument['name']}</h3>
        </div>
    )
}

export default EditorInstruments;