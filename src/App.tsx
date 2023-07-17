import React, { FC, useEffect } from 'react'
import AppRouter from './components/AppRouter';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import { IThemes } from './models/ITheme';

import './styles/App.scss';

const App: FC = () => {


  const { prompt } = useTypedSelector(state => state.prompt);
  const { notification } = useTypedSelector(state => state.notification);
  const { theme } = useTypedSelector(state => state.themes);

  const { setTheme } = useActions()

  useEffect(() => {
    setTheme(localStorage.getItem('default-theme') ? localStorage.getItem('default-theme') as IThemes : IThemes.LIGHT)
  }, [])





  return (
    <div className={`theme-${theme}`}>
      {notification}
      {prompt}
      <AppRouter />
    </div>
  )
}

export default App