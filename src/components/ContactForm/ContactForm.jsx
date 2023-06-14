import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import style from './ContactForm.module.css';
import { addContactOp } from 'redux/contacts/ops';
import { selectStatus } from 'redux/contacts/contactsSlice';

const INIT_STATE = {
  name: '',
  number: '',
};

export default function ContactForm() {
  const [contact, setContact] = useState({ ...INIT_STATE });
  const dispatch = useDispatch();

  function onInputChange(event) {
    const { name, value } = event.currentTarget;
    setContact({ ...contact, [name]: value });
  }

  function onFormSubmit(event) {
    event.preventDefault();

    dispatch(addContactOp(contact));
    setContact({ ...INIT_STATE });
  }

  const reduxStatus = useSelector(selectStatus);

  function isAdding() {
    if (reduxStatus === 'adding') {
      return true;
    }
    return false;
  }

  function submitButtonTitle() {
    if (reduxStatus === 'adding') {
      return 'Adding...';
    }
    return 'Add contact';
  }

  return (
    <form action="submit" className={style.form} onSubmit={onFormSubmit}>
      <label className={style.label}>
        Name
        <input
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={onInputChange}
          value={contact.name}
          className={style.input}
        />
      </label>

      <label className={style.label}>
        Phone number
        <input
          type="tel"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={onInputChange}
          value={contact.number}
          className={style.input}
        />
      </label>

      <button type="submit" className={style.button} disabled={isAdding()}>
        {submitButtonTitle()}
      </button>
    </form>
  );
}
