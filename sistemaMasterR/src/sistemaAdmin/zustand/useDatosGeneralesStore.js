import { create } from 'zustand';

const useDatosGeneralesStore = create((set) => ({
  datos: {}, // Estado de los inputs normales
  radioSeleccionados: [], // Lista de radio seleccionados
  idBloqueFuncional: 1, // ID_BLOQUE_FUNCIONAL con valor inicial 1

  // Función para actualizar los valores normales
  actualizarDato: (nombre, valor) =>
    set((state) => ({
      datos: { ...state.datos, [nombre]: valor }
    })),

  // Función para manejar los radio buttons
  seleccionarRadio: (nombre, valor, formulario) =>
    set((state) => {
      if (valor === null) {
        // Si el valor es null, eliminarlo de la lista (deselección)
        const nuevaLista = state.radioSeleccionados.filter(item => item.nombre !== nombre);
        return { radioSeleccionados: nuevaLista };
      } else {
        // Si no es null, agregarlo o actualizarlo
        const existe = state.radioSeleccionados.some((item) => item.nombre === nombre);

        const nuevaLista = existe
          ? state.radioSeleccionados.map((item) =>
              item.nombre === nombre ? { ...item, valor, formulario, idBloqueFuncional: state.idBloqueFuncional } : item
            )
          : [...state.radioSeleccionados, { nombre, valor, formulario, idBloqueFuncional: state.idBloqueFuncional }];

        return { radioSeleccionados: nuevaLista };
      }
    }),

  // Función para establecer el ID_BLOQUE_FUNCIONAL
  establecerIdBloqueFuncional: (id) => set({ idBloqueFuncional: id }),

  // Función para limpiar los errores seleccionados
  limpiarErrores: () => set({ radioSeleccionados: [] })
}));

export default useDatosGeneralesStore;
