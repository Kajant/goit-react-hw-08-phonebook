import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import Notiflix from 'notiflix';
import css from './Form.module.css';
import { IconContext } from 'react-icons';
import { ImPlus } from "react-icons/im";

  const Form = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts.items);


  const onInputChange = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'number':
        setNumber(event.target.value);
        break;
      default:
        Notiflix.Notify.warning('Error');
    }
  };

    const reset = () => {
      setName('');
      setNumber('');
    };

    const onForm = event => {
      event.preventDefault();
      const newContact = {
        name,
        number,
      };
      const newName = contacts.find(
        el => el.name.toLowerCase() === name.toLowerCase()
      );
  
      if (newName) {
        Notiflix.Notify.info(`${name} is already is in contacts.`);
        return;
      }
      dispatch(addContact(newContact));
      reset();
    };

  return (
    <form 
    className={css.form} 
    onSubmit={onForm}>
      <label className={css.label}>Name
        <input
          className={css.input}
          type="text"
          value={name}
          onChange={onInputChange}
          name="name"
          placeholder="name"
          required
        />
      </label>
      <label className={css.label}>Number
        <input
          className={css.input}
          type="tel"
          value={number}
          onChange={onInputChange}
          name="number"
          placeholder="123-45-67"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          required
        />
      </label>
      <button className={css.btn} type="submit">
          <IconContext.Provider value={{ size: 12 }}>
            <ImPlus/>
          </IconContext.Provider>
      </button>
    </form>
  );
};

export default Form;