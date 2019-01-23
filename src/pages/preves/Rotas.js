import React from 'react';

import {
    Home, DadosPessoais, Planos, Documentos, Mensagens, TrocarSenha, PlanoDetalhes, MensagemNova,
    Contracheque, ContrachequeDetalhe, InformeRendimentos,
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
            titulo: "Contracheque",
            icone: "fas fa-closed-captioning",
            caminho: "/contracheque",
            componente: (routeProps) => <Contracheque {...routeProps} />,
            mostrarMenu: true,
            exact: true,
            id: "contracheque"
        },
        {
            titulo: "Inf. Rendimentos",
            icone: "fas fa-chart-pie",
            caminho: "/infoRend",
            componente: (routeProps) => <InformeRendimentos {...routeProps} />,
            mostrarMenu: true,
            exact: true,
            id: "informeRendimentos"
        },
        {
            titulo: "Contracheque Detalhe",
            icone: "fas fa-closed-captioning",
            caminho: "/contracheque/:plano/:data",
            componente: (routeProps) => <ContrachequeDetalhe {...routeProps} />
        },
        {
            titulo: "Documentos",
            icone: "fas fa-file",
            caminho: "/documentos/:pasta?",
            caminhoLink: "/documentos",
            componente: (routeProps) => <Documentos {...routeProps} />,
            mostrarMenu: true,
            id: "documentos"
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
        // {
        //     titulo: "Painel de Controle",
        //     icone: "fas fa-cogs",
        //     caminho: "/controleFuncionalidades",
        //     componente: () => <ControleFuncionalidades />,
        //     mostrarMenu: true
        // },
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
            mostrarMenu: false,
            exact: false,
            id: "listarParticipantes"
        }
    ];

    return rotas;
} 


export default GetRotas();