import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Login } from "../accesoLogin/paginas/Login";
import OpenCapturista from "../layOut/paginas/capturista/OpenCapturista";
import OpenAdmin from "../layOut/paginas/admin/OpenAdmin";
import ProtectedRoute from "../router/ProtectedRoute";
import Bloque1y2 from "../layOut/paginas/admin/Bloque1y2";
import Bloque6 from "../layOut/paginas/admin/Bloque6";
import MenuVerificacion from "../sistemaAdmin/inicioVerificacion/MenuVerificacion";
import MenuVerificacion2 from "../sistemaAdmin/inicioVerificacion/MenuVerificacion2";
import MenuVerificacion6 from "../sistemaAdmin/inicioVerificacion/MenuVerificacion6";
import MenuRegistro from "../sistema/inicioRegistro/MenuRegistro";
import TablaDatos from "../sistema/componentes/TablaDatos/TablaDatos";
import SeleccionarForm from "../sistema/pages/ProcesoImagenes/UrlFormPages/SeleccionarForm";
import OpenAdmin2 from '../layOut/paginas/admin2/OpenAdmin2';
import Bloque1y2_2 from '../layOut/paginas/admin2/Bloque1y2_2';
import Bloque6_2 from '../layOut/paginas/admin2/Bloque6_2';
import MenuVerificacion6_2 from '../sistemaAdmin/inicioVerificacion/MenuVerificacion6_2';
import B6Rechazados from '../sistema/componentes/B6rechazados/B6Rechazados';
import MostrarPrincipales from '../sistemaAdmin/componentes/bloqueSeis/MostrarPrincipales';
import SeleccionarFormMostrar from '../sistema/pages/ProcesoImagenes/UrlFormPages/SeleccionarFormMostrar';
import B12Rechazados from '../sistema/componentes/B12rechazados/B12Rechazados';
import Rechazadosmexico from '../sistema/componentes/Rechazadosmexico/Rechazadosmexico'; // ✅ Nueva importación
import Errorestecnicos from '../sistema/componentes/Errorestecnicos/Errorestecnicos'; // ✅ Nueva importación

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/capturista",
    element: <ProtectedRoute allowedRoles={["capturista"]} />,
    children: [
      {
        path: "",
        element: <OpenCapturista />,
        children: [
          {
            path: "registro",
            element: <MenuRegistro />,
          },
          {
            path: "tabladatos",
            element: <TablaDatos />,
          },
          {
            path: "b6rechazados",
            element: <B6Rechazados />,
          },
          {
            path: "b12rechazados",
            element: <B12Rechazados />,
          },
          {
            path: "rechazadosmexico", // ✅ Nueva ruta
            element: <Rechazadosmexico />,
          },
          {
            path: "errorestecnicos", // ✅ Nueva ruta
            element: <Errorestecnicos />,
          },
          {
            path: "formpaginas",
            element: <SeleccionarForm />,
          },
          {
            path: "mostrarimagenes",
            element: <SeleccionarFormMostrar />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
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
  {
    path: "/admin2",
    element: <ProtectedRoute allowedRoles={["admin2"]} />,
    children: [
      {
        path: "",
        element: <OpenAdmin2 />,
        children: [
          {
            path: "bloque1y2_2",
            element: <Bloque1y2_2 />,
          },
          {
            path: "bloque6_2",
            element: <Bloque6_2 />,
          },
          {
            path: "verificar2",
            element: <MenuVerificacion2 />,
          },
          {
            path: "verificar6_2",
            element: <MenuVerificacion6_2 />,
          },
        ],
      },
    ],
  },
]);
