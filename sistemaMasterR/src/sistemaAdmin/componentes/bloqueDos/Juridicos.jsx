import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
//import ValidacionBloqueUno from '../../validaciones/validacionBloque1/ValidacionBloqueUno';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueDos from '../../validaciones/validacionBloque2/ValidacionesBloqueDos';

const Juridico = ( { juridico, onFormChange, onValidationStatus } ) => {

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
            overlay={ errors.fechacon ? renderTooltip( errors.fechacon.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechacon ? 'is-invalid shake' : '' }` }
              id="fechacon"
              name="fechacon"
              placeholder={ errors.fechacon ? errors.fechacon.message : "fechacon" }
              { ...register( 'fechacon', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechacon ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechacon" style={ { marginLeft: '10px' } }>Fecha de consignación</label>
        </div>

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
          <label htmlFor="tribunal" style={ { marginLeft: '10px' } }>Tribunal proceso</label>
        </div>

      </div>

      <div className="row">

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.amparo ? renderTooltip( errors.amparo.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.amparo ? 'is-invalid shake' : '' }` }
              id="amparo"
              name="amparo"
              placeholder={ errors.amparo ? errors.amparo.message : "amparo" }
              { ...register( 'amparo', { onChange: handleChange } ) }
              style={ { borderColor: errors.amparo ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="amparo" style={ { marginLeft: '10px' } }>Amparo primera instancia</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.senresol ? renderTooltip( errors.senresol.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.senresol ? 'is-invalid shake' : '' }` }
              id="senresol"
              name="senresol"
              placeholder={ errors.senresol ? errors.senresol.message : "senresol" }
              { ...register( 'senresol', { onChange: handleChange } ) }
              style={ { borderColor: errors.senresol ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="senresol" style={ { marginLeft: '10px' } }>Sentido de la resolución amparo primera instancia</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechresola ? renderTooltip( errors.fechresola.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechresola ? 'is-invalid shake' : '' }` }
              id="fechresola"
              name="fechresola"
              placeholder={ errors.fechresola ? errors.fechresola.message : "fechresola" }
              { ...register( 'fechresola', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechresola ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechresola" style={ { marginLeft: '10px' } }>Fecha resolución amparo 1ra instancia</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.toca ? renderTooltip( errors.toca.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.toca ? 'is-invalid shake' : '' }` }
              id="toca"
              name="toca"
              placeholder={ errors.toca ? errors.toca.message : "toca" }
              { ...register( 'toca', { onChange: handleChange } ) }
              style={ { borderColor: errors.toca ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="toca" style={ { marginLeft: '10px' } }>Número de toca</label>
        </div>

      </div>

      <div className="row">

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.toca ? renderTooltip( errors.toca.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.toca ? 'is-invalid shake' : '' }` }
              id="toca"
              name="toca"
              placeholder={ errors.toca ? errors.toca.message : "toca" }
              { ...register( 'toca', { onChange: handleChange } ) }
              style={ { borderColor: errors.toca ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="toca" style={ { marginLeft: '10px' } }>Número de toca</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.dictamen ? renderTooltip( errors.dictamen.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.dictamen ? 'is-invalid shake' : '' }` }
              id="dictamen"
              name="dictamen"
              placeholder={ errors.dictamen ? errors.dictamen.message : "dictamen" }
              { ...register( 'dictamen', { onChange: handleChange } ) }
              style={ { borderColor: errors.dictamen ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="dictamen" style={ { marginLeft: '10px' } }>Sentido de la resolución 2da instancia</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.amparo2 ? renderTooltip( errors.amparo2.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.amparo2 ? 'is-invalid shake' : '' }` }
              id="amparo2"
              name="amparo2"
              placeholder={ errors.amparo2 ? errors.amparo2.message : "amparo2" }
              { ...register( 'amparo2', { onChange: handleChange } ) }
              style={ { borderColor: errors.amparo2 ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="amparo2" style={ { marginLeft: '10px' } }>Amparo 2da instancia</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.senresol2 ? renderTooltip( errors.senresol2.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.senresol2 ? 'is-invalid shake' : '' }` }
              id="senresol2"
              name="senresol2"
              placeholder={ errors.senresol2 ? errors.senresol2.message : "senresol2" }
              { ...register( 'senresol2', { onChange: handleChange } ) }
              style={ { borderColor: errors.senresol2 ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="senresol2" style={ { marginLeft: '10px' } }>Sentido resolución 2da instancia</label>
        </div>

      </div>

      <div className="row">

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechresola2 ? renderTooltip( errors.fechresola2.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechresola2 ? 'is-invalid shake' : '' }` }
              id="fechresola2"
              name="fechresola2"
              placeholder={ errors.fechresola2 ? errors.fechresola2.message : "fechresola2" }
              { ...register( 'fechresola2', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechresola2 ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechresola2" style={ { marginLeft: '10px' } }>Fecha resolución amparo 2da instancia</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechresolp ? renderTooltip( errors.fechresolp.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechresolp ? 'is-invalid shake' : '' }` }
              id="fechresolp"
              name="fechresolp"
              placeholder={ errors.fechresolp ? errors.fechresolp.message : "fechresolp" }
              { ...register( 'fechresolp', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechresolp ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechresolp" style={ { marginLeft: '10px' } }>Fecha resolución 1era instancia</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.senresolp ? renderTooltip( errors.senresolp.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.senresolp ? 'is-invalid shake' : '' }` }
              id="senresolp"
              name="senresolp"
              placeholder={ errors.senresolp ? errors.senresolp.message : "senresolp" }
              { ...register( 'senresolp', { onChange: handleChange } ) }
              style={ { borderColor: errors.senresolp ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="senresolp" style={ { marginLeft: '10px' } }>Sentido resolución 1era instancia</label>
        </div>

        <div className="col-md-3 form-floating mt-3">
          <OverlayTrigger
            placement="right"
            overlay={ errors.fechater ? renderTooltip( errors.fechater.message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors.fechater ? 'is-invalid shake' : '' }` }
              id="fechater"
              name="fechater"
              placeholder={ errors.fechater ? errors.fechater.message : "fechater" }
              { ...register( 'fechater', { onChange: handleChange } ) }
              style={ { borderColor: errors.fechater ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor="fechater" style={ { marginLeft: '10px' } }>Fecha de auto de término</label>
        </div>

      </div>


    </>
  );

};

export default Juridicos;