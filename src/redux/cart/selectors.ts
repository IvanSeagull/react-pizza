import { RootState } from '../store';

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemsById = (id: number) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);