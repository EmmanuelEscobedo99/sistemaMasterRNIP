import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imagenes: [null, null, null, null, null, null, null, null, null, null],
  idAlterna: 0,
  imagenesObtenidas: [],
  obtuveImagenes: false,
  enviando: false,
  errores2: {},
};

export const huellasSlice = createSlice({
  name: 'huellas',
  initialState,
  reducers: {
    setImagenes: (state, action) => {
      state.imagenes = action.payload;
    },
    setIdAlterna: (state, action) => {
      state.idAlterna = action.payload;
    },
    setImagenesObtenidas: (state, action) => {
      state.imagenesObtenidas = action.payload;
    },
    setObtuveImagenes: (state, action) => {
      state.obtuveImagenes = action.payload;
    },
    setEnviando: (state, action) => {
      state.enviando = action.payload;
    },
    agregarError2: (state, action) => {
      const { index, mensaje } = action.payload;
      state.errores2[index] = mensaje;
    },
    limpiarError2: (state, action) => {
      delete state.errores2[action.payload];
    },
    limpiarHuellas: (state) => {
      // 🔥 Limpiar imágenes y errores
      state.imagenes = [null, null, null, null, null, null, null, null, null, null];
      state.imagenesObtenidas = [];
      state.obtuveImagenes = false;
      state.errores2 = {};
    },
  },
});

export const {
  setImagenes,
  setIdAlterna,
  setImagenesObtenidas,
  setObtuveImagenes,
  setEnviando,
  agregarError2,
  limpiarError2,
  limpiarHuellas, // ✅ Agregado
} = huellasSlice.actions;

export default huellasSlice.reducer;
