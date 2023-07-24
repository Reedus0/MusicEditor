import './Editor.scss'
import { Note } from '../../models/Note'
import { Song } from '../../models/Song'
import { Tact } from '../../models/Tact'
import { Track } from '../../models/Track'
import { IInstrument } from '../../models/editor/IInsrument'
import { clefs, formatNoteForPlay } from '../../utils'
import { keys } from '../../utils/keys'
import React, { FC, useEffect, useRef, useState } from 'react'
import EditorInstruments from '../EditorInstruments/EditorInstruments'
import EditorHandler from '../EditorHandler/EditorHandler'



interface EditorProps {

}

const Editor: FC<EditorProps> = ({ }) => {

    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const [instrument, setInstrument] = useState<IInstrument>({} as IInstrument)

    const mainKey = keys.C

    const tacts: Tact[] = [new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]), new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]), new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]), new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]), new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]), new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]), new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]), new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]), new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]), new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]), new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]), new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)])]

    const [song, setSong] = useState<Song>(new Song(tacts, 80, mainKey))

    const incrementTact = useRef(null)
    const incrementNotes = useRef(null)

    let iterratorTact: number = 0;
    let iterratorNote: number = 0;

    let position: number = 0;

    const countTacts = () => {
        iterratorTact += 1
        if (iterratorTact > 4) {
            iterratorTact = 1
            position += 1
        }
    }

    const countNotes = () => {
        if (iterratorNote > 64) iterratorNote = 0
        if (position >= song['tacts'].length) {
            stopPlaying()
            return
        }

        const currentNotes: Note[] = []

        for (let i = 0; i < song['tacts'][position]['tracks'].length; i++) {
            currentNotes.push(...song['tacts'][position]['tracks'][i]['notes'].filter((note: Note) => note['horizontalPosition'] === iterratorNote))
        }

        if (currentNotes.length) {
            for (let i = 0; i < currentNotes.length; i++) {
                (new Audio(require(`./../../piano/${formatNoteForPlay(currentNotes[i]['sound'])}.mp3`))).play()
            }
        }
        iterratorNote += 1
    }

    const stopPlaying = () => {
        clearInterval((incrementTact.current as any))
        clearInterval((incrementNotes.current as any))
        setIsPlaying(false)
    }

    useEffect(() => {
        if (isPlaying) {

            setIsEditing(false)
            setInstrument({} as IInstrument)

            iterratorTact += 1;

            (incrementTact.current as any) = setInterval(countTacts, 54000 / song['tempo']);
            (incrementNotes.current as any) = setInterval(countNotes, 3375 / song['tempo'])

        } else {
            stopPlaying()
        }
    }, [isPlaying])

    useEffect(() => {
        if (isEditing) {
            stopPlaying()
        }
    }, [isEditing])

    return (
        <>
            <button onClick={() => setIsPlaying(!isPlaying)} >Play/Stop</button>
            <EditorInstruments isEditing={isEditing} setIsEditing={setIsEditing} instrument={instrument} setInstrument={setInstrument} />
            <EditorHandler song={song} isEditing={isEditing} setIsEditing={setIsEditing} instrument={instrument} setInstrument={setInstrument} />
        </>
    )
}

export default Editor;