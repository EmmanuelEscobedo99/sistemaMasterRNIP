import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ConsultarErrores = () => {

  const navigate = useNavigate();

  const { radioSeleccionados, limpiarErrores } = useDatosGeneralesStore();
  const [ mensaje, setMensaje ] = useState( '' ); // State to store the feedback message

  const handleMessageChange = ( e ) => {
    setMensaje( e.target.value ); // Update the message as the user types
  };

  const handleSendFeedback = () => {
    if ( mensaje.trim() ) {
      // Here, you could send the feedback message to the backend or do further actions
      console.log( "Feedback sent:", mensaje );
      // Optionally reset the message after sending
      setMensaje( '' );
    } else {
      alert( "Por favor, ingresa un mensaje." );
    }
  };

  const handleLimpiarErrors = () => {
    limpiarErrores();
    navigate( '/admin' );
  };

  const handleAprovarRegistro = (event) => {
    event.preventDefault(); // Evita cualquier comportamiento predeterminado
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción aprobará el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, aprobar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        limpiarErrores(); // Limpia los errores
        Swal.fire({
          title: 'Aprobado',
          text: 'El registro ha sido aprobado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          navigate('/admin'); // Redirige después de que se cierre el mensaje de éxito
        });
      }
    });
  };
  // You can group errors by their form if needed
  const groupedErrors = radioSeleccionados.reduce( ( acc, item ) => {
    const formName = item.formulario || 'Desconocido'; // Default to 'Desconocido' if no form name
    if ( !acc[ formName ] ) {
      acc[ formName ] = [];
    }
    acc[ formName ].push( item );
    return acc;
  }, {} );

  return (
    <div className="container mt-4">
      <h5 style={ { color: 'red' } }>Campos con errores seleccionados:</h5>

      {/* Iterate over each grouped form */ }
      { Object.keys( groupedErrors ).length > 0 ? (
        Object.keys( groupedErrors ).map( ( formName, index ) => (
          <div key={ index } className="mb-4">
            <h6>Formulario: { formName }</h6>
            <ul>
              { groupedErrors[ formName ].map( ( item, index ) => (
                <li key={ index }>{ item.nombre }</li>
              ) ) }
            </ul>
          </div>
        ) )
      ) : (
        <p>No hay errores seleccionados.</p>
      ) }

      {/* Button to clear the selected errors */ }
      {/*<button 
        className="btn btn-danger mt-3"
        onClick={handleLimpiarErrors}
      >
        Limpiar Errores
      </button>*/}

      {/* Textarea for sending feedback */ }
      <div className="mt-4">
        <h6>Envíales un mensaje sobre los errores:</h6>
        <textarea
          className="form-control"
          rows="4"
          value={ mensaje }
          onChange={ handleMessageChange }
          placeholder="Escribe un mensaje aquí..."
        />
      </div>

      {/* Button to submit the feedback */ }
      <button
        className="btn btn-danger mt-3"
        onClick={ handleLimpiarErrors }
      >
        Rechazar
      </button>

      {/* Button to confirm */ }
      <button
        className="btn btn-success mt-3 ms-3"
        onClick={ handleAprovarRegistro }
      >
        Aprovar
      </button>
    </div>
  );
};

export default ConsultarErrores;
