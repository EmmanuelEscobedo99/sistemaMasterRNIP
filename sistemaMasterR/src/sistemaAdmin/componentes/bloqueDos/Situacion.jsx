import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
//import ValidacionBloqueUno from '../../validaciones/validacionBloque1/ValidacionBloqueUno';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueDos from '../../validaciones/validacionBloque2/ValidacionesBloqueDos';

const Situacion = ( { situacion, onFormChange, onValidationStatus } ) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();

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


      <div className="col-md-3 form-floating mt-3">
        <OverlayTrigger
          placement="right"
          overlay={ errors.avprevia ? renderTooltip( errors.avprevia.message ) : <></> }
        >
          <input
            type="text"
            className={ `form-control ${ errors.avprevia ? 'is-invalid shake' : '' }` }
            id="avprevia"
            name="avprevia"
            placeholder={ errors.avprevia ? errors.avprevia.message : "avprevia" }
            { ...register( 'avprevia', { onChange: handleChange } ) }
            style={ { borderColor: errors.avprevia ? 'red' : '' } }
          />
        </OverlayTrigger>
        <label htmlFor="sexo" style={ { marginLeft: '10px' } }>av previa</label>
      </div>

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
        <label htmlFor="sitkey" style={ { marginLeft: '10px' } }>sit key</label>
      </div>

      <div className="col-md-3 form-floating mt-3">
        <OverlayTrigger
          placement="right"
          overlay={ errors.clasifica ? renderTooltip( errors.clasifica.message ) : <></> }
        >
          <input
            type="text"
            className={ `form-control ${ errors.clasifica ? 'is-invalid shake' : '' }` }
            id="clasifica"
            name="clasifica"
            placeholder={ errors.clasifica ? errors.clasifica.message : "clasifica" }
            { ...register( 'clasifica', { onChange: handleChange } ) }
            style={ { borderColor: errors.clasifica ? 'red' : '' } }
          />
        </OverlayTrigger>
        <label htmlFor="clasifica" style={ { marginLeft: '10px' } }>clasifica</label>
      </div>

      <div className="col-md-3 form-floating mt-3">
        <OverlayTrigger
          placement="right"
          overlay={ errors.peligro ? renderTooltip( errors.peligro.message ) : <></> }
        >
          <input
            type="text"
            className={ `form-control ${ errors.peligro ? 'is-invalid shake' : '' }` }
            id="peligro"
            name="peligro"
            placeholder={ errors.peligro ? errors.peligro.message : "peligro" }
            { ...register( 'peligro', { onChange: handleChange } ) }
            style={ { borderColor: errors.peligro ? 'red' : '' } }
          />
        </OverlayTrigger>
        <label htmlFor="peligro" style={ { marginLeft: '10px' } }>peligro</label>
      </div>

      <div className="col-md-3 form-floating mt-3">
        <OverlayTrigger
          placement="right"
          overlay={ errors.fuero ? renderTooltip( errors.fuero.message ) : <></> }
        >
          <input
            type="text"
            className={ `form-control ${ errors.fuero ? 'is-invalid shake' : '' }` }
            id="fuero"
            name="fuero"
            placeholder={ errors.fuero ? errors.fuero.message : "fuero" }
            { ...register( 'fuero', { onChange: handleChange } ) }
            style={ { borderColor: errors.fuero ? 'red' : '' } }
          />
        </OverlayTrigger>
        <label htmlFor="fuero" style={ { marginLeft: '10px' } }>fuero</label>
      </div>

      <div className="col-md-3 form-floating mt-3">
        <OverlayTrigger
          placement="right"
          overlay={ errors.proceso ? renderTooltip( errors.proceso.message ) : <></> }
        >
          <input
            type="text"
            className={ `form-control ${ errors.proceso ? 'is-invalid shake' : '' }` }
            id="proceso"
            name="proceso"
            placeholder={ errors.proceso ? errors.proceso.message : "proceso" }
            { ...register( 'proceso', { onChange: handleChange } ) }
            style={ { borderColor: errors.proceso ? 'red' : '' } }
          />
        </OverlayTrigger>
        <label htmlFor="proceso" style={ { marginLeft: '10px' } }>proceso</label>
      </div>

      <div className="col-md-3 form-floating mt-3">
        <OverlayTrigger
          placement="right"
          overlay={ errors.ingreso ? renderTooltip( errors.ingreso.message ) : <></> }
        >
          <input
            type="text"
            className={ `form-control ${ errors.ingreso ? 'is-invalid shake' : '' }` }
            id="ingreso"
            name="ingreso"
            placeholder={ errors.ingreso ? errors.ingreso.message : "ingreso" }
            { ...register( 'ingreso', { onChange: handleChange } ) }
            style={ { borderColor: errors.ingreso ? 'red' : '' } }
          />
        </OverlayTrigger>
        <label htmlFor="ingreso" style={ { marginLeft: '10px' } }>ingreso</label>
      </div>

      <div className="col-md-3 form-floating mt-3">
        <OverlayTrigger
          placement="right"
          overlay={ errors.fecact ? renderTooltip( errors.fecact.message ) : <></> }
        >
          <input
            type="text"
            className={ `form-control ${ errors.fecact ? 'is-invalid shake' : '' }` }
            id="fecact"
            name="fecact"
            placeholder={ errors.fecact ? errors.fecact.message : "fecact" }
            { ...register( 'fecact', { onChange: handleChange } ) }
            style={ { borderColor: errors.fecact ? 'red' : '' } }
          />
        </OverlayTrigger>
        <label htmlFor="fecact" style={ { marginLeft: '10px' } }>fecact</label>
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
        <label htmlFor="delito" style={ { marginLeft: '10px' } }>delito</label>
      </div>

      <div className="col-md-3 form-floating mt-3">
        <OverlayTrigger
          placement="right"
          overlay={ errors.consig ? renderTooltip( errors.consig.message ) : <></> }
        >
          <input
            type="text"
            className={ `form-control ${ errors.consig ? 'is-invalid shake' : '' }` }
            id="consig"
            name="consig"
            placeholder={ errors.consig ? errors.consig.message : "consig" }
            { ...register( 'consig', { onChange: handleChange } ) }
            style={ { borderColor: errors.consig ? 'red' : '' } }
          />
        </OverlayTrigger>
        <label htmlFor="consig" style={ { marginLeft: '10px' } }>consig</label>
      </div>

      <div className="col-md-3 form-floating mt-3">
        <OverlayTrigger
          placement="right"
          overlay={ errors.consides ? renderTooltip( errors.consides.message ) : <></> }
        >
          <input
            type="text"
            className={ `form-control ${ errors.consides ? 'is-invalid shake' : '' }` }
            id="consides"
            name="consides"
            placeholder={ errors.consides ? errors.consides.message : "consides" }
            { ...register( 'consides', { onChange: handleChange } ) }
            style={ { borderColor: errors.consides ? 'red' : '' } }
          />
        </OverlayTrigger>
        <label htmlFor="consides" style={ { marginLeft: '10px' } }>consides</label>
      </div>

      <div className="col-md-3 form-floating mt-3">
        <OverlayTrigger
          placement="right"
          overlay={ errors.mp ? renderTooltip( errors.mp.message ) : <></> }
        >
          <input
            type="text"
            className={ `form-control ${ errors.mp ? 'is-invalid shake' : '' }` }
            id="mp"
            name="mp"
            placeholder={ errors.mp ? errors.mp.message : "mp" }
            { ...register( 'mp', { onChange: handleChange } ) }
            style={ { borderColor: errors.mp ? 'red' : '' } }
          />
        </OverlayTrigger>
        <label htmlFor="mp" style={ { marginLeft: '10px' } }>mp</label>
      </div>

      <div className="col-md-3 form-floating mt-3">
        <OverlayTrigger
          placement="right"
          overlay={ errors.fechaavei ? renderTooltip( errors.fechaavei.message ) : <></> }
        >
          <input
            type="text"
            className={ `form-control ${ errors.fechaavei ? 'is-invalid shake' : '' }` }
            id="fechaavei"
            name="fechaavei"
            placeholder={ errors.fechaavei ? errors.fechaavei.message : "fechaavei" }
            { ...register( 'fechaavei', { onChange: handleChange } ) }
            style={ { borderColor: errors.fechaavei ? 'red' : '' } }
          />
        </OverlayTrigger>
        <label htmlFor="fechaavei" style={ { marginLeft: '10px' } }>fechaavei</label>
      </div>

      <div className="col-md-3 form-floating mt-3">
        <OverlayTrigger
          placement="right"
          overlay={ errors.sendeter ? renderTooltip( errors.sendeter.message ) : <></> }
        >
          <input
            type="text"
            className={ `form-control ${ errors.sendeter ? 'is-invalid shake' : '' }` }
            id="sendeter"
            name="sendeter"
            placeholder={ errors.sendeter ? errors.sendeter.message : "sendeter" }
            { ...register( 'sendeter', { onChange: handleChange } ) }
            style={ { borderColor: errors.sendeter ? 'red' : '' } }
          />
        </OverlayTrigger>
        <label htmlFor="sendeter" style={ { marginLeft: '10px' } }>sendeter</label>
      </div>

    </>
  );

};

export default Situacion;