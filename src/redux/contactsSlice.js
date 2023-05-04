// import { combineReducers } from 'redux';
import { initialState } from './initialState';
// import { increment } from './actions';
import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: initialState,
    filter: '',
  },
  reducers: {
    addContact: (state, { payload }) => {
      state.items.push(payload);
      state.filter = '';
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    deleteContact: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(contact => contact.id !== id);
      state.filter = '';
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
  whitest: ['items'],
};

export const contactsReducers = contactsSlice.reducer;

export const persistedReducer = persistReducer(persistConfig, contactsReducers);

export const { addContact, deleteContact, setFilter } = contactsSlice.actions;
