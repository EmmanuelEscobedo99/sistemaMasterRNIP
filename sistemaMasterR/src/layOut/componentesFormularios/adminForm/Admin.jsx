import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setIdAlterna } from '../../../sistemaAdmin/reducers/slice/idAlterna/idAlternaSlice';
import { FinalizarSesion } from "../../../accesoLogin/reducers/thunks/finalizarSesion/FinalizarSesion";
import { useEffect, useState } from 'react';
import useStore from '../../../sistemaAdmin/zustand/useStore';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ busqueda, setBusqueda ] = useState( "" );
  const [ resultados, setResultados ] = useState( [] );
  const [ mostrarBuscador, setMostrarBuscador ] = useState( true );
  const [ mostrarOpciones, setMostrarOpciones ] = useState( false );

  const { cargarInternos, internos } = useStore();

  useEffect( () => {
    cargarInternos( 'obtenerInternos' );
  }, [] );

  useEffect( () => {
    if ( internos.length > 0 && Array.isArray( internos[ 0 ] ) ) {
      setResultados( internos[ 0 ] ); // 🔹 Mostrar resultados automáticamente
    }
  }, [ internos ] );

  const handleLogout = () => {
    dispatch( FinalizarSesion() )
      .unwrap()
      .then( () => {
        navigate( '/' );
      } )
      .catch( ( error ) => {
        console.error( 'Error al cerrar sesión:', error );
      } );
  };

  const handleBuscar = ( e ) => {
    const valor = e.target.value;
    setBusqueda( valor );

    if ( valor.length > 0 && internos.length > 0 && Array.isArray( internos[ 0 ] ) ) {
      const filtrados = internos[ 0 ].filter( ( interno ) =>
        interno.DNOMBRE.toLowerCase().includes( valor.toLowerCase() )
      );
      setResultados( filtrados );
    } else {
      setResultados( internos[ 0 ] ); // 🔹 Restaurar lista si no hay búsqueda
    }
  };

  const handleSeleccionar = ( idAlterna ) => {
    setMostrarBuscador( false );
    setMostrarOpciones( true ); // Mostrar opciones al seleccionar
    const tabla = "principales";
    dispatch( setIdAlterna( idAlterna ) );
    useStore.getState().cargarDatosFormulario( tabla, idAlterna );
    navigate( `/admin/verificar` );
  };

  return (
    <div className="d-flex flex-column vh-100">
      <div className="bg-primary text-light d-flex justify-content-between align-items-center p-3 shadow-sm">
        <div className="d-flex align-items-center">
          <i className="bi bi-person-circle fs-1 me-3"></i>
          <div className="sidebar-heading fw-bold fs-6">Panel Administrativo</div>
        </div>
        { mostrarOpciones && (
          <div className="d-flex">
            <ul className="navbar-nav flex-row gap-3">
              <li className="nav-item">
                <NavLink to="verificar" className="nav-link text-light fw-bold">
                  BLOQUE 1 y 2
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="bloque6" className="nav-link text-light fw-bold">
                  BLOQUE 6
                </NavLink>
              </li>
            </ul>
          </div>
        ) }


        <button onClick={ handleLogout } className="btn btn-outline-light">
          <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
        </button>
      </div>

      { mostrarBuscador && (
        <div className="container mt-4">
          <h4 className="mb-3">Buscar Interno</h4>
          <p>Aquí se muestran los registros con el bloque 1 y 2 completados antes de verificar.</p>
          <input
            type="text"
            className="form-control"
            placeholder="Escribe un nombre"
            value={ busqueda }
            onChange={ handleBuscar }
          />

          { resultados.length > 0 && (
            <div className="mt-3">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  { resultados.map( ( interno, index ) => (
                    <tr key={ index }>
                      <td>{ interno.DNOMBRE }</td>
                      <td>{ interno.DPATERNO }</td>
                      <td>{ interno.DMATERNO }</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={ () => handleSeleccionar( interno.ID_ALTERNA ) }
                        >
                          Seleccionar
                        </button>
                      </td>
                    </tr>
                  ) ) }
                </tbody>
              </table>
            </div>
          ) }
        </div>
      ) }

      <div className="container-fluid p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;