const EjecucionService = require( '../../../services/Bloque2/Ejecucion/EjecucionService' );

const EjecucionController = {
  async obtenerEjecucion( req, res ) {
    try {
      const { idAlterna } = req.params;
      const result = await EjecucionService.obtenerEjecucion( idAlterna );
      res.status( 200 ).json( result );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: error } );
    }
  }
};

module.exports = EjecucionController;