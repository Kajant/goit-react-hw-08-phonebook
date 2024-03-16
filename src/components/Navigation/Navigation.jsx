import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthIsAuth } from '../../redux/authSelectors';
import { IconContext } from 'react-icons';
import { ImHome, ImAddressBook, ImPen, ImEnter } from 'react-icons/im';
import css from './Navigation.module.css';

const Navigation = () => {
  const isAuth = useSelector(selectAuthIsAuth);

  const addActive = ({ isActive }) =>
    `${css['navLink']} ${isActive ? css.active : ''}`;

  return (
    <header>
      <nav className={css.wrapper}>
        <NavLink className={addActive} to="/">
          <IconContext.Provider value={{ size: 32 }}>
            <ImHome />
          </IconContext.Provider>
        </NavLink>
        {isAuth ? (
          <>
            <NavLink className={addActive} to="/contacts">
              <IconContext.Provider value={{ size: 32 }}>
                <ImAddressBook />
              </IconContext.Provider>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className={addActive} to="/register">
              <IconContext.Provider value={{ size: 32 }}>
                <ImPen />
              </IconContext.Provider>
            </NavLink>
            <NavLink className={addActive} to="/login">
              <IconContext.Provider value={{ size: 32 }}>
                <ImEnter />
              </IconContext.Provider>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navigation;