import { create } from 'zustand';

const useDatosGeneralesStore = create((set) => ({
  datos: {}, // Estado de los inputs normales
  radioSeleccionados: [], // Lista de radio seleccionados

  // Función para actualizar los valores normales
  actualizarDato: (nombre, valor) =>
    set((state) => ({
      datos: { ...state.datos, [nombre]: valor }
    })),

  // Función para manejar los radio buttons
  seleccionarRadio: (nombre, valor) =>
    set((state) => {
      // Verifica si el radio ya está en la lista
      const existe = state.radioSeleccionados.some((item) => item.nombre === nombre);
      
      // Si ya existe, actualiza el valor. Si no, agrégalo a la lista
      const nuevaLista = existe
        ? state.radioSeleccionados.map((item) =>
            item.nombre === nombre ? { ...item, valor } : item
          )
        : [...state.radioSeleccionados, { nombre, valor }];

      return { radioSeleccionados: nuevaLista };
    })
}));

export default useDatosGeneralesStore;
