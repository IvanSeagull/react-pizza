import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: 0,
  sortId: 0,
  currentPage: { selected: 0 },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortId(state, action) {
      state.sortId = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = +action.payload.categoryId;
      state.sortId = +action.payload.sortProperty;
      state.currentPage = { selected: action.payload.currentPage };
    },
  },
});

export const selectFilter = (state) => state.filter;

export const selectSort = (state) => state.filter.sortId;

export const selectCategory = (state) => state.filter.categoryId;

export const { setSearchValue, setCategoryId, setSortId, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
