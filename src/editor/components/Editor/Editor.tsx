import './Editor.scss'
import { Song } from '../../models/Song'
import { Tact } from '../../models/Tact'
import { Track } from '../../models/Track'
import { clefs } from '../../utils'
import { keys } from '../../utils/keys'
import React, { FC, useEffect, useState } from 'react'
import EditorInstruments from '../EditorInstruments/EditorInstruments'
import EditorHandler from '../EditorHandler/EditorHandler'
import EditorPlayer from '../EditorPlayer/EditorPlayer'
import { useActions } from '../../../hooks/useActions'
import EditorCreatePrompt from '../EditorCreatePrompt/EditorCreatePrompt'



interface EditorProps {

}

const Editor: FC<EditorProps> = ({ }) => {

    const isMobile = window.innerWidth < 991

    const { setPrompt } = useActions()

    const mainKey = keys.C
    const mainTimeSignature = '4/4'
    const tempo = 120

    const tactWidth: number = 12

    const tacts: Tact[] = [
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth * 2),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
        new Tact([new Track([], [], mainKey, mainTimeSignature, clefs.TREBLE), new Track([], [], mainKey, mainTimeSignature, clefs.BASS)], tempo, tactWidth),
    ]

    const [song, setSong] = useState<Song>(new Song('Name', 'Subtitle', 'Author', tacts, tempo, mainKey, mainTimeSignature))

    useEffect(() => {
        if(isMobile) return
        setPrompt(<EditorCreatePrompt setSong={setSong} />)
    }, [])

    return (
        <div className='editor'>
            <EditorInstruments song={song} />
            <EditorHandler song={song} />
            <EditorPlayer song={song} />
            <div className='editor__mobile'>
                <h3 className='editor__mobile-text'>К сожалению, на данный момент приложение недоступно на мобильных устройствах</h3>
            </div>
        </div>
    )
}

export default Editor;