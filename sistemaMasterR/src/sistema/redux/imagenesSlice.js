import { createSlice } from '@reduxjs/toolkit';

// 🔹 Estado inicial del slice de imágenes
const initialState = {
  imagenes: [null, null, null], // Almacena hasta 3 imágenes
  loading: [false, false, false], // Estado de carga para cada imagen
  idAlterna: 0, // ID alternativo asociado a las imágenes
  imagenesObtenidas: [], // Imágenes obtenidas del servidor
  obtuveImagenes: false, // Indica si se recuperaron imágenes del servidor
  enviando: false, // Indica si se está enviando información al servidor
  errores: [], // Almacena errores generales
  errores2: {}, // Almacena errores específicos por índice
};

// 🔹 Creación del slice de imágenes con Redux Toolkit
export const imagenesSlice = createSlice({
  name: 'imagenes',
  initialState,
  reducers: {
    // 🔸 Actualiza el array de imágenes con nuevas imágenes seleccionadas
    setImagenes: (state, action) => {
      state.imagenes = action.payload;
    },

    // 🔸 Controla el estado de carga de cada imagen (true o false)
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // 🔸 Guarda el ID alternativo obtenido desde el backend
    setIdAlterna: (state, action) => {
      state.idAlterna = action.payload;
    },

    // 🔸 Almacena las imágenes obtenidas desde el backend
    setImagenesObtenidas: (state, action) => {
      state.imagenesObtenidas = action.payload;
    },

    // 🔸 Indica si se lograron recuperar imágenes
    setObtuveImagenes: (state, action) => {
      state.obtuveImagenes = action.payload;
    },

    // 🔸 Maneja el estado de "enviando datos al servidor"
    setEnviando: (state, action) => {
      state.enviando = action.payload;
    },

    // 🔸 Almacena un array de errores generales
    setErrores: (state, action) => {
      state.errores = action.payload;
    },

    // 🔸 Agrega un error nuevo al array de errores generales
    agregarError: (state, action) => {
      state.errores.push(action.payload);
    },

    // 🔸 Limpia todos los errores generales
    limpiarErrores: (state) => {
      state.errores = [];
    },

    // 🔸 Agrega un error específico a `errores2` usando un índice
    agregarError2: (state, action) => {
      const { index, mensaje } = action.payload;
      state.errores2[index] = mensaje;
    },

    // 🔸 Elimina un error específico de `errores2` por su índice
    limpiarError2: (state, action) => {
      delete state.errores2[action.payload];
    },
  },
});

// 🔹 Exportar todas las acciones del slice
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

// 🔹 Exportar el reducer por defecto para integrarlo en el store de Redux
export default imagenesSlice.reducer;
