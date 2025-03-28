import React, { useState } from "react";
import HookData from '../../sistema/hookData/HookData';
import VistaConsultarErrores from '../componentes/vistas/ConsultarErrores/VistaConsultarErrores';
import VistaPrincipales from '../componentes/vistas/bloqueSeis/VistaPrincipales';
import VistaHuella from '../componentes/vistas/bloqueDos/VistaHuella';
import VistaConsultarErrores2 from '../componentes/vistas/ConsultarErrores/VistaConsultarErrores2';

const MenuVerificacion6_2 = () => {
  const [ activeTab, setActiveTab ] = useState( "bformularioseis" );
  const [ subTab, setSubTab ] = useState( "subform1" );

  const [ initialData, setInitialData ] = useState( null );
  const [ formData, setBloqueUnoinicio ] = HookData( initialData );

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Menú lateral */ }
        <div className="col-md-0">
          <div className="nav flex-column nav-pills bg-dark p-3 shadow-sm">
            <h5 className="text-center mb-3 text-white">DALIA</h5>
            <button
              className={ `nav-link ${ activeTab === "bformularioseis" ? "active" : "" }` }
              onClick={ () => setActiveTab( "bformularioseis" ) }
            >
              Bloque 6
            </button>

            {/* Subpestañas dentro de "B Formulario Uno" */ }
            

            {/* Subpestañas dentro de "B Formulario Seis" */ }
            { activeTab === "bformularioseis" && (
              <div className="ms-3">
                <button
                  className={ `nav-link ${ subTab === "subform1" ? "active" : "" }` }
                  onClick={ () => setSubTab( "subform1" ) }
                >
                  ➜ Principales
                </button>
                <button
                  className={ `nav-link ${ subTab === "subform2" ? "active" : "" }` }
                  onClick={ () => setSubTab( "subform2" ) }
                >
                  ➜ Huellas
                </button>
              </div>
            ) }

            <hr />
            <button
              className={ `nav-link ${ activeTab === "terminar" ? "active" : "" }` }
              onClick={ () => setActiveTab( "terminar" ) }
            >
              Consultar Errores
            </button>
            {/*<button
              className={ `nav-link ${ activeTab === "finalizar" ? "active" : "" }` }
              onClick={ () => setActiveTab( "finalizar" ) }
            >
              Finalizar
            </button>*/}
          </div>
        </div>

        {/* Contenido dinámico */ }
        <div className="col-md-9">
          <div className="tab-content p-3 bg-white rounded shadow-sm">
            
            { activeTab === "bformularioseis" && (
              <>
                { subTab === "subform1" && <div><VistaPrincipales data={ formData } onFormChange={ setBloqueUnoinicio } /></div> }
                { subTab === "subform2" && <div><VistaHuella data={ formData } onFormChange={ setBloqueUnoinicio } /></div> }
              </>
            ) }

            { activeTab === "terminar" && <div><VistaConsultarErrores data={ formData } onFormChange={ setBloqueUnoinicio } /></div> }
            {/*{ activeTab === "finalizar" && <div><h4>Finalizar</h4></div> }*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuVerificacion6_2;
