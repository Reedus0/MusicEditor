import React, { FC, useEffect, useReducer } from 'react'
import { IInstrument } from '../../models/editor/IInsrument'
import { Song } from '../../models/Song'
import EditorDrawer from '../EditorDrawer/EditorDrawer'
import { IAdder } from '../../models/editor/IAdder'
import { clearHoverObjects } from '../../utils'

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
        if (!(instrument.name.includes('Adder'))) return

        const hoverer = (instrument as IAdder).hoverer
        hoverer.action(e, (instrument as IAdder)['step'] * Number(song['timeSignature'][0]))
    }

    document.onclick = (e: any) => {
        if (e.target.classList.contains('editor-drawer__object')) {
            if (!isEditing) return
            if (!instrument.name.includes('Adder')) {
                instrument.action(e.target, song)
                forceUpdate()
                setTimeout(forceUpdate, 0)
            }
        }

        if (e.target.closest('.editor-drawer__track-notes') !== undefined) {
            if (!isEditing) return
            if ((instrument.name.includes('Adder'))) {
                instrument.action(e.target, song)
                forceUpdate()
                setTimeout(forceUpdate, 0)
            }
        }

        if (e.target.closest('.editor-drawer__tact') !== undefined) {
            if (!isEditing) return
            if (instrument.name.includes('tact')) {

                instrument.action(e.target.closest('.editor-drawer__tact'), song)
                forceUpdate()
                setTimeout(forceUpdate, 0)

            }
        }
    }

    document.oncontextmenu = (e: any) => {
        e.preventDefault()
        setIsEditing(false)
        setInstrument({} as IInstrument)
    }

    useEffect(() => {
        clearHoverObjects()
    }, [isEditing, instrument])


    return (
        <EditorDrawer song={song} ignored={ignored} />
    )
}

export default EditorHandler;