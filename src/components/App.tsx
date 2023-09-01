import { useEffect, useState } from 'react';
import { Contact, ContactWithoutId } from '../types/common';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import Title from './Title/Title';
import s from './app.module.scss';

const App: React.FC = (): JSX.Element => {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const storedContacts = localStorage.getItem('contacts');

    return JSON.parse(storedContacts as string) || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact: ContactWithoutId) => {
    const userExists = contacts.find(
      (el) => el.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (userExists) return alert(`${userExists.name} already in contacts`);

    setContacts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: contact.name,
        contactNumber: contact.contactNumber,
      },
    ]);
  };

  const removeContact = (id: string) => {
    setContacts((prev) => prev.filter((el) => el.id !== id));
  };

  const renderContacts = () => {
    const filterValue = filter.toLowerCase();

    return contacts.filter(({ name }) => {
      const nameValue = name.toLowerCase();

      return nameValue.includes(filterValue);
    });
  };

  return (
    <div className={s.app}>
      <Title type='h2' text='Phonebook' />
      <ContactsForm addContact={addContact} />
      <Title type='h2' text='Contacts' />
      <Filter filter={filter} setFilter={setFilter} />
      <ContactsList
        removeContact={removeContact}
        renderContacts={renderContacts()}
      />
    </div>
  );
};

export default App;
