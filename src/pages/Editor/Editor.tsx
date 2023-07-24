import './Editor.scss'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Song } from '../../editor/models/Song';
import { Tact } from '../../editor/models/Tact';
import { Note } from '../../editor/models/Note';
import EditorDrawer from '../../editor/components/EditorDrawer/EditorDrawer';
import { clefs, formatNoteForPlay } from '../../editor/utils';
import { Track } from '../../editor/models/Track';
import { IInstrument } from '../../editor/models/editor/IInsrument';
import { NotesAdder } from '../../editor/models/editor/NotesAdder';
import { NotesDeleter } from '../../editor/models/editor/NotesDeleter';
import { NotesFlatter } from '../../editor/models/editor/NotesFlatter';
import { NotesSharper } from '../../editor/models/editor/NotesSharper';
import { NotesCanceler } from '../../editor/models/editor/NotesCanceler';
import { NotesNaturaler } from '../../editor/models/editor/NotesNaturaler';
import { keys } from '../../editor/utils/keys';

interface EditorProps {

}

const Editor: FC<EditorProps> = ({ }) => {

    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const [instrument, setInstrument] = useState<IInstrument>({} as IInstrument)

    const mainKey = keys.D

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
                (new Audio(require(`./../../editor/piano/${formatNoteForPlay(currentNotes[i]['sound'])}.mp3`))).play()
            }
        }
        iterratorNote += 1
    }

    const stopPlaying = () => {
        clearInterval((incrementTact.current as any))
        clearInterval((incrementNotes.current as any))
        setIsPlaying(false)
    }

    const handleChangeInstrument = (newInstrument: IInstrument) => {
        if (newInstrument['name'] !== instrument['name']) {
            setIsEditing(true)
            setInstrument(newInstrument)
        } else {
            setInstrument({} as IInstrument)
            setIsEditing(false)
        }
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
        if(isEditing) {
            stopPlaying()
        }
    }, [isEditing])

    return (
        <>
            <button onClick={() => setIsPlaying(!isPlaying)} >Play/Stop</button>
            <button onClick={() => handleChangeInstrument(new NotesAdder())} >Add</button>
            <button onClick={() => handleChangeInstrument(new NotesDeleter())} >Delete</button>
            <button onClick={() => handleChangeInstrument(new NotesFlatter())} >Flat</button>
            <button onClick={() => handleChangeInstrument(new NotesSharper())} >Sharp</button>
            <button onClick={() => handleChangeInstrument(new NotesNaturaler())} >Natural</button>
            <button onClick={() => handleChangeInstrument(new NotesCanceler())} >Cancel</button>
            <button onClick={() => console.log(song)} >Song</button>
            <h3>Editing: {isEditing ? 'yes' : 'no'}</h3>
            <h3>Instrument: {instrument['name']}</h3>
            <EditorDrawer song={song} isEditing={isEditing} setIsEditing={setIsEditing} instrument={instrument} setInstrument={setInstrument} />
        </>
    )
}

export default Editor;