import { useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { Title, Notification } from './App.styles';
import { persistor } from 'redux/store';
import { selectorContacts } from 'redux/selectors';

export function App() {
  const contacts = useSelector(selectorContacts);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Title>Phonebook</Title>
      <ContactsForm />
      <Title>Contacts</Title>
      {contacts.length !== 0 ? (
        <>
          <Filter />
          <ContactsList />
        </>
      ) : (
        <Notification>Contact list is empty =(</Notification>
      )}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </PersistGate>
  );
}
