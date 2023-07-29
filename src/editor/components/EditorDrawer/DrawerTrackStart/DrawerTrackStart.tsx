import React, { FC, memo } from 'react'
import { Tact } from '../../../models/Tact';
import { Track } from '../../../models/Track';
import { Song } from '../../../models/Song';
import { clefs } from '../../../utils';
import { keysHalfsMap, keysHalfsPositionMap } from '../../../utils/keys';

interface DrawerTrackStartProps {
    song: Song,
    tact: Tact,
    track: Track,
    tactCounter: number,
    tactIndex: number,
    trackIndex: number,
}

const DrawerTrackStart: FC<DrawerTrackStartProps> = ({ song, tact, track, tactCounter, tactIndex, trackIndex }) => {
    return (
        <div className='editor-drawer__start'>
            {tactCounter === tact.getWidth() || tactIndex === 0 || (song['tacts'][tactIndex - 1] !== undefined && song['tacts'][tactIndex - 1]['tracks'][trackIndex].getClef() !== track.getClef()) || (song['tacts'][tactIndex - 1] !== undefined && JSON.stringify(song['tacts'][tactIndex - 1]['tracks'][trackIndex].getKey()) !== JSON.stringify(track.getKey())) ?
                <div className='editor-drawer__key-wrapper'>
                    {track.getClef() === clefs.TREBLE ?
                        <div className='editor-drawer__key _treble'>
                            <img className='editor-drawer__key-img' width={30} height={80} src={require('./../../../img/treble.png')} />
                        </div>
                        :
                        track.getClef() === clefs.BASS ?
                            <div className='editor-drawer__key _bass'>
                                <img className='editor-drawer__key-img _bass' width={40} height={40} src={require('./../../../img/bass.png')} />
                            </div>
                            :
                            <div className='editor-drawer__key _alto'>
                                <img className='editor-drawer__key-img _alto' width={40} height={50} src={require('./../../../img/alto.png')} />
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
    )
}

export default memo(DrawerTrackStart);