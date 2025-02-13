import React, {useEffect} from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import {FinalizarSesion } from "../../../accesoLogin/reducers/thunks/finalizarSesion/FinalizarSesion"; 


const Capturista = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate()  
        // const { email } = useSelector(state => state.auth);   
    
        
    
        const handleLogout = () => {         
          dispatch(FinalizarSesion())
            .unwrap()
            .then(() => {
              navigate('/'); 
            })
            .catch((error) => {
              console.error('Error al cerrar sesión:', error);
            });
        };

  return (
    <div className="d-flex flex-column vh-100">
  <div className="bg-secondary text-light d-flex justify-content-between align-items-center p-3 shadow-sm" style={{ width: '100%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
    <div className="d-flex align-items-center">
      <i className="bi bi-person-circle fs-1 me-3"></i>
      <div className="sidebar-heading fw-bold fs-6">    </div>
    </div>
    <div className="d-flex">
      
      

      
      <NavLink
        to="/capturista/registro"
        className={({ isActive }) =>
          `nav-link text-light ${isActive ? 'text-primary' : ''} `
        }
      >
        <i className="bi bi-exclamation-triangle me-4"></i>Incorporar Datos
      </NavLink>


      <NavLink
        to="/capturista/menu"
        className={({ isActive }) =>
          `nav-link text-light ${isActive ? 'text-primary' : ''} `
        }
      >
        <i className="bi bi-exclamation-triangle me-4"></i>opcion menu 3
      </NavLink>

      


      

    </div>
    <button onClick={handleLogout} className="btn btn-outline-light">
      <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
    </button>
  </div>

  <div className="container-fluid p-4">
    <Outlet />
  </div>
</div>

  )
}

export default Capturista