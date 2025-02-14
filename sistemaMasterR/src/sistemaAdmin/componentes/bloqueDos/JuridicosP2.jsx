import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
//import ValidacionBloqueUno from '../../validaciones/validacionBloque1/ValidacionBloqueUno';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueDos from '../../validaciones/validacionBloque2/ValidacionesBloqueDos';

const JuridicosP2 = ( { juridicosp2, onFormChange, onValidationStatus } ) => {

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
            overlay={ errors.senter ? renderTooltip( errors.senter.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.senter ? 'is-invalid shake' : '' }` }
              id="senter"
              name="senter"
              placeholder={ errors.senter ? errors.senter.message : "senter" }
              { ...register( 'senter', { onChange: handleChange } ) }
              style={ { borderColor: errors.senter ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="senter" style={ { marginLeft: '10px' } }>Sentido del término</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.calidad ? renderTooltip( errors.calidad.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.calidad ? 'is-invalid shake' : '' }` }
              id="calidad"
              name="calidad"
              placeholder={ errors.calidad ? errors.calidad.message : "calidad" }
              { ...register( 'calidad', { onChange: handleChange } ) }
              style={ { borderColor: errors.calidad ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="calidad" style={ { marginLeft: '10px' } }>Calidad delicuencial del individuo</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechresolt ? renderTooltip( errors.fechresolt.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechresolt ? 'is-invalid shake' : '' }` }
              id="fechresolt"
              name="fechresolt"
              placeholder={ errors.fechresolt ? errors.fechresolt.message : "fechresolt" }
              { ...register( 'fechresolt', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechresolt ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechresolt" style={ { marginLeft: '10px' } }>Fecha resolución 2da instancia</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.tribunals ? renderTooltip( errors.tribunals.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.tribunals ? 'is-invalid shake' : '' }` }
              id="tribunals"
              name="tribunals"
              placeholder={ errors.tribunals ? errors.tribunals.message : "tribunals" }
              { ...register( 'tribunals', { onChange: handleChange } ) }
              style={ { borderColor: errors.tribunals ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="tribunals" style={ { marginLeft: '10px' } }>Tribunal segunda instancia</label>
        </div>

      </div>

      <div className="row">

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.tribunalpa ? renderTooltip( errors.tribunalpa.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.tribunalpa ? 'is-invalid shake' : '' }` }
              id="tribunalpa"
              name="tribunalpa"
              placeholder={ errors.tribunalpa ? errors.tribunalpa.message : "tribunalpa" }
              { ...register( 'tribunalpa', { onChange: handleChange } ) }
              style={ { borderColor: errors.tribunalpa ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="tribunalpa" style={ { marginLeft: '10px' } }>Tribunal amparo 1era instancia</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.tribunalsa ? renderTooltip( errors.tribunalsa.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.tribunalsa ? 'is-invalid shake' : '' }` }
              id="tribunalsa"
              name="tribunalsa"
              placeholder={ errors.tribunalsa ? errors.tribunalsa.message : "tribunalsa" }
              { ...register( 'tribunalsa', { onChange: handleChange } ) }
              style={ { borderColor: errors.tribunalsa ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="tribunalsa" style={ { marginLeft: '10px' } }>Tribunal amparo 2da instancia</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.autor ? renderTooltip( errors.autor.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.autor ? 'is-invalid shake' : '' }` }
              id="autor"
              name="autor"
              placeholder={ errors.autor ? errors.autor.message : "autor" }
              { ...register( 'autor', { onChange: handleChange } ) }
              style={ { borderColor: errors.autor ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="autor" style={ { marginLeft: '10px' } }>Autor</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.autoria ? renderTooltip( errors.autoria.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.autoria ? 'is-invalid shake' : '' }` }
              id="autoria"
              name="autoria"
              placeholder={ errors.autoria ? errors.autoria.message : "autoria" }
              { ...register( 'autoria', { onChange: handleChange } ) }
              style={ { borderColor: errors.autoria ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="autoria" style={ { marginLeft: '10px' } }>Autoria</label>
        </div>

      </div>

      <div className="row">

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.peligroc ? renderTooltip( errors.peligroc.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.peligroc ? 'is-invalid shake' : '' }` }
              id="peligroc"
              name="peligroc"
              placeholder={ errors.peligroc ? errors.peligroc.message : "peligroc" }
              { ...register( 'peligroc', { onChange: handleChange } ) }
              style={ { borderColor: errors.peligroc ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="peligroc" style={ { marginLeft: '10px' } }>Peligrosidad criminal</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechaapela ? renderTooltip( errors.fechaapela.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechaapela ? 'is-invalid shake' : '' }` }
              id="fechaapela"
              name="fechaapela"
              placeholder={ errors.fechaapela ? errors.fechaapela.message : "fechaapela" }
              { ...register( 'fechaapela', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechaapela ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechaapela" style={ { marginLeft: '10px' } }>Fecha de apelación</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechaamparo ? renderTooltip( errors.fechaamparo.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechaamparo ? 'is-invalid shake' : '' }` }
              id="fechaamparo"
              name="fechaamparo"
              placeholder={ errors.fechaamparo ? errors.fechaamparo.message : "fechaamparo" }
              { ...register( 'fechaamparo', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechaamparo ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechaamparo" style={ { marginLeft: '10px' } }>Fecha de amparo 1era instancia</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechaamparo2 ? renderTooltip( errors.fechaamparo2.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechaamparo2 ? 'is-invalid shake' : '' }` }
              id="fechaamparo2"
              name="fechaamparo2"
              placeholder={ errors.fechaamparo2 ? errors.fechaamparo2.message : "fechaamparo2" }
              { ...register( 'fechaamparo2', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechaamparo2 ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechaamparo2" style={ { marginLeft: '10px' } }>Fecha de amparo 2da instancia</label>
        </div>

      </div>

      <div className="row">

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
          <label htmlFor="penaanoa" style={ { marginLeft: '10px' } }>Abono de pena años</label>
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
          <label htmlFor="penamesa" style={ { marginLeft: '10px' } }>Abono de pena meses</label>
        </div>

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
          <label htmlFor="penadiaa" style={ { marginLeft: '10px' } }>Abono de pena dias</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fcumplimientos ? renderTooltip( errors.fcumplimientos.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fcumplimientos ? 'is-invalid shake' : '' }` }
              id="fcumplimientos"
              name="fcumplimientos"
              placeholder={ errors.fcumplimientos ? errors.fcumplimientos.message : "fcumplimientos" }
              { ...register( 'fcumplimientos', { onChange: handleChange } ) }
              style={ { borderColor: errors.fcumplimientos ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fcumplimientos" style={ { marginLeft: '10px' } }>Fecha de cumplimiento de sentencia</label>
        </div>

      </div>
    </>
  );

};

export default JuridicosP2;