const { body, validationResult } = require('express-validator');


const validarDatosUsuario = [
  body('nombre').trim().isAlpha().withMessage('El nombre debe contener solo letras.').escape(),
  body('aPaterno').trim().isAlpha().withMessage('El apellido paterno debe contener solo letras.').escape(),
  body('aMaterno').trim().isAlpha().withMessage('El apellido materno debe contener solo letras.').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validarDatosUsuario;