import { create } from 'zustand';

const useStore = create((set) => ({
  // Propiedades existentes
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
  clearSelectedId: () => set({ selectedId: null }),

  // Nueva variable para manejar errores
  registroPersonasError: false,
  setRegistroPersonasError: (hasError) => set({ registroPersonasError: hasError }),
}));

export default useStore;
