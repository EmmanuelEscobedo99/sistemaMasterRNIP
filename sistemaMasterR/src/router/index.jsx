import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Login } from '../accesoLogin/paginas/Login';
import OpenCapturista from '../layOut/paginas/capturista/OpenCapturista';
import OpenAdmin from '../layOut/paginas/admin/OpenAdmin';
import ProtectedRoute from '../router/ProtectedRoute';
import MenuVerificacion from '../sistemaAdmin/inicioVerificacion/MenuVerificacion';

//import InicioTabla from      '../sistema/paginas/ProcesoRegistro/Tabla/InicioTabla';
//import MenuModificacion from '../sistema/paginas/MenuBloques/MenuModificacion/MenuModificacion';
//import BloqueUno from        '../sistema/paginas/ProcesoRegistro/UrlListaPaginas/Bloque1/BloqueUno'
//import Calar from            '../sistema/paginas/ProcesoRegistroBloques/calar/Calar'

//import RegistroBloques from '../sistema/paginas/Registrar/RegistroBloques'; 

import MenuRegistro from '../sistema/inicioRegistro/MenuRegistro'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
//prueba a modificar

  {
    path: '/capturista',
    element: <ProtectedRoute allowedRoles={['capturista']} />,
    children: [    

      {
        path: "",
        element: <OpenCapturista />,   /* menu principal capturista */
        children: [    
      
            
            {                    
              path: "",
            //  element: <InicioTabla />,   // 1 tabla con busqueda de registros   
         
              },  
              
              {                    
                path: "MModificacion",
            //   element: <MenuModificacion/>,  //2 inicio de modificacion despues de inicioTabla    
           
               },  

              {                    
                path: "paginas",
             //  element:<BloqueUno/>       //  3 proceso de modificacion de cada bloque            
           
               },  

             
               {                    
                path: "calar",                 // inicio del registro de bloques 1 y 2
              //  element:<Calar/>                  
           
               },         
               
               {                    
                path: "registro",                 // inicio del registro de bloques 1 y 2
                element:<MenuRegistro/>                  
           
               },     
          
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
            path: "verificar/:LLAVE",
            element:<MenuVerificacion/> 
          },
        ],
      },
    ],
  },
]);
