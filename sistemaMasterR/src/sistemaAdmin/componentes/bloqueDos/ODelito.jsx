import React, {useEffect} from 'react';
import { useFormContext } from 'react-hook-form';
import ValidacionBloqueUno from '../../validaciones/validacionBloque1/ValidacionBloqueUno';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../css/estilo.css'


const ODelito = ( { ejecucion, onFormChange, onValidationStatus } ) => {

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
            overlay={ errors.sitkey ? renderTooltip( errors.sitkey.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.sitkey ? 'is-invalid shake' : '' }` }
              id="sitkey"
              name="sitkey"
              placeholder={ errors.sitkey ? errors.sitkey.message : "sitkey" }
              { ...register( 'sitkey', { onChange: handleChange } ) }
              style={ { borderColor: errors.sitkey ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="sitkey" style={ { marginLeft: '10px' } }>Situación del delito</label>
        </div>

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
          <label htmlFor="modalidad" style={ { marginLeft: '10px' } }>Modalidad del delito</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.responjur ? renderTooltip( errors.responjur.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.responjur ? 'is-invalid shake' : '' }` }
              id="responjur"
              name="responjur"
              placeholder={ errors.responjur ? errors.responjur.message : "responjur" }
              { ...register( 'responjur', { onChange: handleChange } ) }
              style={ { borderColor: errors.responjur ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="responjur" style={ { marginLeft: '10px' } }>Responsabilidad jurídica</label>
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
          <label htmlFor="delitosentencia" style={ { marginLeft: '10px' } }>Descripción del delito sentencia</label>
        </div>

      </div>
    </>
  );
};

export default ODelito;