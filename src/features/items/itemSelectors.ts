import { RootState } from '../../store/store';

export const selectItemsList = (state: RootState) => state.items.list;
export const selectSingleItem = (state: RootState) => state.items.singleItem;
export const selectItemsLoading = (state: RootState) => state.items.loading;
export const selectItemsError = (state: RootState) => state.items.error;