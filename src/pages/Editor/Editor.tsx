import React, { FC, useEffect, useRef, useState } from 'react'
import { Song } from '../../editor/models/Song';
import { Tact } from '../../editor/models/Tact';
import { Note, noteHalf } from '../../editor/models/Note';
import EditorDrawer from '../../editor/components/EditorDrawer/EditorDrawer';
import { CMajorMap, keys } from '../../editor/utils';

import './Editor.scss'

interface EditorProps {

}

const Editor: FC<EditorProps> = ({ }) => {

    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    const tacts: Tact[] = [new Tact([]), new Tact([]), new Tact([]), new Tact([]), new Tact([]), new Tact([]), new Tact([]), new Tact([]), new Tact([]), new Tact([]), new Tact([]), new Tact([]), new Tact([]), new Tact([]), new Tact([]), new Tact([]),]

    const [song, setSong] = useState<Song>(new Song(tacts, 80, keys.Cm))

    const incrementTact = useRef(null)
    const incrementNotes = useRef(null)


    // const tacts: Tact[] = [new Tact([new Note(0, -1.5, 4), new Note(8, -1, 4), new Note(16, -0.5, 4), new Note(24, 0, 4), new Note(32, 0.5, 4), new Note(40, 1, 4), new Note(48, 1.5, 4), new Note(56, 2, 4)])]

    // const tacts: Tact[] = [new Tact([
    //     new Note(0, -1.5, 4, noteHalf.NONE), new Note(0, -0.5, 4, noteHalf.FLAT), new Note(0, 0.5, 4, noteHalf.NONE),
    //     new Note(16, -1.5, 4, noteHalf.NONE), new Note(16, -0.5, 4, noteHalf.NONE), new Note(16, 0.5, 4, noteHalf.NONE), new Note(16, 1.5, 4, noteHalf.FLAT),
    //     new Note(32, 0, 4, noteHalf.NONE), new Note(32, 1, 4, noteHalf.FLAT), new Note(32, 2, 4, noteHalf.NONE)
    // ]),
    // new Tact([
    //     new Note(0, -1.5, 4, noteHalf.NONE), new Note(0, -0.5, 4, noteHalf.FLAT), new Note(0, 0.5, 4, noteHalf.NONE),
    //     new Note(16, -1.5, 4, noteHalf.NONE), new Note(16, -0.5, 4, noteHalf.NONE), new Note(16, 0.5, 4, noteHalf.NONE), new Note(16, 1.5, 4, noteHalf.FLAT),
    //     new Note(32, 0, 4, noteHalf.NONE), new Note(32, 1, 4, noteHalf.FLAT), new Note(32, 2, 4, noteHalf.NONE)
    // ]),
    // new Tact([
    //     new Note(0, -1.5, 4, noteHalf.NONE), new Note(0, -0.5, 4, noteHalf.FLAT), new Note(0, 0.5, 4, noteHalf.NONE),
    //     new Note(16, -1.5, 4, noteHalf.NONE), new Note(16, -0.5, 4, noteHalf.NONE), new Note(16, 0.5, 4, noteHalf.NONE), new Note(16, 1.5, 4, noteHalf.FLAT),
    //     new Note(32, 0, 4, noteHalf.NONE), new Note(32, 1, 4, noteHalf.FLAT), new Note(32, 2, 4, noteHalf.NONE)
    // ]),
    // new Tact([
    //     new Note(0, -1.5, 4, noteHalf.NONE), new Note(0, -0.5, 4, noteHalf.FLAT), new Note(0, 0.5, 4, noteHalf.NONE),
    //     new Note(16, -1.5, 4, noteHalf.NONE), new Note(16, -0.5, 4, noteHalf.NONE), new Note(16, 0.5, 4, noteHalf.NONE), new Note(16, 1.5, 4, noteHalf.FLAT),
    //     new Note(32, 0, 4, noteHalf.NONE), new Note(32, 1, 4, noteHalf.FLAT), new Note(32, 2, 4, noteHalf.NONE)
    // ]),
    // new Tact([
    //     new Note(0, -1.5, 4, noteHalf.NONE), new Note(0, -0.5, 4, noteHalf.FLAT), new Note(0, 0.5, 4, noteHalf.NONE),
    //     new Note(16, -1.5, 4, noteHalf.NONE), new Note(16, -0.5, 4, noteHalf.NONE), new Note(16, 0.5, 4, noteHalf.NONE), new Note(16, 1.5, 4, noteHalf.FLAT),
    //     new Note(32, 0, 4, noteHalf.NONE), new Note(32, 1, 4, noteHalf.FLAT), new Note(32, 2, 4, noteHalf.NONE)
    // ])]

    // const tacts: Tact[] = [
    //     new Tact([
    //         new Note(0, -1.5, 4, noteHalf.NONE), new Note(0, -0.5, 4, noteHalf.NONE), new Note(0, 0.5, 4, noteHalf.NONE),
    //         new Note(16, -1.5, 4, noteHalf.NONE), new Note(16, -0.5, 4, noteHalf.NONE), new Note(16, 0.5, 4, noteHalf.NONE), new Note(16, 1.5, 4, noteHalf.NONE),
    //         new Note(32, 0, 4, noteHalf.NONE), new Note(32, 1, 4, noteHalf.NONE), new Note(32, 2, 4, noteHalf.NONE),
    //         new Note(48, -0.5, 4, noteHalf.NONE), new Note(48, 0.5, 4, noteHalf.NONE), new Note(48, 1.5, 4, noteHalf.NONE),
    //     ]),
    //     new Tact([
    //         new Note(0, -1, 4, noteHalf.NONE), new Note(0, 0, 4, noteHalf.NONE), new Note(0, 1, 4, noteHalf.NONE),
    //         new Note(16, -1.5, 4, noteHalf.NONE), new Note(16, -0.5, 4, noteHalf.NONE), new Note(16, 0.5, 4, noteHalf.NONE),
    //         new Note(32, -2, 4, noteHalf.NONE), new Note(32, -1, 4, noteHalf.NONE), new Note(32, 0, 4, noteHalf.NONE),
    //         new Note(48, -1, 4, noteHalf.NONE), new Note(48, 0.5, 4, noteHalf.NONE), new Note(48, 1.5, 4, noteHalf.SHARP),
    //     ]),
    //     new Tact([
    //         new Note(0, -0.5, 4, noteHalf.SHARP), new Note(0, 0.5, 4, noteHalf.NONE), new Note(0, 2, 4, noteHalf.NONE),
    //     ]),
    //     new Tact([

    //     ]),
    //     new Tact([

    //     ]),
    // ]



    let iterratorTact: number = 0;
    let iterratorNote: number = 0;

    let position: number = 0;

    // const song = new Song(tacts, 80, keys.C)

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

        const currentNotes = song['tacts'][position]['notes'].filter((note: Note) => note['horizontalPosition'] === iterratorNote)
        if (currentNotes.length) {
            for (let i = 0; i < currentNotes.length; i++) {
                const noteNumber: number = currentNotes[i]['half'] === noteHalf.FLAT ? (Number((song['key'] as any)[currentNotes[i]['verticalPosition']]) - 1)
                    :
                    currentNotes[i]['half'] === noteHalf.SHARP ? (Number((song['key'] as any)[currentNotes[i]['verticalPosition']]) + 1)
                        :
                        Number((song['key'] as any)[currentNotes[i]['verticalPosition']]);
                (new Audio(require(`./../../editor/piano/key${noteNumber.toString()}.ogg`))).play()
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