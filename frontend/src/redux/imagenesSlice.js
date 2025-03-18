import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imagenes: [null,null, null],
  loading: [false, false, false],
  idAlterna: 0,
  imagenesObtenidas: [],
  obtuveImagenes: false,
  enviando: false,
  errores: [],
  errores2: {},
};

export const imagenesSlice = createSlice({
  name: 'imagenes',
  initialState,
  reducers: {
    setImagenes: (state, action) => {
      state.imagenes = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
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
    setErrores: (state, action) => {
      state.errores = action.payload; // Almacenar errores
    },
    agregarError: (state, action) => {
      state.errores.push(action.payload); // Agregar un error
    },
    limpiarErrores: (state) => {
      state.errores = []; // Limpiar errores
    },
    agregarError2: (state, action) => {
      const { index, mensaje } = action.payload;
      state.errores2[index] = mensaje;
    },
    limpiarError2: (state, action) => {
      delete state.errores2[action.payload];
    },
  },
});

export const {
  setImagenes,
  setLoading,
  setIdAlterna,
  setImagenesObtenidas,
  setObtuveImagenes,
  setEnviando,
  setErrores,
  agregarError,
  limpiarErrores,
  agregarError2,
  limpiarError2,
} = imagenesSlice.actions;

export default imagenesSlice.reducer;
