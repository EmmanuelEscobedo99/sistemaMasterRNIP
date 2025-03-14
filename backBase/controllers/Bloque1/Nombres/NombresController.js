const NombresService = require( '../../../services/Bloque1/Nombres/NombresService' );

const NombresController = {
  async obtenerNombres( req, res ) {
    try {
      const { idAlterna } = req.params;
      const result = await NombresService.obtenerNombres( idAlterna );
      res.status( 200 ).json( result );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: error } );
    }
  }
};

module.exports = NombresController;