import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { currentPageType, FilterSliceState } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sortId: 0,
  currentPage: { selected: 0 },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortId(state, action: PayloadAction<number>) {
      state.sortId = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<currentPageType>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = +action.payload.categoryId;
      state.sortId = +action.payload.sortId;
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const { setSearchValue, setCategoryId, setSortId, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
