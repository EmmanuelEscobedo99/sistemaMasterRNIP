import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../api/api';
import Swal from 'sweetalert2';
import { logout } from '../../slice/loginUsuarioSlice/authSlice';

export const FinalizarSesion = createAsyncThunk(
  'auth/logoutUsuario',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Obtener el email del localStorage
      const email = localStorage.getItem('email');
      if (!email) {
        throw new Error('No se encontró el email en el localStorage');
      }

      console.log('Email:', email); // Depurar el email
      const response = await api.post('/auth/salir', { email });

      console.log('Response from backend:', response.data); // Depurar la respuesta del backend

      // Despachar la acción de logout para limpiar el estado
      dispatch(logout());

      // Eliminar el token del localStorage
      localStorage.removeItem('rol');
      localStorage.removeItem('email');

      // Mostrar mensaje de sesión terminada
      Swal.fire({
        icon: 'success',
        title: 'Sesión terminada',
        text: response.data.message, // Mostrar el mensaje del backend
        showConfirmButton: false,
        timer: 1500,
      });

      return response.data;
    } catch (error) {
      console.error('Error during logout:', error); // Depurar el error
      const errorMessage = error.response?.data?.errorMessage || 'Error al cerrar sesión';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  }
);