const buscarInternosService = require('../../services/buscarInternos/buscarInternosService');

const buscarInternosController = {
  async obtenerInternosProcesado6(req, res) {
    try {
      const result = await buscarInternosService.obtenerInternos(6);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  async obtenerInternosProcesado9(req, res) {
    try {
      const result = await buscarInternosService.obtenerInternos(9);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  // 🔹 Agregado: Procesado 7 (Bloque 1y2D)
  async obtenerInternosProcesado7(req, res) {
    try {
      const result = await buscarInternosService.obtenerInternos(7);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  // 🔹 Agregado: Procesado 10 (Bloque 6D)
  async obtenerInternosProcesado10(req, res) {
    try {
      const result = await buscarInternosService.obtenerInternos(10);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  // 🔹 Agregado: Procesado 2 (NUEVA FUNCIÓN)
  async obtenerInternosProcesado2(req, res) {
    try {
      const result = await buscarInternosService.obtenerInternosProcesado2(); // ✅ función especializada
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },  

   // 🔹 NUEVO: Función para obtener los nombres según bloques funcionales
   async obtenerNombresPorBloques6(req, res) {
    try {
      const result = await buscarInternosService.obtenerNombresPorBloques6();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  async obtenerNombresPorBloques6D(req, res) {
    try {
      const result = await buscarInternosService.obtenerNombresPorBloques6D();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = buscarInternosController;
