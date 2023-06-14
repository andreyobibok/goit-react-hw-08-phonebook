import { createAsyncThunk } from '@reduxjs/toolkit';
import { refreshUser } from 'js/connectionsAPI';
import { selectUserToken } from '../authSlice';
import { filterAxiosError } from 'js/serializeAxiosData';

export const refreshUserOp = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    let response;

    const state = thunkAPI.getState();
    const token = selectUserToken(state);

    try {
      response = await refreshUser(token);
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
    condition: (args, { getState, extra }) => {
      const token = selectUserToken(getState());

      if (!token) {
        return false;
      }
      return true;
    },
  }
);
