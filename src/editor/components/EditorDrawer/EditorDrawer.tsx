import React, { FC, memo, useEffect, useReducer } from 'react'
import { Song } from '../../models/Song';

import './EditorDrawer.scss'
import { Tact } from '../../models/Tact';
import { Note, noteHalf } from '../../models/Note';
import { Track } from '../../models/Track';
import { clefs, getNotesLine } from '../../utils';
import { keysHalfsMap, keysHalfsPositionMap } from '../../utils/keys';
import { Rest } from '../../models/Rest';

interface EditorDrawerProps {
    song: Song,
    ignored: number
}

const EditorDrawer: FC<EditorDrawerProps> = ({ song, ignored }) => {
    let tactCounter: number = 0

    console.log('Render!')

    return (
        <div className='editor-drawer' id='#editor-drawer'>
            <div className='editor-drawer__inner'>
                {song['tacts'].map((tact: Tact, tactIndex: number) =>
                    <div className={['editor-drawer__tact', tactCounter === 0 ? '_wrapper' : ''].join(' ')} style={{ flexBasis: tact.getWidth() + '%', flexGrow: 1 }} id={'tact-' + (tactIndex)}>
                        <noscript>{tactCounter + tact.getWidth() > 100 ? tactCounter = tact.getWidth() : tactCounter += tact.getWidth()}</noscript>
                        {tactCounter === tact.getWidth() || tactIndex === 0 ? <div className='editor-drawer__bracket'>
                            {tactIndex === 0 ? <h3 className='editor-drawer__bracket-instrument'>Piano</h3> : <></>}
                            <img className='editor-drawer__bracket-img' src={require('./../../img/bracket.png')} />
                        </div> : <></>}
                        <div className='editor-drawer__tact-tracks' id={'track-tracks-' + (tactIndex)}>
                            {tact['tracks'].map((track: Track, trackIndex: number) =>
                                <div className='editor-drawer__track-wrapper' id={'track-wrapper-' + (trackIndex)}>
                                    <div className='editor-drawer__start'>
                                        {tactCounter === tact.getWidth() || tactIndex === 0 || (song['tacts'][tactIndex - 1] !== undefined && song['tacts'][tactIndex - 1]['tracks'][trackIndex].getClef() !== track.getClef()) || (song['tacts'][tactIndex - 1] !== undefined && JSON.stringify(song['tacts'][tactIndex - 1]['tracks'][trackIndex].getKey()) !== JSON.stringify(track.getKey())) ?
                                            <div className='editor-drawer__key-wrapper'>
                                                {track.getClef() === clefs.TREBLE ?
                                                    <div className='editor-drawer__key _treble'>
                                                        <img className='editor-drawer__key-img' width={30} height={80} src={require('./../../img/treble.png')} />
                                                    </div>
                                                    :
                                                    track.getClef() === clefs.BASS ?
                                                        <div className='editor-drawer__key _bass'>
                                                            <img className='editor-drawer__key-img _bass' width={40} height={40} src={require('./../../img/bass.png')} />
                                                        </div>
                                                        :
                                                        <div className='editor-drawer__key _alto'>
                                                            <img className='editor-drawer__key-img _alto' width={40} height={50} src={require('./../../img/alto.png')} />
                                                        </div>
                                                }
                                            </div> : <></>}
                                         
                                        {tactCounter === tact.getWidth() || tactIndex === 0 || (song['tacts'][tactIndex - 1] !== undefined && JSON.stringify(song['tacts'][tactIndex - 1]['tracks'][trackIndex].getKey()) !== JSON.stringify(track.getKey())) ?
                                            <div className='editor-drawer__start-signs' style={{ width: Math.abs(keysHalfsMap.get(track.getKey())) * 17 }}>
                                                {[...Array(Math.abs(keysHalfsMap.get(track.getKey())))].map((key: number, index: number) =>
                                                    keysHalfsMap.get(track.getKey()) < 0
                                                        ?
                                                        <h4 className='editor-drawer__start-sign'
                                                            style={{ bottom: keysHalfsPositionMap[(index + 1) * -1] + (track.getClef() * -2) - 1, left: 50 + (15 * (index + 1)) }}>
                                                            b
                                                        </h4>
                                                        :
                                                        <h4 className='editor-drawer__start-sign'
                                                            style={{ bottom: keysHalfsPositionMap[(index + 1)] + (track.getClef() * -2) - 1, left: 50 + (15 * (index + 1)) }}>
                                                            #
                                                        </h4>)}
                                            </div> : <></>}
                                        {tactIndex === 0 || (song['tacts'][tactIndex - 1] !== undefined && song['tacts'][tactIndex - 1]['tracks'][trackIndex].getTimeSignature() !== track.getTimeSignature()) ?
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

                                    <div className={['editor-drawer__track', '_track' + ((tactIndex + 1) * (trackIndex + 1) * (10 ** (trackIndex + 1)))].join(' ')} id={'track-' + trackIndex}>
                                        <div className='editor-drawer__lines'>
                                            {[...Array(5)].map(() => <div className='editor-drawer__line'></div>)}
                                        </div>
                                        <div className='editor-drawer__notes'>
                                            {getNotesLine(track['notes']).map((line: number) =>
                                                <div className='editor-drawer__notes-line'>
                                                    {track['notes'].filter((note: Note) => note['horizontalPosition'] === line).sort((a: Note, b: Note) => a['verticalPosition'] > b['verticalPosition'] ? 1 : -1).map((note: Note, noteIndex: number) =>
                                                        <div
                                                            className={
                                                                ['editor-drawer__note', 'editor-drawer__object',
                                                                    note['half'] !== noteHalf.NONE ? '_half' : '',
                                                                    track.getNote(note['horizontalPosition'], note['verticalPosition'] - 0.5) !== undefined
                                                                        ||
                                                                        track.getNote(note['horizontalPosition'], note['verticalPosition'] + 0.5) !== undefined ? '_margin' : ''].join(' ')}
                                                            style={{
                                                                bottom: (note['verticalPosition'] * 12),
                                                                left: (document.querySelector('._track' + ((tactIndex + 1) * (trackIndex + 1) * (10 ** (trackIndex + 1))))!.clientWidth / 64 * note['horizontalPosition'] + 4)
                                                            }}
                                                        >
                                                            <h3 className='editor-drawer__note-symbol'>w</h3>
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
                                                        </div>)}

                                                </div>
                                            )}
                                        </div>
                                        <div className='editor-drawer__rests'>
                                            {track['rests'].map((rest: Rest) =>
                                                <div
                                                    className='editor-drawer__rest editor-drawer__object'
                                                    style={{
                                                        bottom: (rest['verticalPosition'] * 12),
                                                        left: (document.querySelector('._track' + ((tactIndex + 1) * (trackIndex + 1) * (10 ** (trackIndex + 1))))!.clientWidth / 64 * rest['horizontalPosition'] + 4)
                                                    }}
                                                >
                                                    <h3 className='editor-drawer__rest-symbol'>·</h3>
                                                </div>
                                            )}
                                        </div>
                                        <div className='editor-drawer__track-fake' id={'tact-fake-' + trackIndex}>
                                        </div>
                                    </div>
                                    {tactIndex === song['tacts'].length - 1 ?
                                        <div className='editor-drawer__end'>
                                            <div className='editor-drawer__end-end'></div>
                                        </div> :
                                        <></>}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default memo(EditorDrawer);