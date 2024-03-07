import {
    getContactsApi,
    addContactsApi,
    deleteContactsApi,
  } from 'api';
  
  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
  
  
  export const getContacts = createAsyncThunk(
    'getContacts',
    async (_, thunkAPI) => {
      try {
        const contacts = await getContactsApi();
        return contacts;
      } catch (error) {
        thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  export const addContacts = createAsyncThunk(
    'addContacts',
    async (newContact, thunkAPI) => {
      try {
        const contact = await addContactsApi(newContact);
        return contact;
      } catch (error) {
        thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  export const deleteContacts = createAsyncThunk(
    'deleteContacts',
    async (newContact, thunkAPI) => {
      try {
        const deletedContacts = await deleteContactsApi(newContact);
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
        .addCase(getContacts.pending, state => {
          state.contacts.isLoading = true;
          state.contacts.error = null;
        })
        .addCase(getContacts.fulfilled, (state, action) => {
          state.contacts.isLoading = false;
          state.contacts.items = action.payload;
        })
        .addCase(getContacts.rejected, (state, action) => {
          state.contacts.isLoading = false;
          state.contacts.error = action.payload;
        })
  
        .addCase(addContacts.pending, state => {
          state.contacts.isLoading = true;
          state.contacts.error = null;
        })
        .addCase(addContacts.fulfilled, (state, action) => {
          state.contacts.isLoading = false;
          state.contacts.items = [action.payload, ...state.contacts.items];
        })
        .addCase(addContacts.rejected, (state, action) => {
          state.contacts.isLoading = false;
          state.contacts.error = action.payload;
        })
  
        .addCase(deleteContacts.pending, state => {
          state.contacts.isLoading = true;
          state.contacts.error = null;
        })
        .addCase(deleteContacts.fulfilled, (state, action) => {
          state.contacts.isLoading = false;
          state.contacts.items = state.contacts.items.filter(
            contact => contact.id !== action.payload.id
          );
        })
        .addCase(deleteContacts.rejected, (state, action) => {
          state.contacts.isLoading = false;
          state.contacts.error = action.payload;
        }),
  });
  export const { setFilter } = contactsSlice.actions;
  export const contactsReducer = contactsSlice.reducer;