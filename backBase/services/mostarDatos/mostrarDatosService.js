const mostrarDatosModel = require('../../models/mostrarDatos/mostrarDatosModel');

const mostrarDatosService = {
  async traerDatos() {
    try {
      const datosEncontrados = await mostrarDatosModel.mostrarDatos();
      return datosEncontrados; // Retorna los datos obtenidos del modelo
    } catch (error) {
      console.error("Error en el servicio al traer datos:", error);
      throw error;
    }
  },

  async buscarDatos(query) {
    try {
      const datosEncontrados = await mostrarDatosModel.buscarDatos(query);
      return datosEncontrados; // Retorna los datos obtenidos del modelo
    } catch (error) {
      console.error("Error en el servicio al buscar datos:", error);
      throw error;
    }
  },

  async traerDatoPorId(id) {
    try {
      const datoEncontrado = await mostrarDatosModel.traerDatoPorId(id);
      return datoEncontrado; // Retorna el dato obtenido del modelo
    } catch (error) {
      console.error("Error en el servicio al traer el dato:", error);
      throw error;
    }
  }
};

module.exports = mostrarDatosService;