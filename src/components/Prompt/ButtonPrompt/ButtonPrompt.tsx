import React from 'react'


import "./ButtonPrompt.scss"

export default function ButtonPrompt(props: any) {
  return (
    <button 
    className='buttons-prompt__button' 
    style={{backgroundColor: props.backgorundColor, color: props.color}} 
    id={props.id}
    onClick={(e) => props.function(e)}>
      {props.name}
    </button>
  )
}

