const pool = require( '../../config/db.config' );

const buscarInternosModel = {
  async obtenerInternos( procesado ) {
    try {
      const [ movimientos ] = await pool.query( `
        SELECT LLAVE, MAX(FECHA_ACTUALIZACION) AS ULTIMA_FECHA
        FROM movimientos 
        WHERE PROCESADO = ?
        GROUP BY LLAVE
      `, [ procesado ] );

      if ( movimientos.length === 0 ) {
        return [];
      }

      const resultados = await Promise.all( movimientos.map( async ( { LLAVE, ULTIMA_FECHA } ) => {
        const [ fila ] = await pool.query( `
          SELECT ID_ALTERNA, LLAVE 
          FROM movimientos 
          WHERE LLAVE = ? AND FECHA_ACTUALIZACION = ? AND PROCESADO = ?
          LIMIT 1
        `, [ LLAVE, ULTIMA_FECHA, procesado ] );

        return fila.length > 0 ? { ...fila[ 0 ], LLAVE } : null;
      } ) );

      const datosValidos = resultados.filter( item => item !== null );
      if ( datosValidos.length === 0 ) {
        return [];
      }

      const idAlternas = datosValidos.map( item => item.ID_ALTERNA );
      const [ nombres ] = await pool.query( `
        SELECT ID_ALTERNA, DNOMBRE, DPATERNO, DMATERNO 
        FROM nombres 
        WHERE ID_ALTERNA IN (?)
      `, [ idAlternas ] );

      const nombresAgrupados = nombres.reduce( ( acc, { ID_ALTERNA, DNOMBRE, DPATERNO, DMATERNO } ) => {
        if ( !acc[ ID_ALTERNA ] ) {
          acc[ ID_ALTERNA ] = {
            ID_ALTERNA,
            LLAVE: datosValidos.find( d => d.ID_ALTERNA === ID_ALTERNA )?.LLAVE,
            nombres: []
          };
        }
        acc[ ID_ALTERNA ].nombres.push( { DNOMBRE, DPATERNO, DMATERNO } );
        return acc;
      }, {} );

      // Retorna los objetos con la LLAVE y los nombres agrupados
      return Object.values( nombresAgrupados ).map( item => ( {
        ...item,
        LLAVE: item.LLAVE // Asegurando que la LLAVE esté en cada objeto retornado
      } ) );
    } catch ( error ) {
      console.error( "Error en obtenerInternos:", error );
      throw error;
    }
  },

  // 🔹 Nueva función que obtiene solo los internos con PROCESADO = 2
  async obtenerInternosProcesado2() {
    try {
      const [ movimientos ] = await pool.query( `
        SELECT m.ID_ALTERNA, m.LLAVE, MAX(m.FECHA_ACTUALIZACION) AS ULTIMA_FECHA
        FROM movimientos m
        WHERE m.PROCESADO = 2
        AND NOT EXISTS (
          SELECT 1 FROM movimientos m2
          WHERE m2.LLAVE = m.LLAVE
            AND m2.ID_BLOQUE_FUNCIONAL = 6
        )
        GROUP BY m.LLAVE
      `);

      if ( movimientos.length === 0 ) {
        return [];
      }

      // Recuperar el ID_ALTERNA más reciente por LLAVE con PROCESADO = 2
      const resultados = await Promise.all( movimientos.map( async ( { LLAVE, ULTIMA_FECHA } ) => {
        const [ fila ] = await pool.query( `
          SELECT ID_ALTERNA, LLAVE 
          FROM movimientos 
          WHERE LLAVE = ? AND FECHA_ACTUALIZACION = ? AND PROCESADO = 2
          LIMIT 1
        `, [ LLAVE, ULTIMA_FECHA ] );

        return fila.length > 0 ? { ...fila[ 0 ], LLAVE } : null;
      } ) );

      const datosValidos = resultados.filter( item => item !== null );
      if ( datosValidos.length === 0 ) {
        return [];
      }

      const idAlternas = datosValidos.map( item => item.ID_ALTERNA );
      const [ nombres ] = await pool.query( `
        SELECT ID_ALTERNA, DNOMBRE, DPATERNO, DMATERNO 
        FROM nombres 
        WHERE ID_ALTERNA IN (?)
      `, [ idAlternas ] );

      const nombresAgrupados = nombres.reduce( ( acc, { ID_ALTERNA, DNOMBRE, DPATERNO, DMATERNO } ) => {
        if ( !acc[ ID_ALTERNA ] ) {
          acc[ ID_ALTERNA ] = {
            ID_ALTERNA,
            LLAVE: datosValidos.find( d => d.ID_ALTERNA === ID_ALTERNA )?.LLAVE,
            nombres: []
          };
        }
        acc[ ID_ALTERNA ].nombres.push( { DNOMBRE, DPATERNO, DMATERNO } );
        return acc;
      }, {} );

      return Object.values( nombresAgrupados ).map( item => ( {
        ...item,
        LLAVE: item.LLAVE
      } ) );
    } catch ( error ) {
      console.error( "Error en obtenerInternosProcesado2:", error );
      throw error;
    }
  },

  async obtenerNombresPorBloques6() {
    try {
      const [ resultados ] = await pool.query( `
        SELECT DISTINCT n.*, m1.LLAVE
        FROM nombres n
        JOIN movimientos m1 ON n.ID_ALTERNA = m1.ID_ALTERNA
        JOIN (
          SELECT m1.ID_ALTERNA, m1.LLAVE
          FROM movimientos m1
          JOIN movimientos m2 ON m1.LLAVE = m2.LLAVE
          WHERE m1.ID_BLOQUE_FUNCIONAL IN (1, 2)
            AND m2.ID_BLOQUE_FUNCIONAL = 6
            AND m1.LLAVE = m2.LLAVE
            AND m2.ID_ALTERNA != m1.ID_ALTERNA
            AND m1.procesado = 2
            AND m2.procesado = 9
          GROUP BY m1.LLAVE
          LIMIT 5
        ) AS sub ON m1.ID_ALTERNA = sub.ID_ALTERNA
      `);
      return resultados.length > 0 ? resultados : [];
    } catch ( error ) {
      console.error( "Error en obtenerNombresPorBloques6:", error );
      throw error;
    }
  },
  async obtenerNombresPorBloques6D() {
    try {
      const [ resultados ] = await pool.query( `
        SELECT DISTINCT n.*, m1.LLAVE
        FROM nombres n
        JOIN movimientos m1 ON n.ID_ALTERNA = m1.ID_ALTERNA
        JOIN (
          SELECT m1.ID_ALTERNA, m1.LLAVE
          FROM movimientos m1
          JOIN movimientos m2 ON m1.LLAVE = m2.LLAVE
          WHERE m1.ID_BLOQUE_FUNCIONAL IN (1, 2)
            AND m2.ID_BLOQUE_FUNCIONAL = 6
            AND m1.LLAVE = m2.LLAVE
            AND m2.ID_ALTERNA != m1.ID_ALTERNA
            AND m1.procesado = 2
            AND m2.procesado = 10
          GROUP BY m1.LLAVE
          LIMIT 5
        ) AS sub ON m1.ID_ALTERNA = sub.ID_ALTERNA
      `);
      return resultados.length > 0 ? resultados : [];
    } catch ( error ) {
      console.error( "Error en obtenerNombresPorBloques6D:", error );
      throw error;
    }
  },
  // 🔹 NUEVO: Obtener nombres por bloques funcionales para procesado = 11
  async obtenerNombresPorBloques11() {
    try {
      const [ resultados ] = await pool.query( `
        SELECT DISTINCT n.*, m1.LLAVE
        FROM nombres n
        JOIN movimientos m1 ON n.ID_ALTERNA = m1.ID_ALTERNA
        JOIN (
          SELECT m1.ID_ALTERNA, m1.LLAVE
          FROM movimientos m1
          JOIN movimientos m2 ON m1.LLAVE = m2.LLAVE
          WHERE m1.ID_BLOQUE_FUNCIONAL IN (1, 2)
            AND m2.ID_BLOQUE_FUNCIONAL = 6
            AND m1.LLAVE = m2.LLAVE
            AND m2.ID_ALTERNA != m1.ID_ALTERNA
            AND m1.procesado = 2
            AND m2.procesado = 11
          GROUP BY m1.LLAVE
        ) AS sub ON m1.ID_ALTERNA = sub.ID_ALTERNA
      `);
      return resultados.length > 0 ? resultados : [];
    } catch ( error ) {
      console.error( "Error en obtenerNombresPorBloques11:", error );
      throw error;
    }
  },
  async obtenerDescripcionErrorB6() {
    try {
      const [ resultados ] = await pool.query( `
SELECT DISTINCT 
    n.descripcion, 
    n.LLAVE,
    n.FORMULARIO,
    n.CAMPO,
    n.ID_BLOQUE_FUNCIONAL
FROM errores_formulario n
JOIN movimientos m1 ON n.LLAVE = m1.LLAVE
JOIN (
  SELECT m1.ID_ALTERNA, m1.LLAVE
  FROM movimientos m1
  JOIN movimientos m2 ON m1.LLAVE = m2.LLAVE
  WHERE m1.ID_BLOQUE_FUNCIONAL IN (1, 2)
    AND m2.ID_BLOQUE_FUNCIONAL = 6
    AND m1.LLAVE = m2.LLAVE
    AND m2.ID_ALTERNA != m1.ID_ALTERNA
    AND m1.procesado = 2
    AND m2.procesado = 11
  GROUP BY m1.LLAVE
) AS sub ON m1.ID_ALTERNA = sub.ID_ALTERNA
ORDER BY n.LLAVE ASC;

      `);
      return resultados.length > 0 ? resultados : [];
    } catch ( error ) {
      console.error( "Error en obtenerDescripcionErrorB6" );
      throw error;
    }
  },
  async obtenerDescripcionErrorB12() {
    try {
      const [ resultados ] = await pool.query( `
    SELECT DISTINCT
    m.ID_ALTERNA, 
    m.LLAVE,
    n.DNOMBRE, 
    n.DPATERNO, 
    n.DMATERNO,
    e.DESCRIPCION,
    e.FORMULARIO,
    e.CAMPO,
    e.ID_BLOQUE_FUNCIONAL
FROM movimientos m
INNER JOIN nombres n ON m.ID_ALTERNA = n.ID_ALTERNA
LEFT JOIN errores_formulario e ON m.LLAVE = e.LLAVE
WHERE m.PROCESADO = 8 
AND m.ID_BLOQUE_FUNCIONAL IN (1, 2)
ORDER BY m.LLAVE, e.ID_BLOQUE_FUNCIONAL;
      `);
      return resultados.length > 0 ? resultados : [];
    } catch ( error ) {
      console.error( "Error en obtenerDescripcionErrorB6" );
      throw error;
    }
  }
};

module.exports = buscarInternosModel;
