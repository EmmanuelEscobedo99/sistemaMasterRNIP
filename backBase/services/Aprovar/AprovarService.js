const AprovarModel = require( '../../models/Aprovar/AprovarModel' );

const AprovarService = {
  async aprovarRegistro ( idAlterna ) {
    try {
      const result = await AprovarModel.aprovarRegistro( idAlterna );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = AprovarService;