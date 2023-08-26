import React, { FC, memo } from 'react'
import { Song } from '../../models/Song';
import DrawerTact from './DrawerTact/DrawerTact';
import { Tact } from '../../models/Tact';

import './EditorDrawer.scss'
import DrawerTop from './DrawerTop/DrawerTop';
import DrawerPage from './DrawerPage/DrawerPage';

interface EditorDrawerProps {
    song: Song,
    ignored: number
}

const EditorDrawer: FC<EditorDrawerProps> = ({ song, ignored }) => {
    let currentPageTacts: number = 0

    const pageThreshold: number = 504

    const countTactsOnPage = (song: Song): number[] => {
        const result: number[] = []
        let pageCount: number = 0
        let tactCounter: number = 0
        let tactLines: number = 0
        let tactWidth: number = 0
        let tactLinesThreshold: number = 5
        for (let i = 0; i < song['tacts'].length; i++) {
            if (pageCount > 0) tactLinesThreshold = 6
            tactCounter += 1
            if (tactWidth + song['tacts'][i].getWidth() > 96) {
                tactWidth = song['tacts'][i].getWidth()
                tactLines += 1
            } else {
                tactWidth += song['tacts'][i].getWidth()
            }
            if (tactLines === tactLinesThreshold) {
                result.push(tactCounter - 1)
                pageCount += 1
                tactLines = 0
                tactCounter = 0
                tactWidth = 0
            }
        }
        if (tactWidth < pageThreshold) {
            result.push(tactCounter + pageCount)
        }
        return result
    }

    return (
        <div className='editor-drawer' id='editor-drawer'>
            <div className='editor-drawer__inner'>
                {countTactsOnPage(song).map((tactsCount: number, pageIndex: number) =>
                    <>
                        <DrawerPage currentPageTacts={currentPageTacts} pageIndex={pageIndex} song={song} tacts={song['tacts'].slice(currentPageTacts, currentPageTacts + tactsCount)} />
                        <noscript>{currentPageTacts += tactsCount}</noscript>
                    </>
                )}
            </div>
        </div >
    )
}

export default memo(EditorDrawer);