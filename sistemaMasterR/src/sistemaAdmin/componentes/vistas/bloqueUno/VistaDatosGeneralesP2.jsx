import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import '../../../../sistema/css/estilo.css';
import DatosGeneralesP2 from '../../../../sistemaAdmin/componentes/bloqueUno/DatosGeneralesP2';

const VistaDatosGeneralesP2 = ({ data, onFormChange }) => {
  const methods = useForm({ defaultValues: data });

  const onValidationStatus = (errors) => {
    const hasErrors = Object.keys(errors).length > 0;
    // dispatch(setBloqueUnoF1Error(hasErrors));   
  };

  return (
    <div className="container mt-4">
      <div className="shadow-lg p-4 bg-white rounded">
        <h6 className="fw-bold mb-3">Incorporación de Datos generales</h6>
        <FormProvider {...methods}>
          <form>
            <DatosGeneralesP2
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

export default VistaDatosGeneralesP2;
