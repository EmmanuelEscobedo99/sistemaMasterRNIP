import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Login } from "../accesoLogin/paginas/Login";
import OpenCapturista from "../layOut/paginas/capturista/OpenCapturista";
import OpenAdmin from "../layOut/paginas/admin/OpenAdmin";
import ProtectedRoute from "../router/ProtectedRoute";
import Bloque1y2 from "../layOut/paginas/admin/Bloque1y2";
import Bloque6 from "../layOut/paginas/admin/Bloque6";
import MenuVerificacion from "../sistemaAdmin/inicioVerificacion/MenuVerificacion";
import MenuVerificacion6 from "../sistemaAdmin/inicioVerificacion/MenuVerificacion6";
import MenuRegistro from "../sistema/inicioRegistro/MenuRegistro";
import TablaDatos from "../sistema/componentes/TablaDatos/TablaDatos";
import SeleccionarForm from "../sistema/pages/ProcesoImagenes/UrlFormPages/SeleccionarForm";
import OpenAdmin2 from '../layOut/paginas/admin2/OpenAdmin2';
import Bloque1y2_2 from '../layOut/paginas/admin2/Bloque1y2_2';
import Bloque6_2 from '../layOut/paginas/admin2/Bloque6_2';

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
            element: <Navigate to="/capturista/tabladatos" replace />, // 🔹 Redirige correctamente a `tabladatos`
          },
          {
            path: "tabladatos",
            element: <TablaDatos />, // ✅ Renderiza `TablaDatos.jsx`
          },
          {
            path: "formpaginas",  // ✅ Ruta para el formulario de imágenes
            element: <SeleccionarForm />,  // ✅ Renderiza `SeleccionarForm.jsx`
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
