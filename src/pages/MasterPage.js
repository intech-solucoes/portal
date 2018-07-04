import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";

import { UsuarioService } from  "prevsystem-service";

import { Home, DadosPessoais, Planos, Documentos, Mensagens, TrocarSenha, ControleFuncionalidades, DetalhesPlano, MensagemNova,
         Contracheque, ContrachequeDetalhe, InformeRendimentos, Recadastramento, RecadastramentoProtocolo } from ".";

const config = require("../config.json");

const usuarioService = new UsuarioService(config);

const rotas = [
    { titulo: "Home",                   icone: "fas fa-home",               caminho: "/",                          componente: () => <Home />,                                          mostrarMenu: true,     exact: true },
    { titulo: "Dados Pessoais",         icone: "fas fa-address-book",          caminho: "/dados",                     componente: () => <DadosPessoais />,                                 mostrarMenu: true },
    { titulo: "Planos",                 icone: "fas fa-list",               caminho: "/planos",                    componente: () => <Planos />,                                        mostrarMenu: true,     exact: true },
    { titulo: "Contracheque",           icone: "fas fa-closed-captioning",                 caminho: "/contracheque",              componente: () => <Contracheque />,                                  mostrarMenu: true,     exact: true },
    { titulo: "Inf. Rendimentos", icone: "fas fa-chart-pie",                 caminho: "/infoRend",              componente: () => <InformeRendimentos />,                                  mostrarMenu: true,     exact: true },
    { titulo: "Contracheque Detalhe",   icone: "fas fa-closed-captioning",                 caminho: "/contracheque/:plano/:data", componente: (routeProps) => <ContrachequeDetalhe routeProps={routeProps} /> },
    { titulo: "Recadastramento",             icone: "fas fa-edit",               caminho: "/recadastramento",                componente: () => <Recadastramento />,                                    mostrarMenu: true, exact: true },
    { titulo: "Recadastramento",             icone: "fas fa-edit",               caminho: "/recadastramentoProtocolo",                componente: () => <RecadastramentoProtocolo /> },
    { titulo: "Documentos",             icone: "fas fa-file",               caminho: "/documentos",                componente: () => <Documentos />,                                    mostrarMenu: true },
    { titulo: "Mensagens",              icone: "fas fa-envelope",           caminho: "/mensagens",                 componente: () => <Mensagens />,                                     mostrarMenu: true,     exact: true },
    { titulo: "Trocar senha",           icone: "fas fa-lock",               caminho: "/trocarSenha",               componente: () => <TrocarSenha />,                                   mostrarMenu: true },
    //{ titulo: "Painel de Controle",     icone: "fas fa-cogs",               caminho: "/controleFuncionalidades",   componente: () => <ControleFuncionalidades />,                       mostrarMenu: true },
    { titulo: "Detalhes do Plano",      icone: "",                          caminho: "/planos/:plano",             componente: (routeProps) => <DetalhesPlano routeProps={routeProps}        />},
    { titulo: "Nova Mensagem",          icone: "",                          caminho: "/mensagem/nova",             componente: (routeProps) => <MensagemNova routeProps={routeProps}         />}
];

export default class MasterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            classeMenuAberto: ""
        };

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    getTitle() {
        var rota = window.location.pathname;
        
        for(var i = 0; i < rotas.length; i++) {
            if(rota === rotas[i].caminho) {
                return(<span className="display-5">{rotas[i].titulo}</span>);
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

    toggleMenu() {
        if(this.state.classeMenuAberto === "") {
            this.setState({
                classeMenuAberto: "nav-open"
            });
        } else {
            this.setState({
                classeMenuAberto: ""
            });
        }
    }

    render() {
        const Menu = () => (
            <ul>
                <li className="navbar-header">
                    <img src="/imagens/preves/logo.png" alt="Preves" />
                </li>
                {
                    rotas.map((rota, index) => {
                        if(rota.mostrarMenu) {
                            return (
                                <li key={index}>
                                    <a href={rota.caminho}>
                                        <i className={rota.icone}></i>
                                        {rota.titulo}
                                    </a>
                                </li>
                            );
                        }
                        else return "";
                    })
                }
                <li>
                    <a href="/" onClick={this.logout}>
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
                </div>
    		</Router>
        );

        return (
            <div className="wrapper">
                <nav className={"navbar-default " + this.state.classeMenuAberto}>
                    <Menu />
                </nav>

                <div className={"page-wrapper " + this.state.classeMenuAberto}>
                    <div className="row page-heading">
                        <div className="col-sm-12">
                            <button className="btn btn-primary btn-menu" onClick={this.toggleMenu}>
                                <i class="fa fa-list"></i>
                            </button>

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
