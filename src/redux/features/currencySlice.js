import { createSlice } from "@reduxjs/toolkit";

export const currencySlice = createSlice({
  name: "currency",
  initialState: {
    value: [{ name: "Nurs" }, { name: "Aziret" }, { name: "Baiel" }],
  },
  reducers: {
    setValutes: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setValutes } = currencySlice.actions;

export default currencySlice.reducer;
