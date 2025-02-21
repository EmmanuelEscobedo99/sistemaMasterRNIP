import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import '../../../../sistema/css/estilo.css';
import Ingdelito from '../../bloqueDos/Ingdelito';
import SubirPrincipales from '../../bloqueSeis/SubirPrincipales';
import useDatosGeneralesStore from '../../../zustand/useDatosGeneralesStore';

const VistaPrincipales = ( { data, onFormChange } ) => {

  //const { limpiarErrores } = useDatosGeneralesStore();

  const methods = useForm( { defaultValues: data } );

  /*useEffect(() => {
    limpiarErrores();
  }, []);*/

  const onValidationStatus = ( errors ) => {
    const hasErrors = Object.keys( errors ).length > 0;
    // dispatch(setBloqueUnoF1Error(hasErrors));   
  };

  return (
    <div className="card-form" style={ { width: '140%' } }>
      <div className="">
        <div className="col-md-12">
          <div className="card shadow-lg p-4">
            <h6>Incorporación de imagenes principales </h6>
            <FormProvider { ...methods }>
              <form>
                <SubirPrincipales
                  data={ data }
                  onFormChange={ onFormChange }
                  onValidationStatus={ onValidationStatus }
                />
              </form>
            </FormProvider> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaPrincipales;