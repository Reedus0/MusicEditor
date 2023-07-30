import React, { FC, memo } from 'react'
import { Song } from '../../models/Song';
import DrawerTact from './DrawerTact/DrawerTact';
import { Tact } from '../../models/Tact';

import './EditorDrawer.scss'

interface EditorDrawerProps {
    song: Song,
    ignored: number
}

const EditorDrawer: FC<EditorDrawerProps> = ({ song, ignored }) => {
    let tactCounter: number = 0
    let pageCounter: number = 0

    const pageThreshold: number = 576

    console.log('Render!')

    return (
        <div className='editor-drawer' id='#editor-drawer'>
            <div className='editor-drawer__inner'>
                {song['tacts'].map((tact: Tact, tactIndex: number) =>
                    <>
                        <noscript>{pageCounter += tact.getWidth()}</noscript>
                        <noscript>{tactCounter + tact.getWidth() > 96 ? tactCounter = tact.getWidth() : tactCounter += tact.getWidth()}</noscript>
                        <DrawerTact song={song} tact={tact} tactCounter={tactCounter} tactIndex={tactIndex} />
                    </>
                )}
            </div>
        </div >
    )
}

export default memo(EditorDrawer);