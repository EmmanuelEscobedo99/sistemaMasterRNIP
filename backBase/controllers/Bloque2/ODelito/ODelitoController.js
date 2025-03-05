const ODelitoService = require( '../../../services/Bloque2/ODelito/ODelitoService' );

const ODelitoController = {
  async obtenerODelito( req, res ) {
    try {
      const { idAlterna } = req.params;
      //console.log("controller", idAlterna)
      const result = await ODelitoService.obtenerODelito( idAlterna );
      res.status( 200 ).json( result );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: error } );
    }
  }
};

module.exports = ODelitoController;