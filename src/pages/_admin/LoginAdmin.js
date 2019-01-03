import React, { Component } from 'react'

import { Alert, Form, CampoTexto, Button } from "../../components";

export default class LoginAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cpf: "",
            senha: "",
            carregando: false,
            formValido: true
        };

        this.loginForm = React.createRef();
    }

    onSubmit = async () => {
        await this.loginForm.current.validar();

        
    }

    render() {
        return (
            <div className="panel-login middle-box">
				<div className="logo">
                    <img src="./imagens/logo.png" alt="Logo" />
                </div>

                <h4>Painel Administrativo</h4>
                <br/>

				<Form ref={this.loginForm}>
                    <CampoTexto contexto={this}
                        nome={"cpf"} placeholder={"CPF"} valor={this.state.cpf} obrigatorio />

                    <CampoTexto contexto={this} tipo={"password"}
                        nome={"senha"} placeholder={"Senha"} valor={this.state.senha} obrigatorio />

                    <div className="form-group">
                        <Button submit block tipo={"primary"} onClick={this.onSubmit} titulo={"Entrar"} />
                    </div>

                    <Alert padraoFormulario tipo={"danger"} />
                    
                </Form>
			</div>
        )
    }
}