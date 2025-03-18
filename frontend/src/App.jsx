import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SubirPrincipales } from './Componentes/ProcesoImagenes/Imagenes/Principales/SubirPrincipales';
import { SubirFrente } from './Componentes/ProcesoImagenes/Imagenes/Principales/SubirFrente';
import { EditarPrincipales } from './Componentes/ProcesoImagenes/Imagenes/Principales/EditarPrincipales';
import { SubirHuellas } from './Componentes/ProcesoImagenes/Imagenes/Huellas/SubirHuellas';
import { EditarHuellas } from './Componentes/ProcesoImagenes/Imagenes/Huellas/EditarHuellas';
import { VistaTablaDatos } from './pages/ProcesoImagenes/TablaDatos/VistaTablaDatos';
import { VistaPrincipales } from './pages/ProcesoImagenes/VistasFormulario/VistaPrincipales';
import { VistaHuella } from './pages/ProcesoImagenes/VistasFormulario/VistaHuella';
import { VistaFotoFrente } from './pages/ProcesoImagenes/VistasFormulario/VistaFotoFrente';
//import { VistaEditarPrincipales } from './pages/ProcesoImagenes/VistasFormulario/VistaEditarPrincipales';
import { VistaEditarHuellas } from './pages/ProcesoImagenes/VistasFormulario/VistaEditarHuellas';
import { SeleccionarForm } from './pages/ProcesoImagenes/UrlFormPages/SeleccionarForm';

// Crear estructura

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/vistaFrontoFrente/:LLAVE" element={<VistaFotoFrente />} />
        <Route path="/subirFrente/:LLAVE" element={<SubirFrente />} />
        <Route path="/subirPrincipales/:LLAVE" element={<SubirPrincipales />} />
        <Route path="/editarPrincipales/:LLAVE" element={<EditarPrincipales />} />
        <Route path="/subirHuellas/:LLAVE" element={<SubirHuellas />} />
        <Route path="/editarHuellas/:LLAVE" element={<EditarHuellas />} />
        <Route path="/formPaginas" element={<SeleccionarForm />} />
        <Route path="/" element={<VistaTablaDatos />} />
        <Route path="/vistaPrincipales/:LLAVE" element={<VistaPrincipales />} />
        <Route path="/vistaHuella/:LLAVE" element={<VistaHuella />} />
        {/*<Route path="/vistaEditarPrincipales" element={<VistaEditarPrincipales />} />*/}
        <Route path="/vistaEditarHuellas/:LLAVE" element={<VistaEditarHuellas />} />
      </Routes>
    </Router>
  );
}

export default App;
