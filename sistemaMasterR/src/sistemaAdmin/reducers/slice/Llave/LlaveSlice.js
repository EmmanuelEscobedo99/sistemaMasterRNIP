import { createSlice } from "@reduxjs/toolkit";

const LlaveSlice = createSlice({
  name: "Llave",
  initialState: {
    value: null,
  },
  reducers: {
    setLlave: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLlave } = LlaveSlice.actions;
export default LlaveSlice.reducer;
