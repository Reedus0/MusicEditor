import React, { FC, useEffect, useReducer } from 'react'
import { Song } from '../../models/Song'
import EditorDrawer from '../EditorDrawer/EditorDrawer'
import { clearHoverObjects } from '../../utils'
import { IInstrument } from '../../models/instruments/interfaces/IInsrument'
import { adderInstruments, generalInstruments, holdInstruments, hovererInstruments, notesInstruments, restsInstruments, tactsInstruments } from '../../models/instruments'

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
        if (isMoving && !isEditing) {
            const drawerElement: HTMLElement = document.querySelector('.editor-drawer')!
            const currentX = Number(window.getComputedStyle(drawerElement).left.split('px')[0]);
            const currentY = Number(window.getComputedStyle(drawerElement).top.split('px')[0]);
            const moveCoefficient: number = 0.7;
            drawerElement.style.left = currentX + ((e.screenX - firstCordsX) * moveCoefficient) + 'px';
            drawerElement.style.top = currentY + ((e.screenY - firstCordsY) * moveCoefficient) + 'px';
            firstCordsX = e.screenX
            firstCordsY = e.screenY
        }
        if (!isEditing) return
        if (hovererInstruments.includes(instrument.name)) {
            const hoverer = (instrument as any).hoverer
            hoverer.action(e, song)
        }
    }

    document.onmousedown = (e: any) => {
        firstCordsX = e.screenX
        firstCordsY = e.screenY
        isMoving = true
        if (!isEditing) return
        if(e.which !== 1) return
        if (holdInstruments.includes(instrument.name)) {
            (instrument as any).onHoldAction(e.target, song)
            forceUpdate()
            setTimeout(forceUpdate, 0)
        }
    }

    document.onmouseup = (e: any) => {
        firstCordsX = 0
        firstCordsY = 0
        isMoving = false
        if (!isEditing) return
        if(e.which !== 1) return
        if (holdInstruments.includes(instrument.name)) {
            (instrument as any).onRealeseAction(e.target, song)
            forceUpdate()
            setTimeout(forceUpdate, 0)
        }
    }

    document.onwheel = (e: any) => {
        const drawerElement: HTMLElement = document.querySelector('.editor-drawer')!
        const matrix = new WebKitCSSMatrix((window.getComputedStyle(drawerElement)).transform)
        let editorCurrentScale = matrix['a']
        if (e.deltaY < 0 && editorCurrentScale < 3.2) {
            editorCurrentScale += 0.2
        } else if (e.deltaY > 0 && editorCurrentScale > 0.2) {
            editorCurrentScale -= 0.2
        }
        drawerElement.style.transform = `scale(${editorCurrentScale})`
    }

    document.onclick = (e: any) => {
        if (e.target.classList.contains('editor-drawer-object')) {
            if (!isEditing) return
            let currentObjectInstruments: string[] = [...generalInstruments]
            if (e.target.classList.contains('editor-drawer-note')) currentObjectInstruments.push(...notesInstruments)
            if (e.target.classList.contains('editor-drawer-rest')) currentObjectInstruments.push(...restsInstruments)
            if (currentObjectInstruments.includes(instrument.name)) {
                instrument.action(e.target, song)
                forceUpdate()
                setTimeout(forceUpdate, 0)
            }
        }

        if (e.target.closest('.editor-drawer-track__objects') !== undefined) {
            if (!isEditing) return
            if (adderInstruments.includes(instrument.name)) {
                instrument.action(e.target, song)
                forceUpdate()
                setTimeout(forceUpdate, 0)
            }
        }

        if (e.target.closest('.editor-drawer-tact') !== undefined) {
            if (!isEditing) return
            if (tactsInstruments.includes(instrument.name)) {
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