import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../api/api';

export const obtenerToken = createAsyncThunk('auth/obtenerToken', async (datos) => {
  console.log('datos a enviar', datos);
  const response = await api.post('/auth/auth', { datos });
  return response.data;
});