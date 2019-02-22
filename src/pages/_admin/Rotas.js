import React from 'react';

import {
    Home,
    Documentos
} from "./";

function GetRotas() {
    const rotas = [
        {
            titulo: "Home",
            icone: "fas fa-home",
            caminho: "/admin",
            componente: (routeProps) => <Home {...routeProps} />,
            mostrarMenu: true,
            exact: true,
            id: "home"
        },
        {
            titulo: "Documentos",
            icone: "fas fa-file",
            caminho: "/admin/documentos/:pasta?",
            caminhoLink: "/admin/documentos/",
            componente: (routeProps) => <Documentos {...routeProps} />,
            mostrarMenu: true,
            id: "documentos"
        }
    ];

    return rotas;
} 


export default GetRotas();