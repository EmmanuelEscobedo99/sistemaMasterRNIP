

const validacionVacio = (value, errorMessage = 'El campo no puede estar vacío') => {
    const trimmedValue = value.trim();
    return trimmedValue ? true : errorMessage;
    };
  
const validacionLetras = (value, errorMessage = 'Solo se permite una palabra sin espacios ni números') => {
    return /^[a-zA-Z]+$/.test(value) ? true : errorMessage;
    };

const validacionLetrasConEspacios = (value, errorMessage = 'Solo se permiten letras con un solo espacio entre palabras') => {   
    return /^[a-zA-Z]+(\s[a-zA-Z]+)*$/.test(value.trim()) ? true : errorMessage;
    };

  
const validacionLetrasYNumerosConEspacios = (value, errorMessage = 'Solo se permiten palabras con letras y números con un solo espacio entre cada una') => {   
    return /^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)*$/.test(value.trim()) ? true : errorMessage;
    };

const validacionNumeros = (value, errorMessage = 'Solo se permiten números') => {
    const trimmedValue = value.trim();
    return /^[0-9]+$/.test(trimmedValue) ? true : errorMessage;
    };
  
const validacionSinEspacioN = (value, errorMessage = 'El número no puede contener espacios') => {
    return /\s/.test(value) ? errorMessage : true;
    };
  




    
  export { validacionVacio, validacionLetras, validacionNumeros, validacionSinEspacioN,  validacionLetrasConEspacios, validacionLetrasYNumerosConEspacios  };