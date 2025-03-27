import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../api/api';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { setUser } from '../../slice/loginUsuarioSlice/authSlice';

const MySwal = withReactContent(Swal);

export const loginUsuario = createAsyncThunk(
  'auth/loginUsuario',
  async ({ data, maquina, storedEmail }, { dispatch, rejectWithValue }) => {
    try {
      const requestData = { ...data, maquina, storedEmail };
      const response = await api.post('/auth/login', requestData);

      const { rol, email } = response.data;

      dispatch(setUser({ rol }));
      localStorage.setItem('rol', rol);
      localStorage.setItem('email', email);

      await MySwal.fire({
        background: '#0f172a',
        color: '#ffffff',
        icon: 'success',
        iconColor: '#22c55e',
        title: '✨ ¡Bienvenido!',
        html: `<strong style="color: #a3e635;">Inicio de sesión exitoso</strong>`,
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'border border-green-500 rounded-lg shadow-lg',
        },
      });

      return { rol };
    } catch (error) {
      const errorMessage = error.response?.data?.errorMessage || 'Error al iniciar sesión';
      await MySwal.fire({
        background: '#1f2937',
        color: '#ffffff',
        icon: 'error',
        iconColor: '#f43f5e',
        title: '😓 Error',
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
