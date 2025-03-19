const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Importar cookie-parser //a
const dotenv = require('dotenv');
const ipRouter = require('./routes/ip/ipRouter');
const loginRouter = require('./routes/auth/authRoutes');
const registroRoutes = require('./routes/registroUsuarios/registroUsuarios');
const datosRoutes = require('./routes/mostrarDatos/mostrarDatos');
const idAlternaRoutes = require('./routes/idAlterna/idAlternaRoutes');
const mostrarPrincipalesRoutes = require('./routes/Bloque6/mostrarPrincipalesRoutes');
const mostrarHuellasRoutes = require('./routes/Bloque6/mostrarHuellasRoutes');
const mostrarDatosGenerales = require('./routes/Bloque1/DatosGenerales/DatosGeneralesRoutes');
const mostrarNombres = require('./routes/Bloque1/Nombres/NombresRoutes');
const mostrarAlias = require('./routes/Bloque1/Alias/AliasRoutes');
const mostrarDomicilio = require('./routes/Bloque1/Domicilio/DomicilioRoutes');
const mostrarSituacion = require('./routes/Bloque2/Situacion/SituacionRoutes');
const mostrarJuridicos = require('./routes/Bloque2/Juridicos/JuridicosRoutes');
const mostrarEjecucion = require('./routes/Bloque2/Ejecucion/EjecucionRoutes');
const mostrarODelitos = require('./routes/Bloque2/ODelito/ODelitoRoutes');
const mostrarIngresos = require('./routes/Bloque2/Ingresos/IngresosRoutes');
const mostrarIngdelito = require('./routes/Bloque2/Ingdelito/IngdelitoRoutes');
const mostrarInternos = require('./routes/BuscarInternos/buscarInternosRoutes');
const rechazarRoutes = require('./routes/Rechazar/RechazarRoutes');
const AprovarRoutes = require('./routes/Aprovar/AprovarRoutes');
const editarHuellasRoutes = require('./routes/Bloque6/editarHuellasRoutes');
const editarPrincipalesRoutes = require('./routes/Bloque6/editarPrincipalesRoutes');
const huellasRoutes = require('./routes/Bloque6/huellasRoutes');
const imagenesRoutes = require('./routes/Bloque6/imagenesRoutes');
const principalesRoutes = require('./routes/Bloque6/principalesRoutes');
const obtenerIdAlterna  = require('./routes/Bloque1/obtenerIdAlterna/obtenerIdAlternaRoutes')

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
app.use('/api/bloque1', mostrarDatosGenerales);
app.use('/api/nombres', mostrarNombres);
app.use('/api/alias', mostrarAlias);
app.use('/api/domicilio', mostrarDomicilio);
app.use('/api/situacion', mostrarSituacion);
app.use('/api/juridicos', mostrarJuridicos);
app.use('/api/ejecucion', mostrarEjecucion);
app.use('/api/odelitos', mostrarODelitos);
app.use('/api/ingresos', mostrarIngresos);
app.use('/api/ingdelito', mostrarIngdelito);
app.use('/api/buscarInternos', mostrarInternos);
app.use('/api/rechazar', rechazarRoutes);
app.use('/api/aprovar', AprovarRoutes);
app.use('/api/principales', principalesRoutes);
app.use('/api/editarPrincipales', editarPrincipalesRoutes);
app.use('/api/huellas', huellasRoutes);
app.use('/api/editarHuellas', editarHuellasRoutes);
app.use('/api/imagenes', imagenesRoutes);
app.use('/api/bloque1', obtenerIdAlterna);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
