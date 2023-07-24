import React, { FC, useEffect, useReducer } from 'react'
import { Song } from '../../models/Song';

import './EditorDrawer.scss'
import { Tact } from '../../models/Tact';
import { Note, noteHalf } from '../../models/Note';
import { Track } from '../../models/Track';
import { clefs } from '../../utils';

interface EditorDrawerProps {
    song: Song,

}

const EditorDrawer: FC<EditorDrawerProps> = ({ song }) => {

    return (
        <div className='editor-drawer'>
            <div className='editor-drawer__inner'>
                {song['tacts'].map((tact: Tact, sectionIndex: number) => sectionIndex % 4 === 0 ?
                    <div className='editor-drawer__section'>
                        <div className='editor-drawer__bracket'>
                            <img className='editor-drawer__bracket-img' src={require('./../../img/bracket.png')} />
                        </div>
                        {song['tacts'].slice(sectionIndex, sectionIndex + 4).map((tact: Tact, tactIndex: number) =>
                            <div className='editor-drawer__tact' id={'tact-' + (tactIndex + sectionIndex)}>
                                {tact['tracks'].map((track: Track, trackIndex: number) =>
                                    <div className='editor-drawer__track' id={'track-' + (trackIndex + sectionIndex)}>
                                        {tactIndex % 4 === 0 ?
                                            <div className='editor-drawer__start'>
                                                {track.getClef() === clefs.TREBLE ?
                                                    <div className='editor-drawer__key _treble'>
                                                        <img className='editor-drawer__key-img' width={40} height={100} src={require('./../../img/treble.png')} />
                                                    </div>
                                                    :
                                                    <div className='editor-drawer__key _bass'>
                                                        <img className='editor-drawer__key-img _bass' width={40} height={36} src={require('./../../img/bass.png')} />
                                                    </div>
                                                }
                                                {sectionIndex === 0 ?
                                                    <div className='editor-drawer__signature'>
                                                        <h3 className='editor-drawer__signature-number'>{track.getTimeSignature()[0]}</h3>
                                                        <h3 className='editor-drawer__signature-number'>{track.getTimeSignature()[2]}</h3>
                                                    </div>
                                                    : <></>}
                                                <div className='editor-drawer__lines-start'>
                                                    {[...Array(5)].map(() => <div className='editor-drawer__line'></div>)}
                                                </div>
                                            </div>
                                            :
                                            <></>}
                                        <div className='editor-drawer__lines'>
                                            {[...Array(5)].map(() => <div className='editor-drawer__line'></div>)}
                                        </div>
                                        {track['notes'].map((note: Note) => <div className={['editor-drawer__note', note['half'] !== noteHalf.NONE ? '_half' : ''].join(' ')} style={{ bottom: (note['verticalPosition'] * 12), left: (document.querySelector('.editor-drawer__tact')!.clientWidth * note['horizontalPosition'] / 64) }}>
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
                        )}
                    </div> : <></>)}
            </div>
        </div>
    )
}

export default EditorDrawer;