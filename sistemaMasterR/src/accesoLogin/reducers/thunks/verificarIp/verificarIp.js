import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../api/api';


export const verificarIp = createAsyncThunk(
  'verificacionMaquina/verificarIp',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('ip/ipPrivada');
      return response.data.ip;
    } catch (error) {
     
      return rejectWithValue(error.message);
    }
  }
);