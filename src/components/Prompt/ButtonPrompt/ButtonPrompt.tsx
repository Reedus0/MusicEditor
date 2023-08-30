import React from 'react'


import "./ButtonPrompt.scss"

export default function ButtonPrompt(props: any) {
  return (
    <div className='buttons-prompt__wrapper' onClick={props.function}>
      <img className='buttons-prompt__button-img' src={props.img}  />
      <h3 className='buttons-prompt__title'>{props.title}</h3>
    </div>
  )
}

