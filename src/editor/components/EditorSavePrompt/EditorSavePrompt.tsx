import React, { FC } from 'react'
import ButtonPrompt from '../../../components/Prompt/ButtonPrompt/ButtonPrompt';
import Prompt from '../../../components/Prompt/Prompt';

import './EditorSavePrompt.scss'
import { saveToFile, saveToJson } from '../../utils';
import { useActions } from '../../../hooks/useActions';
import Notification from '../../../components/Notification/Notification';
import { Song } from '../../models/Song';

interface EditorSavePromptProps {
    song: Song
}

const EditorSavePrompt: FC<EditorSavePromptProps> = ({ song }) => {

    const { setPrompt, setIsPlaying, setNotification } = useActions()

    const handleSaveToFile = () => {
        setPrompt(<></>)
        setIsPlaying(false)
        setTimeout(() => saveToFile(), 0)
        setNotification(
            <Notification>
                <h3 className='notification__text'>Сохраняем файл...</h3>
            </Notification>
        )
        setTimeout(() => setNotification(<></>), 5000)
    }

    const handleSaveToJson = () => {
        setPrompt(<></>)
        setIsPlaying(false)
        setTimeout(() => saveToJson(song), 0)
        setNotification(
            <Notification>
                <h3 className='notification__text'>Сохраняем файл...</h3>
            </Notification>
        )
        setTimeout(() => setNotification(<></>), 5000)
    }

    return (
        <Prompt title="Сохранение файла">
            <div className='editor-save'>
                <div className='editor-save__buttons'>
                    <ButtonPrompt function={() => handleSaveToJson()} img={require('../../img/icons/json-file.png')} title='JSON' />
                    <ButtonPrompt function={() => handleSaveToFile()} img={require('../../img/icons/pdf-file.png')} title='PDF' />
                </div>
                <h3 className='editor-save__text'>Выберите способ созранения файла</h3>
            </div>
        </Prompt>
    )
}

export default EditorSavePrompt;