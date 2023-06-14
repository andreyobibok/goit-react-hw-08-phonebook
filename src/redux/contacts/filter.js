import { createSlice } from '@reduxjs/toolkit';

const contactFilterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    updateFilter(filter, action) {
      if (action.payload === filter) {
        return filter;
      }
      return action.payload;
    },
  },
});

export const { updateFilter } = contactFilterSlice.actions;
export default contactFilterSlice.reducer;
