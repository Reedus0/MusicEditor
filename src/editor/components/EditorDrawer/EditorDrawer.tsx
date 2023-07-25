import React, { FC, useEffect, useReducer } from 'react'
import { Song } from '../../models/Song';

import './EditorDrawer.scss'
import { Tact } from '../../models/Tact';
import { Note, noteHalf } from '../../models/Note';
import { Track } from '../../models/Track';
import { arraySort, clefs, getNotesLine } from '../../utils';
import { CMajorMap, keys, keysHalfsMap, keysHalfsPositionMap } from '../../utils/keys';

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
                            {sectionIndex === 0 ? <h3 className='editor-drawer__bracket-instrument'>Piano</h3> : <></>}
                            <img className='editor-drawer__bracket-img' src={require('./../../img/bracket.png')} />
                        </div>
                        {song['tacts'].slice(sectionIndex, sectionIndex + 4).map((tact: Tact, tactIndex: number) =>
                            <div className='editor-drawer__tact' id={'tact-' + (tactIndex + sectionIndex)}>
                                {tact['tracks'].map((track: Track, trackIndex: number) =>
                                    <div className='editor-drawer__track-wrapper' id={'track-wrapper-' + (trackIndex + sectionIndex)}>
                                        {tactIndex % 4 === 0 ?
                                            <div className='editor-drawer__start'>
                                                <div className='editor-drawer__key-wrapper'>

                                                    {track.getClef() === clefs.TREBLE ?
                                                        <div className='editor-drawer__key _treble'>
                                                            <img className='editor-drawer__key-img' width={40} height={100} src={require('./../../img/treble.png')} />
                                                        </div>
                                                        :
                                                        track.getClef() === clefs.BASS ?
                                                            <div className='editor-drawer__key _bass'>
                                                                <img className='editor-drawer__key-img _bass' width={40} height={36} src={require('./../../img/bass.png')} />
                                                            </div>
                                                            :
                                                            <div className='editor-drawer__key _alto'>
                                                                <img className='editor-drawer__key-img _alto' width={40} height={50} src={require('./../../img/alto.png')} />
                                                            </div>
                                                    }
                                                </div>
                                                <div className='editor-drawer__start-sings' style={{ width: Math.abs(keysHalfsMap.get(track.getKey())) * 17 }}>
                                                    {[...Array(Math.abs(keysHalfsMap.get(track.getKey())))].map((key: number, index: number) =>
                                                        keysHalfsMap.get(track.getKey()) < 0
                                                            ?
                                                            <h4 className='editor-drawer__start-sing'
                                                                style={{ bottom: keysHalfsPositionMap[(index + 1) * -1] + (track.getClef() * -2), left: 50 + (15 * (index + 1)) }}>
                                                                b
                                                            </h4>
                                                            :
                                                            <h4 className='editor-drawer__start-sing'
                                                                style={{ bottom: keysHalfsPositionMap[(index + 1)] + (track.getClef() * -2), left: 50 + (15 * (index + 1)) }}>
                                                                #
                                                            </h4>)}
                                                </div>
                                                {sectionIndex === 0 ?
                                                    <div className='editor-drawer__signature'>
                                                        <div className='editor-drawer__signautre-number-wrapper'>
                                                            <h3 className='editor-drawer__signature-number'>{track.getTimeSignature()[0]}</h3>
                                                        </div>
                                                        <div className='editor-drawer__signautre-number-wrapper'>
                                                            <h3 className='editor-drawer__signature-number'>{track.getTimeSignature()[2]}</h3>
                                                        </div>
                                                    </div>
                                                    : <></>}
                                                <div className='editor-drawer__lines-start'>
                                                    {[...Array(5)].map(() => <div className='editor-drawer__line'></div>)}
                                                </div>
                                            </div>
                                            :
                                            <></>}
                                        <div className={['editor-drawer__track', '_track' + ((tactIndex + 1) * (trackIndex + 1) * (10 ** (trackIndex + 1)) + sectionIndex)].join(' ')} id={'track-' + trackIndex}>
                                            <div className='editor-drawer__lines'>
                                                {[...Array(5)].map(() => <div className='editor-drawer__line'></div>)}
                                            </div>
                                            {getNotesLine(track['notes'].sort((a: Note, b: Note) => a['verticalPosition'] > b['verticalPosition'] ? 1 : -1)).map((line: number, index: number) =>
                                                <div className='editor-drawer__notes-line'>

                                                    {track['notes'].filter((note: Note) => note['horizontalPosition'] === line).sort((a: Note, b: Note) => a['verticalPosition'] > b['verticalPosition'] ? 1 : -1).map((note: Note) =>
                                                        <div
                                                            className={
                                                                ['editor-drawer__note',
                                                                    note['half'] !== noteHalf.NONE ? '_half' : '',
                                                                    track.getNote(note['horizontalPosition'], note['verticalPosition'] - 0.5) !== undefined
                                                                        ||
                                                                        track.getNote(note['horizontalPosition'], note['verticalPosition'] + 0.5) !== undefined ? '_margin' : ''].join(' ')}
                                                            style={{
                                                                bottom: (note['verticalPosition'] * 12),
                                                                left: (document.querySelector('._track' + ((tactIndex + 1) * (trackIndex + 1) * (10 ** (trackIndex + 1)) + sectionIndex))!.clientWidth / 64 * note['horizontalPosition'])
                                                            }}
                                                        >
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
                                                </div>
                                            )}

                                            <div className='editor-drawer__track-fake' id={'tact-fake-' + trackIndex}>
                                            </div>
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