import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";

import { UsuarioService } from  "@intechprev/prevsystem-service";

import GetRotas from './preves/Rotas';

const rotas = GetRotas();

export default class MasterPage extends React.Component {
    getTitle() {
        var rota = window.location.pathname;
        
        for(var i = 0; i < rotas.length; i++) {
            if(rota === rotas[i].caminho) {
                return(<h2 className="page-title">{rotas[i].titulo}</h2>);
            }
        }
    }

    componentWillMount() {
        if(localStorage.getItem("token")) {
            UsuarioService.VerificarLogin()
                .then(() => {})
                .catch((err) => {
                    if(err.message.indexOf("401") > -1)
                    {
                        localStorage.removeItem("token");
                        document.location = "/";
                    }
                });
        } else {
            localStorage.removeItem("token");
            document.location = "/";
        }
        
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
        document.location = "/";
    }

    render() {
        const Menu = () => (
            <ul>
                <li className="navbar-header">
                    <img src="/imagens/saofrancisco/logo.png" alt="Preves" />
                </li>
                {
                    rotas.map((rota, index) => {
                        var link = rota.caminhoLink ? rota.caminhoLink : rota.caminho;

                        if(rota.mostrarMenu) {
                            return (
                                <li key={index}>
                                    <a href={link}>
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
            <Router basename={process.env.PUBLIC_URL}>
                <div id="route">
                    { rotas.map((rota, index) => <Route key={index} exact={rota.exact} path={rota.caminho} component={rota.componente} />) }
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
                            <button className="btn btn-primary btn-menu" onClick={this.toggleMenu}>
                                <i className="fa fa-list"></i>
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
