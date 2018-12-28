import React from "react";
import { Link } from "react-router-dom";

import { UsuarioService } from  "@intechprev/prevsystem-service";

import { Row, Col } from "../components";
import Rotas from './saofrancisco/Rotas';

export default class Page extends React.Component {

    async componentWillMount() {
        console.log(process.env.PUBLIC_URL);
        try {
            var token = await localStorage.getItem("token");
            if(token) {
                await UsuarioService.VerificarLogin();
            } else {
                localStorage.removeItem("token");
                this.props.history.push("/login");
            }
            
        } catch(err) {
            if(err.message.indexOf("401") > -1)
            {
                localStorage.removeItem("token");
                this.props.history.push("/login");
            }
        }
        
    }

    getRota() {
        var rota = window.location.pathname;
        for(var i = 0; i < Rotas.length; i++) {
            if(rota === Rotas[i].caminho)
                return Rotas[i].componente();
        }
    }

    logout() {
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }

    render() {
        var Title = () => {
            var rota = this.props.history.location.pathname;
            
            var titulo = "";

            for(var i = 0; i < Rotas.length; i++) {
                if(rota === Rotas[i].caminho) {
                    titulo = <h2 id="titulo">{Rotas[i].titulo}</h2>;
                }
            }

            return titulo;
        };

        return (
            <div className="wrapper">
                <nav className="navbar-default nav-open">
                    <ul>
                        <li className="navbar-header">
                            <img src="imagens/logo.png" alt="logo" />
                        </li>
                        {
                            Rotas.map((rota, index) => {
                                var link = rota.caminhoLink ? rota.caminhoLink : rota.caminho;

                                if(rota.mostrarMenu) {
                                    return (
                                        <li key={index} id={rota.id}>
                                            <Link to={link}>
                                                <i className={rota.icone}></i>
                                                {rota.titulo}
                                            </Link>
                                        </li>
                                    );
                                }
                                else return "";
                            })
                        }
                        <li>
                            <a href="." onClick={this.logout}>
                                <i className="fas fa-sign-out-alt"></i>
                                Sair
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="page-wrapper nav-open">
                    <Row className="page-heading">
                        <Col>
                            <button className="btn btn-primary btn-menu" onClick={this.toggleMenu}>
                                <i className="fa fa-list"></i>
                            </button>

                            <Title />
                        </Col>
                    </Row>

                    <div className="wrapper-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
