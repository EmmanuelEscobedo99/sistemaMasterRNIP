const {
    obtenerInternosB12Rechazados,
  } = require("../../models/b12rechazados/b12RechazadosModel");
  
  const getInternosB12Rechazados = async () => {
    const data = await obtenerInternosB12Rechazados();
  
    // Agrupar por LLAVE sin repetir personas
    const agrupados = {};
  
    for (const persona of data) {
      const { LLAVE, DNOMBRE, DPATERNO, DMATERNO, ID_ALTERNA } = persona;
  
      if (!agrupados[LLAVE]) {
        agrupados[LLAVE] = {
          LLAVE,
          ID_ALTERNA,
          nombres: [],
          personasUnicas: new Set(),
        };
      }
  
      const clave = `${DNOMBRE}-${DPATERNO}-${DMATERNO}`;
      if (!agrupados[LLAVE].personasUnicas.has(clave)) {
        agrupados[LLAVE].personasUnicas.add(clave);
        agrupados[LLAVE].nombres.push({ DNOMBRE, DPATERNO, DMATERNO });
      }
    }
  
    // Convertimos a arreglo y quitamos el set
    return Object.values(agrupados).map(({ personasUnicas, ...resto }) => resto);
  };
  
  module.exports = {
    getInternosB12Rechazados,
  };
  