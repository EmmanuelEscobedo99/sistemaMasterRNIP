import React, { useState, useEffect } from "react";
import "../css/estilo.css";

import HookData from "../hookData/HookData";

import VistaDatosGeneralesP1 from "../vistas/bloqueUno/VistaDatosGeneralesP1";
import VistaDatosGeneralesP2 from "../vistas/bloqueUno/VistaDatosGeneralesP2";
import VistaNombres from "../vistas/bloqueUno/VistaNombres"
import VistaAlias from "../vistas/bloqueUno/VistaAlias"
import VistaDomicilio from "../vistas/bloqueUno/VistaDomicilio"

const MenuRegistro = () => {
    const [activeItem, setActiveItem] = useState("item-1-1");
    const [initialData, setInitialData] = useState(null);
    const [formData, setBloqueUnoinicio] = HookData(initialData);



    const [nombres, setNombres] = useState("")
    const [domicilio, setDomicilio] = useState("")
    const [alias, setAlias] = useState("")

    useEffect(() => {
        console.log("Lista nombres:", nombres);
    }, [nombres]);


    useEffect(() => {
        console.log("Lista alias:", alias);
    }, [alias]);
    return (
        <>
            <div className="container">
                <div
                    className="nav flex-column nav-pills"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                >
                    <div className="titulo">
                    <p>Formulario del Bloque 1</p>
                    </div>
                    

                    <button
                        className="nav-link custom-nav-link active"
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#formulariouno"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                    >
                        Datos Generales 1ra Parte
                    </button>
                    <button
                        className="nav-link custom-nav-link"
                        id="v-pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#formulariodos"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-profile"
                        aria-selected="false"
                    >
                        Datos Generales 2da Parte
                    </button>
                    <button
                        className="nav-link custom-nav-link"
                        id="v-pills-contact-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#formulariotres"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-contact"
                        aria-selected="false"
                    >
                        nombres corregido
                    </button>
                    <button
                        className="nav-link custom-nav-link"
                        id="v-pills-disabled-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#formulariocuatro"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-disabled"
                        aria-selected="false"
                    >
                        alias corregido
                    </button>
                    
                    <button
                        className="nav-link custom-nav-link"
                        id="v-pills-disabled-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#formulariocinco"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-disabled"
                        aria-selected="false"
                    >
                        Domicilio
                    </button>



                    <div className="titulo">
                    <p>Formulario del Bloque 2</p>
                    </div>
                    

                    <button
                        className="nav-link custom-nav-link"
                        id="v-pills-b-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#bformulariouno"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                    >
                        B Formulario Uno
                    </button>
                    <button
                        className="nav-link custom-nav-link"
                        id="v-pills-b-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#bformulariodos"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-profile"
                        aria-selected="false"
                    >
                        B Formulario Dos
                    </button>
                    <button
                        className="nav-link custom-nav-link"
                        id="v-pills-b-contact-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#bformulariotres"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-contact"
                        aria-selected="false"
                    >
                        B Formulario Tres
                    </button>
                    <button
                        className="nav-link custom-nav-link"
                        id="v-pills-b-disabled-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#bformulariocuatro"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-disabled"
                        aria-selected="false"
                    >
                        B Formulario Cuatro
                    </button>

                    <button
                        className="nav-link custom-nav-link"
                        id="v-pills-b-disabled-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#bformulariocinco"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-disabled"
                        aria-selected="false"
                    >
                        B Formulario Cinco
                    </button>
                    <div className="titulo">
                    <p>Terminar</p>
                    </div>
                    

                    <button
                        className="nav-link custom-nav-link"
                        id="v-pills-b-disabled-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#terminar"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-disabled"
                        aria-selected="false"
                    >
                        Consultar errores
                    </button>

                    <button
                        className="nav-link custom-nav-link"
                        id="v-pills-b-disabled-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#boton-finalizar"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-disabled"
                        aria-selected="false"
                    >
                        Finalizar
                    </button>
                </div>
                <div className="tab-content" id="v-pills-tabContent">
                    <div
                        className="tab-pane fade show active"
                        id="formulariouno"
                        role="tabpanel"
                        aria-labelledby="v-pills-home-tab"
                        tabIndex="0"
                    >
                        <VistaDatosGeneralesP1 data={formData} onFormChange={setBloqueUnoinicio} />
                    </div>
                    <div
                        className="tab-pane fade"
                        id="formulariodos"
                        role="tabpanel"
                        aria-labelledby="v-pills-profile-tab"
                        tabIndex="0"
                    >
                        <VistaDatosGeneralesP2 data={formData} onFormChange={setBloqueUnoinicio} />
                    </div>

                    <div
                        className="tab-pane fade"
                        id="formulariotres"
                        role="tabpanel"
                        aria-labelledby="v-pills-contact-tab"
                        tabIndex="0" >
                        <VistaNombres nombres={nombres} onFormChange={setNombres} />
                    </div>


                    <div
                        className="tab-pane fade"
                        id="formulariocuatro"
                        role="tabpanel"
                        aria-labelledby="v-pills-disabled-tab"
                        tabIndex="0"
                    >
                        <VistaAlias data={alias} onFormChange={setAlias} />
                    </div>

                    <div
                        className="tab-pane fade"
                        id="formulariocinco"
                        role="tabpanel"
                        aria-labelledby="v-pills-disabled-tab"
                        tabIndex="0"
                    >
                        <VistaDomicilio domicilio={domicilio} onFormChange={setDomicilio} />
                    </div>


                    <div
                        className="tab-pane fade"
                        id="bformulariouno"
                        role="tabpanel"
                        aria-labelledby="v-pills-b-home-tab"
                        tabIndex="0"
                    >
                        B Formulario Uno
                    </div>
                    <div
                        className="tab-pane fade"
                        id="bformulariodos"
                        role="tabpanel"
                        aria-labelledby="v-pills-b-profile-tab"
                        tabIndex="0"
                    >
                        B Formulario Dos
                    </div>
                    <div
                        className="tab-pane fade"
                        id="bformulariotres"
                        role="tabpanel"
                        aria-labelledby="v-pills-b-contact-tab"
                        tabIndex="0"
                    >
                        B Formulario Tres
                    </div>
                    <div
                        className="tab-pane fade"
                        id="bformulariocuatro"
                        role="tabpanel"
                        aria-labelledby="v-pills-b-disabled-tab"
                        tabIndex="0"
                    >
                        B Formulario Cuatro
                    </div>

                    <div
                        className="tab-pane fade"
                        id="bformulariocinco"
                        role="tabpanel"
                        aria-labelledby="v-pills-b-disabled-tab"
                        tabIndex="0"
                    >
                        B Formulario Cinco
                    </div>

                    <div
                        className="tab-pane fade"
                        id="terminar"
                        role="tabpanel"
                        aria-labelledby="v-pills-b-disabled-tab"
                        tabIndex="0"
                    ></div>

                    <div
                        className="tab-pane fade"
                        id="boton-finalizar"
                        role="boton-finalizar"
                        aria-labelledby="v-pills-b-disabled-tab"
                        tabIndex="0"
                    ></div>
                </div>
            </div>
        </>
    );
};

export default MenuRegistro;
