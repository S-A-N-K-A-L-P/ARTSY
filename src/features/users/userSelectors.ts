import { RootState } from '../../store/store';

export const selectCurrentProfile = (state: RootState) => state.user.currentProfile;
export const selectProfileLoading = (state: RootState) => state.user.loading;
export const selectProfileError = (state: RootState) => state.user.error;