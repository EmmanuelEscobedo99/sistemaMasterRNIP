import React, { useEffect, useState } from 'react';
import useStore from '../../../sistemaAdmin/zustand/useStore';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIdAlterna } from '../../../sistemaAdmin/reducers/slice/idAlterna/idAlternaSlice';

const Bloque1y2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const { internosBloque1y2, cargarInternosBloque1y2 } = useStore();
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    cargarInternosBloque1y2(); // Cargar registros al montar el componente
  }, []);

  useEffect(() => {
    setResultados(internosBloque1y2); // Actualizar resultados cuando se cargan internos
  }, [internosBloque1y2]);

  const handleBuscar = (e) => {
    const valor = e.target.value.toLowerCase();
    setBusqueda(valor);

    const filtrados = internosBloque1y2.filter((registro) =>
      registro.nombres.some(n =>
        n.DNOMBRE?.toLowerCase().includes(valor) ||
        n.DPATERNO?.toLowerCase().includes(valor) ||
        n.DMATERNO?.toLowerCase().includes(valor)
      )
    );

    setResultados(filtrados);
  };

  const handleSeleccionar = (idAlterna) => {
    dispatch(setIdAlterna(idAlterna));
    navigate(`/admin/verificar`);
  };

  return (
    <div className="container mt-4">
      <h2>Registros del Bloque 1 y 2</h2>
      <p>Aquí se muestran los registros correspondientes al Bloque 1 y 2.</p>

      <input
        type="text"
        className="form-control my-3"
        placeholder="Escribe un nombre..."
        value={busqueda}
        onChange={handleBuscar}
      />

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Nombre(s)</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map(({ ID_ALTERNA, nombres }) => (
            <tr key={ID_ALTERNA}>
              <td>
                {nombres.map((n, i) => (
                  <div key={i}>
                    {n.DNOMBRE} {n.DPATERNO} {n.DMATERNO}
                  </div>
                ))}
              </td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => handleSeleccionar(ID_ALTERNA)}>
                  Seleccionar
                </button>
              </td>
            </tr>
          ))}
          {resultados.length === 0 && (
            <tr>
              <td colSpan="2" className="text-center">No se encontraron registros</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Bloque1y2;
