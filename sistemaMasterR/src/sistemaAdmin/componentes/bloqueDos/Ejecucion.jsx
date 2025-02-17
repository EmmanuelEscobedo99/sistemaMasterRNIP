import React, {useEffect} from 'react';
import { useFormContext } from 'react-hook-form';
import ValidacionBloqueUno from '../../validaciones/validacionBloque1/ValidacionBloqueUno';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../css/estilo.css'

const Ejecucion = ( { ejecucion, onFormChange, onValidationStatus } ) => {

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
            overlay={ errors.fechejec ? renderTooltip( errors.fechejec.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechejec ? 'is-invalid shake' : '' }` }
              id="fechejec"
              name="fechejec"
              placeholder={ errors.fechejec ? errors.fechejec.message : "fechejec" }
              { ...register( 'fechejec', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechejec ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechejec" style={ { marginLeft: '10px' } }>Fecha ejecución de pena por el juez</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechapartir ? renderTooltip( errors.fechapartir.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechapartir ? 'is-invalid shake' : '' }` }
              id="fechapartir"
              name="fechapartir"
              placeholder={ errors.fechapartir ? errors.fechapartir.message : "fechapartir" }
              { ...register( 'fechapartir', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechapartir ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechapartir" style={ { marginLeft: '10px' } }>Fecha empieza compurgar el individuo</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechapartir ? renderTooltip( errors.fechapartir.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechapartir ? 'is-invalid shake' : '' }` }
              id="fechapartir"
              name="fechapartir"
              placeholder={ errors.fechapartir ? errors.fechapartir.message : "fechapartir" }
              { ...register( 'fechapartir', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechapartir ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechapartir" style={ { marginLeft: '10px' } }>Fecha empieza compurgar el individuo</label>
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
            overlay={ errors.jtfc ? renderTooltip( errors.jtfc.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.jtfc ? 'is-invalid shake' : '' }` }
              id="jtfc"
              name="jtfc"
              placeholder={ errors.jtfc ? errors.jtfc.message : "jtfc" }
              { ...register( 'jtfc', { onChange: handleChange } ) }
              style={ { borderColor: errors.jtfc ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="jtfc" style={ { marginLeft: '10px' } }>Jornada en favor de la comunidad</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.multa ? renderTooltip( errors.multa.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.multa ? 'is-invalid shake' : '' }` }
              id="multa"
              name="multa"
              placeholder={ errors.multa ? errors.multa.message : "multa" }
              { ...register( 'multa', { onChange: handleChange } ) }
              style={ { borderColor: errors.multa ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="multa" style={ { marginLeft: '10px' } }>Multa</label>
        </div>

      </div>

      <div className="row">

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.repdan ? renderTooltip( errors.repdan.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.repdan ? 'is-invalid shake' : '' }` }
              id="repdan"
              name="repdan"
              placeholder={ errors.repdan ? errors.repdan.message : "repdan" }
              { ...register( 'repdan', { onChange: handleChange } ) }
              style={ { borderColor: errors.repdan ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="repdan" style={ { marginLeft: '10px' } }>Reparación del daño</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechresad ? renderTooltip( errors.fechresad.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechresad ? 'is-invalid shake' : '' }` }
              id="fechresad"
              name="fechresad"
              placeholder={ errors.fechresad ? errors.fechresad.message : "fechresad" }
              { ...register( 'fechresad', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechresad ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechresad" style={ { marginLeft: '10px' } }>Fecha de resolución administrativa</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.penaanoa ? renderTooltip( errors.penaanoa.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.penaanoa ? 'is-invalid shake' : '' }` }
              id="penaanoa"
              name="penaanoa"
              placeholder={ errors.penaanoa ? errors.penaanoa.message : "penaanoa" }
              { ...register( 'penaanoa', { onChange: handleChange } ) }
              style={ { borderColor: errors.penaanoa ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="penaanoa" style={ { marginLeft: '10px' } }>Pena en años por el segundo juez</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.penamesa ? renderTooltip( errors.penamesa.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.penamesa ? 'is-invalid shake' : '' }` }
              id="penamesa"
              name="penamesa"
              placeholder={ errors.penamesa ? errors.penamesa.message : "penamesa" }
              { ...register( 'penamesa', { onChange: handleChange } ) }
              style={ { borderColor: errors.penamesa ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="penamesa" style={ { marginLeft: '10px' } }>Pena en meses por el segundo juez</label>
        </div>

      </div>

      <div className="row">

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.penadiaa ? renderTooltip( errors.penadiaa.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.penadiaa ? 'is-invalid shake' : '' }` }
              id="penadiaa"
              name="penadiaa"
              placeholder={ errors.penadiaa ? errors.penadiaa.message : "penadiaa" }
              { ...register( 'penadiaa', { onChange: handleChange } ) }
              style={ { borderColor: errors.penadiaa ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="penadiaa" style={ { marginLeft: '10px' } }>Pena en dias por el segundo juez</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.entidad ? renderTooltip( errors.entidad.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.entidad ? 'is-invalid shake' : '' }` }
              id="entidad"
              name="entidad"
              placeholder={ errors.entidad ? errors.entidad.message : "entidad" }
              { ...register( 'entidad', { onChange: handleChange } ) }
              style={ { borderColor: errors.entidad ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="entidad" style={ { marginLeft: '10px' } }>Entidad</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.cereso ? renderTooltip( errors.cereso.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.cereso ? 'is-invalid shake' : '' }` }
              id="cereso"
              name="cereso"
              placeholder={ errors.cereso ? errors.cereso.message : "cereso" }
              { ...register( 'cereso', { onChange: handleChange } ) }
              style={ { borderColor: errors.cereso ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="cereso" style={ { marginLeft: '10px' } }>Cereso o cefereso</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.observa ? renderTooltip( errors.observa.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.observa ? 'is-invalid shake' : '' }` }
              id="observa"
              name="observa"
              placeholder={ errors.observa ? errors.observa.message : "observa" }
              { ...register( 'observa', { onChange: handleChange } ) }
              style={ { borderColor: errors.observa ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="observa" style={ { marginLeft: '10px' } }>Observaciones situación penal actual</label>
        </div>

      </div>
    </>
  );

};

export default Ejecucion;