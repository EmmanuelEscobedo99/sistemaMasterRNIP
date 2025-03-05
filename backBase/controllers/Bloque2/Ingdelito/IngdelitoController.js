const IngdelitoService = require( '../../../services/Bloque2/Ingdelito/IngdelitoService' );

const IngdelitoController = {
  async obtenerIngdelito( req, res ) {
    try {
      const { idAlterna } = req.params;
      const result = await IngdelitoService.obtenerIngdelito( idAlterna );
      res.status( 200 ).json( result );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: error } );
    }
  }
};

module.exports = IngdelitoController;