import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';
import style from './ContactsPage.module.css';

export default function ContactsLayout(props) {
  return (
    <>
      <h1 className={style.header}>Phonebook</h1>
      <ContactForm />
      <h2 className={style.header}>Contacts</h2>
      <Filter />
      <ContactList />
    </>
  );
}
