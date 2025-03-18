// ZUSTAND
import { create } from 'zustand';

const useStore = create((set) => ({
  // Estado inicial para la llave seleccionada
  llaveSeleccionada: null,
  setLlave: (llave) => set({ llaveSeleccionada: llave }), // Función para actualizar la LLAVE

  // Estado para manejar IDs seleccionados
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
  clearSelectedId: () => set({ selectedId: null }),

  // Estado para manejar errores en el registro de personas
  registroPersonasError: false,
  setRegistroPersonasError: (hasError) => set({ registroPersonasError: hasError }),
}));

export default useStore;
