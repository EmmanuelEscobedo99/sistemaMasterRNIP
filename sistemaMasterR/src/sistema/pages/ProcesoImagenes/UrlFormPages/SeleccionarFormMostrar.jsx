import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Nav, NavItem, NavLink, Button } from 'react-bootstrap';
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
  const dispatch = useDispatch();

  const errores2 = useSelector((state) => state.imagenes.errores2);
  const errores3 = useSelector((state) => state.huellas.errores2);
  const erroresCombinados = { ...errores2, ...errores3 };

  const imagenes = useSelector((state) => state.imagenes.imagenes);
  const huellas = useSelector((state) => state.huellas.imagenes);

  const imagenesFiltradas = imagenes.filter((img) => img?.file);
  const huellasFiltradas = huellas.filter((img) => img?.file);

  const [idAlterna, setIdAlterna] = useState(0);
  const [activeKey, setActiveKey] = useState('2');

  useEffect(() => {
    const obtenerIdAlterna = async () => {
      if (!llaveSeleccionada) return;
      try {
        const response = await axios.post('http://localhost:3000/api/bloque1/idAlterna', {
          LLAVE: llaveSeleccionada
        });
        if (response.data?.[0]) {
          setIdAlterna(response.data[0].ID_ALTERNA);
        }
      } catch (error) {
        console.error("Error obteniendo ID_ALTERNA:", error);
      }
    };
    obtenerIdAlterna();
  }, [llaveSeleccionada]);

  useEffect(() => {
    const obtenerImagenes = async () => {
      if (!llaveSeleccionada) return;
      try {
        const response = await axios.get(`http://localhost:3000/api/imagenesPorLlave/${llaveSeleccionada}`);
        if (Array.isArray(response.data)) {
          dispatch(setImagenes(response.data));
          dispatch(setObtuveImagenes(response.data.length > 0));
        } else {
          dispatch(setImagenes([]));
          dispatch(setObtuveImagenes(false));
        }
      } catch (error) {
        console.error("Error al obtener imágenes:", error);
      }
    };
    obtenerImagenes();
  }, [llaveSeleccionada]);

  const handleRegresar = () => {
    dispatch(setImagenes([]));
    dispatch(limpiarHuellas([]));
    navigate('/capturista/tabladatos');
    setTimeout(() => window.location.reload(), 100);
  };

  const handleSubmit = async () => {
    if (!idAlterna) {
      return Swal.fire("Error", "No se encontró el ID_ALTERNA del interno.", "error");
    }

    const formData = new FormData();
    let archivosSeleccionados = false;

    // Agregar imágenes principales: A, B, C
    ['A', 'B', 'C'].forEach((grupo, index) => {
      const img = imagenes[index];
      if (img?.file) {
        formData.append('nuevaImagen', img.file);
        formData.append('grupo', grupo);
        archivosSeleccionados = true;
      }
    });

    // Agregar imágenes de huellas: 0 a 9 (el grupo correcto está basado en el índice)
    const grupoMap = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]; // mapping correcto
    huellas.forEach((img, index) => {
      if (img?.file) {
        formData.append('nuevaImagen', img.file);
        formData.append('grupo', grupoMap[index].toString());
        archivosSeleccionados = true;
      }
    });

    if (!archivosSeleccionados) {
      return Swal.fire("Advertencia", "No se ha seleccionado ninguna nueva imagen para actualizar.", "warning");
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/imagenes/editar/${idAlterna}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.status === 200) {
        Swal.fire("¡Éxito!", "Las imágenes se actualizaron correctamente.", "success").then(() => {
          navigate('/capturista');
          setTimeout(() => window.location.reload(), 100);
        });
      } else {
        Swal.fire("Error", "No se pudieron actualizar las imágenes.", "error");
      }
    } catch (error) {
      console.error("Error al enviar imágenes:", error);
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

          <Nav variant="pills" className="justify-content-center gap-3 mb-4" activeKey={activeKey} onSelect={setActiveKey}>
            <NavItem><NavLink eventKey="2" className="rounded-full bg-gray-800 text-cyan-400">📷 Principales</NavLink></NavItem>
            <NavItem><NavLink eventKey="3" className="rounded-full bg-gray-800 text-cyan-400">🧤 Huellas</NavLink></NavItem>
            <NavItem><NavLink eventKey="4" className="rounded-full bg-green-700 text-white">🚀 Finalizar</NavLink></NavItem>
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
                disabled={
                  Object.keys(erroresCombinados).length > 0 ||
                  (imagenesFiltradas.length === 0 && huellasFiltradas.length === 0)
                }
              >
                🚀 Enviar Imágenes
              </Button>

              {Object.keys(erroresCombinados).length > 0 && (
                <div className="alert alert-danger rounded bg-red-800 text-white border-0">
                  <h6 className="mb-2">❗ Errores detectados:</h6>
                  <ul className="mb-0">
                    {Object.values(erroresCombinados).map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {(imagenesFiltradas.length === 0 && huellasFiltradas.length === 0) && (
                <div className="alert alert-warning rounded bg-yellow-600 text-white border-0 mt-3">
                  ⚠ Debes seleccionar al menos una nueva imagen para actualizar.
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SeleccionarFormMostrar;
