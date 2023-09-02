import React, { FC } from 'react'
import Prompt from '../../../components/Prompt/Prompt';
import ButtonPrompt from '../../../components/Prompt/ButtonPrompt/ButtonPrompt';

import './EditorCreatePrompt.scss'
import { useActions } from '../../../hooks/useActions';
import Notification from '../../../components/Notification/Notification';

interface EditorCreatePromptProps {
    setSong: Function
}

const EditorCreatePrompt: FC<EditorCreatePromptProps> = ({ setSong }) => {

    const { setPrompt, setNotification } = useActions()

    const loadFile = async () => {
        const fileInput = document.getElementById('file-input') as HTMLInputElement
        fileInput!.click()

        fileInput!.onchange = async (e: any) => {
            setPrompt(<></>)
            try {
                // todo
            } catch {
                setNotification(
                    <Notification >
                        <h3 className='notification__text'>Не удалось загрузить файл</h3>
                    </Notification>
                )
            }
        }
    }

    return (
        <Prompt title="Создание песни">
            <div className='editor-create'>
                <div className='editor-create__buttons'>
                    <input type='file' className='editor-create__input' id='file-input' />
                    <ButtonPrompt img={require('../../img/icons/json-file.png')} function={() => loadFile()} title='Загрузить' />
                    <ButtonPrompt img={require('../../img/icons/empty-file.png')} function={() => setPrompt(<></>)} title='Новый файл' />
                </div>
                <h3 className='editor-create__text'>Выберите способ создания новой песни</h3>
            </div>
        </Prompt>
    )
}

export default EditorCreatePrompt;