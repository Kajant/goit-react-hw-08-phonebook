import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOutThunk } from '../../redux/authReducers';
import { selectUserEmail } from '../../redux/authSelectors';
import Notiflix from 'notiflix';
import {  ImExit, ImSmile } from 'react-icons/im';
import { IconContext } from 'react-icons';
import css from './Menu.module.css';


const UserMenu = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);

  const onLogOut = () => {
    dispatch(logOutThunk())
      .unwrap()
      .then(() => Notiflix.Notify.success("Logout"));
  };
  return (
    <div className={css.menu}>
      <div className={css.container}>
      <IconContext.Provider value={{ size: 16 }}>
        <ImSmile />
      </IconContext.Provider>
      {userEmail}
      </div>
      <div className={css.container}>
      Log Out
      <button className={css.btn} onClick={onLogOut} type="button">
      <IconContext.Provider value={{ size: 12 }}>
        <ImExit />
      </IconContext.Provider>
      </button>
      </div>
    </div>
  );
};

export default UserMenu;