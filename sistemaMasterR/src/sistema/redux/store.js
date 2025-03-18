import { configureStore } from '@reduxjs/toolkit';
import imagenesReducer from './imagenesSlice'; // ✅ Asegura que este nombre coincide con el `export default` de imagenesSlice.js
import huellasReducer from './huellasSlice';

export const store = configureStore({
  reducer: {
    imagenes: imagenesReducer, // ✅ Aquí es donde Redux guarda `state.imagenes`
    huellas: huellasReducer,
  },
});
