import { createReducer } from '@reduxjs/toolkit';
import { refreshUserOp } from './ops';

const restoringSession = createReducer(false, {
  [refreshUserOp.pending]: status => {
    return true;
  },

  [refreshUserOp.fulfilled]: status => {
    return false;
  },

  [refreshUserOp.rejected]: status => {
    return false;
  },
});

export default restoringSession;
