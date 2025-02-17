import React, { useState } from "react";
import HookData from '../../sistema/hookData/HookData';
import VistaDatosGeneralesP1 from '../../sistemaAdmin/componentes/vistas/bloqueUno/VistaDatosGeneralesP1';

const Bloque2 = () => {
  const [activeTab, setActiveTab] = useState("bformulariouno");
  const [subTab, setSubTab] = useState("subform1");

  const [initialData, setInitialData] = useState(null);
  const [formData, setBloqueUnoinicio] = HookData(initialData);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Menú lateral */}
        <div className="col-md-0">
          <div className="nav flex-column nav-pills bg-secondary p-3 rounded shadow-sm">
            <h5 className="text-center mb-3 text-white">Dalia</h5>

            {/* Opción principal */}
            <button
              className={`nav-link ${activeTab === "bformulariouno" ? "active" : ""}`}
              onClick={() => setActiveTab("bformulariouno")}
            >
              Bloque 1
            </button>

            {/* Subpestañas dentro de "B Formulario Uno" */}
            {activeTab === "bformulariouno" && (
              <div className="ms-3">
                <button
                  className={`nav-link ${subTab === "subform1" ? "active" : ""}`}
                  onClick={() => setSubTab("subform1")}
                >
                  ➜ Datos Generales PT1
                </button>
                <button
                  className={`nav-link ${subTab === "subform2" ? "active" : ""}`}
                  onClick={() => setSubTab("subform2")}
                >
                  ➜ Datos Generales PT2
                </button>
                <button
                  className={`nav-link ${subTab === "subform3" ? "active" : ""}`}
                  onClick={() => setSubTab("subform3")}
                >
                  ➜ Formulario 3
                </button>
              </div>
            )}

            <hr />
            <button
              className={`nav-link ${activeTab === "terminar" ? "active" : ""}`}
              onClick={() => setActiveTab("terminar")}
            >
              Consultar Errores
            </button>
            <button
              className={`nav-link ${activeTab === "finalizar" ? "active" : ""}`}
              onClick={() => setActiveTab("finalizar")}
            >
              Finalizar
            </button>
          </div>
        </div>

        {/* Contenido dinámico */}
        <div className="col-md-9">
          <div className="tab-content p-3 bg-white rounded shadow-sm">
            {activeTab === "bformulariouno" && (
              <>
                {subTab === "subform1" && <div><VistaDatosGeneralesP1 data={formData} onFormChange={setBloqueUnoinicio} /></div>}
                {subTab === "subform2" && <div><h4>Formulario 2</h4><p>Contenido del Formulario 2.</p></div>}
                {subTab === "subform3" && <div><h4>Formulario 3</h4><p>Contenido del Formulario 3.</p></div>}
              </>
            )}

            {activeTab === "terminar" && <div><h4>Consultar Errores</h4></div>}
            {activeTab === "finalizar" && <div><h4>Finalizar</h4></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bloque2;
