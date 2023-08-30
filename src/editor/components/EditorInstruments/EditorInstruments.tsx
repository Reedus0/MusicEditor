import React, { FC } from 'react'
import { ObjectsDeleter } from '../../models/instruments/generalInstruments/ObejctsDeleter'
import { IInstrument } from '../../models/instruments/interfaces/IInsrument'
import { NotesHalfsMover } from '../../models/instruments/notesInstruments/NotesHalfsMover'
import { NotesAdder } from '../../models/instruments/notesInstruments/NotesAdder'
import { NotesCanceler } from '../../models/instruments/notesInstruments/NotesCanceler'
import { NotesFlatter } from '../../models/instruments/notesInstruments/NotesFlatter'
import { NotesNaturaler } from '../../models/instruments/notesInstruments/NotesNaturaler'
import { NotesSharper } from '../../models/instruments/notesInstruments/NotesSharper'
import { NotesUnioner } from '../../models/instruments/notesInstruments/NotesUnioner'
import { NotesViewChanger } from '../../models/instruments/notesInstruments/NotesViewChanger'
import { RestsAdder } from '../../models/instruments/restsInstruments/RestsAdder'
import { TactsShorter } from '../../models/instruments/tactsInstruments/TactsShorter'
import { TactsWider } from '../../models/instruments/tactsInstruments/TactsWider'
import { ObjectsMover } from '../../models/instruments/generalInstruments/ObjectsMover'
import { clearAllInstrumentsDrop, saveToFile } from '../../utils'

import './EditorInstruments.scss'
import Instrument from './Instrument/Instrument'
import DropInstrument from './Instrument/DropInstrument'
import { TactsDurationChanger } from '../../models/instruments/tactsInstruments/TactsDurationChanger'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import EditorSavePrompt from '../EditorSavePrompt/EditorSavePrompt'
import { Song } from '../../models/Song'

interface EditorInstrumentsProps {
    song: Song
}

const EditorInstruments: FC<EditorInstrumentsProps> = ({ song }) => {

    const { setNotification, setIsEditing, setIsPlaying, setInstrument, setPrompt } = useActions()
    const { isPlaying, instrument } = useTypedSelector(state => state.editor)

    const handleChangeInstrument = (newInstrument: IInstrument) => {
        if (newInstrument['name'] !== instrument['name']) {
            clearAllInstrumentsDrop()
            setIsEditing(true)
            setInstrument(newInstrument)
        }
    }

    return (
        <div className='editor-instruments'>
            <button
                className='editor-instruments__button'
                onClick={() => setIsPlaying(!isPlaying)}
            >
                {!isPlaying ?
                    <img className='editor-instruments__button-img _play' src={require('./../../img/play.png')} />
                    :
                    <img className='editor-instruments__button-img _stop' src={require('./../../img/pause.png')} />
                }
            </button>
            <div className='editor-instruments__line'></div>
            <Instrument instrument={new ObjectsMover()} currentInstrument={instrument} handler={handleChangeInstrument} />
            {/* <Instrument instrument={{} as IInstrument} currentInstrument={instrument} handler={handleChangeInstrument} icon={require('./../../img/instruments/objectsSelector.png')} /> */}
            <Instrument instrument={new NotesAdder(2)} currentInstrument={instrument} handler={handleChangeInstrument} />
            <Instrument instrument={new RestsAdder(2)} currentInstrument={instrument} handler={handleChangeInstrument} />
            <Instrument instrument={new ObjectsDeleter()} currentInstrument={instrument} handler={handleChangeInstrument} />
            <DropInstrument
                instrumentsGroup={[new NotesSharper(), new NotesFlatter(), new NotesNaturaler(), new NotesCanceler()]}
                currentInstrument={instrument} handler={handleChangeInstrument}
            />
            <Instrument instrument={new NotesHalfsMover()} currentInstrument={instrument} handler={handleChangeInstrument} />
            <DropInstrument
                instrumentsGroup={[new TactsWider(), new TactsShorter()]}
                currentInstrument={instrument} handler={handleChangeInstrument}
            />
            <Instrument instrument={new NotesViewChanger()} currentInstrument={instrument} handler={handleChangeInstrument} />
            <Instrument instrument={new NotesUnioner()} currentInstrument={instrument} handler={handleChangeInstrument} />
            <Instrument instrument={new TactsDurationChanger()} currentInstrument={instrument} handler={handleChangeInstrument} />
            <div className='editor-instruments__line _end'></div>
            <button
                className='editor-instruments__button'
                onClick={() => setPrompt(<EditorSavePrompt song={song}/>)}
            >
                <img className='editor-instruments__button-img _end' src={require('./../../img/save.png')} />
            </button>
        </div>
    )
}

export default EditorInstruments;