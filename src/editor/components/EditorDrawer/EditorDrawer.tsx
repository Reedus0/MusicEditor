import React, { FC, useEffect, useReducer } from 'react'
import { Song } from '../../models/Song';

import './EditorDrawer.scss'
import { Tact } from '../../models/Tact';
import { Note, noteHalf } from '../../models/Note';
import { getOffset } from '../../../utils';
import { Track } from '../../models/Track';

interface EditorDrawerProps {
    song: Song,
    isAdding: boolean,
    isDeleting: boolean,
}

const EditorDrawer: FC<EditorDrawerProps> = ({ song, isAdding, isDeleting }) => {

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const globalOffset = 1.5

    document.onmousemove = (e: any) => {
        if (!isAdding) return
        const cursorX = e.clientX;
        const cursorY = e.clientY + window.scrollY;

        const currentTactFake = document.elementFromPoint(cursorX, cursorY - window.scrollY)
        console.log(cursorX, cursorY)

        if (currentTactFake?.classList.contains('editor__note')) return
        if (currentTactFake?.classList.contains('editor__track-fake')) {


            const { elementX, elementY } = getOffset(currentTactFake)

            const tactOffsetX = cursorX - elementX
            const tactOffsetY = cursorY - elementY

            
            const cordsX = (Math.floor(tactOffsetX / (window.innerWidth * 0.25 / 4))) * window.innerWidth * 0.25 / 4
            const cordsY = (60 - (Math.floor(tactOffsetY / 6)) * 6) + 60

            const currentTact = currentTactFake.id[currentTactFake.id.length - 1]
            Array.from(document.getElementsByClassName('editor__track-fake')).forEach((element: any) => element.innerHTML = '')

            currentTactFake.innerHTML = `<div class="editor__note-edit " id="editing-note-${currentTact}" style="bottom: ${cordsY}px; left: ${cordsX}px;"></div>`

            const editingNote: any = document.getElementById(`editing-note-${currentTact}`)

            if (cordsY <= 18) {
                if (cordsY % 12 === 0) {
                    editingNote.innerHTML = `<div class='editor__note-line-up-edit'></div>`
                } else {
                    editingNote.innerHTML = `<div class='editor__note-line-edit'></div>`
                }
            } else if (cordsY >= 90) {
                if (cordsY % 12 === 0) {
                    editingNote.innerHTML = `<div class='editor__note-line-down-edit'></div>`
                } else {
                    editingNote.innerHTML = `<div class='editor__note-line-edit'></div>`
                }
            }
        }
    }

    document.onclick = (e: any) => {
        if (e.target.classList.contains('editor__note')) {
            if (!isDeleting) return

            const editingNote = e.target
            const tactElement = e.target.closest('.editor__tact')
            const trackElement = e.target.closest('.editor__track')

            const currentTactNumber = tactElement.id[tactElement.id.length - 1]
            const currentTrackNumber = trackElement.id[trackElement.id.length - 1]

            const noteBottom: number = (editingNote?.style['bottom'].split('px')[0] as any) || 0
            const noteLeft: number = (editingNote?.style['left'].split('px')[0] as any) || 0

            const cordsX = noteLeft * 64 / 0.25 / window.innerWidth
            const cordsY = noteBottom / 12

            const currentTrack = song['tacts'][currentTactNumber]['tracks'][currentTrackNumber]
            currentTrack.deleteNote(cordsX, cordsY)
            forceUpdate()
            return
        }
        if (e.target.closest('.editor__track-notes') !== undefined) {
            if (!isAdding) return

            const tactElement = e.target.closest('.editor__tact')
            const trackElement = e.target.closest('.editor__track')

            const currentTactNumber = tactElement.id[tactElement.id.length - 1]
            const currentTrackNumber = trackElement.id[trackElement.id.length - 1]

            const editingNote = document.getElementById('editing-note-' + currentTrackNumber)

            const noteBottom: number = (editingNote?.style['bottom'].split('px')[0] as any) || 0
            const noteLeft: number = (editingNote?.style['left'].split('px')[0] as any) || 0

            const clefOffset = song['tacts'][currentTactNumber]['tracks'][currentTrackNumber]['clef']

            const noteVerticalPosition = ((noteBottom / 12) - clefOffset) % 3.5
            const noteOctave = 5 + Math.floor(((noteBottom / 12) - globalOffset - clefOffset) / 3.5)

            console.log(window.innerWidth * 0.25 / 64)

            const cordsX = noteLeft * 64 / 0.25 / window.innerWidth
            const cordsY = noteBottom / 12

            song['tacts'][currentTactNumber]['tracks'][currentTrackNumber].addNote(
                new Note(
                    cordsX,
                    cordsY,
                    4,
                    ((song['key'] as any)[noteVerticalPosition >= 0 ? noteVerticalPosition : 3.5 + noteVerticalPosition] + noteOctave.toString()),
                    noteHalf.NONE
                )
            )
            forceUpdate()
            return
        }
    }

    useEffect(() => {
        if (!isAdding || isDeleting) {
            Array.from(document.getElementsByClassName('editor__track-fake')).forEach((element: any) => element.innerHTML = '')
        }
    }, [isAdding, isDeleting])



    return (
        <div className='editor'>
            <div className='editor__inner'>
                {song['tacts'].map((tact: Tact, tactIndex: number) =>
                    <div className='editor__tact' id={'tact-' + tactIndex}>
                        {tact['tracks'].map((track: Track, trackIndex: number) =>
                            <div className='editor__track' id={'track-' + trackIndex}>
                                <div className='editor__lines'>
                                    {[...Array(5)].map(() => <div className='editor__line'></div>)}
                                </div>
                                {track['notes'].map((note: Note) => <div className={['editor__note', note['half'] !== noteHalf.NONE ? '_half' : ''].join(' ')} style={{ bottom: (note['verticalPosition'] * 12), left: (window.innerWidth * 0.25 * note['horizontalPosition'] / 64) }}>
                                    {note['verticalPosition'] < 2 ? !Number.isInteger(note['verticalPosition']) ? <div className='editor__note-line'></div> : <div className='editor__note-line-up'></div> : ''}
                                    {note['verticalPosition'] > 7 ? !Number.isInteger(note['verticalPosition']) ? <div className='editor__note-line'></div> : <div className='editor__note-line-down'></div> : ''}
                                    {note['half'] === noteHalf.FLAT ? <div className='editor__note-flat'>b</div> : note['half'] === noteHalf.SHARP ? <div className='editor__note-sharp'>#</div> : ''}
                                </div>)}
                                <div className='editor__track-fake' id={'tact-fake-' + trackIndex}>
                                </div>
                            </div>
                        )}
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default EditorDrawer;