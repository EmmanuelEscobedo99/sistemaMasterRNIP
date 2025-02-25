import { create } from 'zustand';
import api from '../../api/api';

const useStore = create((set) => ({
  datosFormulario: {}, // Estado para almacenar los datos del formulario
  cargarDatosFormulario: async (tabla, idAlterna) => {
    try {
      const response = await api.get(`/mostrarPrincipales/${tabla}/${idAlterna}`);
      set({ datosFormulario: response.data }); // Guardar directamente la respuesta en Zustand
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  },
}));

export default useStore;
