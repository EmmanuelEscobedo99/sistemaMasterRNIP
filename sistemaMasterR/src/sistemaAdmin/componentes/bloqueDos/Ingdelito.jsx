import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import ValidacionBloqueUno from '../../validaciones/validacionBloque1/ValidacionBloqueUno';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../css/estilo.css';

const Ingdelito = ( { ingdelito, onFormChange, onValidationStatus } ) => {

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

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.delito ? renderTooltip( errors.delito.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.delito ? 'is-invalid shake' : '' }` }
              id="delito"
              name="delito"
              placeholder={ errors.delito ? errors.delito.message : "delito" }
              { ...register( 'delito', { onChange: handleChange } ) }
              style={ { borderColor: errors.delito ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="delito" style={ { marginLeft: '10px' } }>Delito</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.modalidad ? renderTooltip( errors.modalidad.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.modalidad ? 'is-invalid shake' : '' }` }
              id="modalidad"
              name="modalidad"
              placeholder={ errors.modalidad ? errors.modalidad.message : "modalidad" }
              { ...register( 'modalidad', { onChange: handleChange } ) }
              style={ { borderColor: errors.modalidad ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="modalidad" style={ { marginLeft: '10px' } }>Modalidad</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.responsabilidad ? renderTooltip( errors.responsabilidad.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.responsabilidad ? 'is-invalid shake' : '' }` }
              id="responsabilidad"
              name="responsabilidad"
              placeholder={ errors.responsabilidad ? errors.responsabilidad.message : "responsabilidad" }
              { ...register( 'responsabilidad', { onChange: handleChange } ) }
              style={ { borderColor: errors.responsabilidad ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="responsabilidad" style={ { marginLeft: '10px' } }>Responsabilidad</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.ingkey ? renderTooltip( errors.ingkey.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.ingkey ? 'is-invalid shake' : '' }` }
              id="ingkey"
              name="ingkey"
              placeholder={ errors.ingkey ? errors.ingkey.message : "ingkey" }
              { ...register( 'ingkey', { onChange: handleChange } ) }
              style={ { borderColor: errors.ingkey ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="ingkey" style={ { marginLeft: '10px' } }>Ingreso al que pertenece el delito</label>
        </div>

      </div>

      <div className="row">

      <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.delitosentencia ? renderTooltip( errors.delitosentencia.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.delitosentencia ? 'is-invalid shake' : '' }` }
              id="delitosentencia"
              name="delitosentencia"
              placeholder={ errors.delitosentencia ? errors.delitosentencia.message : "delitosentencia" }
              { ...register( 'delitosentencia', { onChange: handleChange } ) }
              style={ { borderColor: errors.delitosentencia ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="delitosentencia" style={ { marginLeft: '10px' } }>Descripción del delito en base a la sentencia emitida</label>
        </div>

      </div>
    </>
  );
};

export default Ingdelito;