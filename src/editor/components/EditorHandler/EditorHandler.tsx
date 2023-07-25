import React, { FC, useEffect, useMemo, useReducer } from 'react'
import { IInstrument } from '../../models/editor/IInsrument'
import { NotesHoverer } from '../../models/editor/NotesHoverer'
import { Song } from '../../models/Song'
import EditorDrawer from '../EditorDrawer/EditorDrawer'
import { clearHoverNote } from '../../utils'
import { NotesAdder } from '../../models/editor/NotesAdder'

interface EditorHandlerProps {
    song: Song,
    isEditing: boolean,
    setIsEditing: Function,
    instrument: IInstrument,
    setInstrument: Function
}

const EditorHandler: FC<EditorHandlerProps> = ({ song, isEditing, instrument, setIsEditing, setInstrument }) => {

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    window.onresize = () => {
        forceUpdate()
    }


    document.onmousemove = (e: any) => {
        if (!isEditing) return
        if (!(instrument.name === 'notesAdder')) return

        const notesHoverer = new NotesHoverer()
        notesHoverer.action(e, (instrument as NotesAdder)['step'])
    }

    document.onclick = (e: any) => {
        if (e.target.classList.contains('editor-drawer__note')) {
            if (!isEditing) return
            if (instrument.name === 'notesAdder') return
            instrument.action(e.target, song)
            forceUpdate()
        }


        if (e.target.closest('.editor-drawer__track-notes') !== undefined) {
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

    useEffect(() => {
        clearHoverNote()
    }, [isEditing, instrument])


    return (
        <EditorDrawer song={song} ignored={ignored} />
    )
}

export default EditorHandler;