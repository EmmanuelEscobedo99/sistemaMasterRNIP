const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Importar cookie-parser
const dotenv = require('dotenv');
const ipRouter = require('./routes/ip/ipRouter');
const loginRouter = require('./routes/auth/authRoutes');
const registroRoutes = require('./routes/registroUsuarios/registroUsuarios');
const datosRoutes = require('./routes/mostrarDatos/mostrarDatos');
const idAlternaRoutes = require('./routes/idAlterna/idAlternaRoutes');
const mostrarPrincipalesRoutes = require('./routes/Bloque6/mostrarPrincipalesRoutes');
const mostrarHuellasRoutes = require('./routes/Bloque6/mostrarHuellasRoutes');

const app = express();
const PORT = 3000;

dotenv.config();

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Origen permitido
  credentials: true, // Permitir el uso de credenciales
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // Usar cookie-parser para parsear las cookies

app.use('/api/ip', ipRouter);
app.use('/api/auth', loginRouter);

app.use('/api/registrarUsuarios', registroRoutes);
app.use('/api/datos', datosRoutes);

app.use('/api/idAlterna', idAlternaRoutes);

app.use('/api/mostrarPrincipales', mostrarPrincipalesRoutes);
app.use('/api/mostrarHuellas', mostrarHuellasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
