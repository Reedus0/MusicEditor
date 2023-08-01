import React, { FC } from 'react'
import { Song } from '../../../models/Song';
import { Note, noteHalf, noteStyles } from '../../../models/Note';
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
    const widthUnit: number = (document.querySelector('._track' + ((tactIndex + 1) * (trackIndex + 1) * (10 ** (trackIndex + 1))))!.clientWidth / (Number(song['tacts'][tactIndex]['tracks'][trackIndex].getTimeSignature()[0]) * 16))
    return (
        <div
            className={
                ['editor-drawer-note', 'editor-drawer-object',
                    note['half'] !== noteHalf.NONE ? '_half' : '',
                    track.getNote(note['horizontalPosition'], note['verticalPosition'] - 0.5) !== undefined
                        ||
                        track.getNote(note['horizontalPosition'], note['verticalPosition'] + 0.5) !== undefined ? '_margin' : ''].join(' ')}
            style={{
                bottom: note['verticalPosition'] * 12,
                left: widthUnit * note['horizontalPosition'] + 6
            }}
        >
            {noteStyles[note.getStyle()]}
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
                <div className='editor-drawer-note__flat editor-drawer-note__half' style={{ left: note.getHalfPosition() * -15 }}>b</div>
                :
                note['half'] === noteHalf.SHARP
                    ?
                    <div className='editor-drawer-note__sharp editor-drawer-note__half' style={{ left: note.getHalfPosition() * -15 }}>#</div>
                    :
                    note['half'] === noteHalf.NATURAL
                        ?
                        <div className='editor-drawer-note__natural editor-drawer-note__half' style={{ left: note.getHalfPosition() * -15 }}>é</div>
                        :
                        ''}
            {Object.keys(note.getUnionNote()).length && note['verticalPosition'] >= note.getUnionNote()['verticalPosition'] ?
                <div className="editor-drawer-note__union"
                style={{
                    left: note['horizontalPosition'] < note.getUnionNote()['horizontalPosition'] ? note['verticalPosition'] < 4.5 ? 15 : 0 : 'unset',
                    right: note['horizontalPosition'] > note.getUnionNote()['horizontalPosition'] ? note['verticalPosition'] >= 4.5 ? 15 : 0.4 : 'unset',
                    top: note['verticalPosition'] >= 4.5 ? note['verticalPosition'] >= 4.5 && note['verticalPosition'] < note.getUnionNote()['verticalPosition'] ? 48 - (Math.abs(note['verticalPosition'] - note.getUnionNote()['verticalPosition']) * 12): 48 : 'unset',
                    bottom: note['verticalPosition'] < 4.5 ? note['verticalPosition'] < 4.5 && note['verticalPosition'] > note.getUnionNote()['verticalPosition'] ? 48 - (Math.abs(note['verticalPosition'] - note.getUnionNote()['verticalPosition']) * 12) : 48 : 'unset',
                    width: (Math.abs(note['horizontalPosition'] - note.getUnionNote()['horizontalPosition'])) * widthUnit + 1,
                    height: Math.abs(note['verticalPosition'] - note.getUnionNote()['verticalPosition']) === 0 ? 5 : (Math.abs(note['verticalPosition'] - note.getUnionNote()['verticalPosition'])) * 12 + 1,
                    clipPath: note['verticalPosition'] >= 4.5 && (note['verticalPosition'] > note.getUnionNote()['verticalPosition'] && note['horizontalPosition'] < note.getUnionNote()['horizontalPosition'])
                    ||
                    note['verticalPosition'] < 4.5 && (note['verticalPosition'] > note.getUnionNote()['verticalPosition'] && note['horizontalPosition'] < note.getUnionNote()['horizontalPosition'])
                    ? 
                    `
                    polygon(
                    0% calc(0% + 5px),
                    0% 0%,
                    100% calc(100% - 5px),
                    100% 100%
                    )`
                    :
                    `
                    polygon(
                    100% calc(0% + 5px),
                    100% 0%,
                    0% calc(100% - 5px),
                    0% 100%
                    )`

                }}
                >
                </div>
                : <></>}
        </div>)
}

export default DrawerNote;