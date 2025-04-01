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
  const { imagenes, loading, idAlterna, enviando, errores2 } = useSelector((state) => state.imagenes);

  const TAMANO_MAXIMO_MB = 0.12;
  const TAMANO_MAXIMO = TAMANO_MAXIMO_MB * 1024 * 1024;

  const obtenerIdAlterna = async (LLAVE) => {
    console.log("LLAVEFSSDFSDFSDFSDFSDFDFGDFGDFGDFGDFG", LLAVE)
    try {
      const response = await axios.post('http://localhost:3000/api/bloque1/idAlterna', { LLAVE });
      if (response && response.data.status !== 404) {
        dispatch(setIdAlterna(response.data[0].ID_ALTERNA));
        dispatch(setEnviando(false));
        console.log("sdsdfsdfsdfsdfsdf", idAlterna)
      } else {
        dispatch(setEnviando(true));
        dispatch(agregarError2('Error al obtener el ID alterna.'));
      }
    } catch (error) {
      console.error('Error al obtener el ID alterna:', error);
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
        const nuevasImagenes = [...imagenes];
        nuevasImagenes[index] = { url: reader.result, file, name: file.name };
        dispatch(setImagenes(nuevasImagenes));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas actualizar las imágenes seleccionadas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'No, cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(setEnviando(true));
          const formData = new FormData();
          const gruposAsignados = ['A', 'B', 'C'];

          imagenes.forEach((img, index) => {
            if (img?.file) {
              const grupo = gruposAsignados[index] || 'A';
              formData.append(`nuevaImagen`, img.file);
              formData.append(`grupo`, grupo);
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
            Swal.fire("¡Éxito!", 'Las imágenes se han actualizado correctamente.', "success")
              .then(() => {
                dispatch(setImagenes([null, null, null]));
                document.querySelectorAll('input[type="file"]').forEach(input => input.value = "");
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

  // 👇 Extrae directamente las imágenes A, B y C desde "imagenes"
  const imagenesPrincipales = imagenes
    ?.filter((img) => img !== null && ['A', 'B', 'C'].includes(img.grupo))
    .map((img) => ({
      grupo: img.grupo,
      imagen: img.imagen || img.url, // soporte para base64 o FileReader
    })) || [];

  return (
    <EditarPrincipales
      imagenes={imagenes}
      loading={loading}
      enviando={enviando}
      imagenesObtenidas={imagenesPrincipales}
      obtuveImagenes={imagenesPrincipales.length > 0}
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
