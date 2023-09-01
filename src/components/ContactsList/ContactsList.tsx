import { Contact } from '../../types/common';
import s from './contactsList.module.scss';

interface ContactsListProps {
  removeContact: (id: string) => void;
  renderContacts: Contact[];
}

const ContactsList: React.FC<ContactsListProps> = ({
  removeContact,
  renderContacts,
}): JSX.Element => {
  const elements = renderContacts.map((el) => (
    <li className={s.list__item} key={el.id}>
      <p>{el.name}</p>
      <p>{el.contactNumber}</p>
      <button className={s.list__btn} onClick={() => removeContact(el.id)}>
        x
      </button>
    </li>
  ));

  return <>{elements && <ul className={s.list}>{elements}</ul>}</>;
};

export default ContactsList;
