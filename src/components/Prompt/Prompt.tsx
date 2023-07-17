import React from 'react'
import { useActions } from '../../hooks/useActions'

import "./Prompt.scss"

export default function Prompt(props: any) {

  const { setPrompt } = useActions()

  return (
    <div className="prompt" onClick={() => setPrompt(<></>)}>
      <div className="prompt__inner" onClick={(e) => e.stopPropagation()} >
        <button className="prompt__close" onClick={() => setPrompt(<></>)}>&#10006;</button>
        <h1 className="prompt__title">{props.title}</h1>
        <div className="prompt__content">
          {props.children}
        </div>
      </div>
    </div>
  )
}
