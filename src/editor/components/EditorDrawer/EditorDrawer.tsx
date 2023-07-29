import React, { FC, memo, useEffect, useReducer } from 'react'
import { Song } from '../../models/Song';

import './EditorDrawer.scss'
import { Tact } from '../../models/Tact';
import { Note, noteHalf } from '../../models/Note';
import { Track } from '../../models/Track';
import { clefs, getNotesLine } from '../../utils';
import { keysHalfsMap, keysHalfsPositionMap } from '../../utils/keys';
import { Rest } from '../../models/Rest';
import DrawerTrack from './DrawerTrack/DrawerTrack';

interface EditorDrawerProps {
    song: Song,
    ignored: number
}

const EditorDrawer: FC<EditorDrawerProps> = ({ song, ignored }) => {
    let tactCounter: number = 0

    console.log('Render!')

    return (
        <div className='editor-drawer' id='#editor-drawer'>
            <div className='editor-drawer__inner'>
                {song['tacts'].map((tact: Tact, tactIndex: number) =>
                    <div className={['editor-drawer-tact', tactCounter === 0 ? '_wrapper' : ''].join(' ')} style={{ flexBasis: tact.getWidth() + '%', flexGrow: 1 }} id={'tact-' + (tactIndex)}>
                        <noscript>{tactCounter + tact.getWidth() >= 100 ? tactCounter = tact.getWidth() : tactCounter += tact.getWidth()}</noscript>
                        {tactCounter === tact.getWidth() || tactIndex === 0 ? <div className='editor-drawer__bracket'>
                            {tactIndex === 0 ? <h3 className='editor-drawer__bracket-instrument'>Piano</h3> : <></>}
                            <img className='editor-drawer__bracket-img' src={require('./../../img/bracket.png')} />
                        </div> : <></>}
                        <div className='editor-drawer-tact__tracks' id={'track-tracks-' + (tactIndex)}>
                            {tact['tracks'].map((track: Track, trackIndex: number) =>
                                <DrawerTrack song={song} tact={tact} track={track} tactCounter={tactCounter} tactIndex={tactIndex} trackIndex={trackIndex} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default memo(EditorDrawer);