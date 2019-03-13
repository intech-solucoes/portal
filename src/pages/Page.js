import React from "react";
import { Link } from "react-router-dom";

import { FuncionarioService, UsuarioService } from "@intechprev/prevsystem-service";

import { Row, Col } from "../components";

import Rotas from "./preves/Rotas";

const config = require("../config.json");
//const Rotas = require(`./${config.cliente}/Rotas`);
//console.log(Rotas);
//var Rotas = [];

export default class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nomeUsuario: "",
            loading: true
        }
    }

    componentWillMount = async () => {
        try {

            // Carrega as rotas aqui pq fora tava dando problema NÃO FAÇO A MINIMA IDEIA DO PQ
            //Rotas = (await import(`./${config.cliente}/Rotas`)).default;

            var token = await localStorage.getItem("token");

            if (token) {
                var { data: dados } = await FuncionarioService.Buscar();
                var nomeUsuario = dados.Funcionario.NOME_ENTID;

                var { data: admin } = await UsuarioService.VerificarAdmin();

                await this.setState({
                    nomeUsuario,
                    admin
                });
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("token-admin");
                this.props.history.push("login");
            }
        } catch (err) {
            if (err.message.indexOf("401") > -1) {
                localStorage.removeItem("token");
                localStorage.removeItem("token-admin");
                this.props.history.push("login");
            }
        }

    }

    loading = async (valor) => {
        await this.setState({
            loading: valor
        });
    }

    getRota() {
        var rota = window.location.pathname;
        for (var i = 0; i < Rotas.length; i++) {
            if (rota === Rotas[i].caminho)
                return Rotas[i].componente();
        }
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("token-admin");
        this.props.history.push("login");
    }

    render() {
        var Title = () => {
            var rota = this.props.history.location.pathname;

            var titulo = "";

            for (var i = 0; i < Rotas.length; i++) {
                if (rota === Rotas[i].caminho || rota === Rotas[i].caminhoLink || rota.includes(Rotas[i].caminhoLink)) {
                    titulo = <h2 id="titulo">{Rotas[i].titulo}</h2>;
                }
            }

            return titulo;
        };

        return (
            <div>
                <div style={{opacity: 0.5}} className="loader" hidden={!this.state.loading}>
                    <img style={{width: 300, height: 200}} src="./imagens/loading.gif" alt="loading" />
                </div>
                
                <div className="wrapper">
                    <nav className="navbar-default nav-open">
                        <ul>
                            <li className="navbar-header">
                                <img src="imagens/logo.png" alt="logo" />
                            </li>
                            {
                                Rotas.map((rota, index) => {
                                    var link = rota.caminhoLink ? rota.caminhoLink : rota.caminho;

                                    if (rota.mostrarMenu) {
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

                            {config.cliente !== "preves" &&
                                <Col tamanho={"sm-4"} className={"text-right user-icon"}>
                                    <Row>
                                        <Col className={"nome-usuario"}>
                                            {this.state.nomeUsuario}

                                            {this.state.admin &&
                                                <span>
                                                    <Link to={"/listarParticipantes"} className={"icon"} style={{ marginLeft: 10, marginRight: 10 }}>
                                                        <i className={"fas fa-user-friends"}></i>
                                                    </Link>
                                                    <Link to={"/admin"} className={"icon"}>
                                                        <i className={"fas fa-lock"}></i>
                                                    </Link>
                                                </span>
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            }
                        </Row>

                        <div className="wrapper-content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
