import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import ValidacionBloqueUno from '../../validaciones/validacionBloque1/ValidacionBloqueUno';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../css/estilo.css';

const IngresosP2 = ( { ingresosp2, onFormChange, onValidationStatus } ) => {

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
            overlay={ errors.penames ? renderTooltip( errors.penames.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.penames ? 'is-invalid shake' : '' }` }
              id="penames"
              name="penames"
              placeholder={ errors.penames ? errors.penames.message : "penames" }
              { ...register( 'penames', { onChange: handleChange } ) }
              style={ { borderColor: errors.penames ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="penames" style={ { marginLeft: '10px' } }>Pena en meses</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.penadia ? renderTooltip( errors.penadia.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.penadia ? 'is-invalid shake' : '' }` }
              id="penadia"
              name="penadia"
              placeholder={ errors.penadia ? errors.penadia.message : "penadia" }
              { ...register( 'penadia', { onChange: handleChange } ) }
              style={ { borderColor: errors.penadia ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="penadia" style={ { marginLeft: '10px' } }>Pena en dias</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.ceresoejec ? renderTooltip( errors.ceresoejec.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.ceresoejec ? 'is-invalid shake' : '' }` }
              id="ceresoejec"
              name="ceresoejec"
              placeholder={ errors.ceresoejec ? errors.ceresoejec.message : "ceresoejec" }
              { ...register( 'ceresoejec', { onChange: handleChange } ) }
              style={ { borderColor: errors.ceresoejec ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="ceresoejec" style={ { marginLeft: '10px' } }>Cereso de compurgamiento</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fexterna ? renderTooltip( errors.fexterna.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fexterna ? 'is-invalid shake' : '' }` }
              id="fexterna"
              name="fexterna"
              placeholder={ errors.fexterna ? errors.fexterna.message : "fexterna" }
              { ...register( 'fexterna', { onChange: handleChange } ) }
              style={ { borderColor: errors.fexterna ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fexterna" style={ { marginLeft: '10px' } }>Fecha de externación</label>
        </div>

      </div>

      <div className="row">

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.motivoexter ? renderTooltip( errors.motivoexter.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.motivoexter ? 'is-invalid shake' : '' }` }
              id="motivoexter"
              name="motivoexter"
              placeholder={ errors.motivoexter ? errors.motivoexter.message : "motivoexter" }
              { ...register( 'motivoexter', { onChange: handleChange } ) }
              style={ { borderColor: errors.motivoexter ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="motivoexter" style={ { marginLeft: '10px' } }>Motivo de externación</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.terminoresol ? renderTooltip( errors.terminoresol.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.terminoresol ? 'is-invalid shake' : '' }` }
              id="terminoresol"
              name="terminoresol"
              placeholder={ errors.terminoresol ? errors.terminoresol.message : "terminoresol" }
              { ...register( 'terminoresol', { onChange: handleChange } ) }
              style={ { borderColor: errors.terminoresol ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="terminoresol" style={ { marginLeft: '10px' } }>Término de la resolución</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.idtiporesolucion ? renderTooltip( errors.idtiporesolucion.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.idtiporesolucion ? 'is-invalid shake' : '' }` }
              id="idtiporesolucion"
              name="idtiporesolucion"
              placeholder={ errors.idtiporesolucion ? errors.idtiporesolucion.message : "idtiporesolucion" }
              { ...register( 'idtiporesolucion', { onChange: handleChange } ) }
              style={ { borderColor: errors.idtiporesolucion ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="idtiporesolucion" style={ { marginLeft: '10px' } }>Tipo de resolución</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.estadolugproceso ? renderTooltip( errors.estadolugproceso.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.estadolugproceso ? 'is-invalid shake' : '' }` }
              id="estadolugproceso"
              name="estadolugproceso"
              placeholder={ errors.estadolugproceso ? errors.estadolugproceso.message : "estadolugproceso" }
              { ...register( 'estadolugproceso', { onChange: handleChange } ) }
              style={ { borderColor: errors.estadolugproceso ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="estadolugproceso" style={ { marginLeft: '10px' } }>Entidad en donde se llevó el proceso</label>
        </div>

      </div>

      <div className="row">

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.municipiolugproceso ? renderTooltip( errors.municipiolugproceso.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.municipiolugproceso ? 'is-invalid shake' : '' }` }
              id="municipiolugproceso"
              name="municipiolugproceso"
              placeholder={ errors.municipiolugproceso ? errors.municipiolugproceso.message : "municipiolugproceso" }
              { ...register( 'municipiolugproceso', { onChange: handleChange } ) }
              style={ { borderColor: errors.municipiolugproceso ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="municipiolugproceso" style={ { marginLeft: '10px' } }>Municipio donde se llevó el proceso</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.horaingreso ? renderTooltip( errors.horaingreso.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.horaingreso ? 'is-invalid shake' : '' }` }
              id="horaingreso"
              name="horaingreso"
              placeholder={ errors.horaingreso ? errors.horaingreso.message : "horaingreso" }
              { ...register( 'horaingreso', { onChange: handleChange } ) }
              style={ { borderColor: errors.horaingreso ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="horaingreso" style={ { marginLeft: '10px' } }>Hora que ingresa el interno</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.horaexterna ? renderTooltip( errors.horaexterna.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.horaexterna ? 'is-invalid shake' : '' }` }
              id="horaexterna"
              name="horaexterna"
              placeholder={ errors.horaexterna ? errors.horaexterna.message : "horaexterna" }
              { ...register( 'horaexterna', { onChange: handleChange } ) }
              style={ { borderColor: errors.horaexterna ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="horaexterna" style={ { marginLeft: '10px' } }>Hora de externación del interno</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechaexterna ? renderTooltip( errors.fechaexterna.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechaexterna ? 'is-invalid shake' : '' }` }
              id="fechaexterna"
              name="fechaexterna"
              placeholder={ errors.fechaexterna ? errors.fechaexterna.message : "fechaexterna" }
              { ...register( 'fechaexterna', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechaexterna ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechaexterna" style={ { marginLeft: '10px' } }>Fecha de externación</label>
        </div>

      </div>

      <div className="row">

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechareingreso ? renderTooltip( errors.fechareingreso.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechareingreso ? 'is-invalid shake' : '' }` }
              id="fechareingreso"
              name="fechareingreso"
              placeholder={ errors.fechareingreso ? errors.fechareingreso.message : "fechareingreso" }
              { ...register( 'fechareingreso', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechareingreso ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechareingreso" style={ { marginLeft: '10px' } }>Fecha externación y reingreso</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.horareingreso ? renderTooltip( errors.horareingreso.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.horareingreso ? 'is-invalid shake' : '' }` }
              id="horareingreso"
              name="horareingreso"
              placeholder={ errors.horareingreso ? errors.horareingreso.message : "horareingreso" }
              { ...register( 'horareingreso', { onChange: handleChange } ) }
              style={ { borderColor: errors.horareingreso ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="horareingreso" style={ { marginLeft: '10px' } }>Hora externación y reingreso del interno</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechaexterein ? renderTooltip( errors.fechaexterein.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechaexterein ? 'is-invalid shake' : '' }` }
              id="fechaexterein"
              name="fechaexterein"
              placeholder={ errors.fechaexterein ? errors.fechaexterein.message : "fechaexterein" }
              { ...register( 'horareinfechaextereingreso', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechaexterein ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechaexterein" style={ { marginLeft: '10px' } }>Fecha externación y reingreso</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.horaextreing ? renderTooltip( errors.horaextreing.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.horaextreing ? 'is-invalid shake' : '' }` }
              id="horaextreing"
              name="horaextreing"
              placeholder={ errors.horaextreing ? errors.horaextreing.message : "horaextreing" }
              { ...register( 'horaextreing', { onChange: handleChange } ) }
              style={ { borderColor: errors.horaextreing ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="horaextreing" style={ { marginLeft: '10px' } }>Hora externación del interno</label>
        </div>

      </div>

      <div className="row">

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.idestatussituacion ? renderTooltip( errors.idestatussituacion.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.idestatussituacion ? 'is-invalid shake' : '' }` }
              id="idestatussituacion"
              name="idestatussituacion"
              placeholder={ errors.idestatussituacion ? errors.idestatussituacion.message : "idestatussituacion" }
              { ...register( 'idestatussituacion', { onChange: handleChange } ) }
              style={ { borderColor: errors.idestatussituacion ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="idestatussituacion" style={ { marginLeft: '10px' } }>Estatus de la situación penal actual</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechaingreso ? renderTooltip( errors.fechaingreso.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechaingreso ? 'is-invalid shake' : '' }` }
              id="fechaingreso"
              name="fechaingreso"
              placeholder={ errors.fechaingreso ? errors.fechaingreso.message : "fechaingreso" }
              { ...register( 'fechaingreso', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechaingreso ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechaingreso" style={ { marginLeft: '10px' } }>Fecha ingreso del interno</label>
        </div>

      </div>
    </>
  );
};

export default IngresosP2;