import { Contact } from '../../types/common';
import s from './contactsList.module.scss';

interface ContactsListProps {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  filter: string;
}

const ContactsList: React.FC<ContactsListProps> = ({
  contacts,
  setContacts,
  filter,
}): JSX.Element => {
  const renderContacts = () => {
    if (!filter) {
      return contacts;
    }

    const filterValue = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const nameValue = name.toLowerCase();
      return nameValue.includes(filterValue);
    });

    return filteredContacts;
  };

  const removeContact = (id: string) => {
    const filteredContacts = contacts.filter((el) => el.id !== id);

    setContacts([...filteredContacts]);
  };

  const elements = renderContacts().map((el) => (
    <li className={s.list__item} key={el.id}>
      <p>{el.name}</p>
      <p>{el.number}</p>
      <button className={s.list__btn} onClick={() => removeContact(el.id)}>x</button>
    </li>
  ));

  return <>{elements && <ul className={s.list}>{elements}</ul>}</>;
};

export default ContactsList;
