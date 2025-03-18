import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { SubirFrente } from '../../../Componentes/ProcesoImagenes/Imagenes/Principales/SubirFrente';
import { useDispatch } from 'react-redux';
import { agregarError } from '../../../redux/imagenesSlice';
import useStore from '../../../zustand/useStore';

export const VistaFotoFrente = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emisor = 2, estado_emisor = 33;
  const [ idAlterna, setIdAlterna ] = useState( 0 );
  const [ imagenes, setImagenes ] = useState( [ null ] );
  const [ loading, setLoading ] = useState( [ false ] );
  const [ enviando, setEnviando ] = useState( false );
  const [ imagenesObtenidas, setImagenesObtenidas ] = useState( [] );
  const [ obtuveImagenes, setObtuveImagenes ] = useState( false );
  const TAMANO_MAXIMO_MB = 0.12;
  const TAMANO_MAXIMO = TAMANO_MAXIMO_MB * 1024 * 1024;
  const { llaveSeleccionada } = useStore();
  const LLAVE = llaveSeleccionada;

  const obtenerIdAlterna = async ( LLAVE ) => {
    try {
      const response = await axios.post( 'http://localhost:5000/api/bloque1/idAlterna', { LLAVE } );
      if ( response && response.data.status !== 404 ) {
        setIdAlterna( response.data[ 0 ].ID_ALTERNA );
        setEnviando( false );
      } else {
        setEnviando( true );
      }
    } catch ( error ) {
    }
  };

  const obtenerImagenes = async () => {
    if ( idAlterna ) {
      try {
        const response = await axios.get( `http://localhost:5000/api/mostrarPrincipales/principales/${ idAlterna }` );
        if ( response.data && response.data.imagenes ) {
          setImagenesObtenidas( response.data.imagenes );
          setObtuveImagenes( response.data.imagenes.length > 0 );
        } else {
          setImagenesObtenidas( [] );
          setObtuveImagenes( false );
        }
      } catch ( error ) {
        setImagenesObtenidas( [] );
        setObtuveImagenes( false );
      }
    }
  };

  const regresarFormularios = ( LLAVE ) => {
    navigate( `/formPaginas/${ LLAVE }` );
  };

  const handleCambioImagen = ( e, index ) => {
    const file = e.target.files[ 0 ];
    if ( file ) {
      if ( !file.type.includes( 'image/jpeg' ) ) {
        Swal.fire( {
          icon: 'error',
          title: 'Error',
          text: 'Solo se permiten imágenes en formato JPEG.',
        } );
        dispatch(agregarError('Formato de imagen inválido. Solo se permite JPEG')); // Guardamos el error
        return;
      }
      if ( file.size > TAMANO_MAXIMO ) {
        Swal.fire( {
          icon: 'error',
          title: 'Error',
          text: `El tamaño máximo permitido es ${ TAMANO_MAXIMO_MB } MB.`,
        } );
        dispatch(agregarError(`El archivo supera los ${TAMANO_MAXIMO_MB} MB`)); // Guardamos el error
        return;
      }
      const nuevoCargando = [ ...loading ];
      nuevoCargando[ index ] = true;
      setLoading( nuevoCargando );

      setTimeout( () => {
        const nuevasImagenes = [ ...imagenes ];
        nuevasImagenes[ index ] = { url: URL.createObjectURL( file ), file };
        setImagenes( nuevasImagenes );

        nuevoCargando[ index ] = false;
        setLoading( nuevoCargando );
      }, 1000 );
    } else {
      const nuevasImagenes = [ ...imagenes ];
      nuevasImagenes[ index ] = null;
      setImagenes( nuevasImagenes );
    }
  };

  const onSubmit = async ( e ) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    if ( imagenes.some( ( img ) => img === null ) ) {
      Swal.fire( {
        icon: 'error',
        title: 'Error',
        text: 'Debes subir las tres imágenes antes de enviar el formulario.',
      } );
      return;
    }

    Swal.fire( {
      title: '¿Estás seguro?',
      text: '¿Deseas enviar las imágenes?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'No, cancelar',
    } ).then( async ( result ) => {
      if ( result.isConfirmed ) {
        try {
          setEnviando( true );

          const formData = new FormData();
          formData.append( 'imagen1', imagenes[ 0 ].file );
          formData.append( 'id_alterna', idAlterna );
          formData.append( 'emisor', emisor );
          formData.append( 'estado_emisor', estado_emisor );
          formData.append( 'llave', LLAVE );

          const response = await axios.post( 'http://localhost:5000/api/principales/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          } );

          if ( response.status === 200 ) {
            Swal.fire( '¡Enviado!', 'El formulario se ha enviado correctamente.', 'success' ).then( () => {
              //window.location.reload(); // Recarga la página después de confirmar
              obtenerImagenes();
            } );
          } else {
            Swal.fire( {
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al enviar las imágenes.',
            } );
          }
        } catch ( error ) {
          Swal.fire( {
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error en la conexión.',
          } );
        } finally {
          setEnviando( false );
        }
      }
    } );
  };

  useEffect( () => {
    if ( LLAVE ) {
      obtenerIdAlterna( LLAVE );
    }
  }, [ LLAVE ] );

  useEffect( () => {
    obtenerImagenes();
  }, [ idAlterna ] );
  

  return (
    <SubirFrente
      imagenes={ imagenes }
      loading={ loading }
      enviando={ enviando }
      imagenesObtenidas={ imagenesObtenidas }
      obtuveImagenes={ obtuveImagenes }
      handleCambioImagen={ handleCambioImagen }
      onSubmit={ onSubmit }
      LLAVE={ LLAVE }
      regresarFormularios={ regresarFormularios }
    />
  );
};