import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import '../../../../sistema/css/estilo.css';
import ConsultarErrores2 from '../../ConsultarErrores/ConsultarErrores2';

const VistaConsultarErrores2 = ( { data, onFormChange } ) => {
  const methods = useForm( { defaultValues: data } );

  const onValidationStatus = ( errors ) => {
    const hasErrors = Object.keys( errors ).length > 0;
    // dispatch(setBloqueUnoF1Error(hasErrors));   
  };

  return (
    <div className="card-form" style={{ width:'150%' }}>
      <div className="">
        <div className="col-md-8">
          <div className="card shadow-lg p-4">
            <h6>Consultar Errores </h6>
            <FormProvider { ...methods }>
              <form>
                <ConsultarErrores2
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

export default VistaConsultarErrores2;