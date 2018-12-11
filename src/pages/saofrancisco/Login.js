import React from "react";
import packageJson from '../../../package.json';

import LoginForm from "../_shared/LoginForm";
import { PageClean } from "../";

import { UsuarioService, FuncionarioService } from "@intechprev/prevsystem-service";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.loginForm = React.createRef();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = async (cpf, senha) => {
        try {
            this.loginForm.current.limparErro();
            
            var loginResult = await UsuarioService.Login(cpf, senha);    
            await localStorage.setItem("token", loginResult.data.AccessToken);
            await localStorage.setItem("admin", loginResult.data.Admin);
                    
            var funcionarioResult = await FuncionarioService.Buscar();

            await localStorage.setItem("fundacao", funcionarioResult.data.funcionario.CD_FUNDACAO);
            await localStorage.setItem("empresa", funcionarioResult.data.funcionario.CD_EMPRESA);

            this.props.history.push("/");
        } catch(erro) {
            if(erro.response) {
                this.loginForm.current.mostrarErro(erro.response.data);
            } else {
                this.loginForm.current.mostrarErro(erro);
            }
        }
    }

    render() {
        return (
			<PageClean {...this.props}>
                <h4>Bem vindo ao portal da São Francisco</h4>

                <h5>
                    <b>Área de Acesso Restrito</b><br />
                    <br/>
                    <small>Para informações, entre em contato com a <a href="http://www.franweb.com.br/contact.html;">São Francisco</a></small><br />
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