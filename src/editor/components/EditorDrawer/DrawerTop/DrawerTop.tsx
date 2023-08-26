import React, { FC, useState } from 'react'

import './DrawerTop.scss'

interface DrawerTopProps {
    name: string,
    subtitle: string,
    author: string,
}

const DrawerTop: FC<DrawerTopProps> = ({ name, subtitle, author }) => {

    const [edit, setEdit] = useState<{ [key: string]: { 'value': string, 'state': boolean } }>({
        'name': { 'value': name, 'state': false },
        'subtitle': { 'value': subtitle, 'state': false },
        'author': { 'value': author, 'state': false }
    });

    const setEditState = (key: string, state: boolean) => {
        const object: { [key: string]: { 'value': string, 'state': boolean } } = {}
        const capitalizedKey = key[0].toUpperCase() + key.slice(1, key.length)
        object[key] = { 'value': edit[key]['value'] === '' ? capitalizedKey : edit[key]['value'] , 'state': state }
        setEdit({ ...edit, ...object })
        if (state) {
            (document.querySelector(`.editor-drawer-top__input._${key}`) as HTMLInputElement)!.focus()
        }
    }

    const handleChange = (e: any, key: string) => {
        const object: { [key: string]: { 'value': string, 'state': boolean } } = {}
        object[key] = { 'state': edit[key]['state'], 'value': e.target.value }
        setEdit({ ...edit, ...object })
    }

    return (
        <div className='editor-drawer-top'>
            {Object.keys(edit).map((object: any) => <>
                <input value={edit[object]['value']}
                    onChange={(e: any) => handleChange(e, object)}
                    onBlur={() => setEditState(object, false)}
                    id={'song-' + object}
                    className={['editor-drawer-top__input', `_${object}`, edit[object]['state'] ? '_active' : ''].join(' ')}
                />
                <h1
                    onClick={() => setEditState(object, true)}
                    className={['editor-drawer-top__text', `_${object}`, !edit[object]['state'] ? '_active' : ''].join(' ')}
                >
                    {edit[object]['value']}
                </h1>
            </>)}
        </div>
    )
}

export default DrawerTop;