import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
//import ValidacionBloqueUno from '../../validaciones/validacionBloque1/ValidacionBloqueUno';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueDos from '../../validaciones/validacionBloque2/ValidacionesBloqueDos';

const Ejecucion = ( { juridicosp2, onFormChange, onValidationStatus } ) => {

  const handleChange = ( e ) => {
    const { name, value } = e.target;
    const lowercaseName = name.toLowerCase();
    const validationResult = ValidacionBloqueDos[ `validacion${ capitalizeFirstLetter( lowercaseName ) }` ]( value );

    if ( validationResult !== true ) {
      setError( name, { type: 'formulario 1', message: validationResult } );
    } else {
      clearErrors( name );
    }
    onFormChange( name, value );
  };

  const capitalizeFirstLetter = ( string ) => {
    return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
  };

  useEffect( () => {
    onValidationStatus( errors );
  }, [ errors, onValidationStatus ] );

  const renderTooltip = ( message ) => (
    <Tooltip>
      { message }
    </Tooltip>
  );

  return (
    <>
      <div className="row">
        
      </div>
    </>
  );

};