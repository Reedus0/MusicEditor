import React, { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { privateRoutes, IRoute, publicRoutes } from '../router'

const AppRouter: FC = () => {

  const { isAuth } = useTypedSelector(state => state.auth);

  return (
    <Routes>
      {isAuth
        ?
        privateRoutes.map((route: IRoute) =>
          <Route path={route['path']} element={route['element']} key={route['path']} />
        )
        :
        publicRoutes.map((route: IRoute) =>
          <Route path={route['path']} element={route['element']} key={route['path']} />
        )
      }
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default AppRouter
