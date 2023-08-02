import React, { FC } from 'react'

import { Tact } from '../../../models/Tact'
import DrawerTact from '../DrawerTact/DrawerTact'
import { Song } from '../../../models/Song'

import './DrawerPage.scss'
import DrawerTop from '../DrawerTop/DrawerTop'

interface DrawerPageProps {
    currentPageTacts: number
    pageIndex: number
    song: Song
    tacts: Tact[]
}

const DrawerPage: FC<DrawerPageProps> = ({ currentPageTacts, pageIndex, song, tacts }) => {
    let tactCounter: number = 0
    return (
        <div className='editor-drawer-page' id={'page-' + pageIndex}>
            {pageIndex === 0 ?
                <DrawerTop name={song['name']} subtitle={song['subtitle']} author={song['author']} />
                :
                <></>
            }
            <div className='editor-drawer-page__inner'>
                {tacts.map((tact: Tact, tactIndex: number) =>
                    <>
                        {/* <noscript>{totalTacts += 1}</noscript>
                    <noscript>{pageCounter += tact.getWidth()}</noscript> */}
                        <noscript>{tactCounter + tact.getWidth() > 96 ? tactCounter = tact.getWidth() : tactCounter += tact.getWidth()}</noscript>
                        <DrawerTact song={song} tact={tact} tactCounter={tactCounter} tactIndex={currentPageTacts + tactIndex} />
                    </>
                )}
            </div>
        </div>
    )
}

export default DrawerPage;