import React, { FC, useEffect, useRef, useState } from 'react'
import { Song } from '../../editor/models/Song';
import { Tact } from '../../editor/models/Tact';
import { Note, noteHalf } from '../../editor/models/Note';
import EditorDrawer from '../../editor/components/EditorDrawer/EditorDrawer';
import { CMajorMap, clefs, keys } from '../../editor/utils';

import './Editor.scss'
import { Track } from '../../editor/models/Track';

interface EditorProps {

}

const Editor: FC<EditorProps> = ({ }) => {

    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    const mainKey = keys.Am

    const tacts: Tact[] = [new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]),new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]),new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]),new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]),new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]),new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]),new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]),new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]),new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]),new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]),new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)]),new Tact([new Track([], mainKey, clefs.TREBLE), new Track([], mainKey, clefs.BASS)])]

    const [song, setSong] = useState<Song>(new Song(tacts, 140, mainKey))

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

        for(let i = 0; i < song['tacts'][position]['tracks'].length; i ++){
            currentNotes.push(...song['tacts'][position]['tracks'][i]['notes'].filter((note: Note) => note['horizontalPosition'] === iterratorNote))
        }

        if (currentNotes.length) {
            for (let i = 0; i < currentNotes.length; i++) {
                (new Audio(require(`./../../editor/piano/${currentNotes[i]['sound']}.mp3`))).play()
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
            iterratorTact += 1;

            (incrementTact.current as any) = setInterval(countTacts, 54000 / song['tempo']);
            (incrementNotes.current as any) = setInterval(countNotes, 3375 / song['tempo'])

        } else {
            stopPlaying()
        }
    }, [isPlaying])

    return (
        <div className='editor'>
            <button onClick={() => setIsPlaying(!isPlaying)} >Play/Stop</button>
            <button onClick={() => setIsAdding(!isAdding)} >Add</button>
            <button onClick={() => setIsDeleting(!isDeleting)} >Delete</button>
            <button onClick={() => console.log(song)} >Song</button>
            <EditorDrawer song={song} isAdding={isAdding} isDeleting={isDeleting} />
        </div>
    )
}

export default Editor;