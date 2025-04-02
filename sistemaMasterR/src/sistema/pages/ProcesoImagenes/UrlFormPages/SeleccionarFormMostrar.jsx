import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Nav, NavItem, NavLink, Button, Card, CardBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setImagenes, setObtuveImagenes } from '../../../redux/imagenesSlice';
import axios from 'axios';
import Swal from 'sweetalert2';
import { limpiarHuellas } from '../../../redux/huellasSlice';
import useStore from "../../../../app/useStore";
import { VistaEditar } from '../VistasFormulario/VistaEditar';
import { VistaEditarHuellas } from '../VistasFormulario/VistaEditarHuellas';
import { motion } from 'framer-motion';

const SeleccionarFormMostrar = () => {
  const navigate = useNavigate();
  const { llaveSeleccionada } = useStore();
  const LLAVE = llaveSeleccionada;
  const dispatch = useDispatch();

  const emisor = '33';
  const estado_emisor = '3';

  const errores2 = useSelector((state) => state.imagenes.errores2);
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
      if (!llaveSeleccionada) return;
      try {
        const response = await axios.post('http://localhost:3000/api/bloque1/idAlterna', { LLAVE: llaveSeleccionada });
        if (response.data && response.data[0]) {
          setIdAlterna(response.data[0].ID_ALTERNA);
        }
      } catch (error) {
        console.error("Error obteniendo ID_ALTERNA:", error);
      }
    };
    if (llaveSeleccionada) obtenerIdAlterna();
  }, [llaveSeleccionada]);

  useEffect(() => {
    const obtenerImagenesPorLlave = async () => {
      if (!LLAVE) return;
      try {
        const response = await axios.get(`http://localhost:3000/api/imagenesPorLlave/${LLAVE}`);
        if (Array.isArray(response.data)) {
          dispatch(setImagenes(response.data));
          dispatch(setObtuveImagenes(response.data.length > 0));
        } else {
          dispatch(setImagenes([]));
          dispatch(setObtuveImagenes(false));
        }
      } catch (error) {
        dispatch(setImagenes([]));
        dispatch(setObtuveImagenes(false));
        console.error("Error al obtener imágenes por LLAVE:", error);
      }
    };
    obtenerImagenesPorLlave();
  }, [LLAVE]);

  const handleRegresar = () => {
    dispatch(setImagenes([]));
    dispatch(limpiarHuellas([]));
    navigate('/capturista/tabladatos');
    setTimeout(() => window.location.reload(), 100);
  };

  const handleSubmit = async () => {
    try {
      const responseMovimientos = await axios.post("http://localhost:3000/api/movimientos/generar-id-alterna", {
        llave: llaveSeleccionada,
      });

      if (responseMovimientos.status !== 200 || !responseMovimientos.data.id_alterna) {
        return Swal.fire("Error", "No se pudo generar el nuevo ID_ALTERNA.", "error");
      }

      const nuevoIdAlterna = responseMovimientos.data.id_alterna;

      const formData = new FormData();
      const gruposPrincipales = ["A", "B", "C"];
      const imagenesPrincipales = imagenesFiltradas.map((img, index) => ({
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
      formData.append("folio", "101001");

      const responseImagenes = await axios.post(
        "http://localhost:3000/api/imagenes/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (responseImagenes.status === 200) {
        Swal.fire("¡Éxito!", "Las imágenes se enviaron correctamente.", "success").then(() => {
          navigate('/capturista');
          setTimeout(() => window.location.reload(), 100);
        });
      } else {
        Swal.fire("Error", "No se pudieron enviar las imágenes.", "error");
      }

    } catch (error) {
      console.error("Error en handleSubmit:", error);
      Swal.fire("Error", "Hubo un problema al conectar con el servidor.", "error");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-[#0A0A0A] text-white">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="bg-[#1F2937] rounded-xl shadow p-6 mb-6">
          <h2 className="text-center text-2xl font-bold text-yellow-400 mb-4">
            ✨ Selecciona qué deseas editar
          </h2>

          <Nav variant="pills" className="justify-content-center gap-3 mb-4" activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
            <NavItem><NavLink eventKey="2" className="rounded-full bg-gray-800 text-cyan-400">📷 Principales</NavLink></NavItem>
            <NavItem><NavLink eventKey="3" className="rounded-full bg-gray-800 text-cyan-400">🧤 Huellas</NavLink></NavItem>
          </Nav>

          <div className="text-end">
            <Button variant="outline-light" onClick={handleRegresar}>⬅ Regresar</Button>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
        <div className="bg-[#1F2937] text-white rounded-xl shadow p-6">
          {activeKey === '2' && <VistaEditar />}
          {activeKey === '3' && <VistaEditarHuellas />}

          {activeKey === '4' && (
            <>
              <Button
                variant="success"
                className="w-full mb-4 rounded-full"
                onClick={handleSubmit}
                disabled={imagenesFiltradas.length + huellasFiltradas.length < 13 || Object.keys(erroresCombinados).length > 0}
              >
                🚀 Enviar Imágenes
              </Button>

              <div>
                {Object.keys(erroresCombinados).length === 0 ? (
                  <div className="alert alert-success rounded text-white bg-green-700 border-0">
                    ✅ No hay errores.
                  </div>
                ) : (
                  <div className="alert alert-danger rounded bg-red-800 text-white border-0">
                    <h6 className="mb-2">❗ Errores detectados:</h6>
                    <ul className="mb-0">
                      {Object.values(erroresCombinados).map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SeleccionarFormMostrar;
