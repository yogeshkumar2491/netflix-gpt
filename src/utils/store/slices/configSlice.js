import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: { locale: "en" },
  reducers: {
    updateLocale: (state, action) => {
      state.locale = action.payload;
    },
  },
});

export const { updateLocale } = configSlice.actions;
export default configSlice.reducer;
