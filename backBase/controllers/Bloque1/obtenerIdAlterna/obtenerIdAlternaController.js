const obtenerIdAlternaService = require( '../../../services/Bloque1/obtenerIdAlterna/obtenerIdAlternaService' );


const obtenerIdAlternaController = {
  async obtenerIdAlterna( req, res ) {
    try {
      const { LLAVE } = req.body;
      const result = await obtenerIdAlternaService.obtenerIdAlterna( LLAVE );
      res.status( 200 ).json( result );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: error } );
    }
  }
};

module.exports = obtenerIdAlternaController;