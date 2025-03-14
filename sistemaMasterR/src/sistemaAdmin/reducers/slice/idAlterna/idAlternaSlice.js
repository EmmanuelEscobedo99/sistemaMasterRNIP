import { createSlice } from "@reduxjs/toolkit";

const idAlternaSlice = createSlice({
  name: "idAlterna",
  initialState: {
    value: null,
  },
  reducers: {
    setIdAlterna: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIdAlterna } = idAlternaSlice.actions;
export default idAlternaSlice.reducer;
