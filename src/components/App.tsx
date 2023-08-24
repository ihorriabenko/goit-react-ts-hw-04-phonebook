import { useEffect, useState } from 'react';
import { Contact } from '../types/common';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import Title from './Title/Title';
import s from './app.module.scss';

const App: React.FC = (): JSX.Element => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');

    if (storedContacts && storedContacts.length > 2) {
      const parsedContacts: Contact[] = JSON.parse(storedContacts);

      setContacts([...parsedContacts]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={s.app}>
      <Title type='h2' text='Phonebook' />
      <ContactsForm contacts={contacts} setContacts={setContacts} />
      <Title type='h2' text='Contacts' />
      <Filter filter={filter} setFilter={setFilter} />
      <ContactsList
        contacts={contacts}
        filter={filter}
        setContacts={setContacts}
      />
    </div>
  );
};

export default App;
