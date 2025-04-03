import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { 
  setImagenes, 
  setIdAlterna, 
  setImagenesObtenidas, 
  setObtuveImagenes, 
  setEnviando,
  agregarError2,
  limpiarError2 
} from '../../../redux/huellasSlice';
import { SubirHuellas } from "../../../componentes/bloqueSeis/ProcesoImagenes/Imagenes/Huellas/SubirHuellas";
import useStore from "../../../../app/useStore";
import { EditarHuellas } from '../../../componentes/bloqueSeis/ProcesoImagenes/Imagenes/Huellas/EditarHuellas';

export const VistaEditarHuellas = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { llaveSeleccionada } = useStore();
  const LLAVE = llaveSeleccionada;
  const emisor = 2, estado_emisor = 33;

  const [modo, setModo] = useState('editar'); // Modo ahora es 'editar'

  const {
    idAlterna,
    imagenes,
    imagenesObtenidas,
    obtuveImagenes,
    enviando,
    errores2
  } = useSelector((state) => state.huellas);

  const MAX_SIZE_MB = 0.12;
  const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

  const obtenerIdAlterna = async (LLAVE) => {
    try {
      const response = await axios.post('http://localhost:3000/api/bloque1/idAlterna', { LLAVE });
      if (response.data && response.data[0]) {
        dispatch(setIdAlterna(response.data[0].ID_ALTERNA));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (LLAVE) {
      obtenerIdAlterna(LLAVE);
    }
  }, [LLAVE]);

  const fetchImages = async () => {
    if (idAlterna) {
      try {
        const response = await axios.get(`http://localhost:3000/api/mostrarHuellas/huellas/${idAlterna}`);
        dispatch(setImagenesObtenidas(response.data));
        dispatch(setObtuveImagenes(response.data.length > 0));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchImages();
  }, [idAlterna]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.includes('image/jpeg')) {
        dispatch(agregarError2({ index, mensaje: '[HUELLAS] Solo se permiten imágenes en formato JPEG.' }));
        return;
      }

      if (file.size > MAX_SIZE) {
        dispatch(agregarError2({ index, mensaje: `[HUELLAS] El archivo supera los ${MAX_SIZE_MB} MB.` }));
        return;
      }

      dispatch(limpiarError2(index));

      const reader = new FileReader();
      reader.onloadend = () => {
        const nuevasImagenes = [...imagenes];
        nuevasImagenes[index] = { url: reader.result, file };
        dispatch(setImagenes(nuevasImagenes));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
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

          // Modo EDITAR: Asignar correctamente el grupo basado en el índice
          const grupoMapping = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
          imagenes.forEach((img, index) => {
            if (img) {
              formData.append('nuevaImagen', img.file);
              formData.append('grupo', grupoMapping[index]); // Asigna el grupo correcto
            }
          });

          formData.append('id_alterna', idAlterna);
          formData.append('emisor', emisor);
          formData.append('estado_emisor', estado_emisor);
          formData.append('llave', LLAVE);

          const response = await axios.put(`http://localhost:3000/api/editarHuellas/editar/${idAlterna}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          if (response.status === 200) {
            Swal.fire("¡Éxito!", "Las imágenes se han actualizado correctamente.", "success")
              .then(() => {
                dispatch(setImagenes(Array(imagenes.length).fill(null)));
                fetchImages();
                document.querySelectorAll('input[type="file"]').forEach(input => {
                  input.value = '';
                });
                navigate('/capturista/b6rechazados');
              });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al actualizar las imágenes.',
            });
          }

        } catch (error) {
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

  return (
    <EditarHuellas
      LLAVE={LLAVE}
      isImagesFetched={obtuveImagenes}
      fetchedImages={imagenesObtenidas}
      imagenes={imagenes}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      setModo={setModo}  // Pasando la función para cambiar el modo (aunque en este caso no la usamos, ya que solo hay modo editar)
      errores2={errores2}
      modo={modo}  // Modo editado siempre
    />
  );
};
