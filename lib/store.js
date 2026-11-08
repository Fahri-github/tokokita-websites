import { configureStore, createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem(state, { payload: p }) {
      const found = state.items.find((i) => i.id === p.id);
      if (found) found.qty += 1;
      else state.items.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
    },
    removeItem(state, { payload: id }) {
      state.items = state.items.filter((i) => i.id !== id);
    },
  },
});

export const { addItem, removeItem } = cart.actions;
export const selectCartCount = (s) => s.cart.items.reduce((n, i) => n + i.qty, 0);
export const store = configureStore({ reducer: { cart: cart.reducer } });
