import React from 'react';
import { Oval } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
    <Oval
      visible={true}
      height="80"
      width="80"
      color="rgb(181, 181, 181)"
      secondaryColor="rgb(140, 140, 140)"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass="css.loader"
    />
    </div>
  );
};

export default Loader;