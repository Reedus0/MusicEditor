import React, { FC } from 'react'

import './DrawerTop.scss'

interface DrawerTopProps {
    name: string,
    subtitle: string,
    author: string,
}

const DrawerTop: FC<DrawerTopProps> = ({ name, subtitle, author }) => {
    return (
        <div className='editor-drawer-top'>
            <h1 className='editor-drawer-top__name'>{name}</h1>
            <h3 className='editor-drawer-top__subtitle'>{subtitle}</h3>
            <h3 className='editor-drawer-top__author'>{author}</h3>
        </div>
    )
}

export default DrawerTop;