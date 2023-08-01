import React, { FC } from 'react'
import { Rest } from '../../../models/Rest';

import './DrawerRest.scss'
import { Song } from '../../../models/Song';

interface DrawerRestProps {
    song: Song,
    rest: Rest,
    tactIndex: number,
    trackIndex: number,
}

const DrawerRest: FC<DrawerRestProps> = ({ song, rest, tactIndex, trackIndex }) => {
    const widthUnit: number = (document.querySelector('._track' + ((tactIndex + 1) * (trackIndex + 1) * (10 ** (trackIndex + 1))))!.clientWidth / (Number(song['tacts'][tactIndex]['tracks'][trackIndex].getTimeSignature()[0]) * 16))
    return (
        <div
            className='editor-drawer-rest editor-drawer-object'
            style={{
                bottom: (rest['verticalPosition'] * 12),
                left: widthUnit * rest['horizontalPosition'] + 6
            }}
        >
            <h3 className='editor-drawer-rest__symbol'>·</h3>
        </div>
    )
}

export default DrawerRest;