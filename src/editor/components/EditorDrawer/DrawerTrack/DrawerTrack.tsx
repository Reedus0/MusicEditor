import React, { FC } from 'react'
import DrawerTrackStart from '../DrawerTrackStart/DrawerTrackStart'
import { Rest } from '../../../models/Rest';
import DrawerRest from '../DrawerRest/DrawerRest';
import { getNotesLine } from '../../../utils';
import { Track } from '../../../models/Track';
import { Note } from '../../../models/Note';
import DrawerNote from '../DrawerNote/DrawerNote';
import { Song } from '../../../models/Song';
import { Tact } from '../../../models/Tact';

import './DrawerTrack.scss'

interface DrawerTrackProps {
    song: Song,
    tact: Tact,
    track: Track,
    tactCounter: number,
    tactIndex: number,
    trackIndex: number,
}

const DrawerTrack: FC<DrawerTrackProps> = ({ song, tact, track, tactCounter, tactIndex, trackIndex }) => {
    return (
        <div className='editor-drawer-track__wrapper' id={'track-wrapper-' + (trackIndex)}>
            <DrawerTrackStart song={song} tact={tact} track={track} tactCounter={tactCounter} tactIndex={tactIndex} trackIndex={trackIndex} />
            <div className={['editor-drawer-track', '_track' + ((tactIndex + 1) * (trackIndex + 1) * (10 ** (trackIndex + 1)))].join(' ')} id={'track-' + trackIndex}>
                <div className={['editor-drawer-track__lines', trackIndex === 0 ? '_top' : ''].join(' ')}>
                    {[...Array(5)].map(() => <div className='editor-drawer-track__line'></div>)}
                </div>
                <div className='editor-drawer-track__objects'>
                    <div className='editor-drawer-track__notes'>
                        {getNotesLine(track['notes']).map((line: number) =>
                            <div className='editor-drawer-track__notes-line'>
                                {track['notes'].filter((note: Note) => note['horizontalPosition'] === line).sort((a: Note, b: Note) => a['verticalPosition'] > b['verticalPosition'] ? 1 : -1).map((note: Note, noteIndex: number) =>
                                    <DrawerNote song={song} note={note} track={track} tactIndex={tactIndex} trackIndex={trackIndex} />
                                )}
                            </div>)}
                    </div>
                    <div className='editor-drawer-track__rests'>
                        {track['rests'].map((rest: Rest) =>
                            <DrawerRest song={song} rest={rest} tactIndex={tactIndex} trackIndex={trackIndex} />
                        )}
                    </div>
                </div>
                <div className='editor-drawer-track__fake' id={'tact-fake-' + trackIndex}></div>
                {tactIndex === song['tacts'].length - 1 ?
                    <div className='editor-drawer-track__end'>
                        <div className='editor-drawer-track__end-end'></div>
                    </div> :
                    <></>}
            </div>
        </div>
    )
}

export default DrawerTrack;