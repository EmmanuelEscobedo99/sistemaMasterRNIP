// src/zustand/useDatosGeneralesStore.js
import { create } from 'zustand';

const useDatosGeneralesStore = create((set) => ({
  datos: {}, // Estado de los inputs normales
  radioSeleccionados: [], // Lista de radios seleccionados con info completa
  idBloqueFuncional: [],  // Estado general si se quiere usar (aunque ahora ya no es obligatorio)

  // Función para actualizar inputs de texto normales
  actualizarDato: (nombre, valor) =>
    set((state) => ({
      datos: { ...state.datos, [nombre]: valor }
    })),

  // ✅ Función mejorada para radios con ID_BLOQUE_FUNCIONAL por formulario
  seleccionarRadio: (nombre, valor, formulario) =>
    set((state) => {
      if (valor === null) {
        // Si se deselecciona el checkbox
        const nuevaLista = state.radioSeleccionados.filter(item => item.nombre !== nombre);
        return { radioSeleccionados: nuevaLista };
      } else {
        // 🛠 Formularios que deben tener ID_BLOQUE_FUNCIONAL = 2
        let idBloqueFuncionalAsignado = 1;
// src/zustand/useDatosGeneralesStore.js
        const bloque2Forms = [
          'Situación',
          'ODelito',
          'Juridicos',
          'JuridicosP2',
          'Ejecución',
          'Ejecución PT1', // ← ESTE FALTABA
          'EjecucionP2',
          'Ejecución PT2',
          'Ingresos',
          'IngresosP2',
          'Ingdelito'
        ];



        if (bloque2Forms.includes(formulario)) {
          idBloqueFuncionalAsignado = 2;
        }

        const existe = state.radioSeleccionados.some((item) => item.nombre === nombre);

        const nuevoItem = {
          nombre,
          valor,
          formulario,
          idBloqueFuncional: idBloqueFuncionalAsignado,
        };

        const nuevaLista = existe
          ? state.radioSeleccionados.map((item) =>
              item.nombre === nombre ? nuevoItem : item
            )
          : [...state.radioSeleccionados, nuevoItem];

        return { radioSeleccionados: nuevaLista };
      }
    }),

  // Función por si quieres usar el estado global manual de ID_BLOQUE_FUNCIONAL
  establecerIdBloqueFuncional: (id) => set({ idBloqueFuncional: id }),

  // Función para limpiar errores seleccionados (reset de los checkboxes)
  limpiarErrores: () => set({ radioSeleccionados: [] })
}));

export default useDatosGeneralesStore;
