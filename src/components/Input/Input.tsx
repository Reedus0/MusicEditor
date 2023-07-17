import React from 'react'

import './Input.scss'

export default function Input(props: any) {
  return (
    <input 
    name={props.name}
    type={props.type}
    className={["input", props.class].join(" ")} 
    placeholder={props.placeholder}
    />
  )
}
