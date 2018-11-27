import React from 'react';
import { handleFieldChange } from "@intechprev/react-lib";

import Alert from "./Alert";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            erro: null,
            mensagem: null,
            usuario: "",
            senha: "",
            carregando: false
        };
    }

    mostrarErro = (erro) => this.setState({ erro: erro });
    limparErro = () => this.setState({ erro: null });

    mostrarMensagem = (mensagem) => this.setState({ mensagem: mensagem });
    limparMensagem = () => this.setState({ mensagem: null });

    onSubmit = async (e) => {
        e.preventDefault();
        
        await this.setState({ carregando: true });
        await this.props.onSubmit(this.state.usuario, this.state.senha);
        await this.setState({ carregando: false });
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <input name="usuario" placeholder="CPF (somente números)" className="form-control" value={this.state.usuario} onChange={(e) => handleFieldChange(this, e)} />
                </div>

                <div className="form-group">
                    <input name="senha" placeholder="Senha" type="password" className="form-control" value={this.state.senha} onChange={(e) => handleFieldChange(this, e)} />
                </div>

                {this.state.mensagem && <Alert tipo={"info"} mensagem={this.state.mensagem} />}
                {this.state.erro && <Alert tipo={"danger"} mensagem={this.state.erro} />}

                <div className="form-group">
                    <button type="submit" className="btn btn-block btn-primary" onClick={this.onSubmit} disabled={this.state.carregando}>
                        {!this.state.carregando && 
                            <span>Entrar</span>}

                        {this.state.carregando &&
                            <i className="fas fa-spinner fa-pulse"></i>}
                    </button>
                </div>

                <div className="form-group">
                    <a className="btn btn-link" id="forgotPassword" href="esqueciSenha">Esqueci Minha Senha / Primeiro Acesso</a>
                </div>
            </form>
        );
    }
}