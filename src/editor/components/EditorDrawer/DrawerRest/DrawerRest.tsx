import React, { FC } from 'react'
import { Rest } from '../../../models/Rest';

interface DrawerRestProps {
    rest: Rest,
    tactIndex: number,
    trackIndex: number,
}

const DrawerRest: FC<DrawerRestProps> = ({ rest, tactIndex, trackIndex }) => {
    return (
        <div
            className='editor-drawer__rest editor-drawer__object'
            style={{
                bottom: (rest['verticalPosition'] * 12),
                left: (document.querySelector('._track' + ((tactIndex + 1) * (trackIndex + 1) * (10 ** (trackIndex + 1))))!.clientWidth / 64 * rest['horizontalPosition'] + 4)
            }}
        >
            <h3 className='editor-drawer__rest-symbol'>·</h3>
        </div>
    )
}

export default DrawerRest;