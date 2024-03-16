import React from 'react';
import { IconContext } from 'react-icons';
import { ImAddressBook } from 'react-icons/im';
import css from './HomePage.module.css'

const HomePage = () => {
  return (
    <>
    <div className={css.homepage}>
        <IconContext.Provider value={{ size: 88 }}>
          <ImAddressBook />
        </IconContext.Provider>
    </div>
    </>
  );
};

export default HomePage;