import React from 'react';

import {
    Home, DadosPessoais, Planos, PlanoDetalhes, Mensagens, TrocarSenha, MensagemNova,
    Login, EsqueciSenha, 
    LoginAdmin, ListarParticipantes
} from "../";

function GetRotas() {
    const rotas = [
        {
            titulo: "Home",
            icone: "fas fa-home",
            caminho: "/",
            componente: (routeProps) => <Home {...routeProps} />,
            mostrarMenu: true,
            exact: true,
            id: "home"
        },
        {
            titulo: "Dados Pessoais",
            icone: "fas fa-user",
            caminho: "/dados",
            componente: (routeProps) => <DadosPessoais {...routeProps} />,
            mostrarMenu: true,
            id: "dadosPessoais"
        },
        {
            titulo: "Planos",
            icone: "fas fa-list",
            caminho: "/planos",
            componente: (routeProps) => <Planos {...routeProps} />, 
            mostrarMenu: true, 
            exact: true,
            id: "planos"
        },
        {
            titulo: "Detalhes do Plano",
            icone: "fas fa-list",
            caminho: "/planos/:plano",
            componente: (routeProps) => <PlanoDetalhes {...routeProps} />,
            mostrarMenu: false, 
            exact: true
        },
        {
            titulo: "Mensagens",
            icone: "fas fa-envelope",
            caminho: "/mensagens",
            componente: (routeProps) => <Mensagens {...routeProps} />,
            mostrarMenu: true,
            id: "mensagens"
        },
        {
            titulo: "Trocar senha",
            icone: "fas fa-lock",
            caminho: "/trocarSenha",
            componente: (routeProps) => <TrocarSenha {...routeProps} />,
            mostrarMenu: true,
            id: "trocarSenha"
        },
        {
            titulo: "Nova Mensagem",
            icone: "",
            caminho: "/mensagem/nova",
            componente: (routeProps) => <MensagemNova {...routeProps} />,
            exact: true,
            id: "novaMensagem"
        },
        {
            titulo: "Login",
            caminho: "/login",
            componente: (routeProps) => <Login {...routeProps} />,
            mostrarMenu: false,
            exact: false,
            id: "login"
        },
        {
            titulo: "Esqueci Minha Senha",
            caminho: "/esqueciSenha",
            componente: (routeProps) => <EsqueciSenha {...routeProps} />,
            mostrarMenu: false,
            exact: false,
            id: "esqueciSenha"
        },
        {
            titulo: "Listar Participantes",
            caminho: "/listarParticipantes",
            componente: (routeProps) => <ListarParticipantes {...routeProps} />,
            id: "listarParticipantes",
            mostrarMenu: false,
            exact: false,
            id: "listarParticipantes"
        },
        {
            titulo: "Login",
            caminho: "/admin/login",
            componente: (routeProps) => <LoginAdmin {...routeProps} />,
            mostrarMenu: false,
            mostrarMenuAdmin: true,
            exact: true
        }
    ];

    return rotas;
} 

export default GetRotas();