import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../api/api';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { logout } from '../../slice/loginUsuarioSlice/authSlice';

const MySwal = withReactContent(Swal);

export const FinalizarSesion = createAsyncThunk(
  'auth/logoutUsuario',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const email = localStorage.getItem('email');
      if (!email) throw new Error('No se encontró el email en el localStorage');

      const response = await api.post('/auth/salir', { email });

      dispatch(logout());
      localStorage.removeItem('rol');
      localStorage.removeItem('email');

      await MySwal.fire({
        background: '#0f172a',
        color: '#ffffff',
        icon: 'success',
        iconColor: '#22c55e',
        title: '✅ Sesión cerrada',
        html: `<strong style="color: #a3e635;">${response.data.message}</strong>`,
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'border border-green-500 rounded-lg shadow-lg',
        },
      });

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.errorMessage || 'Error al cerrar sesión';
      await MySwal.fire({
        background: '#1f2937',
        color: '#ffffff',
        icon: 'error',
        iconColor: '#f43f5e',
        title: '⚠️ Error al salir',
        html: `<strong style="color: #f87171;">${errorMessage}</strong>`,
        confirmButtonColor: '#ef4444',
        customClass: {
          popup: 'border border-red-500 rounded-lg shadow-lg',
        },
      });
      return rejectWithValue(errorMessage);
    }
  }
);
