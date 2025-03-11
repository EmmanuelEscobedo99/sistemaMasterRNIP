import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { FinalizarSesion } from "../../../accesoLogin/reducers/thunks/finalizarSesion/FinalizarSesion";
import { useEffect, useState } from 'react';
import useStore from '../../../sistemaAdmin/zustand/useStore';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cargarInternos } = useStore();

  useEffect(() => {
    cargarInternos('obtenerInternos');
  }, []);

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
      {/* Barra de navegación superior */}
      <div className="bg-primary text-light d-flex justify-content-between align-items-center p-3 shadow-sm">
        <div className="d-flex align-items-center">
          <i className="bi bi-person-circle fs-1 me-3"></i>
          <div className="sidebar-heading fw-bold fs-6">Panel Administrativo</div>
        </div>

        {/* Opciones de Bloque 1 y 2 / Bloque 6 */}
        <div className="d-flex gap-3">
          <NavLink to="/admin/bloque1y2" className="nav-link text-light fw-bold">
            BLOQUE 1 Y 2
          </NavLink>
          <NavLink to="/admin/bloque6" className="nav-link text-light fw-bold">
            BLOQUE 6
          </NavLink>
        </div>

        {/* Botón de cerrar sesión */}
        <button onClick={handleLogout} className="btn btn-outline-light">
          <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
        </button>
      </div>

      {/* Espacio para renderizar los componentes según la ruta */}
      <div className="container-fluid p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
