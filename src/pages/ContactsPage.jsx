import Loader from 'components/Loader/Loader';
import Form from 'components/Form/Form';
import List from 'components/Contacts/Contacts';
import Filter from 'components/Filter/Filter';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/contactsSlice';
import { selectIsLoading } from '../redux/contactSelectors';
import { IconContext } from 'react-icons';
import { ImUserPlus, ImUsers } from 'react-icons/im';
import css from './ContactsPage.module.css';

const ContactsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
    <div className={css.wrapper}>
    <div className={css.header}>
      <h2 className={css.title}>Add contacts</h2>
      <IconContext.Provider value={{ size: 32 }}>
        <ImUserPlus />
      </IconContext.Provider>
    </div>
      <Form />
    <div className={css.header}>
      <h2 className={css.title}>Contacts</h2>
      <IconContext.Provider value={{ size: 32 }}>
        <ImUsers />
      </IconContext.Provider>
    </div>
      <Filter />
      {selectIsLoading === true && <Loader />}
      <List />
    </div>
    </>
  );
};

export default ContactsPage;