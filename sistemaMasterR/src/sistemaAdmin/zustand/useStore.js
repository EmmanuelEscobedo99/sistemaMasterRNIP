import { create } from 'zustand';
import api from '../../api/api';

const useStore = create((set) => ({

  datosFormulario: {}, // Estado para almacenar los datos del formulario IMAGENES PRINCIPALES
  datosHuellas: {}, // Estado para almacenar las Huellas
  datosGenerales: {}, // Estado para almacenar los datos generales
  nombres: {}, // Estado para almacenar los nombres

  cargarDatosFormulario: async (tabla, idAlterna) => {
    try {
      const response = await api.get(`/mostrarPrincipales/${tabla}/${idAlterna}`);
      set({ datosFormulario: response.data }); // Guardar directamente la respuesta en Zustand
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  },
  cargarDatosHuellas: async (tabla, idAlterna) => {
    try {
      const response = await api.get(`/mostrarHuellas/${tabla}/${idAlterna}`);
      set({ datosHuellas: response.data }); // Guardar directamente la respuesta en Zustand
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  },
  cargarDatosGenerales: async (tabla, idAlterna) => {
    try {
      const response = await api.get(`/bloque1/${tabla}/${idAlterna}`);
      set({ datosGenerales: response.data }); // Guardar directamente la respuesta en Zustand
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  },
  cargarNombres: async (tabla, idAlterna) => {
    try {
      const response = await api.get(`/nombres/${tabla}/${idAlterna}`);
      set({ nombres: response.data }); // Guardar directamente la respuesta en Zustand
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  },
}));

export default useStore;
