import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/contactsSlice';
import { selectFilter } from '../../redux/contactSelectors';
import { IconContext } from 'react-icons';
import { ImFilter } from "react-icons/im";
import css from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectFilter);
  const onInput = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <>
    <div className={css.filter}>
      <p className={css.info}>Search contacts</p>
      <input
        className={css.input}
        type="text"
        value={search}
        name="search"
        placeholder="Search"
        onChange={onInput}
      />
      <div className={css.icon}>
      <IconContext.Provider value={{ size: 12 }}>
        <ImFilter/>
      </IconContext.Provider>
      </div>
    </div>
    </>
  );}

  export default Filter;