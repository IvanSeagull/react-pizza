import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async ({ categoryId, sortId, currentPage, searchValue, setTotalPages }) => {
    const { data } = await axios.get('/api/pizzas.json');
    setTotalPages(Math.ceil(data.length / 4));

    const res = filterPizzas(data, categoryId, sortId, searchValue);
    return res.slice(4 * currentPage.selected, 4 * (currentPage.selected + 1));
  },
);

// filter pizzas (cuz I dont have proper api for this, IM STORING PIZZAS ON JSON)
const filterPizzas = (items, categoryId, sortId, searchValue) => {
  if (categoryId !== 0) {
    items = items.filter((pizza) => pizza.category === categoryId);
  }
  switch (sortId) {
    case 1:
      items = items.sort((a, b) => (a.name > b.name ? 1 : -1));
      break;
    case 2:
      items = items.sort((a, b) => a.price - b.price);
      break;
    case 3:
      items = items.sort((a, b) => b.price - a.price);
      break;
    case 4:
      items = items.sort((a, b) => b.rating - a.rating);
      break;
    case 5:
      items = items.sort((a, b) => a.rating - b.rating);
      break;
    default:
      break;
  }

  return items.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLocaleLowerCase()));
};

const initialState = {
  items: [],
  status: 'loading',
  //   loading | success | error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectPizza = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
