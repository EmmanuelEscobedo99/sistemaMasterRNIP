//REDUX

import { configureStore } from '@reduxjs/toolkit';
import imagenesReducer from './imagenesSlice';
import huellasReducer from './huellasSlice';

export const store = configureStore( {
  reducer: {
    imagenes: imagenesReducer,
    huellas: huellasReducer,
  },
} );