import React from 'react'
import DatosGenerales from '../../componentes/bloqueUno/DatosGenerales'
import Domicilio from '../../componentes/bloqueUno/Domicilio'

import { useForm, FormProvider } from 'react-hook-form';
import '../../css/estilo.css'

const VistaDatosGeneralesP1 = ({domicilio, onFormChange }) => {
    const methods = useForm({ defaultValues: domicilio });
  
    const onValidationStatus = (errors) => { 
        const hasErrors = Object.keys(errors).length > 0;
       // dispatch(setBloqueUnoF1Error(hasErrors));   
      }; 
    
  
  
  
  
    return (
        <div className="card-form">
        <div className="">
          <div className="col-md-12">
            <div className="card shadow-lg p-4">
              <h6>Incorporacion del domicilio del individuo</h6>
              <FormProvider {...methods}>
                <form>
                  <Domicilio
                       
                     domicilio={domicilio} 
                     onFormChange={onFormChange}
                     onValidationStatus={onValidationStatus} />     




                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
  )
}

export default VistaDatosGeneralesP1