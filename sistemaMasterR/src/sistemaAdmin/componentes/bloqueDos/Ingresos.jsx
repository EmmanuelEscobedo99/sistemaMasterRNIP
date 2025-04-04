import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';

const Ingresos = ( { data, onFormChange, onValidationStatus } ) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { ingresos } = useStore();

  useEffect( () => {
    onValidationStatus( errors );
  }, [ errors, onValidationStatus ] );

  const handleChange = ( index, e ) => {
    const { name, value } = e.target;
    const lowercaseName = name.toLowerCase();
    const validationResult = ValidacionBloqueUno[ `validacion${ capitalizeFirstLetter( lowercaseName ) }` ]?.( value );

    if ( validationResult !== true ) {
      setError( `${ name }_${ index }`, { type: 'formulario 1', message: validationResult } );
    } else {
      clearErrors( `${ name }_${ index }` );
    }
    onFormChange( `${ name }_${ index }`, value );
  };

  const handleRadioChange = ( nombre, valor, formulario, index ) => {
    const nombreCompleto = `${ nombre } Ingreso ${ index + 1 }`;
    seleccionarRadio( nombreCompleto, valor, formulario );
  };

  const capitalizeFirstLetter = ( string ) => {
    return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
  };

  const formatFecha = ( fecha ) => {
    if ( !fecha ) return '';
    if ( fecha.includes( 'T' ) ) {
      return fecha.split( 'T' )[ 0 ];  // Formato: YYYY-MM-DD
    }
    return fecha;  // Si ya viene bien formateada
  };

  const renderTooltip = ( message ) => (
    <Tooltip>{ message }</Tooltip>
  );

  const fields = [
    { id: "DAUTORI", label: "Autoridad que consigna" },
    { id: "DPARTIDA", label: "No de causa o partida penal" },
    { id: "DFECHA", label: "Fecha de la causa", isDate: true },
    { id: "DOBSERVA", label: "Observaciones situación penal" },
    { id: "PROCESO", label: "Número de proceso" },
    { id: "EDO_PROCESO_DESC", label: "Estado del proceso" },
    { id: "FUERO_DESC", label: "Fuero" },
    { id: "DAV_PREVIA", label: "Número de averiguación previa" },
    { id: "NJUZGADO", label: "Número de juzgado" },
    { id: "FECHAR", label: "Fecha de radicación", isDate: true },
    { id: "CLASSD", label: "Consignado por" },
    { id: "TRIBUNAL", label: "Tribunal" },
    { id: "FECHEJEC", label: "Fecha de ejecución", isDate: true },
    { id: "FECHARES", label: "Fecha de arresto", isDate: true },
    { id: "FECHAAPARTIR", label: "Fecha de compurgación", isDate: true },
    { id: "PENAANO", label: "Pena en años" },
  ];

  return (
    <div className="container-fluid">
      { ingresos.map( ( ingreso, index ) => (
        <div key={ index } className="mb-4 p-3 border rounded">
          <h5>{ `Ingreso #${ index + 1 }` }</h5>
          <div className="row">
            { fields.map( ( field ) => (
              <div key={ field.id } className="col-md-3 form-floating mt-3 d-flex align-items-center">
                <OverlayTrigger
                  placement="right"
                  overlay={ errors[ `${ field.id }_${ index }` ] ? renderTooltip( errors[ `${ field.id }_${ index }` ].message ) : <></> }
                >
                  <input
                    type="text"
                    className={ `form-control ${ errors[ `${ field.id }_${ index }` ] ? 'is-invalid shake' : '' }` }
                    id={ `${ field.id }_${ index }` }
                    name={ field.id }
                    placeholder={ errors[ `${ field.id }_${ index }` ]?.message || field.label }
                    value={ field.isDate ? formatFecha( ingreso[ field.id ] ) : ( ingreso[ field.id ] || '' ) }
                    { ...register( `${ field.id }_${ index }`, { onChange: ( e ) => handleChange( index, e ) } ) }
                    style={ { borderColor: errors[ `${ field.id }_${ index }` ] ? 'red' : '' } }
                    readOnly
                  />
                </OverlayTrigger>
                <label htmlFor={ `${ field.id }_${ index }` } style={ { marginLeft: '10px' } }>{ field.label }</label>

                {/* Radio Button - Marca el campo como error */ }
                <input
                  type="radio"
                  name={ `radio-${ field.id }-${ index }` }
                  value="Sí"
                  className="ms-2"
                  onChange={ () => handleRadioChange( field.label, 'Sí', 'Ingresos', index ) }
                />
              </div>
            ) ) }
          </div>
        </div>
      ) ) }

      {/* Lista de radio seleccionados mostrando Ingreso # */ }
      {/*<div className="mt-4">
        <h5 style={{ color: 'red' }}>Campos con errores:</h5>
        {radioSeleccionados.length > 0 ? (
          <ul>
            {radioSeleccionados.map((item, index) => (
              <li key={index}>{item.nombre}</li>
            ))}
          </ul>
        ) : (
          <p>Sin campos marcados por el momento.</p>
        )}
      </div>*/}
    </div>
  );
};

export default Ingresos;
