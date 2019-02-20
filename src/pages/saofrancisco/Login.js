import React from "react";
import packageJson from '../../../package.json';

import LoginForm from "../_shared/LoginForm";
import { PageClean } from "../";

import { UsuarioService, FuncionarioService } from "@intechprev/prevsystem-service";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.loginForm = React.createRef();
    }

    onSubmit = async (cpf, senha) => {
        try {
            this.loginForm.current.limparErro();
            
            var { data: login } = await UsuarioService.Login(cpf, senha);
            await localStorage.setItem("token", login.AccessToken);
            await localStorage.setItem("token-admin", login.AccessToken);
                    
            var { data: dados } = await FuncionarioService.Buscar();

            await localStorage.setItem("fundacao", dados.Funcionario.CD_FUNDACAO);
            await localStorage.setItem("empresa", dados.Funcionario.CD_EMPRESA);

            document.location = ".";
        } catch(erro) {
            if(erro.response) {
                await this.loginForm.current.mostrarErro(erro.response.data);
            } else {
                alert("Ocorreu um erro ao processar sua requisição!");
            }
        }
    }

    render() {
        return (
			<PageClean {...this.props}>
                <h4>Bem vindo ao portal da São Francisco</h4>

                <h5>
                    <b>Área de Acesso Restrito</b><br />
                    <small>Para informações, entre em contato com a <a href="http://www.franweb.com.br/contact.html">São Francisco</a></small><br />
                    <br />
                </h5>

                <LoginForm ref={this.loginForm} mostrarPrimeiroAcesso={true} onSubmit={this.onSubmit} usuarioPlaceholder={"CPF"} />
                
                <br/>
                <br/>
                <div className="text-center">
                    Versão {packageJson.version}
                </div>
            </PageClean>
        );
    }
}