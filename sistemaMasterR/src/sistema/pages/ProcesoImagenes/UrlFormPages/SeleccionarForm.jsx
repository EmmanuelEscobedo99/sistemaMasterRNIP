import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Nav, NavItem, NavLink, Button, Card, CardBody, CardTitle } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setImagenes, setObtuveImagenes } from '../../../redux/imagenesSlice'; // Importamos la acción
import { VistaPrincipales } from '../VistasFormulario/VistaPrincipales';
import { VistaHuella } from '../VistasFormulario/VistaHuella';
import axios from 'axios';
import Swal from 'sweetalert2';
import { limpiarHuellas } from '../../../redux/huellasSlice'; // 🔥 Agregar esto
import useStore from "../../../../app/useStore";

const SeleccionarForm = () => {
  const navigate = useNavigate();
  const { llaveSeleccionada } = useStore();
  const LLAVE = llaveSeleccionada;
  console.log("LLAVE:", LLAVE);
  const dispatch = useDispatch();

  const emisor = '33';
  const estado_emisor = '3';

  const imagenesState = useSelector((state) => state.imagenes);
  console.log("Estado de imágenes en Redux:", imagenesState);
  
  const errores2 = useSelector((state) => state.imagenes.errores2);
  console.log("Errores 2:", errores2);
  
  const errores3 = useSelector((state) => state.huellas.errores2);

  const erroresCombinados = { ...errores2, ...errores3 };

  const imagenes = useSelector((state) => state.imagenes.imagenes);
  const imagenesFiltradas = imagenes.filter((img) => img !== null);
  const huellas = useSelector((state) => state.huellas.imagenes);
  const huellasFiltradas = huellas.filter((img) => img !== null);

  const [idAlterna, setIdAlterna] = useState(0);
  const [activeKey, setActiveKey] = useState('2');

  useEffect(() => {
    const obtenerIdAlterna = async () => {
      try {
        if (!llaveSeleccionada) return;
        const response = await axios.post('http://localhost:3000/api/bloque1/idAlterna', { LLAVE: llaveSeleccionada });
        if (response.data && response.data[0]) {
          setIdAlterna(response.data[0].ID_ALTERNA);
          console.log("Nuevo ID_ALTERNA obtenido:", response.data[0].ID_ALTERNA);
        }
      } catch (error) {
        console.error("Error obteniendo ID_ALTERNA:", error);
      }
    };

    if (llaveSeleccionada) {
      obtenerIdAlterna();
    }
  }, [llaveSeleccionada]); // ✅ Se ejecuta cuando cambia la llave seleccionada


  useEffect(() => {
    const obtenerImagenes = async () => {
      if (idAlterna) {
        try {
          const response = await axios.get(`http://localhost:3000/api/mostrarPrincipales/principales/${idAlterna}`);
          if (response.data && response.data.imagenes) {
            dispatch(setImagenes(response.data.imagenes));
            dispatch(setObtuveImagenes(imagenesFiltradas.length > 0));
            console.log("entre bien")
          }
        } catch (error) {
          dispatch(setObtuveImagenes([]));
          dispatch(setObtuveImagenes(false));
          console.log("ebtre errrir")
        }
      }
    };

    if (idAlterna) {
      obtenerImagenes();
    }
  }, [idAlterna]);

  const handleRegresar = () => {
    dispatch(setImagenes([])); // 🔥 Limpiar imágenes principales
    dispatch(limpiarHuellas([])); // 🔥 Limpiar imágenes de huellas
    navigate('/capturista/tabladatos'); // 🔄 Redirigir a la página de inicio
    
    setTimeout(() => {
      window.location.reload(); // 🔄 Recargar la página después de la navegación
    }, 100);
  };    

  const handleSubmit = async () => {
    try {
      // Paso 1: Generar nuevo ID_ALTERNA desde el backend, con base en un registro con PROCESADO = 2
      const responseMovimientos = await axios.post("http://localhost:3000/api/movimientos/generar-id-alterna", {
        llave: llaveSeleccionada,
      });
  
      if (responseMovimientos.status !== 200 || !responseMovimientos.data.id_alterna) {
        return Swal.fire("Error", "No se pudo generar el nuevo ID_ALTERNA en movimientos.", "error");
      }
  
      const nuevoIdAlterna = responseMovimientos.data.id_alterna;
      console.log("✅ Nuevo ID_ALTERNA generado:", nuevoIdAlterna);
  
      // Paso 2: Preparar imágenes para enviar
      const formData = new FormData();
  
      const gruposPrincipales = ["A", "B", "C"];
      const imagenesValidas = imagenesFiltradas.filter((img) => img !== undefined && img !== null);
      const imagenesPrincipales = imagenesValidas.map((img, index) => ({
        ...img,
        key: `imagen${index + 1}`,
        grupo: gruposPrincipales[index] || "A"
      }));
  
      const imagenesHuellas = huellasFiltradas.map((img, index) => ({
        ...img,
        key: `imagen${index + 1 + imagenesPrincipales.length}`,
        grupo: (index + 1) % 10
      }));
  
      const imagenesFinales = [...imagenesPrincipales, ...imagenesHuellas];
  
      imagenesFinales.forEach((img) => {
        if (img?.file) {
          formData.append(img.key, img.file);
          formData.append(`${img.key}_grupo`, img.grupo);
        }
      });
  
      formData.append("id_alterna", nuevoIdAlterna);
      formData.append("estado_emisor", estado_emisor);
      formData.append("emisor", emisor);
      formData.append("llave", llaveSeleccionada);
      formData.append("folio", "101001"); // Valor fijo
  
      // Paso 3: Enviar imágenes al backend
      const responseImagenes = await axios.post(
        "http://localhost:3000/api/imagenes/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      if (responseImagenes.status === 200) {
        Swal.fire("¡Éxito!", "Las imágenes se enviaron correctamente.", "success").then(() => {
          navigate('/capturista');
          setTimeout(() => {
            window.location.reload();
          }, 100);
        });
      } else {
        Swal.fire("Error", "No se pudieron enviar las imágenes.", "error");
      }
  
    } catch (error) {
      console.error("❌ Error en handleSubmit:", error);
      Swal.fire("Error", "Hubo un problema al conectar con el servidor.", "error");
    }
  };        
  

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Seleccionar Formulario</CardTitle>

          <Nav variant="tabs" activeKey={activeKey} onSelect={(selectedKey) => setActiveKey(selectedKey)}>
            <NavItem>
              <NavLink eventKey="2">Principales</NavLink>
            </NavItem>
            <NavItem>
              <NavLink eventKey="3">Huellas</NavLink>
            </NavItem>
            <NavItem>
              <NavLink eventKey="4">Finalizar</NavLink>
            </NavItem>
            <NavItem>
              <Button variant="white" onClick={handleRegresar}>
                Regresar a la Tabla
              </Button>
            </NavItem>
          </Nav>
        </CardBody>
      </Card>

      <Card className="mt-3">
        <CardBody>
          {activeKey === '2' && <VistaPrincipales />}
          {activeKey === '3' && <VistaHuella />}
          {activeKey === '4' && (
            <>
              <Button
                variant="success"
                block
                onClick={handleSubmit}
                disabled={imagenesFiltradas.length + huellasFiltradas.length < 13 || Object.keys(erroresCombinados).length > 0}
              >
                Enviar
              </Button>
              <div className="mt-3">
                <h6>Errores de los formularios:</h6>
                <ul>
                  {Object.keys(erroresCombinados).length === 0 ? (
                    <li className="text-success">No hay errores.</li>
                  ) : (
                    Object.keys(erroresCombinados).map((key, index) => (
                      <li key={index} className="text-danger">{erroresCombinados[key]}</li>
                    ))
                  )}
                </ul>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default SeleccionarForm;