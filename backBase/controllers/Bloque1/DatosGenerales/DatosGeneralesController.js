const datosGeneralesService = require( '../../../services/Bloque1/DatosGenerales/DatosGeneralesService' );

const datosGeneralesController = {
  async obtenerDatosGenerales( req, res ) {
    try {
      const { idAlterna } = req.body;
      const result = await datosGeneralesService.obtenerDatosGenerales( idAlterna );
      res.status( 200 ).json( result );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: error } );
    }
  }
};

module.exports = datosGeneralesController;