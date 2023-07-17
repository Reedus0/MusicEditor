import React, { FC } from 'react'
import { Link } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IThemes } from '../../models/ITheme';
import FormLogin from '../Forms/Auth/FormLogin';
import FormRegister from '../Forms/Auth/FormRegister';
import Prompt from '../Prompt/Prompt';

import './Header.scss'

const Header: FC = () => {

  const { setPrompt, setTheme } = useActions()
  const { isAuth, user } = useTypedSelector(state => state.auth);

  const showDrop = () => {
    document.body.classList.toggle("_menu")
    document.querySelector(".header__drop")!.classList.toggle("_active")
    document.querySelector(".header__burger")!.classList.toggle("_active")
  }

  const showProfile = () => {
    document.querySelector(".profile-header__drop")!.classList.toggle("_active")
    document.addEventListener("click", closeIfClicked, false)
  }

  const closeIfClicked = (event: any) => {
    if (event.target.closest(".profile-header__drop") == null && !(event.target.classList.contains("profile-header__avatar"))) {
      document.querySelector(".profile-header__drop")!.classList.remove("_active")
      document.removeEventListener("click", closeIfClicked, false)
    }
  }

  const changeTheme = () => {
    setTheme(IThemes.DARK);
    localStorage.setItem('theme', IThemes.DARK);
  };

  return (
    <header className='header'>
      <div className='header__inner'>
        <div className='header__logo logo-header'>
          <Link to='/' className='logo-header__logo' onClick={(e: any) => showDrop()}>Template</Link>
        </div>
        <div className='header__drop'>
          <div className='header__links links-header'>
            <Link to='/' className='links-header__link' onClick={(e: any) => showDrop()}>Link</Link>
          </div>
          <div className='header__profile profile-header'>
            {isAuth ?
              <>
                <button className='profile-header__avatar-button'><img className='profile-header__avatar' onClick={() => showProfile()} width={60} height={60} src={""} /></button>
                <div className='profile-header__drop'>
                  <div className='profile-header__info'>
                    <Link className='profile-header__avatar-link' to={'/users/'}><img className='profile-header__avatar' width={60} height={60} src={""} /></Link>
                    <div className='profile-header__info-text'>
                      <h1 className='profile-header__name'>{user['username']}</h1>
                    </div>
                  </div>
                  <div className='profile-header__links'>
                    <Link to={'/users/'} onClick={(e: any) => showDrop()} className='profile-header__link'>Profile</Link>
                    <Link to='/users/options' onClick={(e: any) => showDrop()} className='profile-header__link'>Options</Link>
                    <a className='profile-header__link' onClick={() => showDrop()}>Log out</a>
                  </div>
                </div>
              </>
              :
              <>
                <button className='profile-header__link' onClick={() => setPrompt(
                  <Prompt title="Login">
                    <FormLogin />
                  </Prompt>
                )}>Log in</button>
                <button className='profile-header__link' onClick={() => setPrompt(
                  <Prompt title="Register">
                    <FormRegister />
                  </Prompt>
                )}>Register</button>
              </>
            }
          </div>
        </div>
        <label className="header__burger burger-header" onClick={() => showDrop()}>
          <span className="burger__toggle"></span>
        </label>
      </div>
    </header>
  )
}

export default Header