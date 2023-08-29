import './Editor.scss'
import { Song } from '../../models/Song'
import { Tact } from '../../models/Tact'
import { Track } from '../../models/Track'
import { clefs } from '../../utils'
import { keys } from '../../utils/keys'
import React, { FC, useState } from 'react'
import EditorInstruments from '../EditorInstruments/EditorInstruments'
import EditorHandler from '../EditorHandler/EditorHandler'
import EditorPlayer from '../EditorPlayer/EditorPlayer'



interface EditorProps {

}

const Editor: FC<EditorProps> = ({ }) => {

    const mainKey = keys.Am
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

    return (
        <div className='editor'>
            <EditorInstruments />
            <EditorHandler song={song} />
            <EditorPlayer song={song} />
        </div>
    )
}

export default Editor;