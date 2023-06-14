import { useSelector, useDispatch } from 'react-redux';
import style from './Filter.module.css';
import { updateFilter } from 'redux/contacts/filter';
import { selectFilter } from 'redux/contacts/contactsSlice';

const Filter = () => {
  const value = useSelector(selectFilter);

  const dispatch = useDispatch();

  function onFilterChange(event) {
    dispatch(updateFilter(event.currentTarget.value));
  }

  return (
    <label className={style.wrapper}>
      Filter contacts:
      <input
        type="text"
        name="filter"
        onChange={onFilterChange}
        value={value}
        className={style.input}
      />
    </label>
  );
};

export default Filter;
