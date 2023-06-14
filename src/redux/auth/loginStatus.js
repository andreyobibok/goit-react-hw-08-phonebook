import { createReducer } from '@reduxjs/toolkit';
import {
  registerUserOp,
  loginUserOp,
  logoutUserOp,
  refreshUserOp,
} from './ops';

const loginStatus = createReducer(false, {
  [registerUserOp.fulfilled]: loginStatus => {
    return true;
  },

  [loginUserOp.fulfilled]: loginStatus => {
    return true;
  },

  [logoutUserOp.fulfilled]: loginStatus => {
    return false;
  },

  [refreshUserOp.fulfilled]: loginStatus => {
    return true;
  },
});

export default loginStatus;
