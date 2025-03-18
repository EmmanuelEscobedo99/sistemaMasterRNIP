// ZUSTAND

import { create } from 'zustand';

const useStore = create((set) => ({
  llaveSeleccionada: null, // Estado inicial

  setLlave: (llave) => set({ llaveSeleccionada: llave }), // Función para actualizar la LLAVE
}));

export default useStore;
