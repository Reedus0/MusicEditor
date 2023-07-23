import React, { FC, useEffect, useReducer } from 'react'
import { Song } from '../../models/Song';

import './EditorDrawer.scss'
import { Tact } from '../../models/Tact';
import { Note, noteHalf } from '../../models/Note';
import { getOffset } from '../../../utils';

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
        const cursorY = e.clientY;

        const target = document.elementFromPoint(cursorX, cursorY)

        if (target?.classList.contains('editor-lines__note')) return
        if (target?.classList.contains('editor-lines__tact-fake')) {


            const { elementX, elementY } = getOffset(target)

            const noteOffsetX = cursorX - elementX
            const noteOffsetY = cursorY - elementY

            const cordsX = (Math.floor(noteOffsetX / 90)) * 90
            const cordsY = (60 - (Math.floor(noteOffsetY / 6)) * 6) + 54

            const currentTact = target.id[target.id.length - 1]
            Array.from(document.getElementsByClassName('editor-lines__tact-fake')).forEach((element: any) => element.innerHTML = '')

            target.innerHTML = `<div class="editor-lines__note-edit " id="editing-note-${currentTact}" style="bottom: ${cordsY}px; left: ${cordsX}px;"></div>`

            const editingNote: any = document.getElementById(`editing-note-${currentTact}`)

            if (cordsY <= 18) {
                if (cordsY % 12 === 0) {
                    editingNote.innerHTML = `<div class='editor-lines__note-line-up-edit'></div>`
                } else {
                    editingNote.innerHTML = `<div class='editor-lines__note-line-edit'></div>`
                }
            } else if (cordsY >= 90) {
                if (cordsY % 12 === 0) {
                    editingNote.innerHTML = `<div class='editor-lines__note-line-down-edit'></div>`
                } else {
                    editingNote.innerHTML = `<div class='editor-lines__note-line-edit'></div>`
                }
            }
            // cordsY <= 18 ? cordsY % 12 === 0 ?
            //     `<div class="editor-lines__note-edit " id="editing-note-${currentTact}" style="bottom: ${cordsY}px; left: ${cordsX}px;"><div class='editor-lines__note-line-up-edit'></div>`
            //     : `<div class="editor-lines__note-edit " id="editing-note-${currentTact}" style="bottom: ${cordsY}px; left: ${cordsX}px;"><div class='editor-lines__note-line-edit'></div></div>`
            //     : `<div class="editor-lines__note-edit " id="editing-note-${currentTact}" style="bottom: ${cordsY}px; left: ${cordsX}px;"></div>`
        }
    }

    document.onclick = (e: any) => {
        if (e.target.classList.contains('editor-lines__note')) {
            if (!isDeleting) return

            const editingNote = e.target
            const tactNotes = e.target.closest('.editor-lines__tact')


            const noteBottom: number = (editingNote?.style['bottom'].split('px')[0] as any) || 0
            const noteLeft: number = (editingNote?.style['left'].split('px')[0] as any) || 0

            song['tacts'][tactNotes.id[tactNotes.id.length - 1]]['notes'] = song['tacts'][tactNotes.id[tactNotes.id.length - 1]]['notes'].filter((note: Note) => !(note['verticalPosition'] === noteBottom / 12 && note['horizontalPosition'] === noteLeft / 5.625))
            forceUpdate()
            return
        }
        if (e.target.closest('.editor-lines__tact-notes') !== undefined) {
            if (!isAdding) return
            const tactNotes = e.target.closest('.editor-lines__tact')
            const editingNote = document.getElementById('editing-note-' + tactNotes.id[tactNotes.id.length - 1])

            const noteBottom: number = (editingNote?.style['bottom'].split('px')[0] as any) || 0
            const noteLeft: number = (editingNote?.style['left'].split('px')[0] as any) || 0

            const currentTact = tactNotes.id[tactNotes.id.length - 1]

            song['tacts'][currentTact]['notes'].push(
                new Note(
                    noteLeft / 5.625,
                    noteBottom / 12,
                    4,
                    ((song['key'] as any)[(noteBottom / 12) % 3.5] + (5 + Math.floor(((noteBottom / 12) - globalOffset) / 3.5)).toString()),
                    noteHalf.NONE)
            )
            forceUpdate()
            return
        }
    }

    useEffect(() => {
        if (!isAdding || isDeleting) {
            Array.from(document.getElementsByClassName('editor-lines__tact-fake')).forEach((element: any) => element.innerHTML = '')
        }
    }, [isAdding, isDeleting])



    return (
        <div>
            <div className='editor-lines'>
                {song['tacts'].map((tact: Tact, index: number) =>
                    <div className='editor-lines__tact' id={'tact-' + index}>
                        <div className='editor-lines__lines'>
                            {[...Array(5)].map((element: undefined, index: number) => <div className='editor-lines__line'></div>)}
                        </div>
                        {tact['notes'].map((note: Note) => <div className={['editor-lines__note', note['half'] !== noteHalf.NONE ? '_half' : ''].join(' ')} style={{ bottom: (note['verticalPosition'] * 12), left: (5.625 * note['horizontalPosition']) }}>
                            {note['verticalPosition'] < 2 ? !Number.isInteger(note['verticalPosition']) ? <div className='editor-lines__note-line'></div> : <div className='editor-lines__note-line-up'></div> : ''}
                            {note['verticalPosition'] > 7 ? !Number.isInteger(note['verticalPosition']) ? <div className='editor-lines__note-line'></div> : <div className='editor-lines__note-line-down'></div> : ''}
                            {note['half'] === noteHalf.FLAT ? <div className='editor-lines__note-flat'>b</div> : note['half'] === noteHalf.SHARP ? <div className='editor-lines__note-sharp'>#</div> : ''}
                        </div>)}
                        <div className='editor-lines__tact-fake' id={'tact-fake-' + index}>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default EditorDrawer;