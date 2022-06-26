import { currentPageType } from '../filter/types';

export type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
  category: number;
};

export type FetchPizzasArgs = {
  categoryId: number;
  sortId: number;
  currentPage: currentPageType;
  searchValue: string;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
