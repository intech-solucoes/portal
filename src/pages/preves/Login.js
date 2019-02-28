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
            
            var loginResult = await UsuarioService.Login(cpf, senha);    
            await localStorage.setItem("token", loginResult.data.AccessToken);
            await localStorage.setItem("admin", loginResult.data.Admin);

            var { data: funcionarios } = await FuncionarioService.BuscarPorCpf();
            var matriculas = [];
            for(var i = 0; i < funcionarios.length; i++)
                if(!matriculas.includes(funcionarios[i].NUM_MATRICULA))
                    matriculas.push(funcionarios[i].NUM_MATRICULA);

            if(matriculas.length > 1)
                this.props.history.push("/selecionarMatricula");
            else
                document.location = ".";
        } catch(erro) {
            if(erro.response) {
                await this.loginForm.current.mostrarErro(erro.response.data);
            } else {
                await this.loginForm.current.mostrarErro(erro);
            }
        }
    }

    render() {
        return (
            <PageClean {...this.props}>
                <h4>Bem vindo ao portal da Preves</h4>

                <h5>
                    <b>Área de Acesso Restrito</b><br />
                    Para informações, entre em contato com a <a href="http://www.preves.es.gov.br/contato.html">Preves</a><br />
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