import { create } from 'zustand';
import api from '../../api/api';

const useStore = create((set) => ({

  datosFormulario: {}, // Estado para almacenar los datos del formulario IMAGENES PRINCIPALES
  datosHuellas: {}, // Estado para almacenar las Huellas
  datosGenerales: {}, // Estado para almacenar los datos generales
  nombres: {}, // Estado para almacenar los nombres
  alias: {}, // Estado para almacenar los alias
  domicilio: {}, // Estado para almacenar los domicilios
  situacion: {}, // Estado para almacenar la situación
  juridicos: {}, // Estado para almacenar los jurídicos
  ejecucion: {}, // Estado para almacenar la ejecución
  odelito: {}, // Estado para almacenar el odelito
  ingresos: {}, // Estado para almacenar los ingresos
  ingdelito: {}, // Estado para almacenar el ingelito
  internos: {}, // Estado para almacenar los internos
  internosBloque1y2: [],
  internosBloque6: [],

  cargarDatosFormulario: async (tabla, idAlterna) => {
    try {
      const response = await api.post(`/mostrarPrincipales/${tabla}`, {idAlterna});
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
      const response = await api.post(`/bloque1/${tabla}`, {idAlterna});
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
  cargarAlias: async (tabla, idAlterna) => {
    try {
      const response = await api.get(`/alias/${tabla}/${idAlterna}`);
      set({ alias: response.data }); // Guardar directamente la respuesta en Zustand
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  },
  cargarDomicilio: async (tabla, idAlterna) => {
    try {
      const response = await api.get(`/domicilio/${tabla}/${idAlterna}`);
      set({ domicilio: response.data }); // Guardar directamente la respuesta en Zustand
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  },
  cargarSituacion: async (tabla, idAlterna) => {
    try {
      const response = await api.get(`/situacion/${tabla}/${idAlterna}`);
      set({ situacion: response.data }); // Guardar directamente la respuesta en Zustand
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  },
  cargarJuridicos: async (tabla, idAlterna) => {
    try {
      const response = await api.get(`/juridicos/${tabla}/${idAlterna}`);
      set({ juridicos: response.data }); // Guardar directamente la respuesta en Zustand
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  },
  cargarEjecucion: async (tabla, idAlterna) => {
    try {
      const response = await api.get(`/ejecucion/${tabla}/${idAlterna}`);
      set({ ejecucion: response.data }); // Guardar directamente la respuesta en Zustand
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  },
  cargarODelito: async (tabla, idAlterna) => {
    try {
      const response = await api.get(`/odelitos/${tabla}/${idAlterna}`);
      set({ odelito: response.data }); // Guardar directamente la respuesta en Zustand
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  },
  cargarIngresos: async (tabla, idAlterna) => {
    try {
      const response = await api.get(`/ingresos/${tabla}/${idAlterna}`);
      set({ ingresos: response.data }); // Guardar directamente la respuesta en Zustand
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  },
  cargarIngDelito: async (tabla, idAlterna) => {
    try {
      const response = await api.get(`/ingdelito/${tabla}/${idAlterna}`);
      set({ ingdelito: response.data }); // Guardar directamente la respuesta en Zustand
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  },
  cargarInternos: async (tabla) => {
    try {
      const response = await api.get(`/internos/${tabla}`);
      set({ internos: response.data }); // Guardar directamente la respuesta en Zustand
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  },
  cargarInternosBloque1y2: async () => {
    try {
      const response = await api.get('/buscarInternos/procesado6');
      set({ internosBloque1y2: response.data });
    } catch (error) {
      console.error('Error al cargar los datos del Bloque 1 y 2:', error);
    }
  },

  cargarInternosBloque6: async () => {
    try {
      const response = await api.get('/buscarInternos/procesado8'); // ✅ Cambio aquí
      set({ internosBloque6: response.data });
    } catch (error) {
      console.error('Error al cargar los datos del Bloque 6:', error);
    }
  },

}));

export default useStore;
