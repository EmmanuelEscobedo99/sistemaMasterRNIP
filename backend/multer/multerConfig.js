const multer = require('multer');

// Configuración de multer para almacenar en memoria
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 120 * 1024 }, // Limitar tamaño de archivo a 120KB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg/; // Aceptar solo archivos JPG
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype) {
            return cb(null, true);
        }
        cb(new Error('Error: El archivo debe ser una imagen JPG.'));
    },
});

module.exports = upload;
