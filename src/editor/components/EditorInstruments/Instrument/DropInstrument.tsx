import React, { FC, useState } from 'react'
import { IInstrument } from '../../../models/instruments/interfaces/IInsrument';

import './Instrument.scss'

interface DropInstrumentProps {
    instrumentsGroup: IInstrument[],
    currentInstrument: IInstrument,
    handler: Function,
}

const DropInstrument: FC<DropInstrumentProps> = ({ instrumentsGroup, currentInstrument, handler }) => {

    const [selectedInstrument, setSelectedInstrument] = useState<IInstrument>(instrumentsGroup[0]);

    const clearAllDrop = () => {
        Array.from(document.getElementsByClassName('editor-instruments-instrument')).forEach((element: any) => element.classList.remove('_drop'))
    }

    const setDropHanlder = (e: any) => {
        const drop = e.target.closest('.editor-instruments-instrument')
        if (!drop.classList.contains('_drop')) {
            clearAllDrop()
            drop.classList.add('_drop')
        } else {
            drop.classList.remove('_drop')
        }
    }

    const handleSelectDropInstrument = (instrument: IInstrument) => {
        clearAllDrop()
        setSelectedInstrument(instrument)
        handler(instrument)
    }

    const isSelected: boolean = selectedInstrument['name'] === currentInstrument['name']

    return (
        <div className={['editor-instruments-instrument _group', isSelected ? '_active' : ''].join(' ')}>
            <img className='editor-instruments-instrument__img' src={require(`./../../../img/instruments/${selectedInstrument['name']}.png`)} onClick={(e: any) => setDropHanlder(e)} />
            <div className='editor-instruments-instrument__drop'>
                {instrumentsGroup.map((instrument: IInstrument) =>
                    <img className='editor-instruments-instrument__img' src={require(`./../../../img/instruments/${instrument['name']}.png`)} onClick={() => handleSelectDropInstrument(instrument)} />
                )}
            </div>
        </div>
    )
}

export default DropInstrument;