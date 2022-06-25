import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import React from 'react';
import { RootState } from '../store';
import { currentPageType } from './filterSlice';

type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
  category: number;
};

type FetchPizzasArgs = {
  categoryId: number;
  sortId: number;
  currentPage: currentPageType;
  searchValue: string;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
};

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  'pizza/fetchPizzas',
  async ({ categoryId, sortId, currentPage, searchValue, setTotalPages }) => {
    const { data } = await axios.get<Pizza[]>('/api/pizzas.json');
    setTotalPages(Math.ceil(data.length / 4));

    const res = filterPizzas(data, categoryId, sortId, searchValue);
    return res.slice(4 * currentPage.selected, 4 * (currentPage.selected + 1));
  },
);

// filter pizzas (cuz I dont have proper api for this, IM STORING PIZZAS ON JSON)
const filterPizzas = (items: Pizza[], categoryId: number, sortId: number, searchValue: string) => {
  if (categoryId !== 0) {
    items = items.filter((pizza) => pizza.category === categoryId);
  }
  switch (sortId) {
    case 1:
      items = items.sort((a, b) => (a.title > b.title ? 1 : -1));
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

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
  //   loading | success | error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
