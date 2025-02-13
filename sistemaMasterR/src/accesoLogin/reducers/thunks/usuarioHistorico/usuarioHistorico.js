import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../api/api';

export const verificarCorreo = createAsyncThunk(
  'auth/verificarCorreo',
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/usuHistorico', { email });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);