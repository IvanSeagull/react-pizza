import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchPizzasArgs, Pizza } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  'pizza/fetchPizzas',
  async ({ categoryId, sortId, currentPage, searchValue }) => {
    const { data } = await axios.get<Pizza[]>('/api/pizzas.json');

    return filterPizzas(data, categoryId, sortId, searchValue);
  },
);

// filter pizzas (cuz I dont have proper api for this, IM STORING PIZZAS IN JSON)
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
