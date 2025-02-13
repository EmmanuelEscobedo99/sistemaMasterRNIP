import React, { useState, useEffect, useCallback } from 'react';
import Alias from '../../componentes/bloqueUno/Alias';
import { useForm, FormProvider } from 'react-hook-form';
import '../../css/estilo.css';

const VistaAlias = ({ data, onFormChange }) => {
  const [aliasList, setAliasList] = useState(data);
  const methods = useForm({ defaultValues: data });

  const onValidationStatus = (errors) => {
    const hasErrors = Object.keys(errors).length > 0;
  };

  const handleFormChange = useCallback((updatedAliasList) => {
    setAliasList(updatedAliasList);
  }, []);

  useEffect(() => {
    if (JSON.stringify(aliasList) !== JSON.stringify(data)) {
      onFormChange(aliasList);
    }
  }, [aliasList, onFormChange, data]);

  return (
    <div className="card-form">
      <div className="col-md-12">
        <div className="card shadow-lg p-4">
          <h6>Incorporación de alias del individuo</h6>
          <FormProvider {...methods}>
            <form>
              <Alias
                data={data}
                onFormChange={handleFormChange}
                onValidationStatus={onValidationStatus}
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default VistaAlias;
