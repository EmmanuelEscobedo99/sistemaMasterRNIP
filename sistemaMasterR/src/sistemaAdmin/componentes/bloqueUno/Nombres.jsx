import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';

const DatosGeneralesP2 = ( { data, onFormChange, onValidationStatus } ) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { nombres } = useStore();

  useEffect( () => {
    onValidationStatus( errors );
  }, [ errors, onValidationStatus ] );

  const handleChange = ( e ) => {
    const { name, value } = e.target;
    const lowercaseName = name.toLowerCase();
    const validationFunction = ValidacionBloqueUno[ `validacion${ capitalizeFirstLetter( lowercaseName ) }` ];

    if ( validationFunction ) {
      const validationResult = validationFunction( value );
      if ( validationResult !== true ) {
        setError( name, { type: 'manual', message: validationResult } );
      } else {
        clearErrors( name );
      }
    }

    onFormChange( name, value );
  };

  const handleRadioChange = ( nombre, valor, formulario, index ) => {
    const nombreCompleto = `${ nombre } Delito ${ index + 1 }`;
    seleccionarRadio( nombreCompleto, valor, formulario );
  };

  const capitalizeFirstLetter = ( string ) => {
    return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
  };

  const renderTooltip = ( message ) => (
    <Tooltip>{ message }</Tooltip>
  );

  const nombresObtenidos = nombres?.[ 0 ] || [];  // Nos aseguramos de que sea un array de nombres

  console.log( 'Nombres obtenidos:', nombresObtenidos );

  return (
    <div className="container-fluid">
      { nombresObtenidos.map( ( nombre, index ) => (
        <div key={ index } className="mb-4">
          <h5>{ `Persona ${ index + 1 }` }</h5>
          <div className="row">
            { [
              { id: "DNOMBRE", label: "Nombre", value: nombre.DNOMBRE },
              { id: "DPATERNO", label: "Apellido Paterno", value: nombre.DPATERNO },
              { id: "DMATERNO", label: "Apellido Materno", value: nombre.DMATERNO }
            ].map( ( field ) => (
              <div key={ field.id } className="col-md-4 form-floating d-flex align-items-center">
                <OverlayTrigger
                  placement="right"
                  overlay={ errors[ `${ field.id }_${ index }` ] ? renderTooltip( errors[ `${ field.id }_${ index }` ].message ) : <></> }
                >
                  <input
                    type="text"
                    className={ `form-control ${ errors[ `${ field.id }_${ index }` ] ? 'is-invalid shake' : '' }` }
                    id={ `${ field.id }_${ index }` }
                    name={ `${ field.id }_${ index }` }
                    placeholder={ field.label }
                    value={ field.value || '' }
                    { ...register( `${ field.id }_${ index }`, { onChange: handleChange } ) }
                    style={ { borderColor: errors[ `${ field.id }_${ index }` ] ? 'red' : '' } }
                  />
                </OverlayTrigger>
                <label htmlFor={ `${ field.id }_${ index }` } className="ms-1">{ field.label }</label>
                {/* Checkbox toggleable */ }
                <div className="mt-2">
                  <input
                    type="checkbox"
                    name={ `checkbox-${ field.id }-${ index }` }
                    value="Sí"
                    className="ms-2"
                    checked={ radioSeleccionados.some( item => item.nombre === `${ field.label } Nombre ${ index + 1 }` && item.valor === 'Sí' ) }
                    onChange={ () => {
                      const nombreCompleto = `${ field.label } Nombre ${ index + 1 }`;
                      if ( radioSeleccionados.some( item => item.nombre === nombreCompleto && item.valor === 'Sí' ) ) {
                        seleccionarRadio( nombreCompleto, null, 'Nombres' );
                      } else {
                        seleccionarRadio( nombreCompleto, 'Sí', 'Nombres' );
                      }
                    } }
                  />
                </div>
              </div>
            ) ) }
          </div>
        </div>
      ) ) }

      {/* Lista de checkboxes seleccionados */ }
      {/*<div className="mt-4">
        <h5 style={{ color: 'red' }}>Campos con errores:</h5>
        <ul>
          {checkboxSeleccionados.map((item, index) => (
            <li key={index}>{item.nombre}</li>
          ))}
        </ul>
      </div>*/}
    </div>
  );
};

export default DatosGeneralesP2;
