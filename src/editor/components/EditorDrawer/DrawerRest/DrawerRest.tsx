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
    return (
        <div
            className='editor-drawer-rest editor-drawer-object'
            style={{
                bottom: (rest['verticalPosition'] * 12),
                left: (document.querySelector('._track' + ((tactIndex + 1) * (trackIndex + 1) * (10 ** (trackIndex + 1))))!.clientWidth / (Number(song['tacts'][tactIndex]['tracks'][trackIndex].getTimeSignature()[0]) * 16) * rest['horizontalPosition'] + 4)
            }}
        >
            <h3 className='editor-drawer-rest__symbol'>·</h3>
        </div>
    )
}

export default DrawerRest;