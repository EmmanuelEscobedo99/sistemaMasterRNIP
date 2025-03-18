const datosGeneralesService = require( '../../../services/Bloque1/DatosGenerales/datosGeneralesService' );

const datosGeneralesController = {
  async obtenerIdAlterna( req, res ) {
    try {
      const { LLAVE } = req.body;
      const result = await datosGeneralesService.obtenerIdAlterna( LLAVE );
      res.status( 200 ).json( result );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: error } );
    }
  }
};

module.exports = datosGeneralesController;