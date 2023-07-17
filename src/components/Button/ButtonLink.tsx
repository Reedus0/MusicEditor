import { Link } from "react-router-dom"

import './Button.scss'

export default function ButtonLink(props: any) {
  return (
    <Link
      to={props.href}
      className={["button", props.clases].join(" ")}
      id={props.id}>
      {props.name}
    </Link>
  )
}

