import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortId: 0,
  currentPage: { selected: 0 },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
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
      console.log(state.categoryId, state.sortId, state.currentPage);
    },
  },
});

export const { setCategoryId, setSortId, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
