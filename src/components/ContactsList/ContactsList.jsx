import { ContactsListItem } from './ContactsListItem/ContactsListItem';
import { List } from './ContactsList.styles';
import { useSelector } from 'react-redux';
import { selectorContacts, selectorFilter } from 'redux/selectors';

export const ContactsList = () => {
  const contacts = useSelector(selectorContacts);
  const filter = useSelector(selectorFilter);

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const contactsList = getVisibleContacts();

  if (!contactsList.length) return;
  return (
    <List>
      {contactsList.map(contact => (
        <ContactsListItem key={contact.id} contact={contact} />
      ))}
    </List>
  );
};
