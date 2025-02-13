// thunksLogin.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../api/api';
import Swal from 'sweetalert2';
import { setUser } from '../../slice/loginUsuarioSlice/authSlice';

export const loginUsuario = createAsyncThunk(
  'auth/loginUsuario',
  async ({ data, maquina, storedEmail }, { dispatch, rejectWithValue }) => {
    try {
      const requestData = { ...data, maquina, storedEmail };
      const response = await api.post('/auth/login', requestData);

      console.log('Response from backend:', response.data); // Depurar la respuesta del backend

      const { rol,email } = response.data;     
      dispatch(setUser({ rol })); // Guarda los datos del usuario en el estadodo

      localStorage.setItem('rol', rol);
      localStorage.setItem('email', email);

      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: 'Inicio de sesión correcto',
        showConfirmButton: false,
        timer: 1500,
      });

      return { rol }; // Retorna los datos del usuario al slice de redux

      
    } catch (error) {
      console.error('Error during login:', error); // Depurar el error
      const errorMessage = error.response?.data?.errorMessage || 'Error al iniciar sesión';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  }
);