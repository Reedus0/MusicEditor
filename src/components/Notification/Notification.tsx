import React from 'react'
import { useActions } from '../../hooks/useActions'

import './Notification.scss'

const Notification = (props: any) => {
  const { setNotification } = useActions()

  return (
    <div className="notification" onClick={() => setNotification(<></>)}>
      <div className="notification__inner" onClick={(e) => e.stopPropagation()} >
        <div className='notification__wrapper'>

          <button className="notification__close" onClick={() => setNotification(<></>)}>&#10006;</button>
          <div className="notification__content">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification