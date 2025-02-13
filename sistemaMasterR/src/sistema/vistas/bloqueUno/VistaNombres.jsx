import React, { useState, useEffect, useCallback } from 'react';
import Nombres from '../../componentes/bloqueUno/Nombres';
import { useForm, FormProvider } from 'react-hook-form';
import '../../css/estilo.css';

const VistaNombres = ({ nombres, onFormChange }) => {
  const [nombresList, setNombresList] = useState(nombres);
  const methods = useForm({ defaultValues: nombres });

  const onValidationStatus = (errors) => {
    const hasErrors = Object.keys(errors).length > 0;    
  };

  const handleFormChange = useCallback((updatedNombresList) => {
    setNombresList(updatedNombresList);
  }, []);

  
  useEffect(() => {
    if (JSON.stringify(nombresList) !== JSON.stringify(nombres)) {
      onFormChange(nombresList);
    }
  }, [nombresList, onFormChange, nombres]);

  return (
    <div className="card-form">
      <div className="">
        <div className="col-md-12">
          <div className="card shadow-lg p-4">
            <h6>Incorporacion de Nombres del individuo</h6>
            <FormProvider {...methods}>
              <form>
                <Nombres
                  nombres={nombres}
                  onFormChange={handleFormChange}
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

export default VistaNombres;



