import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import ContactItem from '../ContactItem';
import styles from './ContactList.module.css';
import {
  selectItems,
  selectFilter,
  selectStatus,
} from 'redux/contacts/contactsSlice';

import { getContactsOp } from 'redux/contacts/ops';
import { deleteContactWithFeedback } from 'redux/contacts/ops/deleteContactOp';

const ContactList = () => {
  const [isContactFetched, setIsContactFetched] = useState(false);

  const lowCaseFilter = useSelector(selectFilter).toLowerCase();

  const dispatch = useDispatch();

  const contacts = useSelector(selectItems);
  const contactStatus = useSelector(selectStatus);

  useEffect(() => {
    if (!isContactFetched) {
      dispatch(getContactsOp());
      setIsContactFetched(true);
    }
    return () => {};
  }, [isContactFetched, dispatch]);

  return (
    <>
      {contactStatus === 'loading' && (
        <p className={styles.text}>[Loading contacts]</p>
      )}
      {contacts && contacts.length === 0 && (
        <p className={styles.text}>No contacts so far...</p>
      )}
      {contacts && contacts.length > 0 && (
        <ul className={styles.list}>
          {contacts.map(contact => {
            return (
              contact.name.toLowerCase().includes(lowCaseFilter) && (
                <li key={contact.id} className={styles.item}>
                  <ContactItem name={contact.name} number={contact.number} />
                  <button
                    type="button"
                    onClick={() => deleteContactWithFeedback(contact.id)}
                    className={styles.button}
                  >
                    Delete contact
                  </button>
                </li>
              )
            );
          })}
        </ul>
      )}
    </>
  );
};

export default ContactList;
