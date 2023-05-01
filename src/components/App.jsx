import { useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ContactsForm } from './ContactsForm/ContactsForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { Title, Notification } from './App.styles';
import { useEffect } from 'react';
import { setFilter, addContact, deleteContact } from 'store/contactsSlice';
import { persistor } from 'store/store';

export function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);

  useEffect(() =>
    localStorage.setItem('contacts', JSON.stringify(contacts), [contacts])
  );

  const handleAddContact = newContact => {
    dispatch(addContact(newContact));
  };

  const handleFilter = e => {
    dispatch(setFilter(e.target.value));
  };

  const getVisiableContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  const contactsList = getVisiableContacts();

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Title>Phonebook</Title>
      <ContactsForm onSubmit={handleAddContact} />
      <Title>Contacts</Title>
      {contactsList.length !== 0 ? (
        <>
          <Filter filter={filter} handleFilter={handleFilter} />
          <ContactsList handleDelete={handleDelete} contacts={contactsList} />
        </>
      ) : (
        <Notification>Contact list is empty =(</Notification>
      )}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </PersistGate>
  );
}
