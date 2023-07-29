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
        <div className='editor-drawer__track-wrapper' id={'track-wrapper-' + (trackIndex)}>
            <DrawerTrackStart song={song} tact={tact} track={track} tactCounter={tactCounter} tactIndex={tactIndex} trackIndex={trackIndex} />
            <div className={['editor-drawer__track', '_track' + ((tactIndex + 1) * (trackIndex + 1) * (10 ** (trackIndex + 1)))].join(' ')} id={'track-' + trackIndex}>
                <div className='editor-drawer__lines'>
                    {[...Array(5)].map(() => <div className='editor-drawer__line'></div>)}
                </div>
                <div className='editor-drawer__notes'>
                    {getNotesLine(track['notes']).map((line: number) =>
                        <div className='editor-drawer__notes-line'>
                            {track['notes'].filter((note: Note) => note['horizontalPosition'] === line).sort((a: Note, b: Note) => a['verticalPosition'] > b['verticalPosition'] ? 1 : -1).map((note: Note, noteIndex: number) =>
                                <DrawerNote song={song} note={note} track={track} tactIndex={tactIndex} trackIndex={trackIndex} />
                            )}
                        </div>)}
                    <div className='editor-drawer__rests'>
                        {track['rests'].map((rest: Rest) =>
                            <DrawerRest rest={rest} tactIndex={tactIndex} trackIndex={trackIndex} />
                        )}
                    </div>
                </div>
                <div className='editor-drawer__track-fake' id={'tact-fake-' + trackIndex}></div>
                {tactIndex === song['tacts'].length - 1 ?
                    <div className='editor-drawer__end'>
                        <div className='editor-drawer__end-end'></div>
                    </div> :
                    <></>}
            </div>
        </div>
    )
}

export default DrawerTrack;