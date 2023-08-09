import React, { FC } from 'react'
import { IInstrument } from '../../../models/instruments/interfaces/IInsrument'

import './Instrument.scss'

interface InstrumentProps {
    instrument: IInstrument,
    currentInstrument: IInstrument,
    handler: Function
}

const Instrument: FC<InstrumentProps> = ({ instrument, currentInstrument, handler }) => {

    const isSelected: boolean = instrument['name'] === currentInstrument['name']

    return (
        <div className={['editor-instruments-instrument', isSelected ? '_active' : ''].join(' ')}>
            <img className='editor-instruments-instrument__img _drop' src={require(`./../../../img/instruments/${instrument['name']}.png`)} onClick={() => handler(instrument)} />
        </div>
    )
}

export default Instrument;