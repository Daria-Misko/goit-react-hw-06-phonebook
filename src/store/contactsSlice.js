// import { combineReducers } from 'redux';
import { initialState } from './initialState';
// import { increment } from './actions';
import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: initialState,
    filter: '',
  },
  reducers: {
    addContact: (state, action) => {
      const newContact = action.payload;
      if (
        state.contacts.find(
          contact =>
            contact.name.toLowerCase() === newContact.name.toLowerCase() ||
            contact.number === newContact.number
        )
      ) {
        toast.error(
          `${newContact.name} or ${newContact.number} has already existed`
        );
      } else {
        state.contacts.push(newContact);
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    deleteContact: (state, action) => {
      const id = action.payload;
      state.contacts = state.contacts.filter(contact => contact.id !== id);
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactsReducers = contactsSlice.reducer;

export const persistedReducer = persistReducer(persistConfig, contactsReducers);

export const { addContact, deleteContact, setFilter } = contactsSlice.actions;
