import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setImagenes,
  setIdAlterna,
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
  const [modo] = useState('editar');

  const dispatch = useDispatch();
  const { imagenes: imagenesNuevas, loading, idAlterna, enviando, errores2 } = useSelector((state) => state.imagenes);

  const [imagenesOriginales, setImagenesOriginales] = useState([]); // ← Array para las originales

  const TAMANO_MAXIMO_MB = 0.12;
  const TAMANO_MAXIMO = TAMANO_MAXIMO_MB * 1024 * 1024;

  const obtenerIdAlterna = async (LLAVE) => {
    try {
      const response = await axios.post('http://localhost:3000/api/bloque1/idAlterna', { LLAVE });
      if (response && response.data.status !== 404) {
        const idAlt = response.data[0].ID_ALTERNA;
        dispatch(setIdAlterna(idAlt));
        dispatch(setEnviando(false));

        const respImgs = await axios.get(`http://localhost:3000/api/imagenesPorIdAlterna/${idAlt}`);
        setImagenesOriginales(respImgs.data || []);
      } else {
        dispatch(setEnviando(true));
        dispatch(agregarError2('Error al obtener el ID alterna.'));
      }
    } catch (error) {
      console.error('Error al obtener el ID alterna o imágenes:', error);
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
        dispatch(agregarError2({ index, mensaje: `[PRINCIPALES] El archivo supera los ${TAMANO_MAXIMO_MB} MB.` }));
        return;
      }

      dispatch(limpiarError2(index));
      const reader = new FileReader();
      reader.onloadend = () => {
        const nuevasImagenes = [...imagenesNuevas];
        nuevasImagenes[index] = { url: reader.result, file, name: file.name };
        dispatch(setImagenes(nuevasImagenes));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: '¿Estás segura?',
      text: '¿Deseas actualizar las imágenes seleccionadas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(setEnviando(true));
          const formData = new FormData();
          const grupos = ['A', 'B', 'C'];

          imagenesNuevas.forEach((img, index) => {
            if (img?.file) {
              formData.append('nuevaImagen', img.file);
              formData.append('grupo', grupos[index]);
            }
          });

          formData.append('id_alterna', idAlterna);
          formData.append('emisor', emisor);
          formData.append('estado_emisor', estado_emisor);
          formData.append('llave', LLAVE);

          const response = await axios.put(
            `http://localhost:3000/api/editarPrincipales/editar/${idAlterna}`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
          );

          if (response.status === 200) {
            Swal.fire("¡Éxito!", 'Las imágenes se han actualizado correctamente.', "success").then(() => {
              dispatch(setImagenes([null, null, null]));
              document.querySelectorAll('input[type="file"]').forEach(input => input.value = "");
              obtenerIdAlterna(LLAVE); // recargar las imágenes originales
            });
          } else {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Hubo un error en la operación.' });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({ icon: 'error', title: 'Error', text: 'Hubo un error en la conexión.' });
        } finally {
          dispatch(setEnviando(false));
        }
      }
    });
  };

  useEffect(() => {
    if (LLAVE) {
      obtenerIdAlterna(LLAVE);
    }
  }, [LLAVE]);

  return (
    <EditarPrincipales
      imagenes={imagenesNuevas}
      loading={loading}
      enviando={enviando}
      imagenesObtenidas={imagenesOriginales}
      obtuveImagenes={imagenesOriginales.length > 0}
      handleCambioImagen={handleCambioImagen}
      onSubmit={onSubmit}
      errores2={errores2}
      LLAVE={LLAVE}
      editarPrincipales={() => {}}
      regresarFormularios={() => navigate(`/formPaginas/${LLAVE}`)}
      modo={modo}
    />
  );
};
