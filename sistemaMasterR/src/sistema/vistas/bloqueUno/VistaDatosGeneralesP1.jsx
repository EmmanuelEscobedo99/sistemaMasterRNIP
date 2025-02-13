import React from 'react'
import DatosGenerales from '../../componentes/bloqueUno/DatosGenerales'
import DatosGeneralesP2 from '../../componentes/bloqueUno/DatosGeneralesP2'

import { useForm, FormProvider } from 'react-hook-form';
import '../../css/estilo.css'

const VistaDatosGeneralesP1 = ({data, onFormChange }) => {
    const methods = useForm({ defaultValues: data });
  
    const onValidationStatus = (errors) => { 
        const hasErrors = Object.keys(errors).length > 0;
       // dispatch(setBloqueUnoF1Error(hasErrors));   
      }; 
    
  
  
  
  
    return (
        <div className="card-form">
        <div className="">
          <div className="col-md-12">
            <div className="card shadow-lg p-4">
              <h6>Incorporacion de Datos generales </h6>
              <FormProvider {...methods}>
                <form>
                  <DatosGenerales
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
  )
}

export default VistaDatosGeneralesP1