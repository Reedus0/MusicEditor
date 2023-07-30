import React, { FC } from 'react'
import { Song } from '../../../models/Song';
import { Note, noteHalf } from '../../../models/Note';
import { Track } from '../../../models/Track';

import "./DrawerNote.scss"

interface DrawerNoteProps {
    song: Song,
    note: Note,
    track: Track,
    tactIndex: number,
    trackIndex: number,
}

const DrawerNote: FC<DrawerNoteProps> = ({ song, note, track, tactIndex, trackIndex }) => {
    return (
        <div
            className={
                ['editor-drawer-note', 'editor-drawer-object',
                    note['half'] !== noteHalf.NONE ? '_half' : '',
                    track.getNote(note['horizontalPosition'], note['verticalPosition'] - 0.5) !== undefined
                        ||
                        track.getNote(note['horizontalPosition'], note['verticalPosition'] + 0.5) !== undefined ? '_margin' : ''].join(' ')}
            style={{
                bottom: (note['verticalPosition'] * 12),
                left: (document.querySelector('._track' + ((tactIndex + 1) * (trackIndex + 1) * (10 ** (trackIndex + 1))))!.clientWidth / (Number(song['tacts'][tactIndex]['tracks'][trackIndex].getTimeSignature()[0]) * 16) * note['horizontalPosition'] + 6)
            }}
        >
            {note['verticalPosition'] < 4.5 ? <h3 className='editor-drawer-note__symbol'>q</h3> : <h3 className='editor-drawer-note__symbol'>Q</h3>}
            {(note['verticalPosition'] < 2.5) && !Number.isInteger(note['verticalPosition']) ?
                <div className='editor-drawer-note__lines'>
                    {[...Array(Math.floor(Math.abs(2.5 - note['verticalPosition'])))].map((element: number, index: number) => <div className='editor-drawer-note__line' style={{ top: 12 * -(index + 1) + 17 }}></div>)}
                </div>
                : <></>}
            {(note['verticalPosition'] > 7) && !Number.isInteger(note['verticalPosition']) ?
                <div className='editor-drawer-note__lines'>
                    {[...Array(Math.floor(Math.abs(6 - note['verticalPosition'])))].map((element: number, index: number) => <div className='editor-drawer-note__line' style={{ top: 12 * (index + 1) - 7 }}></div>)}
                </div>
                : <></>}
            {note['verticalPosition'] < 1.5 && Number.isInteger(note['verticalPosition']) ?
                <div className='editor-drawer-note__lines'>
                    {[...Array(Math.floor(Math.abs(2.5 - note['verticalPosition'])))].map((element: number, index: number) => <div className='editor-drawer-note__line-up' style={{ top: 12 * -(index + 1) + 11 }}></div>)}
                </div>
                : ''}
            {note['verticalPosition'] > 7 && Number.isInteger(note['verticalPosition']) ?
                <div className='editor-drawer-note__lines'>
                    {[...Array(Math.floor(Math.abs(7 - note['verticalPosition'])))].map((element: number, index: number) => <div className='editor-drawer-note__line-down' style={{ top: 12 * (index + 1) - 1 }}></div>)}
                </div>
                : ''}
            {note['half'] === noteHalf.FLAT
                ?
                <div className='editor-drawer-note__flat editor-drawer-note__half'>b</div>
                :
                note['half'] === noteHalf.SHARP
                    ?
                    <div className='editor-drawer-note__sharp editor-drawer-note__half'>#</div>
                    :
                    note['half'] === noteHalf.NATURAL
                        ?
                        <div className='editor-drawer-note__natural editor-drawer-note__half'>é</div>
                        :
                        ''}
        </div>)
}

export default DrawerNote;