import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const VistaEditarHuellas = (LLAVE) => {
  const [idAlterna, setIdAlterna] = useState(0);
  const [imagenes, setImagenes] = useState(Array(10).fill(null));
  const [loading, setLoading] = useState(Array(10).fill(false));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImagesFetched, setIsImagesFetched] = useState(false);
  const [fetchedImages, setFetchedImages] = useState([]);
  const MAX_SIZE_MB = 0.12;
  const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

  const navigate = useNavigate();

  const dedoDerecho = ["Pulgar", "Índice", "Medio", "Anular", "Meñique"];
  const dedoIzquierdo = ["Pulgar", "Índice", "Medio", "Anular", "Meñique"];

  // Mapeo correcto de los grupos
  const grupoMapping = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const { register, handleSubmit } = useForm();

  // Obtener ID alterno
  const obtenerIdAlterna = async (LLAVE) => {
    try {
      const response = await axios.post('http://localhost:5000/api/bloque1/idAlterna', { LLAVE });
      if (response.data && response.data[0]) {
        setIdAlterna(response.data[0].ID_ALTERNA);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    obtenerIdAlterna(LLAVE);
  }, [LLAVE]);

  // Obtener imágenes
  useEffect(() => {
    const fetchImages = async () => {
      if (idAlterna) {
        try {
          const response = await axios.get(`http://localhost:5000/api/mostrarHuellas/huellas/${idAlterna}`);
          setFetchedImages(response.data);
          setIsImagesFetched(response.data.length > 0);
        } catch (error) {
        }
      }
    };
    fetchImages();
  }, [idAlterna]);

  // Cambiar imagen
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.includes('image/jpeg')) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, selecciona un archivo JPG.',
        });
        return;
      }
      if (file.size > MAX_SIZE) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `El archivo debe ser máximo de 120KB.`,
        });
        return;
      }

      const newLoading = [...loading];
      newLoading[index] = true;
      setLoading(newLoading);

      setTimeout(() => {
        const newImagenes = [...imagenes];
        newImagenes[index] = { 
          url: URL.createObjectURL(file), 
          file, 
          grupo: grupoMapping[index] // ✅ Ahora usa el mapeo correcto de grupos
        };
        setImagenes(newImagenes);

        newLoading[index] = false;
        setLoading(newLoading);
      }, 1000);
    } else {
      const newImagenes = [...imagenes];
      newImagenes[index] = null;
      setImagenes(newImagenes);
    }
  };

  // Enviar formulario
  const onSubmit = async () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas enviar las imágenes seleccionadas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'No, cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsSubmitting(true);
          const formData = new FormData();

          // Agregar solo las imágenes seleccionadas
          imagenes.forEach((img, index) => {
            if (img) {
              formData.append('nuevaImagen', img.file);
              formData.append('grupo', grupoMapping[index]); // ✅ Usa el mapeo correcto
            }
          });

          const response = await axios.put(
            `http://localhost:5000/api/editarHuellas/editar/${idAlterna}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          if (response.status === 200) {
            Swal.fire("¡Éxito!", "Imágenes actualizadas correctamente.", "success").then(() => {
              window.location.reload();
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al enviar las imágenes.',
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error en la conexión.',
          });
          setIsSubmitting(false);
        }
      }
    });
  };

  return {
    register,
    handleSubmit,
    handleImageChange,
    onSubmit,
    isSubmitting,
    isImagesFetched,
    fetchedImages,
    imagenes,
    loading,
    dedoDerecho,
    dedoIzquierdo,
  };
};
