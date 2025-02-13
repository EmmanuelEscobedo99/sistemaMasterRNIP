import { validacionVacio, validacionLetras, validacionNumeros, validacionSinEspacioN,  validacionLetrasConEspacios, validacionLetrasYNumerosConEspacios  } from '../funcionPrincipal/FuncionesValidacion';

class ValidacionAlias {

   
 
static validacionAlias(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}




}

export default ValidacionAlias;
