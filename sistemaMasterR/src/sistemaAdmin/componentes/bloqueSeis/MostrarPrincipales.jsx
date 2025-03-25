import React, { useEffect, useState } from 'react';
import { set, useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';
import api from '../../../api/api';

const MostrarPrincipales = ({ data, onValidationStatus }) => {
  const { register, formState: { errors } } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { datosFormulario, cargarDatosFormulario } = useStore();
  
  const [idAlterna, setIdAlterna] = useState(1); // Simulación de ID alterna, debe obtenerse dinámicamente

  const obtenerIdAlterna = async ( LLAVE ) => {
    try {
      const response = await api.post( 'obtenerIdAlterna/idAlterna', { LLAVE } );
      if ( response && response.data.status !== 404 ) {
        //dispatch( setIdAlterna( response.data[ 0 ].ID_ALTERNA ) );
        //dispatch( setEnviando( false ) );
        setIdAlterna( response.data[ 0 ].ID_ALTERNA );
      } else {
        //dispatch( setEnviando( true ) );
        //dispatch( agregarError2( 'Error al obtener el ID alterna.' ) );
      }
    } catch ( error ) {
      console.error( 'Error al obtener el ID alterna:', error );
    }
  };

  /*useEffect(() => {
    obtenerIdAlterna( LLAVE );
  }, [ LLAVE ]);*/ //SE DESBLOQUEA CUANDO YA TENGAMOS LA TABLA DE MOVIMIENTOS CORRECTA

  useEffect(() => {
    if (idAlterna) {
      cargarDatosFormulario('principales', idAlterna);
    }
  }, [idAlterna, cargarDatosFormulario]);

  /*useEffect(() => {
    console.log("Datos del formulario:", datosFormulario);
  }, [datosFormulario]);*/

  // ✅ Corregido: Ahora accede a `imagenes`, no `imagenesPrincipales`
  const imagenesPrincipales = datosFormulario.imagenes || [];

  const handleRadioChange = (nombre, valor) => {
    seleccionarRadio(nombre, valor, 'Imagenes Principales');
  };

  return (
    <form className="row">
      <div className="col-12 d-flex justify-content-around mt-3">
        {imagenesPrincipales.length > 0 ? (
          imagenesPrincipales.map((img, index) => (
            <Card key={index} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={img.imagen} alt={`Imagen ${index}`} />
              <Card.Body>
                <Card.Title>Grupo {img.grupo}</Card.Title>
                <div className="d-flex justify-content-center">
                  <input
                    type="radio"
                    name={`radio-${index}`}
                    value="Sí"
                    className="ms-2"
                    onChange={() => handleRadioChange(img.grupo, 'Sí')}
                  />
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No hay imágenes disponibles.</p>
        )}
      </div>

      {/* Lista de radio seleccionados */}
      <div className="mt-4">
        <h5 style={{ color: 'red' }}>Campos con errores:</h5>
        <ul>
          {radioSeleccionados.map((item, index) => (
            <li key={index}>{item.nombre}</li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default MostrarPrincipales;
