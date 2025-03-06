const buscarInternosService = require( '../../services/buscarInternos/buscarInternosService' );

const buscarInternosController = {
  async obtenerEjecucion( req, res ) {
    try {
      const result = await buscarInternosService.obtenerInternos();
      res.status( 200 ).json( result );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: error } );
    }
  }
};

module.exports = buscarInternosController;