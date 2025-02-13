import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registroB1F1: true,
  registroB1F2: true,
  registroB1F3: true,
  registroB1F4: true,

  registroB2F1: true,
  registroB2F2: true,
  registroB2F3: true,
  registroB2F4: true,
};

const erroresRegistro = createSlice({
  name: 'erroresFormularios',
  initialState,
  reducers: {
      setBloqueUnoF1Error: (state, action) => {     
         state.registroB1F1 = action.payload;
      },
      setBloqueUnoF2Error: (state, action) => {     
         state.registroB1F2 = action.payload;
      },
      setBloqueUnoF3Error: (state, action) => {
         state.registroB1F3 = action.payload;
      },
      setBloqueUnoF4Error: (state, action) => {
         state.registroB1F4 = action.payload;
      },

      setBloqueDosF1Error: (state, action) => {     
        state.registroB2F1 = action.payload;
      },
      setBloqueDosF2Error: (state, action) => {     
        state.registroB2F2 = action.payload;
      },
      setBloqueDosF3Error: (state, action) => {
        state.registroB2F3 = action.payload;
      },
      setBloqueDosF4Error: (state, action) => {
        state.registroB2F4 = action.payload;
      },





  },
});

export const {
  setBloqueUnoF1Error,
  setBloqueUnoF2Error,
  setBloqueUnoF3Error,
  setBloqueUnoF4Error,

  setBloqueDosF1Error,
  setBloqueDosF2Error,
  setBloqueDosF3Error,
  setBloqueDosF4Error
  
} = erroresRegistro.actions;

export default erroresRegistro.reducer;