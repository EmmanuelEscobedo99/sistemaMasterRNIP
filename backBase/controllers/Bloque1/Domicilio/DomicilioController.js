const DomicilioService = require( '../../../services/Bloque1/Domicilio/DomicilioService' );

const DomicilioController = {
  async obtenerDomicilio( req, res ) {
    try {
      const { idAlterna } = req.params;
      const result = await DomicilioService.obtenerDomicilio( idAlterna );
      res.status( 200 ).json( result );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: error } );
    }
  }
};

module.exports = DomicilioController;