const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const imagenesRoutes = require('./routes/Bloque6/imagenesRoutes');
const principalesRoutes = require('./routes/Bloque6/principalesRoutes');
const mostrarPrincipalesRoutes = require('./routes/Bloque6/mostrarPrincipalesRoutes');
const bloque1Routes = require('./routes/Bloque1/bloque1Routes');
const editarPrincipalesRoutes = require('./routes/Bloque6/editarPrincipalesRoutes');
const huellasRoutes = require('./routes/Bloque6/huellasRoutes');
const mostrarHuellasRoutes = require('./routes/Bloque6/mostrarHuellasRoutes');
const editarHuellasRoutes = require('./routes/Bloque6/editarHuellasRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use('/api/imagenes', imagenesRoutes);
app.use('/api/principales', principalesRoutes);
app.use('/api/mostrarPrincipales', mostrarPrincipalesRoutes);
app.use('/api/bloque1', bloque1Routes);
app.use('/api/editarPrincipales', editarPrincipalesRoutes);
app.use('/api/huellas', huellasRoutes);
app.use('/api/mostrarHuellas', mostrarHuellasRoutes);
app.use('/api/editarHuellas', editarHuellasRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});