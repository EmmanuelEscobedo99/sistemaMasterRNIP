// userThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/api';


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/api/users');
  return response.data;
});

export const createUser = createAsyncThunk( 'usuarios/createUser', async (userData, { rejectWithValue }) => { 
  try { console.log("Datos del usuario en thunk:", userData);
     const response = await api.post('/registrarUsuarios/registrar', userData, {withCredentials: true}); 
     return response.data; 
    }
      catch (error) { if (!error.response) { throw error; } 
      return rejectWithValue(error.response.data); } } );

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, userData }) => {
  const response = await axios.put(`/api/users/${id}`, userData);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axios.delete(`/api/users/${id}`);
  return id;
});
