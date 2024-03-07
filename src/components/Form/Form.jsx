import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from '../../redux/contactsSlice';
import css from './Form.module.css';
import PropTypes from 'prop-types';

function Form() {
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts.items);

  const onInputChange = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'phone':
        setNumber(event.target.value);
        break;
      default:
        console.log("There isn't such case");
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const onFormSubmit = event => {
    event.preventDefault();
    const newContact = {
      name,
      phone,
    };
    const newName = contacts.find(
      el => el.name.toLowerCase() === name.toLowerCase()
    );

    if (newName) {
      alert(`${name} is already is in contacts.`);
      return;
    }
    dispatch(addContacts(newContact));
    reset();
  };

  return (
    <form
      className={css.form}
      onSubmit={onFormSubmit}>
      <label className={css.label}>Name
        <input
          className={css.input}
          value={name}
          onChange={onInputChange}
          type="text"
          name="name"
          placeholder="name"
          required />
      </label>
      <label className={css.label}>Number
        <input
          className={css.input}
          value={phone}
          onChange={onInputChange}
          type="tel"
          name="phone"
          placeholder="123-45-67"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          required />
      </label>
      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}
Form.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default Form;