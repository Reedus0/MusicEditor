import React, { FC, useEffect, useRef, useState } from 'react'
import { Note } from '../../models/Note'
import { Song } from '../../models/Song'
import { IInstrument } from '../../models/instruments/interfaces/IInsrument'
import { highlightTact, formatNoteForPlay, clearActiveTacts } from '../../utils'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useStore } from 'react-redux'

interface EditorPlayerProps {
    song: Song
}

const EditorPlayer: FC<EditorPlayerProps> = ({ song }) => {

    const { setIsEditing, setIsPlaying, setInstrument, setPosition } = useActions()
    const { isEditing, isPlaying, position, notesCounter } = useTypedSelector(state => state.editor)

    const [currentPosition, setCurrentPosition] = useState<number>(0);
    const [currentNotesCounter, setCurrentNotesCounter] = useState<number>(0);

    let songIsReady = useRef(null)
    let incrementNotes = useRef(null)

    let songSounds: { [key: number]: HTMLAudioElement }[][] = []

    const countNotes = () => {
        let timeSignature = Number(song['timeSignature'][0])
        setCurrentNotesCounter((currentNotesCounter: number) => {
            setCurrentPosition((currentPosition: number) => {
                timeSignature = Number(song['tacts'][currentPosition]['tracks'][0].getTimeSignature()[0])
                highlightTact(currentPosition)
                playSong(songSounds, currentPosition, currentNotesCounter)
                if (currentNotesCounter >= timeSignature * 16) {
                    return currentPosition + 1
                }
                return currentPosition

            })
            if (currentPosition >= song['tacts'].length) {
                stopPlaying()
                return 0
            }
            if (currentNotesCounter >= timeSignature * 16) {
                return 0
            }

            return currentNotesCounter + Number(song['tacts'][currentPosition].getDuration())
        })
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
                sounds[position][i][iterratorNote].currentTime = 0
                sounds[position][i][iterratorNote].pause()
                sounds[position][i][iterratorNote].play()
            }
        }
    }

    const startPlaying = () => {
        (incrementNotes.current as any) = setInterval(countNotes, 3600 / song['tacts'][position].getTempo());
        setCurrentPosition(position)
        setCurrentNotesCounter(notesCounter)
        highlightTact(position)
        clearInterval((songIsReady as any))
        setIsPlaying(true)
    }

    const stopPlaying = () => {
        clearInterval((incrementNotes.current as any))
        setIsPlaying(false)
    }

    useEffect(() => {
        if (isPlaying) {
            setIsEditing(false);
            setInstrument({} as IInstrument);

            songSounds = loadSong(song);
            (songIsReady as any) = setInterval(() => checkIfSoundAreLoaded(songSounds), 100);

        } else {
            clearActiveTacts()
            stopPlaying();
        }
    }, [isPlaying])

    useEffect(() => {
        if (isEditing) {
            stopPlaying()
        }
    }, [isEditing])


    return (
        <></>
    )
}

export default EditorPlayer;