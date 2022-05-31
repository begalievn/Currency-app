import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./features/currencySlice";

export default configureStore({
  reducer: {
    currency: currencyReducer,
  },
});
