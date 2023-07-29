import React, { FC } from 'react'
import { Song } from '../../../models/Song';
import { Note, noteHalf } from '../../../models/Note';
import { Track } from '../../../models/Track';

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
                ['editor-drawer__note', 'editor-drawer__object',
                    note['half'] !== noteHalf.NONE ? '_half' : '',
                    track.getNote(note['horizontalPosition'], note['verticalPosition'] - 0.5) !== undefined
                        ||
                        track.getNote(note['horizontalPosition'], note['verticalPosition'] + 0.5) !== undefined ? '_margin' : ''].join(' ')}
            style={{
                bottom: (note['verticalPosition'] * 12),
                left: (document.querySelector('._track' + ((tactIndex + 1) * (trackIndex + 1) * (10 ** (trackIndex + 1))))!.clientWidth / (Number(song['tacts'][tactIndex]['tracks'][trackIndex].getTimeSignature()[0]) * 16) * note['horizontalPosition'] + 4)
            }}
        >
            {note['verticalPosition'] < 4.5 ? <h3 className='editor-drawer__note-symbol'>q</h3> : <h3 className='editor-drawer__note-symbol'>Q</h3>}
            {!Number.isInteger(note['verticalPosition']) ? <div className='editor-drawer__note-line'></div> : <></>}
            {note['half'] === noteHalf.FLAT
                ?
                <div className='editor-drawer__note-flat editor-drawer__note-half'>b</div>
                :
                note['half'] === noteHalf.SHARP
                    ?
                    <div className='editor-drawer__note-sharp editor-drawer__note-half'>#</div>
                    :
                    note['half'] === noteHalf.NATURAL
                        ?
                        <div className='editor-drawer__note-natural editor-drawer__note-half'>é</div>
                        :
                        ''}
        </div>)
}

export default DrawerNote;