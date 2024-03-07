import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/contactsSlice';
import { selectFilter } from '../../redux/Selectors';
import css from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = () => {
    const dispatch = useDispatch();
  
    const filter = useSelector(selectFilter);
  
    const onFilterChange = e => {
      dispatch(setFilter(e.target.value));
    };
    return (
        <div className={css.filter}>
            <p className={css.info}>Find contacts by name</p>
            <input className={css.input} type="text" name="filter" placeholder="name" value={filter} onChange={onFilterChange} />
        </div>
    )
}
Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    filterInput: PropTypes.func,
};

export default Filter;