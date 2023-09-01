import { useState } from 'react';
import { ContactWithoutId } from '../../types/common';
import s from './contactsForm.module.scss';

interface ContactsFormProps {
  addContact: (contact: ContactWithoutId) => void;
}

const ContactsForm: React.FC<ContactsFormProps> = ({
  addContact,
}): JSX.Element => {
  const [contact, setContact] = useState({
    name: '',
    contactNumber: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    addContact(contact);

    setContact({ name: '', contactNumber: '' });
  };

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
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
            name='contactNumber'
            value={contact.contactNumber}
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
