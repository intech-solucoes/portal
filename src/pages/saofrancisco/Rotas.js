import React from 'react';

import {
    Home, DadosPessoais, Planos, Mensagens, TrocarSenha, DetalhesPlano, MensagemNova,
    Login, EsqueciSenha, ListarParticipantes
} from "../";

function GetRotas() {
    const rotas = [
        {
            titulo: "Home",
            icone: "fas fa-home",
            caminho: "/",
            componente: (routeProps) => <Home {...routeProps} />,
            mostrarMenu: true,
            exact: true
        },
        {
            titulo: "Dados Pessoais",
            icone: "fas fa-user",
            caminho: "/dados",
            componente: (routeProps) => <DadosPessoais {...routeProps} />,
            mostrarMenu: true
        },
        {
            titulo: "Planos",
            icone: "fas fa-list",
            caminho: "/planos",
            componente: (routeProps) => <Planos {...routeProps} />, 
            mostrarMenu: true, 
            exact: true
        },
        {
            titulo: "Mensagens",
            icone: "fas fa-envelope",
            caminho: "/mensagens",
            componente: (routeProps) => <Mensagens {...routeProps} />,
            mostrarMenu: true
        },
        {
            titulo: "Trocar senha",
            icone: "fas fa-lock",
            caminho: "/trocarSenha",
            componente: (routeProps) => <TrocarSenha {...routeProps} />,
            mostrarMenu: true
        },
        {
            titulo: "Nova Mensagem",
            icone: "",
            caminho: "/mensagem/nova",
            componente: (routeProps) => <MensagemNova {...routeProps} />,
            exact: true
        },
        {
            titulo: "Login",
            caminho: "/login",
            componente: (routeProps) => <Login {...routeProps} />,
            mostrarMenu: false,
            exact: false
        },
        {
            titulo: "Esqueci Minha Senha",
            caminho: "/esqueciSenha",
            componente: (routeProps) => <EsqueciSenha {...routeProps} />,
            mostrarMenu: false,
            exact: false
        },
        {
            titulo: "Listar Participantes",
            caminho: "/listarParticipantes",
            componente: (routeProps) => <ListarParticipantes {...routeProps} />,
            mostrarMenu: false,
            exact: false
        }
    ];

    return rotas;
} 

export default GetRotas();