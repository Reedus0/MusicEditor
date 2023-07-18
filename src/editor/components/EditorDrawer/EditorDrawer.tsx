import React, { FC } from 'react'
import { Song } from '../../models/Song';

import './EditorDrawer.scss'
import { Tact } from '../../models/Tact';
import { Note, noteHalf } from '../../models/Note';

interface EditorDrawerProps {
    song: Song
}

const EditorDrawer: FC<EditorDrawerProps> = ({ song }) => {
    return (
        <div>
            <div className='editor-lines'>
                {song['tacts'].map((tact: Tact) =>
                    <div className='editor-lines__tact'>
                        {[...Array(5)].map((element: undefined, index: number) => <div className='editor-lines__line'></div>)}
                        {tact['notes'].map((note: Note) => <div className={['editor-lines__note', note['half'] !== noteHalf.NONE ? '_half' : ''].join(' ')} style={{ bottom: note['verticalPosition'] * 12, left: ((1440 * 0.25) / 64 * note['horizontalPosition']) }}>
                            {!Number.isInteger(note['verticalPosition']) && note['verticalPosition'] < -0.5 ? <div className='editor-lines__note-line'></div> : ''}
                            {note['half'] === noteHalf.FLAT ? <div className='editor-lines__note-flat'>F</div> : note['half'] === noteHalf.SHARP ? <div className='editor-lines__note-sharp'>S</div> : ''}
                        </div>)}
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default EditorDrawer;