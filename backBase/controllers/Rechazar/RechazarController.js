const RechazarService = require('../../services/Rechazar/RechazarService');

const RechazarController = {
  async rechazarRegistro(req, res) {
    try {
      const { ID_ALTERNA, FORMULARIO, CAMPO, DESCRIPCION } = req.params;
      await RechazarService.rechazarRegistro(ID_ALTERNA, FORMULARIO, CAMPO, DESCRIPCION);
      res.status(200).json({ message: "Registro rechazado con éxito", procesado: 8 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo rechazar el registro." });
    }
  },

  async rechazarRegistro2(req, res) {
    try {
      const { LLAVE, FORMULARIO, CAMPO, DESCRIPCION } = req.params;
      const result = await RechazarService.rechazarRegistro2(LLAVE, FORMULARIO, CAMPO, DESCRIPCION);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  async obtenerLlaveDesdeIdAlterna(req, res) {
    try {
      const { idAlterna } = req.params;
      const llave = await RechazarService.obtenerLlaveDesdeIdAlterna(idAlterna);
      if (!llave) {
        return res.status(404).json({ error: 'LLAVE no encontrada' });
      }
      res.json({ LLAVE: llave });
    } catch (error) {
      console.error('❌ Error al obtener LLAVE:', error);
      res.status(500).json({ error: 'Error al obtener LLAVE' });
    }
  }
};

module.exports = RechazarController;
