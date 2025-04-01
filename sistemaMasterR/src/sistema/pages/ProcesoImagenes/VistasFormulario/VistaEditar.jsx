import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SubirPrincipales } from '../../../componentes/bloqueSeis/ProcesoImagenes/Imagenes/Principales/SubirPrincipales';
import {
  setImagenes,
  setLoading,
  setIdAlterna,
  setImagenesObtenidas,
  setObtuveImagenes,
  setEnviando,
  agregarError2,
  limpiarError2
} from '../../../redux/imagenesSlice';
import useStore from "../../../../app/useStore";
import { EditarPrincipales } from '../../../componentes/bloqueSeis/ProcesoImagenes/Imagenes/Principales/EditarPrincipales';

export const VistaEditar = () => {
  const navigate = useNavigate();
  const emisor = 2, estado_emisor = 33;
  const { llaveSeleccionada } = useStore();
  const LLAVE = llaveSeleccionada;

  // 🔹 Establecer el modo en "editar" de forma predeterminada
  const [modo, setModo] = useState('editar'); // Siempre en modo 'editar'

  // Usar useSelector para obtener el estado de Redux
  const { imagenes, loading, idAlterna, imagenesObtenidas, obtuveImagenes, enviando, errores2 } = useSelector((state) => state.imagenes);

  const dispatch = useDispatch();
  const TAMANO_MAXIMO_MB = 0.12;
  const TAMANO_MAXIMO = TAMANO_MAXIMO_MB * 1024 * 1024;

  const obtenerIdAlterna = async (LLAVE) => {
    try {
      const response = await axios.post('http://localhost:3000/api/bloque1/idAlterna', { LLAVE });
      if (response && response.data.status !== 404) {
        dispatch(setIdAlterna(response.data[0].ID_ALTERNA));
        dispatch(setEnviando(false));
      } else {
        dispatch(setEnviando(true));
        dispatch(agregarError2('Error al obtener el ID alterna.'));
      }
    } catch (error) {
      console.error('Error al obtener el ID alterna:', error);
    }
  };

  const obtenerImagenes = async () => {
    if (!idAlterna) return; // 🚀 Evitar llamadas con un idAlterna vacío
  
    try {
      const response = await axios.get(`http://localhost:3000/api/mostrarPrincipales/principales/${idAlterna}`); // ✅ CORREGIDO
  
      if (response.data && Array.isArray(response.data.imagenes)) {
        const imagenesFiltradas = response.data.imagenes;
        dispatch(setImagenesObtenidas(imagenesFiltradas));
        dispatch(setObtuveImagenes(imagenesFiltradas.length > 0));
      } else {
        dispatch(setImagenesObtenidas([]));
        dispatch(setObtuveImagenes(false));
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      dispatch(setImagenesObtenidas([]));
      dispatch(setObtuveImagenes(false));
      dispatch(agregarError2({ index: 'global', mensaje: 'Error al obtener imágenes.' }));
    }
  };

  const handleCambioImagen = (e, index) => {
    const file = e.target.files[0];
  
    if (file) {
      if (!file.type.includes('image/jpeg')) {
        dispatch(agregarError2({ index, mensaje: '[PRINCIPALES] Solo se permiten imágenes en formato JPEG.' }));
        return;
      }
  
      if (file.size > TAMANO_MAXIMO) {
        dispatch(agregarError2({ index, mensaje: '[PRINCIPALES] El archivo supera los ${TAMANO_MAXIMO_MB} MB.' }));
        return;
      }
  
      dispatch(limpiarError2(index)); // ✅ Eliminar el error si la imagen es válida.
  
      const reader = new FileReader();
      reader.onloadend = () => {
        const nuevasImagenes = [...imagenes];
        nuevasImagenes[index] = { url: reader.result, file, name: file.name }; // Guardar nombre del archivo temporalmente
        dispatch(setImagenes(nuevasImagenes));
      };
      reader.readAsDataURL(file);
    }
  };  
  
  // 🔄 **Después de actualizar, limpiar los inputs de selección de archivos**
  const onSubmit = async (e) => {
    e.preventDefault();
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: modo === 'editar' ? '¿Deseas actualizar las imágenes seleccionadas?' : '¿Deseas enviar las imágenes?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'No, cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(setEnviando(true));
          const formData = new FormData();
  
          if (modo === 'editar') {  // Solo mantener el caso 'editar'
            const gruposAsignados = ['A', 'B', 'C'];
  
            imagenes.forEach((img, index) => {
              if (img?.file) {
                const grupoIndex = index - 1; // ✅ Corregimos la desincronización
                const grupo = gruposAsignados[grupoIndex] || gruposAsignados[index]; // Asegurar que el índice no sea negativo
                formData.append(`nuevaImagen`, img.file);
                formData.append(`grupo`, grupo);
              }
            });
          }
  
          formData.append('id_alterna', idAlterna);
          formData.append('emisor', emisor);
          formData.append('estado_emisor', estado_emisor);
          formData.append('llave', LLAVE);
  
          const url = `http://localhost:3000/api/editarPrincipales/editar/${idAlterna}`;
          const method = 'put';
  
          const response = await axios({
            method: method,
            url: url,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
          });
  
          if (response.status === 200) {
            Swal.fire("¡Éxito!", 'Las imágenes se han actualizado correctamente.', "success")
              .then(() => {
                dispatch(setImagenes([null, null, null]));
                obtenerImagenes(); 
                document.querySelectorAll('input[type="file"]').forEach(input => {
                  input.value = "";
                });
              });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error en la operación.',
            });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error en la conexión.',
          });
        } finally {
          dispatch(setEnviando(false));
        }
      }
    });
  };
  
  useEffect(() => {
    if (LLAVE) {  // ✅ Solo obtener imágenes si LLAVE tiene un valor válido
      obtenerIdAlterna(LLAVE);
    }
  }, [LLAVE]);  

  useEffect(() => {
    if (modo === 'editar') {
      obtenerImagenes(); // 🔄 Solo actualizar imágenes en modo edición
    }
  }, [idAlterna, modo]);  

  return (
    <EditarPrincipales
      imagenes={imagenes}
      loading={loading}
      enviando={enviando}
      imagenesObtenidas={imagenesObtenidas}
      obtuveImagenes={obtuveImagenes}
      handleCambioImagen={handleCambioImagen}
      onSubmit={onSubmit}
      errores2={errores2}
      LLAVE={LLAVE}
      editarPrincipales={() => {} /* No es necesario hacer nada ya que ya está en modo editar */}
      regresarFormularios={() => navigate(`/formPaginas/${LLAVE}`)}
      modo={modo}
    />
  );
};
