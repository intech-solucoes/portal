import React from "react";
import { Link } from "react-router-dom";

import { FuncionarioService } from  "@intechprev/prevsystem-service";

import { Row, Col } from "../components";
import Rotas from './saofrancisco/Rotas';

export default class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nomeUsuario: "Teste"
        }
    }

    async componentWillMount() {
        try {
            var token = await localStorage.getItem("token");

            if(token) {
                var { data: dados } = await FuncionarioService.Buscar();
                var nomeUsuario = dados.funcionario.NOME_ENTID;
                var admin = dados.usuario.IND_ADMINISTRADOR === "S";

                await this.setState({
                    nomeUsuario,
                    admin
                });
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
                        
                        <Col tamanho={"sm-4"} className={"text-right user-icon"}>
                            <Row>
                                <Col className={"nome-usuario"}>
                                    {this.state.nomeUsuario}
                                </Col>

                                {this.state.admin &&
                                    <Col tamanho={"4"}>
                                        <Link to={"/listarParticipantes"} className={"icon"}>
                                            <i className={"fas fa-user-friends"}></i>
                                        </Link>&nbsp;
                                        <Link to={"/admin/login"} className={"icon"}>
                                            <i className={"fas fa-lock"}></i>
                                        </Link>
                                    </Col>
                                }
                            </Row>
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
