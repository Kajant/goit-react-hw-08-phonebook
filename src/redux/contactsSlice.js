import {
  getAddContact,
  getAllContacts,
  getDeleteContact,
} from '../api';

import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';


export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const contacts = await getAllContacts();
      return contacts;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      const contact = await getAddContact(newContact);
      return contact;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  'contacts/deleteContacts',
  async (newContact, thunkAPI) => {
    try {
      const deletedContacts = await getDeleteContact(newContact);
      return deletedContacts;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

const INITIAL_STATE = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: INITIAL_STATE,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder =>
    builder

      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })

      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = [action.payload, ...state.contacts.items];
      })

      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== action.payload.id
        );
      })

      .addMatcher(
        isAnyOf(
          addContact.pending,
          fetchContacts.pending,
          deleteContacts.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          addContact.rejected,
          fetchContacts.rejected,
          deleteContacts.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});
export const { setFilter } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;