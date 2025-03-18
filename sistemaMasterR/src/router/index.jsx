import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Login } from '../accesoLogin/paginas/Login';
import OpenCapturista from '../layOut/paginas/capturista/OpenCapturista';
import OpenAdmin from '../layOut/paginas/admin/OpenAdmin';
import ProtectedRoute from '../router/ProtectedRoute';
import Bloque1y2 from '../layOut/paginas/admin/Bloque1y2';
import Bloque6 from '../layOut/paginas/admin/Bloque6';
import MenuVerificacion from '../sistemaAdmin/inicioVerificacion/MenuVerificacion';
import MenuVerificacion6 from '../sistemaAdmin/inicioVerificacion/MenuVerificacion6';
import MenuRegistro from '../sistema/inicioRegistro/MenuRegistro';
import TablaDatos from "../sistema/componentes/TablaDatos/TablaDatos";
import { SeleccionarForm } from '../sistema/pages/ProcesoImagenes/UrlFormPages/SeleccionarForm';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/capturista',
    element: <ProtectedRoute allowedRoles={['capturista']} />,
    children: [
      {
        path: "",
        element: <OpenCapturista />,
        children: [
          {
            path: "MModificacion",
            // element: <MenuModificacion />, // Inicio de modificación
          },
          {
            path: "paginas",
            // element: <BloqueUno />, // Proceso de modificación de cada bloque
          },
          {
            path: "calar",
            // element: <Calar />, // Registro de bloques 1 y 2
          },
          {
            path: "registro",
            element: <MenuRegistro />, // Registro de bloques 1 y 2
          },
          {
            path: "incorporar-bloque-6",
            element: <Navigate to="/capturista/tabladatos" replace />, // Redirige correctamente
          },
          {
            path: "tabladatos",
            element: <TablaDatos />, // Renderiza TablaDatos
          },
          {
            path: "formPaginas",
            element: <SeleccionarForm /> // Renderiza SeleccionarForm
          }
        ],
      },
    ],
  },
  {
    path: '/admin',
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      {
        path: "",
        element: <OpenAdmin />,
        children: [
          {
            path: "bloque1y2",
            element: <Bloque1y2 />,
          },
          {
            path: "bloque6",
            element: <Bloque6 />,
          },
          {
            path: "verificar",
            element: <MenuVerificacion />,
          },
          {
            path: "verificar6",
            element: <MenuVerificacion6 />,
          },
        ],
      },
    ],
  },
]);
