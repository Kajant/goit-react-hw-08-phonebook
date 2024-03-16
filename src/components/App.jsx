import { useDispatch, useSelector } from 'react-redux';
import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import UserMenu from './Menu/Menu';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Loader from './Loader/Loader';
import Notiflix from 'notiflix'
import {
  selectAuthError,
  selectAuthIsAuth,
  selectAuthIsLoading,
} from '../redux/authSelectors';
import { refreshThunk } from '../redux/authReducers';
import { selectError } from '../redux/contactSelectors';

const RegisterPage = lazy(() => import('pages/RegisterPage'));
const HomePage = lazy(() => import('pages/HomePage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const ContactsPage = lazy(() => import('pages/ContactsPage'));

const appRoutes = [
  { path: '/', element: <HomePage /> },
  {
    path: '/register',
    element: (
      <RestrictedRoute>
        <RegisterPage />
      </RestrictedRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <RestrictedRoute>
        <LoginPage />
      </RestrictedRoute>
    ),
  },
  {
    path: '/contacts',
    element: (
      <PrivateRoute>
        <ContactsPage />
      </PrivateRoute>
    ),
  },
];

export const App = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectAuthIsAuth);
  const isLoading = useSelector(selectAuthIsLoading);
  const errorAuth = useSelector(selectAuthError);
  const errorFetch = useSelector(selectError);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return (
    <>
    <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
      {isAuth === true && <UserMenu />}
      {isLoading === true && <Loader />}
      {errorAuth || (errorFetch && Notiflix.Notify.warning('Error'))}
  </>
);
};