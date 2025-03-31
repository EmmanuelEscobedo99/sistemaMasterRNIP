import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import '../../../../sistema/css/estilo.css';
import Alias from '../../bloqueUno/Alias';

const VistaAlias = ({ data, onFormChange }) => {
  const methods = useForm({ defaultValues: data });

  const onValidationStatus = (errors) => {
    const hasErrors = Object.keys(errors).length > 0;
    // dispatch(setBloqueUnoF1Error(hasErrors));   
  };

  return (
    <div className="container mt-4">
      <div className="shadow-lg p-4 bg-white rounded">
        <h6 className="fw-bold mb-3">Incorporación de Alias</h6>
        <FormProvider {...methods}>
          <form>
            <Alias
              data={data}
              onFormChange={onFormChange}
              onValidationStatus={onValidationStatus}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default VistaAlias;
