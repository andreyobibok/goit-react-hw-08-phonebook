import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser } from 'js/connectionsAPI';
import { filterAxiosError } from 'js/serializeAxiosData';

export const registerUserOp = createAsyncThunk(
  'auth/registerUser',
  async (newUserCreds, thunkAPI) => {
    let response;
    try {
      response = await registerUser(newUserCreds);
    } catch (error) {
      if (error.name === 'AxiosError') {
        const serializedError = filterAxiosError(error);
        return thunkAPI.rejectWithValue(serializedError);
      } else {
        throw error;
      }
    }

    if (response.status !== 201) {
      return thunkAPI.rejectWithValue(response);
    }
    return response.data;
  }
);
