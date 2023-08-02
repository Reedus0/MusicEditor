import './Editor.scss'
import { Note } from '../../models/Note'
import { Song } from '../../models/Song'
import { Tact } from '../../models/Tact'
import { Track } from '../../models/Track'
import { clearActiveTacts, clearHoverObjects, clefs, formatNoteForPlay, highlightTact } from '../../utils'
import { keys } from '../../utils/keys'
import React, { FC, useEffect, useRef, useState } from 'react'
import EditorInstruments from '../EditorInstruments/EditorInstruments'
import EditorHandler from '../EditorHandler/EditorHandler'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { IInstrument } from '../../models/instruments/interfaces/IInsrument'



interface EditorProps {

}

const Editor: FC<EditorProps> = ({ }) => {

    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const [instrument, setInstrument] = useState<IInstrument>({} as IInstrument)

    const mainKey = keys.Gm
    const mainTimeSignature = '3/4'
    const tempo = 100

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

    const [song, setSong] = useState<Song>(new Song('Merry-Go-Round of Life', `Howl's moving castle`, 'Composer: Joe Hisaishi', tacts, tempo, mainKey, mainTimeSignature))

    let songIsReady = useRef(null)
    let incrementNotes = useRef(null)

    let iterratorNote: number = 0;
    let position: number = 0;

    let songSounds: { [key: number]: HTMLAudioElement }[][] = []


    const countNotes = () => {
        if (iterratorNote > Number(song['tacts'][position]['tracks'][0].getTimeSignature()[0]) * 16) {
            iterratorNote = 0
            position += 1
            highlightTact(position)
        }
        if (position >= song['tacts'].length) {
            stopPlaying()
            return
        }

        playSong(songSounds, position, iterratorNote)
        iterratorNote += 1
    }

    const loadSong = (song: Song): { [key: number]: HTMLAudioElement }[][] => {
        const notes: Note[][] = []
        for (let tact = 0; tact < song['tacts'].length; tact++) {
            notes.push([])
            for (let track = 0; track < song['tacts'][tact]['tracks'].length; track++) {
                for (let note = 0; note < song['tacts'][tact]['tracks'][track].getNotes().length; note++) {
                    notes[tact].push(song['tacts'][tact]['tracks'][track].getNotes()[note])
                }
            }
        }
        const sounds = notes.map((notesArray: Note[]) => notesArray.map((note: Note) => {
            return { [Math.floor(note['horizontalPosition'])]: new Audio(require(`./../../piano/${formatNoteForPlay(note['sound'])}.mp3`)) }
        }))
        return sounds
    }

    const checkIfSoundAreLoaded = (sounds: { [key: number]: HTMLAudioElement }[][]): boolean => {
        let canPlay: boolean[] = []
        for (let i = 0; i < sounds.length; i++) {
            for (let j = 0; j < sounds[i].length; j++) {
                const currentSounds = Object.values(sounds[i][j])
                for (let k = 0; k < currentSounds.length; k++) {
                    if (currentSounds[k].readyState === 4) {
                        canPlay.push(true)
                    } else {
                        canPlay.push(false)
                    }
                }
            }
        }
        const result: boolean = canPlay.length ? canPlay.reduce((a: boolean, b: boolean) => a && b) : false
        if (result) {
            startPlaying()
        }
        return result
    }

    const playSong = (sounds: { [key: number]: HTMLAudioElement }[][], position: number, iterratorNote: number) => {
        for (let i = 0; i < sounds[position].length; i++) {
            if (sounds[position][i][iterratorNote] !== undefined) {
                sounds[position][i][iterratorNote].play()
            }
        }
    }

    const startPlaying = () => {
        (incrementNotes.current as any) = setInterval(countNotes, 3600 / song['tacts'][position].getTempo());
        highlightTact(0)
        clearInterval((songIsReady as any))
        setIsPlaying(true)
    }

    const stopPlaying = () => {
        clearInterval((incrementNotes.current as any))
        clearActiveTacts()
        setIsPlaying(false)
    }

    const saveToFile = async () => {
        clearHoverObjects()
        stopPlaying()

        const doc: jsPDF = new jsPDF('portrait', 'mm', 'a4')
        
        const width = doc.internal.pageSize.getWidth();
        const height = doc.internal.pageSize.getHeight();
        
        const pages = Array.from(document.getElementsByClassName('editor-drawer-page'))

        for (let i = 0; i < pages.length; i++) {
            const canvas: HTMLCanvasElement = await html2canvas(pages[i] as HTMLElement, {
                windowHeight: 3508,
                windowWidth: 2480,
                scale: 3
            })
            const imgData: any = canvas.toDataURL('image/png')

            if (i > 0) doc.addPage()

            doc.addImage(imgData, 'PNG', 0, 0, width, height)
        }

        doc.save('notes.pdf')

    }

    useEffect(() => {
        if (isPlaying) {
            setIsEditing(false);
            setInstrument({} as IInstrument);

            songSounds = loadSong(song);
            (songIsReady as any) = setInterval(() => checkIfSoundAreLoaded(songSounds), 100);

        } else {
            stopPlaying();
        }
    }, [isPlaying])

    useEffect(() => {
        if (isEditing) {
            stopPlaying()
        }
    }, [isEditing])

    return (
        <div className='editor'>
            <button onClick={() => saveToFile()}>Save</button>
            <button onClick={() => setIsPlaying(!isPlaying)} >Play/Stop</button>
            <h3 >{isPlaying ? 'playing' : 'stoped'}</h3>
            <EditorInstruments isEditing={isEditing} setIsEditing={setIsEditing} instrument={instrument} setInstrument={setInstrument} />
            <EditorHandler song={song} isEditing={isEditing} setIsEditing={setIsEditing} instrument={instrument} setInstrument={setInstrument} />
        </div>
    )
}

export default Editor;