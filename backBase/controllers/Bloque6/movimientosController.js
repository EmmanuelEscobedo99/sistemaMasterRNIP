const MovimientosService = require('../../services/Bloque6/movimientosService');

const MovimientosController = {
  async generarIdAlterna(req, res) {
    try {
      const { llave } = req.body;

      if (!llave) {
        return res.status(400).json({ error: 'Falta la llave en la solicitud.' });
      }

      // ✅ Solo imprime la llave (los demás campos los toma el servicio desde el registro con PROCESADO = 2)
      console.log("Generando nuevo ID_ALTERNA con la llave:", llave);

      const nuevoId = await MovimientosService.generarIdAlternaPorLlave(llave);

      console.log("Nuevo ID_ALTERNA generado en DB:", nuevoId);

      if (!nuevoId) {
        return res.status(500).json({ error: 'Error al generar el nuevo ID_ALTERNA.' });
      }

      res.status(200).json({ id_alterna: nuevoId });

    } catch (error) {
      console.error('Error en generarIdAlterna:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
};

module.exports = MovimientosController;
