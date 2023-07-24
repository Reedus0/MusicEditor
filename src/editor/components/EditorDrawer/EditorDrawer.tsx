import React, { FC, useEffect, useReducer } from 'react'
import { Song } from '../../models/Song';

import './EditorDrawer.scss'
import { Tact } from '../../models/Tact';
import { Note, noteHalf } from '../../models/Note';
import { Track } from '../../models/Track';

interface EditorDrawerProps {
    song: Song,

}

const EditorDrawer: FC<EditorDrawerProps> = ({ song }) => {

    return (
        <div className='editor-drawer'>
            <div className='editor-drawer__inner'>
                {song['tacts'].map((tact: Tact, tactIndex: number) =>
                    <div className='editor-drawer__tact' id={'tact-' + tactIndex}>
                        {tact['tracks'].map((track: Track, trackIndex: number) =>
                            <div className='editor-drawer__track' id={'track-' + trackIndex}>
                                <div className='editor-drawer__lines'>
                                    {[...Array(5)].map(() => <div className='editor-drawer__line'></div>)}
                                </div>
                                {track['notes'].map((note: Note) => <div className={['editor-drawer__note', note['half'] !== noteHalf.NONE ? '_half' : ''].join(' ')} style={{ bottom: (note['verticalPosition'] * 12), left: (document.body.scrollWidth * 0.20 * note['horizontalPosition'] / 64) }}>
                                    {note['verticalPosition'] < 2 ? !Number.isInteger(note['verticalPosition']) ? <div className='editor-drawer__note-line'></div> : <div className='editor-drawer__note-line-up'></div> : ''}
                                    {note['verticalPosition'] > 7 ? !Number.isInteger(note['verticalPosition']) ? <div className='editor-drawer__note-line'></div> : <div className='editor-drawer__note-line-down'></div> : ''}
                                    {note['half'] === noteHalf.FLAT
                                        ?
                                        <div className='editor-drawer__note-flat'>b</div>
                                        :
                                        note['half'] === noteHalf.SHARP
                                            ?
                                            <div className='editor-drawer__note-sharp'>#</div>
                                            :
                                            note['half'] === noteHalf.NATURAL
                                                ?
                                                <div className='editor-drawer__note-natural'>♮</div>
                                                :
                                                ''}
                                </div>)}
                                <div className='editor-drawer__track-fake' id={'tact-fake-' + trackIndex}>
                                </div>
                            </div>
                        )}
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default EditorDrawer;