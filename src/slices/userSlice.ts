import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '../utils/types';
import {
  getUserApi,
  updateUserApi,
  loginUserApi,
  registerUserApi,
  logoutApi,
  forgotPasswordApi,
  resetPasswordApi,
  TRegisterData
} from '../utils/burger-api';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

type TUserState = {
  user: TUser | null;
  loading: boolean;
  error: string | null;
  isAuthChecked: boolean;
};

export const initialState: TUserState = {
  user: null,
  loading: false,
  error: null,
  isAuthChecked: false
};

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: { email: string; password: string }) => loginUserApi(data)
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: { email: string; name: string; password: string }) =>
    registerUserApi(userData)
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  const data = await logoutApi();
  return data;
});

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email: string) => {
    await forgotPasswordApi({ email });
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ password, token }: { password: string; token: string }) => {
    await resetPasswordApi({ password, token });
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        throw new Error('No access token');
      }
      const data = await getUserApi();
      return data.user;
    } catch (error) {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    removeError(state) {
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user!.name = action.payload.user.name;
        state.user!.email = action.payload.user.email;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка авторизации';
      })
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка выхода';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
        state.isAuthChecked = true;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка восстановления пароля';
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка сброса пароля';
      });
  },
  selectors: {
    selectorError: (state) => state.error,
    selectorUser: (state) => state.user,
    selectorIsAuthChecked: (state) => state.isAuthChecked,
    selectorLoading: (state) => state.loading
  }
});

export const {
  selectorError,
  selectorUser,
  selectorIsAuthChecked,
  selectorLoading
} = userSlice.selectors;
export const { setAuthChecked, removeError } = userSlice.actions;
export default userSlice.reducer;
