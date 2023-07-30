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

    let isMoving: boolean = false

    let firstCordsX: number = 0
    let firstCordsY: number = 0

    window.onresize = () => {
        forceUpdate()
    }


    document.onmousemove = (e: any) => {
        if (isMoving) {
            const drawerElement: HTMLElement = document.querySelector('.editor-drawer')!
            const currentX = Number(window.getComputedStyle(drawerElement).left.split('px')[0]);
            const currentY = Number(window.getComputedStyle(drawerElement).top.split('px')[0]);
            const moveCoefficient: number = 0.7;
            (document.querySelector('.editor-drawer')! as any).style.left = currentX + ((e.screenX - firstCordsX) * moveCoefficient) + 'px';
            (document.querySelector('.editor-drawer')! as any).style.top = currentY + ((e.screenY - firstCordsY) * moveCoefficient) + 'px';
            firstCordsX = e.screenX
            firstCordsY = e.screenY
        }
        if (!isEditing) return
        if (!(instrument.name.includes('Adder'))) return

        const hoverer = (instrument as IAdder).hoverer
        hoverer.action(e, (instrument as IAdder)['step'] * Number(song['timeSignature'][0]))
    }

    document.onmousedown = (e: any) => {
        firstCordsX = e.screenX
        firstCordsY = e.screenY
        isMoving = true
    }

    document.onmouseup = (e: any) => {
        firstCordsX = 0
        firstCordsY = 0
        isMoving = false
    }

    document.onwheel = (e: any) => {
        // TODO
        // const matrix = new WebKitCSSMatrix((window.getComputedStyle(document.querySelector('.editor-drawer')! as any)).transform)
        // let editorCurrentScale = matrix['a']
        // if (e.deltaY < 0 && editorCurrentScale < 3.2) {
        //     editorCurrentScale += 0.2
        // } else if (e.deltaY > 0 && editorCurrentScale > 0.2) {
        //     editorCurrentScale -= 0.2
        // }
        // (document.querySelector('.editor-drawer')! as any).style.transform = `scale(${editorCurrentScale})`
    }

    document.onclick = (e: any) => {
        if (e.target.classList.contains('editor-drawer-object')) {
            if (!isEditing) return
            if (!instrument.name.includes('Adder')) {
                instrument.action(e.target, song)
                forceUpdate()
                setTimeout(forceUpdate, 0)
            }
        }

        if (e.target.closest('.editor-drawer-track__notes') !== undefined) {
            if (!isEditing) return
            if ((instrument.name.includes('Adder'))) {
                instrument.action(e.target, song)
                forceUpdate()
                setTimeout(forceUpdate, 0)
            }
        }

        if (e.target.closest('.editor-drawer-tact') !== undefined) {
            if (!isEditing) return
            if (instrument.name.includes('tact')) {

                instrument.action(e.target.closest('.editor-drawer-tact'), song)
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