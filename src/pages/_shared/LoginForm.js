import React from 'react';
import { handleFieldChange } from "react-lib";

import Alert from "./Alert";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            erro: null,
            mensagem: null,
            usuario: "01272078132",
            senha: "843466"
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.mostrarErro = this.mostrarErro.bind(this);
        this.limparErro = this.limparErro.bind(this);
        this.mostrarMensagem = this.mostrarErro.bind(this);
        this.limparMensagem = this.limparErro.bind(this);
    }

    mostrarErro = (erro) => this.setState({ erro: erro });
    limparErro = () => this.setState({ erro: null });

    mostrarMensagem = (mensagem) => this.setState({ mensagem: mensagem });
    limparMensagem = () => this.setState({ mensagem: null });

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.usuario, this.state.senha);
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
                    <button type="submit" className="btn btn-block btn-primary" onClick={this.onSubmit}>
                        Entrar
                    </button>
                </div>

                <div className="form-group">
                    <a className="btn btn-link" href="esqueciSenha">Esqueci Minha Senha / Primeiro Acesso</a>
                </div>
            </form>
        );
    }
}
