const RechazarService = require('../../services/Rechazar/RechazarService');

const RechazarController = {
  async rechazarRegistro(req, res) {
    try {
      const { idAlterna } = req.params;
      await RechazarService.rechazarRegistro(idAlterna);
      res.status(200).json({ message: "Registro rechazado con éxito", procesado: 8 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "No se pudo rechazar el registro." });
    }
  },

  async rechazarRegistro2(req, res) {
    try {
      const { LLAVE, FORMULARIO, CAMPO, DESCRIPCION } = req.body; // ✅ Cambiado de req.params a req.body
      console.log('Datos recibidos:', LLAVE, FORMULARIO, CAMPO, DESCRIPCION);

      const result = await RechazarService.rechazarRegistro2(LLAVE, FORMULARIO, CAMPO, DESCRIPCION);
      res.status(200).json({ message: 'Error registrado con éxito', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al insertar el error del formulario.' });
    }
  }
};

module.exports = RechazarController;
