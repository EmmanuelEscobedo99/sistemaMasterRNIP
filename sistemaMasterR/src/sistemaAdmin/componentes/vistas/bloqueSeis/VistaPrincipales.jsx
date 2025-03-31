import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import '../../../../sistema/css/estilo.css';
import MostrarPrincipales from '../../bloqueSeis/MostrarPrincipales';

const VistaPrincipales = ({ data, onFormChange }) => {
  const methods = useForm({ defaultValues: data });

  const onValidationStatus = (errors) => {
    const hasErrors = Object.keys(errors).length > 0;
  };

  return (
    <div className="container-fluid px-4 py-3">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-9 col-lg-10">
          <div
            className="shadow-lg p-4"
            style={{
              backgroundColor: '#0B0F1A',
              borderRadius: '16px',
              border: '1px solid #22D3EE',
              boxShadow: '0 0 25px rgba(34, 211, 238, 0.4)',
              color: '#E5E7EB',
            }}
          >
            <h5 className="fw-bold mb-4 text-center" style={{ color: '#22D3EE' }}>
              Incorporación de imágenes principales
            </h5>

            <FormProvider {...methods}>
              <form>
                <MostrarPrincipales
                  data={data}
                  onFormChange={onFormChange}
                  onValidationStatus={onValidationStatus}
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
