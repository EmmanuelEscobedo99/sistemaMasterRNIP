const AprovarService = require( '../../services/Aprovar/AprovarService' );

const AprovarController = {
  async aprovarRegistro( req, res ) {
    try {
      const { idAlterna } = req.params;
      const result = await AprovarService.aprovarRegistro( idAlterna );
      res.status( 200 ).json( result );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: error } );
    }
  }
};

module.exports = AprovarController;