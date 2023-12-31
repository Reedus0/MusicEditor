import React, { FC, useEffect } from 'react'
import DrawerTrack from '../DrawerTrack/DrawerTrack';
import { Song } from '../../../models/Song';
import { Tact } from '../../../models/Tact';
import { Track } from '../../../models/Track';

import './DrawerTact.scss'

interface DrawerTactProps {
    song: Song,
    tact: Tact,
    tactCounter: number,
    tactIndex: number,
}

const DrawerTact: FC<DrawerTactProps> = ({ song, tact, tactCounter, tactIndex }) => {
    return (
        <div className={['editor-drawer-tact', tactCounter === 0 ? '_wrapper' : ''].join(' ')} style={{ flexBasis: tact.getWidth() + '%', flexGrow: 1 }} id={'tact-' + (tactIndex)}>
            {tactCounter === tact.getWidth() || tactIndex === 0 ? <div className='editor-drawer-tact__bracket'>
                {tactIndex === 0 ? <h3 className='editor-drawer-tact__bracket-instrument'>Piano</h3> : <></>}
                <img className='editor-drawer-tact__bracket-img' src={require('./../../../img/bracket.png')} />
            </div> : <></>}
            <div className='editor-drawer-tact__tracks' id={'track-tracks-' + (tactIndex)}>
                {tactIndex === 0 || (song['tacts'][tactIndex - 1] !== undefined && song['tacts'][tactIndex - 1].getTempo() !== tact.getTempo()) ?
                    <div className={['editor-drawer-tact__tempo', tactCounter === tact.getWidth() ? '_first' : ''].join(' ')}>
                        <h4 className='editor-drawer-tact__tempo-note'>q</h4>
                        <h4 className='editor-drawer-tact__tempo-equal'>=</h4>
                        <h4 className='editor-drawer-tact__tempo-tempo'>{tact.getTempo()}</h4>
                    </div> : <></>}
                {tact['tracks'].map((track: Track, trackIndex: number) =>
                    <DrawerTrack song={song} tact={tact} track={track} tactCounter={tactCounter} tactIndex={tactIndex} trackIndex={trackIndex} />
                )}
            </div>
        </div >
    )
}

export default DrawerTact;