import { useState } from 'react';
import { Contact } from '../../types/common';
import s from './contactsForm.module.scss';

interface ContactsFormProps {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const ContactsForm: React.FC<ContactsFormProps> = ({
  contacts,
  setContacts,
}): JSX.Element => {
  const [contact, setContact] = useState({
    name: '',
    number: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const addContact: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const userExists = contacts.find(
      (el) => el.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (userExists) return alert(`${userExists.name} already in contacts`);

    setContacts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: contact.name,
        number: contact.number,
      },
    ]);

    setContact({ name: '', number: '' });
  };

  return (
    <>
      <form className={s.form} onSubmit={addContact}>
        <label className={s.form__label}>
          Name:
          <input
            className={s.form__input}
            onChange={handleChange}
            type='text'
            name='name'
            value={contact.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            maxLength={24}
            required
          />
        </label>
        <label className={s.form__label}>
          Phone:
          <input
            className={s.form__input}
            onChange={handleChange}
            type='tel'
            name='number'
            value={contact.number}
            pattern='\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}'
            maxLength={30}
            required
          />
        </label>
        <button className={s.form__btn}>Add contact</button>
      </form>
    </>
  );
};

export default ContactsForm;
