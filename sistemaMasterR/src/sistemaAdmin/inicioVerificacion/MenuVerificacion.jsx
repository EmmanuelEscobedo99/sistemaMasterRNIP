import React, { useState } from "react";
import HookData from '../../sistema/hookData/HookData';
import VistaDatosGeneralesP1 from '../../sistemaAdmin/componentes/vistas/bloqueUno/VistaDatosGeneralesP1';
import VistaDatosGeneralesP2 from '../componentes/vistas/bloqueUno/VistaDatosGeneralesP2';
import VistaConsultarErrores from '../componentes/vistas/ConsultarErrores/VistaConsultarErrores';
import VistaNombres from '../componentes/vistas/bloqueUno/VistaNombres';
import VistaAlias from '../componentes/vistas/bloqueUno/VistaAlias';
import VistaDomicilio from '../componentes/vistas/bloqueUno/VistaDomicilio';
import VistaSituacion from '../componentes/vistas/bloqueDos/VistaSituacion';
import VistaJuridicos from '../componentes/vistas/bloqueDos/VistaJuridicos';
import VistaJuridicosP2 from '../componentes/vistas/bloqueDos/VistaJuridicosP2';
import VistaEjecucion from '../componentes/vistas/bloqueDos/VistaEjecucion';
import VistaEjecucionP2 from '../componentes/vistas/bloqueDos/VistaEjecucionP2';
import VistaODelito from '../componentes/vistas/bloqueDos/VistaODelito';
import VistaIngresos from '../componentes/vistas/bloqueDos/VistaIngresos';
import VistaIngresosP2 from '../componentes/vistas/bloqueDos/VistaIngresosP2';
import VistaIngdelito from '../componentes/vistas/bloqueDos/VistaIngdelito';
import VistaPrincipales from '../componentes/vistas/bloqueSeis/VistaPrincipales';
import VistaHuella from '../componentes/vistas/bloqueDos/VistaHuella';

