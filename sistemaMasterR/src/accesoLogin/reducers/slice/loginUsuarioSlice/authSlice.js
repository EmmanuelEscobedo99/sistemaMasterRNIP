import { createSlice } from '@reduxjs/toolkit';
import { loginUsuario } from '../../thunks/loginUsuario/thunksLogin';
import { obtenerToken } from '../../thunks/auth/authUsuario';
import { FinalizarSesion } from '../../thunks/finalizarSesion/FinalizarSesion';


const initialState = {
  email: null,
  rol: null,
  isAuthenticated: false,
  error: null,
  token: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.rol = action.payload.rol;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.email = null;
      state.rol = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUsuario.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.rol = action.payload.rol;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUsuario.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(obtenerToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(obtenerToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
      })
      .addCase(obtenerToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

     
      .addCase(FinalizarSesion.fulfilled, (state) => {
        state.email = null;
        state.rol = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(FinalizarSesion.rejected, (state, action) => {
        state.error = action.payload;
      });





  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;