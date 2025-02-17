import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import ValidacionBloqueUno from '../../validaciones/validacionBloque1/ValidacionBloqueUno';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../css/estilo.css';

const Ingresos = ( { ingresos, onFormChange, onValidationStatus } ) => {

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
            overlay={ errors.dautori ? renderTooltip( errors.dautori.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.dautori ? 'is-invalid shake' : '' }` }
              id="dautori"
              name="dautori"
              placeholder={ errors.dautori ? errors.dautori.message : "dautori" }
              { ...register( 'dautori', { onChange: handleChange } ) }
              style={ { borderColor: errors.dautori ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="dautori" style={ { marginLeft: '10px' } }>Autoridad de consigna</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.dpartida ? renderTooltip( errors.dpartida.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.dpartida ? 'is-invalid shake' : '' }` }
              id="dpartida"
              name="dpartida"
              placeholder={ errors.dpartida ? errors.dpartida.message : "dpartida" }
              { ...register( 'dpartida', { onChange: handleChange } ) }
              style={ { borderColor: errors.dpartida ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="dpartida" style={ { marginLeft: '10px' } }>Número de causa o partida penal</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.dfecha ? renderTooltip( errors.dfecha.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.dfecha ? 'is-invalid shake' : '' }` }
              id="dfecha"
              name="dfecha"
              placeholder={ errors.dfecha ? errors.dfecha.message : "dfecha" }
              { ...register( 'dfecha', { onChange: handleChange } ) }
              style={ { borderColor: errors.dfecha ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="dfecha" style={ { marginLeft: '10px' } }>Fecha de la causa o partida penal</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.dobserva ? renderTooltip( errors.dobserva.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.dobserva ? 'is-invalid shake' : '' }` }
              id="dobserva"
              name="dobserva"
              placeholder={ errors.dobserva ? errors.dobserva.message : "dobserva" }
              { ...register( 'dobserva', { onChange: handleChange } ) }
              style={ { borderColor: errors.dobserva ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="dobserva" style={ { marginLeft: '10px' } }>Observaciones de la situación penal</label>
        </div>

      </div>

      <div className="row">

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
          <label htmlFor="proceso" style={ { marginLeft: '10px' } }>Número de proceso</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.edoproceso ? renderTooltip( errors.edoproceso.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.edoproceso ? 'is-invalid shake' : '' }` }
              id="edoproceso"
              name="edoproceso"
              placeholder={ errors.edoproceso ? errors.edoproceso.message : "edoproceso" }
              { ...register( 'edoproceso', { onChange: handleChange } ) }
              style={ { borderColor: errors.edoproceso ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="edoproceso" style={ { marginLeft: '10px' } }>Estado del proceso</label>
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
          <label htmlFor="fuero" style={ { marginLeft: '10px' } }>Fuero</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.davprevia ? renderTooltip( errors.davprevia.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.davprevia ? 'is-invalid shake' : '' }` }
              id="davprevia"
              name="davprevia"
              placeholder={ errors.davprevia ? errors.davprevia.message : "davprevia" }
              { ...register( 'davprevia', { onChange: handleChange } ) }
              style={ { borderColor: errors.davprevia ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="davprevia" style={ { marginLeft: '10px' } }>Número de averiguación previa</label>
        </div>

      </div>

      <div className="row">

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.njuzgado ? renderTooltip( errors.njuzgado.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.njuzgado ? 'is-invalid shake' : '' }` }
              id="njuzgado"
              name="njuzgado"
              placeholder={ errors.njuzgado ? errors.njuzgado.message : "njuzgado" }
              { ...register( 'njuzgado', { onChange: handleChange } ) }
              style={ { borderColor: errors.njuzgado ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="njuzgado" style={ { marginLeft: '10px' } }>Número de juzgado</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechar ? renderTooltip( errors.fechar.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechar ? 'is-invalid shake' : '' }` }
              id="fechar"
              name="fechar"
              placeholder={ errors.fechar ? errors.fechar.message : "fechar" }
              { ...register( 'fechar', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechar ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechar" style={ { marginLeft: '10px' } }>Fecha de radicación</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.classd ? renderTooltip( errors.classd.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.classd ? 'is-invalid shake' : '' }` }
              id="classd"
              name="classd"
              placeholder={ errors.classd ? errors.classd.message : "classd" }
              { ...register( 'classd', { onChange: handleChange } ) }
              style={ { borderColor: errors.classd ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="classd" style={ { marginLeft: '10px' } }>Consignación por</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.tribunal ? renderTooltip( errors.tribunal.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.tribunal ? 'is-invalid shake' : '' }` }
              id="tribunal"
              name="tribunal"
              placeholder={ errors.tribunal ? errors.tribunal.message : "tribunal" }
              { ...register( 'tribunal', { onChange: handleChange } ) }
              style={ { borderColor: errors.tribunal ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="tribunal" style={ { marginLeft: '10px' } }>Tribunal</label>
        </div>

      </div>

      <div className="row">

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechajec ? renderTooltip( errors.fechajec.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechajec ? 'is-invalid shake' : '' }` }
              id="fechajec"
              name="fechajec"
              placeholder={ errors.fechajec ? errors.fechajec.message : "fechajec" }
              { ...register( 'fechajec', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechajec ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechajec" style={ { marginLeft: '10px' } }>Fecha de ejecución</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechares ? renderTooltip( errors.fechares.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechares ? 'is-invalid shake' : '' }` }
              id="fechares"
              name="fechares"
              placeholder={ errors.fechares ? errors.fechares.message : "fechares" }
              { ...register( 'fechares', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechares ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechares" style={ { marginLeft: '10px' } }>Fecha de arresto</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechaapartir ? renderTooltip( errors.fechaapartir.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechaapartir ? 'is-invalid shake' : '' }` }
              id="fechaapartir"
              name="fechaapartir"
              placeholder={ errors.fechaapartir ? errors.fechaapartir.message : "fechaapartir" }
              { ...register( 'fechaapartir', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechaapartir ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechaapartir" style={ { marginLeft: '10px' } }>Fecha de compurgación</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.penaano ? renderTooltip( errors.penaano.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.penaano ? 'is-invalid shake' : '' }` }
              id="penaano"
              name="penaano"
              placeholder={ errors.penaano ? errors.penaano.message : "penaano" }
              { ...register( 'penaano', { onChange: handleChange } ) }
              style={ { borderColor: errors.penaano ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="penaano" style={ { marginLeft: '10px' } }>Pena en años</label>
        </div>

      </div>
    </>
  );
};

export default Ingresos;