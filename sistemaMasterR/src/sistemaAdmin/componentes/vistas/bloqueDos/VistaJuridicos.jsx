import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import '../../../../sistema/css/estilo.css';
import Juridicos from '../../bloqueDos/Juridicos';

const VistaJuridicos = ( { data, onFormChange } ) => {
  const methods = useForm( { defaultValues: data } );

  const onValidationStatus = ( errors ) => {
    const hasErrors = Object.keys( errors ).length > 0;
    // dispatch(setBloqueUnoF1Error(hasErrors));   
  };

  return (
    <div className="card-form" style={ { width: '140%' } }>
      <div className="">
        <div className="col-md-12">
          <div className="card shadow-lg p-4">
            <h6>Incorporación de Juridicos </h6>
            <FormProvider { ...methods }>
              <form>
                <Juridicos
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

export default VistaJuridicos;