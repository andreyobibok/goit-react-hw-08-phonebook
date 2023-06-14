import { createSlice } from '@reduxjs/toolkit';
import { getContactsOp, addContactOp } from './ops';

export const contactItemsSlice = createSlice({
  name: 'items',
  initialState: null,
  reducers: {
    deleteContactFromRedux: (items, action) => {
      const id = action.payload;
      return items.filter(contact => {
        return contact.id !== id;
      });
    },
  },
  extraReducers: {
    [getContactsOp.fulfilled]: (items, action) => {
      return action.payload;
    },
    [addContactOp.fulfilled]: (items, action) => {
      if (!items) {
        return [action.payload];
      }
      return [...items, action.payload];
    },
  },
});

export const { deleteContactFromRedux } = contactItemsSlice.actions;

export default contactItemsSlice.reducer;
