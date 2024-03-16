import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../redux/authReducers';
import Notiflix from 'notiflix';
import { IconContext } from 'react-icons';
import { ImEnter } from 'react-icons/im';
import css from "./LoginPage.module.css"


const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(loginThunk(data))
      .unwrap()
      .then(() => {
        Notiflix.Notify.success("You are loged.")
        });

    reset();
  };

  return (
    <>
    <div className={css.wrapper}>
      <h2 className={css.title}>Login</h2>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.label}>
          Email:
          <input className={css.input}
            {...register('email', { required: true })}
            type="email"
            placeholder="login@page.com"
          />
          {errors.email && <span>Enter your e-mail address</span>}
        </label>
        <label className={css.label}>
          Password:
          <input className={css.input}
            {...register('password', { required: true, minLength: 8 })}
            type="password"
          />
          {errors.password && <span>Enter your password</span>}
        </label>
        <button className={css.btn} type="submit">
          <IconContext.Provider value={{ size: 32 }}>
            <ImEnter />
          </IconContext.Provider>
        </button>
      </form>
      </div>
    </>
  );
};

export default LoginPage;