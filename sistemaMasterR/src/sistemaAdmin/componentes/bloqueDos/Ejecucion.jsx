import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../../../sistema/css/estilo.css';
import ValidacionBloqueUno from '../../../sistema/validaciones/validacionBloque1/ValidacionBloqueUno';
import useDatosGeneralesStore from '../../zustand/useDatosGeneralesStore';
import useStore from '../../zustand/useStore';

const Ejecucion = ( { data, onFormChange, onValidationStatus } ) => {
  const { register, formState: { errors }, setError, clearErrors } = useFormContext();
  const { seleccionarRadio, radioSeleccionados } = useDatosGeneralesStore();
  const { ejecucion } = useStore();

  const handleChange = ( e ) => {
    const { name, value } = e.target;
    const lowercaseName = name.toLowerCase();
    const validationResult = ValidacionBloqueUno[ `validacion${ capitalizeFirstLetter( lowercaseName ) }` ]( value );

    if ( validationResult !== true ) {
      setError( name, { type: 'formulario 1', message: validationResult } );
    } else {
      clearErrors( name );
    }
    onFormChange( name, value );
  };

  const handleRadioChange = ( nombre, valor, formulario ) => {
    seleccionarRadio( nombre, valor, formulario );
  };

  const capitalizeFirstLetter = ( string ) => {
    return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
  };

  useEffect( () => {
    onValidationStatus( errors );
  }, [ errors, onValidationStatus ] );

  const renderTooltip = ( message ) => (
    <Tooltip>{ message }</Tooltip>
  );

  // Formateador de fechas
  const formatFecha = ( fechaISO ) => {
    if ( !fechaISO ) return '';
    const fecha = new Date( fechaISO );
    if ( isNaN( fecha.getTime() ) ) return fechaISO; // Si no es una fecha válida, regresa como está
    return fecha.toISOString().split( 'T' )[ 0 ]; // Formato YYYY-MM-DD
  };

  // Obtener el valor con formato en caso de ser fecha
  const getFieldValue = ( fieldId ) => {
    const valor = ejecucion?.[ 0 ]?.[ fieldId ] || '';
    // Lista de campos que son fechas
    const camposFecha = [
      "FECHEJEC", "FECHAPARTIR", "FECHRESAD", "FECHINGCENT"
    ];
    if ( camposFecha.includes( fieldId ) ) {
      return formatFecha( valor );
    }
    return valor;
  };

  return (
    <div className="row">
      { [
        { id: "FECHEJEC", label: "Fecha ejecución de la pena por el juez" },
        { id: "FECHAPARTIR", label: "Fecha de compurgación de pena del individuo" },
        { id: "PENAANO", label: "Pena en años" },
        { id: "PENAMES", label: "Pena en meses" },
        { id: "PENADIA", label: "Pena en dias" },
        { id: "JTFC", label: "Jornada en favor de la comunidad" },
        { id: "MULTA", label: "Multa" },
        { id: "REPDAN", label: "Reparación del daño" },
        { id: "FECHRESAD", label: "Fecha de resolución administrativa" },
        { id: "PENAANOA", label: "Pena en años por el segundo juez" },
        { id: "PENAMESA", label: "Pena en meses por el segundo juez" },
        { id: "PENADIAA", label: "Pena en dias por el segundo juez" },
        { id: "ENTIDAD", label: "Entidad" },
        { id: "CERESO", label: "Cereso o cefereso" },
        { id: "OBSERVA", label: "Observaciones situacion penal actual" },
        { id: "FECHINGCENT", label: "Fecha de ingreso al centro" },
      ].map( ( field ) => (
        <div key={ field.id } className="col-md-3 form-floating mt-3 d-flex align-items-center">
          <OverlayTrigger
            placement="right"
            overlay={ errors[ field.id ] ? renderTooltip( errors[ field.id ].message ) : <></> }
          >
            <input
              type="text"
              className={ `form-control ${ errors[ field.id ] ? 'is-invalid shake' : '' }` }
              id={ field.id }
              name={ field.id }
              placeholder={ errors[ field.id ] ? errors[ field.id ].message : field.label }
              value={ getFieldValue( field.id ) }
              { ...register( field.id, { onChange: handleChange } ) }
              style={ { borderColor: errors[ field.id ] ? 'red' : '' } }
            />
          </OverlayTrigger>
          <label htmlFor={ field.id } style={ { marginLeft: '10px' } }>{ field.label }</label>

          {/* Radio Button */ }
          <input
            type="radio"
            name={ `radio-${ field.id }` }
            value="Sí"
            className="ms-2"
            onChange={ () => handleRadioChange( field.label, 'Sí', 'Ejecución PT1' ) }
          />
        </div>
      ) ) }
      {/* Lista de radio seleccionados */ }
      {/*<div className="mt-4">
                <h5 style={{ color: 'red' }}>Campos con errores:</h5>
                <ul>
                    {radioSeleccionados.map((item, index) => (
                        <li key={index}>{item.nombre}</li>
                    ))}
                </ul>
            </div>*/}
    </div>
  );
};

export default Ejecucion;
