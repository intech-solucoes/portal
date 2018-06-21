import React from "react";
import LoginForm from "../_shared/LoginForm";

import { UsuarioService, FuncionarioService } from "prevsystem-service";
import config from "../../config.json";

const usuarioService = new UsuarioService(config);
const funcionarioService = new FuncionarioService(config);

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.loginForm = React.createRef();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(cpf, senha) {
        this.loginForm.current.limparErro();

        usuarioService.Login(cpf, senha)
            .then((result) => {
                localStorage.setItem("token", result.data.AccessToken);
                
                funcionarioService.BuscarDados()
                    .then((result) => {
                        localStorage.setItem("fundacao", result.data.funcionario.CD_FUNDACAO);
                        localStorage.setItem("empresa", result.data.funcionario.CD_EMPRESA);

                        document.location = ".";
                    });
            })
            .catch((err) => {

                if(err.message.indexOf("401") > -1)
                    this.loginForm.current.mostrarErro("CPF ou senha incorretos!");
                else
                    console.error(err);

            });
    }

    render() {
        return (
            <div>
                <div className="logo">
                    <img src="./imagens/preves/logo.png" alt="Preves" />
                </div>

                <h4>Bem vindo ao portal da Preves</h4>

                <h5>
                    <b>Área de Acesso Restrito</b><br />
                    Para informações, entre em contato com a Preves<br />
                    <br />
                    Telefone: (61) 0000-0000
                </h5>

                <LoginForm ref={this.loginForm} mostrarPrimeiroAcesso={true} onSubmit={this.onSubmit} usuarioPlaceholder={"CPF"} />
            </div>
        );
    }
}
