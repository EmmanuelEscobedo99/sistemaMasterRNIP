import { validacionVacio, validacionLetras, validacionNumeros, validacionSinEspacioN,  validacionLetrasConEspacios, validacionLetrasYNumerosConEspacios  } from '../funcionPrincipal/FuncionesValidacion';

class ValidacionNombres {

   
 
static validacionDnombre(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionDpaterno(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionDmaterno(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}




}

export default ValidacionNombres;
