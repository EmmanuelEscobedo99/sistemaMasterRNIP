const mostrarDatosService = require('../../services/mostarDatos/mostrarDatosService');

const datos = {
  async traerDatos(req, res) {
    try {
      const datosEncontrados = await mostrarDatosService.traerDatos();
      res.status(200).json(datosEncontrados); // Envía los datos encontrados como respuesta
    } catch (error) {
      console.error("Error al traer datos:", error);
      res.status(500).json({ message: 'Error al traer datos' });
    }
  },

  async buscarDatos(req, res) {
    try {
      const { query } = req.query; // Obtiene el término de búsqueda de los parámetros de la consulta
      const datosEncontrados = await mostrarDatosService.buscarDatos(query);
      res.status(200).json(datosEncontrados); // Envía los datos encontrados como respuesta
    } catch (error) {
      console.error("Error al buscar datos:", error);
      res.status(500).json({ message: 'Error al buscar datos' });
    }
  },

  async traerDatoPorId(req, res) {
    try {
      const { id } = req.params;
      console.log('id recibido backend:', id);
      const datoEncontrado = await mostrarDatosService.traerDatoPorId(id);
      res.status(200).json(datoEncontrado); // Envía el dato encontrado como respuesta
    } catch (error) {
      console.error("Error al traer el dato:", error);
      res.status(500).json({ message: 'Error al traer el dato' });
    }
  }
};

module.exports = datos;