const Bloque2 = () => {
  const [ activeTab, setActiveTab ] = useState( "bformulariouno" );
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

            {/* Opción principal */ }
            <button
              className={ `nav-link ${ activeTab === "bformulariouno" ? "active" : "" }` }
              onClick={ () => setActiveTab( "bformulariouno" ) }
            >
              Bloque 1
            </button>
            <button
              className={ `nav-link ${ activeTab === "bformulariodos" ? "active" : "" }` }
              onClick={ () => setActiveTab( "bformulariodos" ) }
            >
              Bloque 2
            </button>
            <button
              className={ `nav-link ${ activeTab === "bformularioseis" ? "active" : "" }` }
              onClick={ () => setActiveTab( "bformularioseis" ) }
            >
              Bloque 6
            </button>

            {/* Subpestañas dentro de "B Formulario Uno" */ }
            { activeTab === "bformulariouno" && (
              <div className="ms-3">
                <button
                  className={ `nav-link ${ subTab === "subform1" ? "active" : "" }` }
                  onClick={ () => setSubTab( "subform1" ) }
                >
                  ➜ Datos Generales PT1
                </button>
                <button
                  className={ `nav-link ${ subTab === "subform2" ? "active" : "" }` }
                  onClick={ () => setSubTab( "subform2" ) }
                >
                  ➜ Datos Generales PT2
                </button>
                <button
                  className={ `nav-link ${ subTab === "subform3" ? "active" : "" }` }
                  onClick={ () => setSubTab( "subform3" ) }
                >
                  ➜ Nombres
                </button>
                <button
                  className={ `nav-link ${ subTab === "subform4" ? "active" : "" }` }
                  onClick={ () => setSubTab( "subform4" ) }
                >
                  ➜ Alias
                </button>
                <button
                  className={ `nav-link ${ subTab === "subform5" ? "active" : "" }` }
                  onClick={ () => setSubTab( "subform5" ) }
                >
                  ➜ Domicilio
                </button>
              </div>
            ) }

            {/* Subpestañas dentro de "B Formulario Dos" */ }
            { activeTab === "bformulariodos" && (
              <div className="ms-3">
                <button
                  className={ `nav-link ${ subTab === "subform1" ? "active" : "" }` }
                  onClick={ () => setSubTab( "subform1" ) }
                >
                  ➜ Situación
                </button>
                <button
                  className={ `nav-link ${ subTab === "subform2" ? "active" : "" }` }
                  onClick={ () => setSubTab( "subform2" ) }
                >
                  ➜ Juridicos PT1
                </button>
                <button
                  className={ `nav-link ${ subTab === "subform3" ? "active" : "" }` }
                  onClick={ () => setSubTab( "subform3" ) }
                >
                  ➜ Juridicos PT2
                </button>
                <button
                  className={ `nav-link ${ subTab === "subform4" ? "active" : "" }` }
                  onClick={ () => setSubTab( "subform4" ) }
                >
                  ➜ Ejecución PT1
                </button>
                <button
                  className={ `nav-link ${ subTab === "subform5" ? "active" : "" }` }
                  onClick={ () => setSubTab( "subform5" ) }
                >
                  ➜ Ejecución PT2
                </button>
                <button
                  className={ `nav-link ${ subTab === "subform6" ? "active" : "" }` }
                  onClick={ () => setSubTab( "subform6" ) }
                >
                  ➜ ODelito
                </button>
                <button
                  className={ `nav-link ${ subTab === "subform7" ? "active" : "" }` }
                  onClick={ () => setSubTab( "subform7" ) }
                > 
                  ➜ Ingresos PT1
                </button>
                <button
                  className={ `nav-link ${ subTab === "subform8" ? "active" : "" }` }
                  onClick={ () => setSubTab( "subform8" ) }
                >
                  ➜ Ingresos PT2
                </button>
                <button
                  className={ `nav-link ${ subTab === "subform9" ? "active" : "" }` }
                  onClick={ () => setSubTab( "subform9" ) }
                >
                  ➜ Ingdelito
                </button>
              </div>
            ) }

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
            { activeTab === "bformulariouno" && (
              <>
                { subTab === "subform1" && <div><VistaDatosGeneralesP1 data={ formData } onFormChange={ setBloqueUnoinicio } /></div> }
                { subTab === "subform2" && <div><VistaDatosGeneralesP2 data={ formData } onFormChange={ setBloqueUnoinicio } /></div> }
                { subTab === "subform3" && <div><VistaNombres data={ formData } onFormChange={ setBloqueUnoinicio } /></div> }
                { subTab === "subform4" && <div><VistaAlias data={ formData } onFormChange={ setBloqueUnoinicio } /></div> }
                { subTab === "subform5" && <div><VistaDomicilio data={ formData } onFormChange={ setBloqueUnoinicio } /></div> }
              </>
            ) }
            { activeTab === "bformulariodos" && (
              <>
                { subTab === "subform1" && <div><VistaSituacion data={ formData } onFormChange={ setBloqueUnoinicio } /></div> }
                { subTab === "subform2" && <div><VistaJuridicos data={ formData } onFormChange={ setBloqueUnoinicio } /></div> }
                { subTab === "subform3" && <div><VistaJuridicosP2 data={ formData } onFormChange={ setBloqueUnoinicio } /></div> }
                { subTab === "subform4" && <div><VistaEjecucion data={ formData } onFormChange={ setBloqueUnoinicio } /></div> }
                { subTab === "subform5" && <div><VistaEjecucionP2 data={ formData } onFormChange={ setBloqueUnoinicio } /></div> }
                { subTab === "subform6" && <div><VistaODelito data={ formData } onFormChange={ setBloqueUnoinicio } /></div> }
                { subTab === "subform7" && <div><VistaIngresos data={ formData } onFormChange={ setBloqueUnoinicio } /></div> }
                { subTab === "subform8" && <div><VistaIngresosP2 data={ formData } onFormChange={ setBloqueUnoinicio } /></div> }
                { subTab === "subform9" && <div><VistaIngdelito data={ formData } onFormChange={ setBloqueUnoinicio } /></div> }
              </>
            ) }
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

export default Bloque2;
