import { validacionVacio, validacionLetras, validacionNumeros, validacionSinEspacioN,  validacionLetrasConEspacios, validacionLetrasYNumerosConEspacios  } from '../funcionPrincipal/FuncionesValidacion';

class ValidacionBloqueDos {

      //Datos generales 
 
static validacionFechacap(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionSexo(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionEdad(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionEstatura(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionPeso(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionEstciv(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionFecnac(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionNentid(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}


static validacionNmunic(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}


static validacionNpais(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}


static validacionNnaciona(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}


static validacionTipsan(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionTipsan1(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionUsoant(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionRfc(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionOficiodes(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

// segunda forma
static validacionTelefono(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionFormula(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionSubformula(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}


static validacionFolio(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionCodbar(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionTipoexp(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionEscolaridad(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionEtnia(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionReligion(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionRemesa(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}


static validacionEstadoexpediente(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}


static validacionUbicacioninterno(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionIdhablaindigena(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionIdindigena(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}


static validacionIdsentenciaabsolutoria(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionIdanalfabeta(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

//
//
//
//
//
//




    
      //validacion Formulario personas D
      static validacionEdad(value) {
        return (
          validacionVacio(value) &&
          validacionNumeros(value)
        );
      }
      
      static validacionTatuajes(value) {
        return (
          validacionVacio(value) &&
          validacionLetras(value)
        );
      }

      static validacionColorCabello(value) {
        return (
          validacionVacio(value) &&
          validacionLetras(value)
        );
      }

   //validacion Formulario personas T

   static validacionDireccion(value) {
    return (
      validacionVacio(value) &&
      validacionLetrasYNumerosConEspacios(value)
    );
  }

  static validacionAuto(value) {
    return (
      validacionVacio(value) &&
      validacionLetras(value)
    );
  }

  static validacionCasa(value) {
    return (
      validacionVacio(value) &&
      validacionLetras(value)
    );
  }


  
    static validacionNombre(value) {
        return (
          validacionVacio(value) &&
          validacionLetras(value)
        );
      }


      static validacionApaterno(value) {
        return (
          validacionVacio(value) &&
          validacionLetras(value)
        );
      }

      static validacionAmaterno(value) {
        return (
          validacionVacio(value) &&
          validacionLetras(value)
        );
      }



  static validateDireccion(value) {
    return (
      validateNotEmpty(value) &&
      validateSingleWord(value)
    );
  }

  static validateEstadoCivil(value) {
    return (
      validateNotEmpty(value) &&
      validateSingleWord(value)
    );
  }

  static validateHijos(value) {
    return (
      validateNotEmpty(value) &&
      validateNoSpaces(value) &&
      validateNumbersOnly(value)
    );
  }

  static validateEstudios(value) {
    return (
      validateNotEmpty(value) &&
      validateSingleWord(value)
    );
  }






// nombres

static validacionNombre1(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionDpaterno1(value) {
  return (
    validacionVacio(value) &&
          validacionLetras(value)
  );
}

static validacionDmaterno1(value) {
  return (
    validacionVacio(value) &&
          validacionLetras(value)
  );
}

static validacionNombre2(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionDpaterno2(value) {
  return (
    validacionVacio(value) &&
          validacionLetras(value)
  );
}

static validacionDmaterno2(value) {
  return (
    validacionVacio(value) &&
          validacionLetras(value)
  );
}

static validacionNombre3(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionDpaterno3(value) {
  return (
    validacionVacio(value) &&
          validacionLetras(value)
  );
}

static validacionDmaterno3(value) {
  return (
    validacionVacio(value) &&
          validacionLetras(value)
  );
}



static validacionNombre4(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionDpaterno4(value) {
  return (
    validacionVacio(value) &&
          validacionLetras(value)
  );
}

static validacionDmaterno4(value) {
  return (
    validacionVacio(value) &&
          validacionLetras(value)
  );
}


static validacionNombre5(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}

static validacionDpaterno5(value) {
  return (
    validacionVacio(value) &&
          validacionLetras(value)
  );
}

static validacionDmaterno5(value) {
  return (
    validacionVacio(value) &&
          validacionLetras(value)
  );
}



// validacion alias
static validacionAlias(value) {
  return (
    validacionVacio(value) &&
    validacionLetras(value)
  );
}



}

export default ValidacionBloqueDos;
