import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Nav, NavItem, NavLink, Button, Card, CardBody, CardTitle } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setImagenes, setObtuveImagenes } from '../../../redux/imagenesSlice';
import { VistaPrincipales } from '../VistasFormulario/VistaPrincipales';
import { VistaHuella } from '../VistasFormulario/VistaHuella';
import Swal from 'sweetalert2';
import { limpiarHuellas } from '../../../redux/huellasSlice';
import useStore from "../../../../app/useStore";
import api from '../../../../api/api'; // ✅ Se usa en lugar de axios directo

const SeleccionarForm = () => {
  const navigate = useNavigate();
  const { llaveSeleccionada } = useStore();
  const LLAVE = llaveSeleccionada;
  const dispatch = useDispatch();

  const emisor = '33';
  const estado_emisor = '3';

  const errores2 = useSelector((state) => state.imagenes.errores2);
  const errores3 = useSelector((state) => state.huellas.errores2);
  const erroresCombinados = { ...errores2, ...errores3 };

  const imagenes = useSelector((state) => state.imagenes.imagenes).filter((img) => img !== null);
  const huellas = useSelector((state) => state.huellas.imagenes).filter((img) => img !== null);

  const [idAlterna, setIdAlterna] = useState(0);
  const [activeKey, setActiveKey] = useState('2');

  useEffect(() => {
    const obtenerIdAlterna = async () => {
      if (!LLAVE) return;
      try {
        const response = await api.post('/bloque1/idAlterna', { LLAVE });
        if (response.data && response.data[0]) {
          setIdAlterna(response.data[0].ID_ALTERNA);
          console.log("Nuevo ID_ALTERNA obtenido:", response.data[0].ID_ALTERNA);
        }
      } catch (error) {
        console.error("Error obteniendo ID_ALTERNA:", error);
      }
    };

    obtenerIdAlterna();
  }, [LLAVE]);

  useEffect(() => {
    const obtenerImagenes = async () => {
      if (!idAlterna) return;
      try {
        const response = await api.get(`/mostrarPrincipales/principales/${idAlterna}`);
        if (response.data?.imagenes) {
          dispatch(setImagenes(response.data.imagenes));
          dispatch(setObtuveImagenes(imagenes.length > 0));
        }
      } catch (error) {
        dispatch(setObtuveImagenes(false));
        console.error("Error cargando imágenes principales:", error);
      }
    };

    obtenerImagenes();
  }, [idAlterna]);

  const handleRegresar = () => {
    dispatch(setImagenes([]));
    dispatch(limpiarHuellas([]));
    navigate('/capturista/tabladatos');
    setTimeout(() => window.location.reload(), 100);
  };

  const handleSubmit = async () => {
    try {
      const responseMovimientos = await api.post("/movimientos/generar-id-alterna", {
        llave: LLAVE,
      });

      const nuevoIdAlterna = responseMovimientos?.data?.id_alterna;
      if (!nuevoIdAlterna) {
        return Swal.fire("Error", "No se pudo generar el nuevo ID_ALTERNA en movimientos.", "error");
      }

      const formData = new FormData();
      const gruposPrincipales = ["A", "B", "C"];

      imagenes.forEach((img, index) => {
        if (img?.file) {
          const key = `imagen${index + 1}`;
          formData.append(key, img.file);
          formData.append(`${key}_grupo`, gruposPrincipales[index] || "A");
        }
      });

      huellas.forEach((img, index) => {
        if (img?.file) {
          const key = `imagen${index + 1 + imagenes.length}`;
          formData.append(key, img.file);
          formData.append(`${key}_grupo`, (index + 1) % 10);
        }
      });

      formData.append("id_alterna", nuevoIdAlterna);
      formData.append("estado_emisor", estado_emisor);
      formData.append("emisor", emisor);
      formData.append("llave", LLAVE);
      formData.append("folio", "101001");

      const responseImagenes = await api.post("/imagenes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (responseImagenes.status === 200) {
        Swal.fire("¡Éxito!", "Las imágenes se enviaron correctamente.", "success").then(() => {
          navigate('/capturista');
          setTimeout(() => window.location.reload(), 100);
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

          <Nav variant="tabs" activeKey={activeKey} onSelect={setActiveKey}>
            <NavItem><NavLink eventKey="2">Principales</NavLink></NavItem>
            <NavItem><NavLink eventKey="3">Huellas</NavLink></NavItem>
            <NavItem><NavLink eventKey="4">Finalizar</NavLink></NavItem>
            <NavItem>
              <Button variant="white" onClick={handleRegresar}>Regresar a la Tabla</Button>
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
                disabled={imagenes.length + huellas.length < 13 || Object.keys(erroresCombinados).length > 0}
              >
                Enviar
              </Button>
              <div className="mt-3">
                <h6>Errores de los formularios:</h6>
                <ul>
                  {Object.keys(erroresCombinados).length === 0 ? (
                    <li className="text-success">No hay errores.</li>
                  ) : (
                    Object.entries(erroresCombinados).map(([key, msg], index) => (
                      <li key={index} className="text-danger">{msg}</li>
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
