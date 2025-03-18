import { useNavigate } from 'react-router-dom';
import useStore from '../../zustand/useStore';

export const TablaDatos = () => {
  const navigate = useNavigate();
  const setLlave = useStore((state) => state.setLlave);

  // 📌 Lista de reclusos
  const personas = [
    { LLAVE: '101001_11', nombre: 'Juan', apellido: 'Pérez' },
    { LLAVE: '101001_2', nombre: 'Ana Gómez', apellido: 'Pérez' },
    { LLAVE: '101001_3', nombre: 'Carlos Martínez', apellido: 'Pérez' },
    { LLAVE: '101001_4', nombre: 'Lucía Rodríguez', apellido: 'Pérez' },
    { LLAVE: '101001_5', nombre: 'Lucía Rodríguez', apellido: 'Pérez' },
    { LLAVE: '101001_6', nombre: 'Lucía Rodríguez', apellido: 'Pérez' },
    { LLAVE: '101001_7', nombre: 'Lucía Rodríguez', apellido: 'Pérez' },
    { LLAVE: '101001_8', nombre: 'Lucía Rodríguez', apellido: 'Pérez' },
    { LLAVE: '101001_9', nombre: 'Lucía Rodríguez', apellido: 'Pérez' },
  ];

  const seleccionarPersona = (LLAVE) => {
    setLlave(LLAVE); // Guarda la LLAVE en Zustand
    navigate(`/formPaginas`); // Navega a la siguiente página
  };

  return { personas, seleccionarPersona };
};
