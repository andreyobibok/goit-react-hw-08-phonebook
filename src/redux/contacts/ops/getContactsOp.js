import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchContacts } from 'js/connectionsAPI';
import { filterAxiosError } from 'js/serializeAxiosData';
import { selectUserToken } from 'redux/auth/authSlice';

export const getContactsOp = createAsyncThunk(
  'items/getContacts',
  async (args, thunkAPI) => {
    let response;
    const token = selectUserToken(thunkAPI.getState());

    try {
      response = await fetchContacts(token);
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
    condition: (_, { getState, extra }) => {
      const { contacts } = getState();

      const { status } = contacts;
      if (status !== 'idle' && status !== 'success' && status !== 'error') {
        return false;
      }
      return true;
    },
  }
);
