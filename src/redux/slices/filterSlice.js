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
  },
});

export const { setCategoryId, setSortId, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
