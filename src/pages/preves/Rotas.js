import React from 'react';

import {
    Home, DadosPessoais, Planos, Documentos, Mensagens, TrocarSenha, ControleFuncionalidades, DetalhesPlano, MensagemNova,
    Contracheque, ContrachequeDetalhe, InformeRendimentos
} from "../";

export default function GetRotas() {
    const rotas = [
        {
            titulo: "Home",
            icone: "fas fa-home",
            caminho: "/",
            componente: () => <Home />,
            mostrarMenu: true,
            exact: true
        },
        {
            titulo: "Dados Pessoais",
            icone: "fas fa-user",
            caminho: "/dados",
            componente: () => <DadosPessoais />,
            mostrarMenu: true
        },
        {
            titulo: "Planos",
            icone: "fas fa-list",
            caminho: "/planos",
            componente: () => <Planos />, 
            mostrarMenu: true, 
            exact: true
        },
        {
            titulo: "Contracheque",
            icone: "fas fa-closed-captioning",
            caminho: "/contracheque",
            componente: () => <Contracheque />,
            mostrarMenu: true,
            exact: true
        },
        {
            titulo: "Inf. Rendimentos",
            icone: "fas fa-chart-pie",
            caminho: "/infoRend",
            componente: () => <InformeRendimentos />,
            mostrarMenu: true,
            exact: true
        },
        {
            titulo: "Contracheque Detalhe",
            icone: "fas fa-closed-captioning",
            caminho: "/contracheque/:plano/:data",
            componente: (routeProps) => <ContrachequeDetalhe routeProps={routeProps} />
        },
        {
            titulo: "Documentos",
            icone: "fas fa-file",
            caminho: "/documentos/:pasta?",
            caminhoLink: "/documentos",
            componente: (routeProps) => <Documentos routeProps={routeProps} />,
            mostrarMenu: true
        },
        {
            titulo: "Mensagens",
            icone: "fas fa-envelope",
            caminho: "/mensagens",
            componente: (routeProps) => <Mensagens routeProps={routeProps} />,
            mostrarMenu: true
        },
        {
            titulo: "Trocar senha",
            icone: "fas fa-lock",
            caminho: "/trocarSenha",
            componente: () => <TrocarSenha />,
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
            titulo: "Detalhes do Plano",
            icone: "",
            caminho: "/planos/:plano",
            componente: (routeProps) => <DetalhesPlano routeProps={routeProps} />
        },
        {
            titulo: "Nova Mensagem",
            icone: "",
            caminho: "/mensagem/nova",
            componente: (routeProps) => <MensagemNova routeProps={routeProps} />,
            exact: true
        }
    ];

    return rotas;
} 
