import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../redux/authReducers';
import Notiflix from 'notiflix';
import { IconContext } from 'react-icons';
import { ImPen } from 'react-icons/im';
import css from "./RegisterPage.module.css";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(registerThunk(data))
      .unwrap()
      .then(() => {
       Notiflix.Notify.success('You are registered.')
      });
    reset();
  };

  return (
    <>
    <div className={css.wrapper}>
      <h2 className={css.title}>Register</h2>
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
          Name:
          <input className={css.input}
            {...register('name', { required: true })}
            type="text"
            placeholder="name"
          />
          {errors.name && <span>Enter your name</span>}
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
            <ImPen />
          </IconContext.Provider>
        </button>
      </form>
    </div>
    </>
  );
};

export default RegisterPage;