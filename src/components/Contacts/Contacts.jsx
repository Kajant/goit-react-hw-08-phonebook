import { useDispatch, useSelector } from 'react-redux';
import { deleteContacts } from '../../redux/contactsSlice';
import { selectVisibleContacts } from '../../redux/contactSelectors';
import { IconContext } from 'react-icons';
import { ImPhone, ImCross } from "react-icons/im";
import css from "./Contacts.module.css";

const List = () => {
  const dispatch = useDispatch();
  const selectedContacts = useSelector(selectVisibleContacts);

  const onDelete = contactId => {
    dispatch(deleteContacts(contactId));
  };

  return (
    <ul className={css.contactList}>
    {selectedContacts.map(({ id, name, number }) => (
      <li className={css.item} key={id}>
        <div className={css.contact}>
        <a className={css.icon} href={`tel:${number}`}>
          <IconContext.Provider value={{ size: 12 }}>
            <ImPhone />
          </IconContext.Provider>
        </a>
        <div className={css.contactNumber}>
                {name}: {number}                    
        </div>
        </div>
        <button className={css.btn} onClick={() => onDelete(id)}>
         <IconContext.Provider value={{ size: 12 }}>
            <ImCross />
          </IconContext.Provider>
        </button>
      </li>
    ))}
  </ul>
  );
};
export default List;