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
            titulo: "Detalhes do Plano",
            icone: "fas fa-list",
            caminho: "/planos/:plano",
            componente: (routeProps) => <PlanoDetalhes {...routeProps} />,
            mostrarMenu: true, 
            exact: true
        },
        {
            titulo: "Contracheque",
            icone: "fas fa-closed-captioning",
            caminho: "/contracheque",
            componente: (routeProps) => <Contracheque {...routeProps} />,
            mostrarMenu: true,
            exact: true
        },
        {
            titulo: "Inf. Rendimentos",
            icone: "fas fa-chart-pie",
            caminho: "/infoRend",
            componente: (routeProps) => <InformeRendimentos {...routeProps} />,
            mostrarMenu: true,
            exact: true
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
            mostrarMenu: true
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