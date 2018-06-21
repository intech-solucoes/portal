import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";

import { UsuarioService } from  "prevsystem-service";

import { Home, Planos, Documentos, Mensagens, TrocarSenha, ControleFuncionalidades, ListarParticipantes } from ".";

const config = require("../config.json");

const usuarioService = new UsuarioService(config);

const rotas = [
    { titulo: "Home",                   icone: "fas fa-home",               caminho: "/",                          componente: () => <Home />,                      exact: true },
    { titulo: "Planos",                 icone: "fas fa-list",               caminho: "/planos",                    componente: () => <Planos /> },
    { titulo: "Documentos",             icone: "fas fa-file",               caminho: "/documentos",                componente: () => <Documentos /> },
    { titulo: "Mensagens",              icone: "fas fa-envelope",           caminho: "/mensagens",                 componente: () => <Mensagens />,                 exact: true },
    { titulo: "Trocar senha",           icone: "fas fa-lock",               caminho: "/trocarSenha",               componente: () => <TrocarSenha /> },
    { titulo: "Painel de Controle",     icone: "fas fa-cogs",               caminho: "/controleFuncionalidades",   componente: () => <ControleFuncionalidades /> },
    { titulo: "Listar Participantes",   icone: "fas fa-users",              caminho: "/listarParticipantes",       componente: () => <ListarParticipantes /> }
];

export default class MasterPage extends React.Component {
    getTitle() {
        var rota = window.location.pathname;
        for(var i = 0; i < rotas.length; i++) {
            if(rota === rotas[i].caminho) {
                return(<h2>{rotas[i].titulo}</h2>);
            }
        }
    }

    componentWillMount() {
        usuarioService.VerificarLogin()
            .then(() => {})
            .catch((err) => {
                if(err.message.indexOf("401") > -1)
                {
                    localStorage.removeItem("token");
                    document.location = ".";
                }
            });
    }

    getRota() {
        var rota = window.location.pathname;
        for(var i = 0; i < rotas.length; i++) {
            if(rota === rotas[i].caminho)
                return rotas[i].componente();
        }
    }

    logout() {
        localStorage.removeItem("token");
    }

    render() {
        const Menu = () => (
            <ul>
                <li className="navbar-header">
                    <img src="./imagens/preves/logo.png" alt="Preves" />
                </li>
                {
                    rotas.map((rota, index) => (
                        <li key={index}>
                            <a href={rota.caminho}>
                                <i className={rota.icone}></i>
                                {rota.titulo}
                            </a>
                        </li>
                    ))
                }
                <li>
                    <a href="." onClick={this.logout}>
                        <i className="fas fa-sign-out-alt"></i>
                        Sair
                    </a>
                </li>
            </ul>
        );

        const Rotas = () => (
            <Router>
                <div id="route">
                    { rotas.map((rota, index) => <Route key={index} exact={rota.exact} path={rota.caminho} component={rota.componente} />) }
                    <Route path="/planos/:plano" component={DetalhesPlano} />
                    <Route path="/mensagem/enviar" component={MensagemNova} />
                </div>
    		</Router>
        );

        return (
            <div className="wrapper">
                <nav className="navbar-default nav-open">
                    <Menu />
                </nav>

                <div className="page-wrapper nav-open">
                    <div className="row page-heading">
                        <div className="col-sm-12">
                            {this.getTitle()}
                        </div>
                    </div>

                    <div className="wrapper-content">
                        <Rotas />
                    </div>
                </div>
            </div>
        )
    }
}
