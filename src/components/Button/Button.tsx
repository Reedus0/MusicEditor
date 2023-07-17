import React from 'react'

import './Button.scss'

export default function Button(props: any) {
  return (
    <button
      className={["button", props.class].join(" ")}
      id={props.id}
      onClick={props.function}>
      {props.name}
    </button>
  )
}

