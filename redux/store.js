import { configureStore } from "@reduxjs/toolkit";
import { cardReducer } from "./slices/cardSlice";
import { addProduct, reset } from "./slices/cardSlice";
const store = configureStore({
  reducer: {
    card: cardReducer,
  },
});

export { store, addProduct, reset };
