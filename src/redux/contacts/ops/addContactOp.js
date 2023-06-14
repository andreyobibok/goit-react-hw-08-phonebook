import { createAsyncThunk } from '@reduxjs/toolkit';
import { postContact } from 'js/connectionsAPI';
import { filterAxiosError } from 'js/serializeAxiosData';
import { selectUserToken } from 'redux/auth/authSlice';
import { toast } from 'react-toastify';

export const addContactOp = createAsyncThunk(
  'items/addContact',
  async (contact, thunkAPI) => {
    let response;
    const token = selectUserToken(thunkAPI.getState());

    try {
      response = await postContact(contact, token);
    } catch (error) {
      if (error.name === 'AxiosError') {
        const serializedError = filterAxiosError(error);
        return thunkAPI.rejectWithValue(serializedError);
      } else {
        throw error;
      }
    }
    return response.data;
  },
  {
    condition: (contact, { getState, extra }) => {
      const { contacts } = getState();
      const contactList = contacts && contacts.items ? contacts.items : [];
      const { name: newName } = contact;
      const normalizedNewName = newName.toLowerCase();

      if (
        contactList.some(contact => {
          return contact.name.toLowerCase() === normalizedNewName;
        })
      ) {
        toast.error(`${newName} is already in contacts.`, { autoClose: 2000 });
        return false;
      }
    },
  }
);
