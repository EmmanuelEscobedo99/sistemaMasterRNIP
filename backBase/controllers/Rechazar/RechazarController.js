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
  }
};

module.exports = RechazarController; // ✅ Asegurar que el módulo se exporta correctamente
