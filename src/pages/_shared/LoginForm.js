import React from 'react';
import { Link } from "react-router-dom";
import { handleFieldChange } from "@intechprev/react-lib";

import { Alert } from "../../components";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            erro: "",
            mensagem: "",
            cpf: "",
            senha: "",
            carregando: false
        };
    }

    mostrarErro = async (erro) => await this.setState({ erro: erro });
    limparErro = async () => await this.setState({ erro: "" });

    mostrarMensagem = async (mensagem) => await this.setState({ mensagem: mensagem });
    limparMensagem = () => this.setState({ mensagem: "" });

    onSubmit = async (e) => {
        e.preventDefault();
        
        await this.setState({ carregando: true });
        await this.props.onSubmit(this.state.cpf, this.state.senha);
        await this.setState({ carregando: false });
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <input name="cpf" id="cpf" placeholder="CPF (somente números)" className="form-control" value={this.state.cpf} onChange={(e) => handleFieldChange(this, e)} />
                </div>

                <div className="form-group">
                    <input name="senha" id="senha" placeholder="Senha" type="password" className="form-control" value={this.state.senha} onChange={(e) => handleFieldChange(this, e)} />
                </div>

                <div className="form-group">
                    <button type="submit" id="entrar" className="btn btn-block btn-primary" onClick={this.onSubmit} disabled={this.state.carregando}>
                        {!this.state.carregando && 
                            <span>Entrar</span>}

                        {this.state.carregando &&
                            <i className="fas fa-spinner fa-pulse"></i>}
                    </button>
                </div>

                {this.state.mensagem !== "" && <Alert tipo={"info"} mensagem={this.state.mensagem} />}
                {this.state.erro !== "" && <Alert tipo={"danger"} mensagem={this.state.erro} />}

                <div className="form-group">
                    <Link className="btn btn-link" id="esqueciSenha" to="/esqueciSenha">Esqueci Minha Senha / Primeiro Acesso</Link>
                </div>
            </form>
        );
    }
}