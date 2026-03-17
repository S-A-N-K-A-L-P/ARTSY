import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../../types/user';

interface UserState {
  currentProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentProfile: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentProfile: (state, action: PayloadAction<UserProfile>) => {
      state.currentProfile = action.payload;
      state.loading = false;
      state.error = null;
    },
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProfileError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearProfile: (state) => {
      state.currentProfile = null;
    }
  },
});

export const { setCurrentProfile, setProfileLoading, setProfileError, clearProfile } = userSlice.actions;
export default userSlice.reducer;