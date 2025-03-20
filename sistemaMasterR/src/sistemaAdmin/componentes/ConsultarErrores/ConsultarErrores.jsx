import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import api from '../../../api/api';

const ConsultarErrores = () => {

  const navigate = useNavigate();

  const { radioSeleccionados, limpiarErrores } = useDatosGeneralesStore();
  const [ mensaje, setMensaje ] = useState( '' ); // State to store the feedback message

  //const [idAlterna, setIdAlterna] = useState(1);
  const idAlterna = useSelector( ( state ) => state.idAlterna.value );

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

  const handleLimpiarErrors = async (event) => {
    event.preventDefault();
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción rechazará el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // ✅ No se envía el `procesado` explícitamente
          await api.put(`rechazar/rechazarRegistro/${idAlterna}`);
  
          limpiarErrores();
  
          Swal.fire({
            title: 'Rechazado',
            text: 'El registro ha sido rechazado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            navigate('/admin');
          });
  
        } catch (error) {
          console.error('Error al enviar la petición:', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo rechazar el registro.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      }
    });
  };    


  const rolUsuario = useSelector((state) => state.auth.rol); // ✅ Obtiene el rol de Redux

  const handleAprovarRegistro = async (event) => {
    event.preventDefault();
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción aprobará el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, aprobar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const nuevoProcesado = rolUsuario === "admin" ? 0 : 7; // ✅ Ahora sí tiene el valor correcto
  
          await api.put(`aprovar/aprovarRegistro/${idAlterna}`, { procesado: nuevoProcesado });
  
          limpiarErrores();
  
          Swal.fire({
            title: 'Aprobado',
            text: `El registro ha sido aprobado correctamente con procesado: ${nuevoProcesado}.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            navigate('/admin');
          });
  
        } catch (error) {
          console.error("Error al aprobar el registro:", error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al aprobar el registro.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
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

      {/* Textarea for sending feedback .*/ }
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
