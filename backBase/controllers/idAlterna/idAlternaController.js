const idAlternaService = require( '../../models/idAlterna/idAlternaModel' );

const idAlternaController = {
  async obtenerIdAlterna( req, res ) {
    try {
      const { LLAVE } = req.body;
      const result = await idAlternaService.obtenerIdAlterna( LLAVE );
      res.status( 200 ).json( result );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: error } );
    }
  }
};

module.exports = idAlternaController;