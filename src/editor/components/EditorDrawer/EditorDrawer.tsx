import React, { FC, useEffect, useReducer } from 'react'
import { Song } from '../../models/Song';

import './EditorDrawer.scss'
import { Tact } from '../../models/Tact';
import { Note, noteHalf } from '../../models/Note';
import { getOffset } from '../../../utils';
import { Track } from '../../models/Track';
import { IInstrument } from '../../models/editor/IInsrument';
import { NotesHoverer } from '../../models/editor/NotesHoverer';

interface EditorDrawerProps {
    song: Song,
    isEditing: boolean,
    setIsEditing: Function,
    instrument: IInstrument,
    setInstrument: Function
}

const EditorDrawer: FC<EditorDrawerProps> = ({ song, isEditing, instrument, setIsEditing, setInstrument }) => {

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const globalOffset = 1.5

    document.onmousemove = (e: any) => {
        if (!isEditing) return
        if (!(instrument.name === 'notesAdder')) return

        const notesHoverer = new NotesHoverer()
        notesHoverer.action(e)
    }

    document.onclick = (e: any) => {
        if (e.target.classList.contains('editor__note')) {
            if (!isEditing) return
            if (instrument.name === 'notesFlatter') {
                instrument.action(e.target, song)
                forceUpdate()
            }
        }

        if (e.target.classList.contains('editor__note')) {
            if (!isEditing) return
            if (instrument.name === 'notesSharper') {
                instrument.action(e.target, song)
                forceUpdate()
            }
        }

        if (e.target.classList.contains('editor__note')) {
            if (!isEditing) return
            if (instrument.name === 'notesCanceler') {
                instrument.action(e.target, song)
                forceUpdate()
            }
        }

        if (e.target.classList.contains('editor__note')) {
            if (!isEditing) return
            if (instrument.name === 'notesNaturaler') {
                instrument.action(e.target, song)
                forceUpdate()
            }
        }

        if (e.target.classList.contains('editor__note')) {
            if (!isEditing) return
            if (instrument.name === 'notesDeleter') {
                instrument.action(e.target, song)
                forceUpdate()
            }
        }

        if (e.target.closest('.editor__track-notes') !== undefined) {
            if (!isEditing) return
            if (!(instrument.name === 'notesAdder')) return

            instrument.action(e.target, song)
            forceUpdate()
        }
    }

    document.oncontextmenu = (e: any) => {
        e.preventDefault()
        setIsEditing(false)
        setInstrument({} as IInstrument)
    }

    window.onresize = () => {
        forceUpdate()
    }

    useEffect(() => {
        Array.from(document.getElementsByClassName('editor__track-fake')).forEach((element: any) => element.innerHTML = '')
    }, [isEditing, instrument])


    //♮
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
                                {track['notes'].map((note: Note) => <div className={['editor__note', note['half'] !== noteHalf.NONE ? '_half' : ''].join(' ')} style={{ bottom: (note['verticalPosition'] * 12), left: (document.body.scrollWidth * 0.20 * note['horizontalPosition'] / 64) }}>
                                    {note['verticalPosition'] < 2 ? !Number.isInteger(note['verticalPosition']) ? <div className='editor__note-line'></div> : <div className='editor__note-line-up'></div> : ''}
                                    {note['verticalPosition'] > 7 ? !Number.isInteger(note['verticalPosition']) ? <div className='editor__note-line'></div> : <div className='editor__note-line-down'></div> : ''}
                                    {note['half'] === noteHalf.FLAT
                                        ?
                                        <div className='editor__note-flat'>b</div>
                                        :
                                        note['half'] === noteHalf.SHARP
                                            ?
                                            <div className='editor__note-sharp'>#</div>
                                            :
                                            note['half'] === noteHalf.NATURAL
                                                ?
                                                <div className='editor__note-natural'>♮</div>
                                                :
                                                ''}
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