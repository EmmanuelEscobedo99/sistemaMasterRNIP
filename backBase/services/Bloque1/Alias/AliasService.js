const AliasModel = require( '../../../models/Bloque1/Alias/AliasModel' );

const AliasService = {
  async obtenerAlias ( idAlterna ) {
    try {
      const result = await AliasModel.obtenerAlias( idAlterna );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = AliasService;