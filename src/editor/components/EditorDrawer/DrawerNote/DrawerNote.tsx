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
                bottom: (note['verticalPosition'] * 12),
                left: widthUnit * note['horizontalPosition'] + 6
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
            {Object.keys(note.getUnionNote()).length && note['horizontalPosition'] < note.getUnionNote()['horizontalPosition']?
                <div className="editor-drawer-note__union"
                style={{
                    left: note['verticalPosition'] < 4.5 ? 15 : 1,
                    top: note['verticalPosition'] <= 4.5 ? 44 : 'unset',
                    bottom: note['verticalPosition'] > 4.5 ? 44 : 'unset',
                    //width: Math.sqrt(Math.abs(note['horizontalPosition']  - note.getUnionNote()['horizontalPosition']) ** 2 + Math.abs(note['verticalPosition']  - note.getUnionNote()['verticalPosition']) ** 2)
                    width: Math.sqrt((Math.abs((note['verticalPosition'] - note.getUnionNote()['verticalPosition']) * 6) ** 2 ) + (Math.abs(note['horizontalPosition'] - note.getUnionNote()['horizontalPosition']) ** 2)) * widthUnit
                }}
                >
                </div>
                : <></>}
        </div>)
}

export default DrawerNote;


        // `
        // <div class="editor-drawer-note__union" 
        //     style="
        //         left: ${notesOrientation === 'top' ? 15 + 'px' : 0 + 'px'};
        //         top: ${notesOrientation === 'top' ? -42 + (shitExpression ? Math.abs(firstElementTop - secondElementTop) * (shitExpression ? -Math.round(rotateAngle) : Math.round(rotateAngle)) - (shitExpression ? -Math.abs(firstElementTop - secondElementTop) : Math.abs(firstElementTop - secondElementTop)) : 0) + 'px' : 'unset'};
        //         bottom: ${notesOrientation === 'bottom' ? -30 + (!shitExpression ? 0 : Math.abs(firstElementTop - secondElementTop) * (!shitExpression ? -Math.round(rotateAngle) : Math.round(rotateAngle)) - (!shitExpression ? -Math.abs(firstElementTop - secondElementTop) : Math.abs(firstElementTop - secondElementTop))) + 'px' : 'unset'};
        //         width: ${unionWidth + 1}px; transform: rotate(${lastElementRighter ? -rotateAngle : rotateAngle}rad)
        //     ">
        // </div>`