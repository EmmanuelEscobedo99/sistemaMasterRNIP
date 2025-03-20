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
  async rechazarRegistro2( req, res ) {
    try {
      const { LLAVE } = req.params;
      const result = await RechazarService.rechazarRegistro2( LLAVE );
      res.status( 200 ).json( result );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: error } );
    }
  }
};

module.exports = RechazarController; // ✅ Asegurar que el módulo se exporta correctamente
