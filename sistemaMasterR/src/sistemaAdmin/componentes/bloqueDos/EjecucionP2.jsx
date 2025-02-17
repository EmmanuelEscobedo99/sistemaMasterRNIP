import React, {useEffect} from 'react';
import { useFormContext } from 'react-hook-form';
import ValidacionBloqueUno from '../../validaciones/validacionBloque1/ValidacionBloqueUno';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../css/estilo.css'

const Ejecucion2 = ( { ejecucionP2, onFormChange, onValidationStatus } ) => {
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
            overlay={ errors.fechingcent ? renderTooltip( errors.fechingcent.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechingcent ? 'is-invalid shake' : '' }` }
              id="fechingcent"
              name="fechingcent"
              placeholder={ errors.fechingcent ? errors.fechingcent.message : "fechingcent" }
              { ...register( 'fechingcent', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechingcent ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechingcent" style={ { marginLeft: '10px' } }>Fecha de ingreso al centro</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.articulos ? renderTooltip( errors.articulos.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.articulos ? 'is-invalid shake' : '' }` }
              id="articulos"
              name="articulos"
              placeholder={ errors.articulos ? errors.articulos.message : "articulos" }
              { ...register( 'articulos', { onChange: handleChange } ) }
              style={ { borderColor: errors.articulos ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="articulos" style={ { marginLeft: '10px' } }>Artículos del código penal</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.objetodelito ? renderTooltip( errors.objetodelito.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.objetodelito ? 'is-invalid shake' : '' }` }
              id="objetodelito"
              name="objetodelito"
              placeholder={ errors.objetodelito ? errors.objetodelito.message : "objetodelito" }
              { ...register( 'objetodelito', { onChange: handleChange } ) }
              style={ { borderColor: errors.objetodelito ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="objetodelito" style={ { marginLeft: '10px' } }>Objeto delito y cantidad del delito</label>
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

      </div>

      <div className="row">

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
          <label htmlFor="estadolugproceso" style={ { marginLeft: '10px' } }>Entidad donde se llevó a cabo el proceso</label>
        </div>

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
          <label htmlFor="municipiolugproceso" style={ { marginLeft: '10px' } }>Municipio dodne se llevó a cabo el proceso</label>
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

      </div>

      <div className="row">

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
          <label htmlFor="fechareingreso" style={ { marginLeft: '10px' } }>Fecha de reingreso</label>
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
          <label htmlFor="horareingreso" style={ { marginLeft: '10px' } }>Hora de reingreso del interno</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechaextrein ? renderTooltip( errors.fechaextrein.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechaextrein ? 'is-invalid shake' : '' }` }
              id="fechaextrein"
              name="fechaextrein"
              placeholder={ errors.fechaextrein ? errors.fechaextrein.message : "fechaextrein" }
              { ...register( 'fechaextrein', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechaextrein ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechaextrein" style={ { marginLeft: '10px' } }>Hora de reingreso del interno</label>
        </div>

      </div>

      <div className="row">

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.horaextrein ? renderTooltip( errors.horaextrein.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.horaextrein ? 'is-invalid shake' : '' }` }
              id="horaextrein"
              name="horaextrein"
              placeholder={ errors.horaextrein ? errors.horaextrein.message : "horaextrein" }
              { ...register( 'horaextrein', { onChange: handleChange } ) }
              style={ { borderColor: errors.horaextrein ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="horaextrein" style={ { marginLeft: '10px' } }>Hora externación del reingreso del interno</label>
        </div>

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

      </div>
    </>
  );


};