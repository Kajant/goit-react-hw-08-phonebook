import Form  from './Form/Form';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { Oval } from 'react-loader-spinner';
import { selectIsLoading } from '../redux/Selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getContacts } from '../redux/contactsSlice';
import css from './App.module.css';

export const App = () => {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

      return (
        <div>
          <div className={css.wrapper}>
            <h1 className={css.title}>Phonebook</h1>
            <Form />
          </div>
          <div className={css.wrapper}>
            <h2 className={css.title}>Contacts</h2>
            <Filter/>
            {isLoading === true && (
              (<div className={css.loader}>
              <Oval
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
                </div>)
            )}
            <Contacts/>
          </div>
        </div>
      );
    }
export default App;