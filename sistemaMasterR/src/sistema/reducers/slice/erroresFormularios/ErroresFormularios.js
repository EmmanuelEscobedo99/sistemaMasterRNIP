import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editarPersonas: false,
  editarPersonasC: false,
  editarPersonasT: false,
  editarPersonasD: false,
};

const erroresFormulariosSlice = createSlice({
  name: 'erroresFormularios',
  initialState,
  reducers: {
    setEditarPersonasError: (state, action) => {     
      state.editarPersonas = action.payload;
    },
    setEditarPersonasCError: (state, action) => {     
      state.editarPersonasC = action.payload;
    },
    setEditarPersonasTError: (state, action) => {
      state.editarPersonasT = action.payload;
    },
    setEditarPersonasDError: (state, action) => {
      state.editarPersonasD = action.payload;
    },
  },
});

export const {
  setEditarPersonasError,
  setEditarPersonasCError,
  setEditarPersonasTError,
  setEditarPersonasDError,
} = erroresFormulariosSlice.actions;

export default erroresFormulariosSlice.reducer;