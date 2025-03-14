import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import verificacionIp from '../accesoLogin/reducers/slice/verificacionIp/verificacionIp'
import autenticacionLogin from '../accesoLogin/reducers/slice/loginUsuarioSlice/authSlice'
import erroresFormulariosReducer from '../sistema/reducers/slice/erroresFormularios/ErroresFormularios'
import erroresRegistroReducer from '../sistema/reducers/slice/erroresRegistro/ErroresRegistro'
import idAlternaReducer from "../sistemaAdmin/reducers/slice/idAlterna/idAlternaSlice";

const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, autenticacionLogin);


export const store = configureStore({
  reducer: {
   
    auth:persistedAuthReducer,
    verificacionIp: verificacionIp,
    erroresFormularios: erroresFormulariosReducer,
    erroresRegistro: erroresRegistroReducer,
    idAlterna: idAlternaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

})


export const persistor = persistStore(store);
export default store;