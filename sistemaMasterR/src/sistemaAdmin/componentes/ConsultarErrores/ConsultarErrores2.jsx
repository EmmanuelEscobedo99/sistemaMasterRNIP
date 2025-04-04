import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import api from '../../../api/api';

const ConsultarErrores2 = () => {
  console.log("componente renderizado")

  const navigate = useNavigate();

  const { radioSeleccionados, limpiarErrores } = useDatosGeneralesStore();
  const [ mensaje, setMensaje ] = useState( '' ); // State to store the feedback message

  //const [idAlterna, setIdAlterna] = useState(1);
  let idAlterna = useSelector( ( state ) => state.idAlterna.value );
  idAlterna = parseInt( idAlterna, 10 ) || 0; // Convierte a entero y evita NaN
  const newIdAlterna = idAlterna + 1;

  const LLAVE = useSelector( ( state ) => state.Llave.value );

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

  const handleLimpiarErrors = async ( event ) => {
    event.preventDefault();

    Swal.fire( {
      title: '¿Estás seguro?',
      text: 'Esta acción rechazará el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar'
    } ).then( async ( result ) => {
      if ( result.isConfirmed ) {
        try {
          // Agrupar los errores por formulario
          const erroresAgrupados = radioSeleccionados.reduce( ( acc, item ) => {
            const formName = item.formulario || 'Desconocido'; // Usamos un nombre predeterminado si no existe 'formulario'
            if ( !acc[ formName ] ) {
              acc[ formName ] = [];
            }
            acc[ formName ].push( item );
            return acc;
          }, {} );

          // Iterar sobre cada formulario y rechazar los registros
          for ( const [ formName, items ] of Object.entries( erroresAgrupados ) ) {
            for ( const item of items ) {
              await rechazarRegistro2(LLAVE, formName, item.nombre, mensaje);
            }
          }

          // Limpiar errores una vez que se complete el proceso
          limpiarErrores();

          console.log("Ejecutando Swal.fire()");
          Swal.fire({
            title: 'Rechazado',
            text: 'Los registros han sido rechazados correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            console.log("first - before navigate");
            navigate(rolUsuario === "admin2" ? '/admin2' : '/admin');
          }).catch((error) => {
            console.error("Error en Swal.fire:", error);
          });
          

        } catch ( error ) {
          console.error( 'Error al enviar la petición:', error );
          Swal.fire( {
            title: 'Error',
            text: 'Porfavor ingrese un mensaje sobre los errores.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          } );
        }
      }
    } );
  };

  // Función para rechazar el registro y enviar los datos al backend
  const rechazarRegistro2 = async (LLAVE, FORMULARIO, CAMPO, DESCRIPCION) => {
    try {
      // Realizas la solicitud PUT aquí, pasando los datos necesarios
      await api.put( `rechazar/rechazarRegistro2/${ LLAVE }/${ FORMULARIO }/${ CAMPO }/${ DESCRIPCION }` );
    } catch ( error ) {
      throw new Error( 'Error al rechazar el registro' );
    }
  };


  const rolUsuario = useSelector( ( state ) => state.auth.rol ); // ✅ Obtiene el rol de Redux

  const handleAprovarRegistro = async ( event ) => {
    event.preventDefault();

    Swal.fire( {
      title: '¿Estás seguro?',
      text: 'Esta acción aprobará el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, aprobar',
      cancelButtonText: 'Cancelar'
    } ).then( async ( result ) => {
      if ( result.isConfirmed ) {
        try {
          const valorProcesado = rolUsuario === "admin2" ? 10 : rolUsuario === "admin" ? [ 11, 0 ] : 11;
          const nuevoProcesado = Array.isArray( valorProcesado ) ? valorProcesado[ 1 ] : valorProcesado;


          await api.put( `aprovar/aprovarRegistro2/${ LLAVE }`, { procesado: nuevoProcesado } );

          limpiarErrores();

          Swal.fire( {
            title: 'Aprobado',
            text: `El registro ha sido aprobado correctamente con procesado: ${ nuevoProcesado }.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          } ).then( () => {
            navigate(rolUsuario === "admin2" ? '/admin2' : '/admin');
          } );

        } catch ( error ) {
          console.error( "Error al aprobar el registro:", error );
          Swal.fire( {
            title: 'Error',
            text: 'Hubo un problema al aprobar el registro.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          } );
        }
      }
    } );
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

export default ConsultarErrores2;
