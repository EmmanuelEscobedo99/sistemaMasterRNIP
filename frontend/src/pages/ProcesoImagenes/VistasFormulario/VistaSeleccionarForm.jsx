import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { setImagenes, setIdAlterna, setImagenesObtenidas, setObtuveImagenes } from "../../../redux/imagenesSlice";
import { SeleccionarForm } from "../../../Componentes/ProcesoImagenes/SeleccionarForm/SeleccionarForm";

export const VistaSeleccionarForm = () => {
  const navigate = useNavigate();
  const { LLAVE } = useParams();
  const dispatch = useDispatch();

  const emisor = '33';
  const estado_emisor = '3';

  const imagenes = useSelector( ( state ) => state.imagenes.imagenes );
  const imagenesFiltradas = imagenes ? imagenes.filter( img => img !== null ) : [];
  const huellas = useSelector( ( state ) => state.huellas.imagenes );
  const huellasFiltradas = huellas ? huellas.filter( img => img !== null ) : [];

  const [ idAlterna, setIdAlterna ] = useState( 0 );
  const [ activeKey, setActiveKey ] = useState( 1 ); // 🔥 Establecemos un valor inicial válido (número)
  const [ isHuellasEnabled, setIsHuellasEnabled ] = useState( false );

  const obtenerIdAlterna = async ( LLAVE ) => {
    try {
      const response = await axios.post( 'http://localhost:5000/api/bloque1/idAlterna', { LLAVE } );
      if ( response.data && response.data[ 0 ] ) {
        setIdAlterna( response.data[ 0 ].ID_ALTERNA );
      }
    } catch ( error ) {
      console.error( 'Error al obtener el ID alterna:', error );
    }
  };

  const obtenerImagenes = async () => {
    if (idAlterna) {
      try {
        const response = await axios.get(`http://localhost:5000/api/mostrarPrincipales/principales/${idAlterna}`);
        
        if (response.data && response.data.imagenes) {
          const imagenesFiltradas = response.data.imagenes.slice(1); // Elimina la imagen 'A' si no se necesita
          dispatch(setImagenes(imagenesFiltradas));  // Actualiza el estado de imágenes
          dispatch(setObtuveImagenes(imagenesFiltradas.length > 0));  // Establece si se recibieron imágenes
  
          // Verifica si ya tenemos imágenes y activa las pestañas
          if (imagenesFiltradas.length > 0) {
            setIsHuellasEnabled(true); // Habilita las pestañas si hay imágenes
          }
        }
      } catch (error) {
        setIsHuellasEnabled(false);  // Desactiva las pestañas si hay error
      }
    }
  };
  
  

  useEffect( () => {
    if ( LLAVE ) {
      obtenerIdAlterna( LLAVE );
    }
  }, [ LLAVE ] );

  useEffect(() => {
    if (idAlterna) {
      obtenerImagenes();
    }
  }, [idAlterna]); // 🚀 Se ejecuta solo cuando `idAlterna` cambia
  

  // 🔥 Nuevo useEffect para activar las pestañas si hay imágenes
  useEffect(() => {
    // Verificar si las imágenes de frente (de la base de datos o de Redux) ya están cargadas
    if (imagenesFiltradas.length > 0) {
      setIsHuellasEnabled(true); // Activamos las pestañas
    }
  }, [imagenesFiltradas]);  // Se activa cuando `imagenesFiltradas` cambia
  

  return (
    <SeleccionarForm
      LLAVE={ LLAVE }
      idAlterna={ idAlterna }
      activeKey={ activeKey }
      setActiveKey={ setActiveKey } // 🔥 Ahora pasamos `setActiveKey` correctamente
      navigate={ navigate }
      isHuellasEnabled={ isHuellasEnabled }
      imagenesFiltradas={ imagenesFiltradas }
      huellasFiltradas={ huellasFiltradas }
    />
  );
};
