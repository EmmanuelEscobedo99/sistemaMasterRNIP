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
import { SubirHuellas } from '../../../componentes/bloqueSeis/ProcesoImagenes/Imagenes/Huellas/SubirHuellas';
import useStore from '../../../../app/useStore';

export const VistaHuella = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { llaveSeleccionada } = useStore();
  const LLAVE = llaveSeleccionada;
  const emisor = 2, estado_emisor = 33;

  const [modo, setModo] = useState('subir'); // Modo por defecto es 'subir'

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
      const response = await axios.post('http://localhost:5000/api/bloque1/idAlterna', { LLAVE });
      if (response.data && response.data[0]) {
        dispatch(setIdAlterna(response.data[0].ID_ALTERNA));
      }
    } catch (error) {
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
        const response = await axios.get(`http://localhost:5000/api/mostrarHuellas/huellas/${idAlterna}`);
        dispatch(setImagenesObtenidas(response.data));
        dispatch(setObtuveImagenes(response.data.length > 0));
      } catch (error) {
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

  /*const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas enviar las imágenes?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'No, cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(setEnviando(true));
          const formData = new FormData();

          imagenes.forEach((img, index) => {
            if (img) {
              formData.append(`imagen${index + 1}`, img.file);
            }
          });

          formData.append('id_alterna', idAlterna);
          formData.append('emisor', emisor);
          formData.append('estado_emisor', estado_emisor);
          formData.append('llave', LLAVE);

          const response = await axios.post('http://localhost:5000/api/huellas/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          if (response.status === 200) {
            Swal.fire('¡Enviado!', 'El formulario se ha enviado correctamente.', 'success');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al enviar las imágenes.',
            });
          }
        } catch (error) {
          console.log(error);
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
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: modo === 'subir' ? '¿Deseas enviar las imágenes?' : '¿Deseas actualizar las imágenes seleccionadas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'No, cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(setEnviando(true));
          const formData = new FormData();
  
          if (modo === 'subir') {
            // 🔹 Modo SUBIR: Enviar todas las imágenes con nombres específicos
            imagenes.forEach((img, index) => {
              if (img) {
                formData.append(`imagen${index + 1}`, img.file);
              }
            });
  
            formData.append('id_alterna', idAlterna);
            formData.append('emisor', emisor);
            formData.append('estado_emisor', estado_emisor);
            formData.append('llave', LLAVE);
          } else if (modo === 'editar') {
            // 🔹 Modo EDITAR: Asignar correctamente el grupo basado en el índice
            const grupoMapping = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
            imagenes.forEach((img, index) => {
              if (img) {
                formData.append('nuevaImagen', img.file);
                formData.append('grupo', grupoMapping[index]); // ✅ Ahora asigna el grupo correcto
              }
            });
          }
  
          // 🔹 Seleccionar la URL y el método HTTP según el modo
          const url = modo === 'subir'
            ? 'http://localhost:5000/api/huellas/upload'
            : `http://localhost:5000/api/editarHuellas/editar/${idAlterna}`;
  
          const method = modo === 'subir' ? 'post' : 'put';
  
          const response = await axios({
            method: method,
            url: url,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
          });
  
          if (response.status === 200) {
            Swal.fire("¡Éxito!", `Las imágenes se han ${modo === 'subir' ? 'subido' : 'actualizado'} correctamente.`, "success")
              .then(() => {
                if (modo === 'editar') {
                  dispatch(setImagenes(Array(imagenes.length).fill(null)));
                  fetchImages();
                  document.querySelectorAll('input[type="file"]').forEach(input => {
                    input.value = '';
                  });
                }
              });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error en la operación.',
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
    <SubirHuellas
      LLAVE={LLAVE}
      isImagesFetched={obtuveImagenes}
      fetchedImages={imagenesObtenidas}
      imagenes={imagenes}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      setModo={setModo}  // Pasando la función para cambiar el modo
      errores2={errores2}
      modo={modo}  // Pasando el estado del modo
    />
  );
};
