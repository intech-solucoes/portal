import React from 'react';
import { handleFieldChange } from "@intechprev/react-lib";
import { UsuarioService } from "@intechprev/prevsystem-service";

const config = require("../config.json");

const usuarioService = new UsuarioService(config);

export default class TrocarSenha extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // States dos valores dos campos
            senhaAntiga: "",
            senhaNova: "",
            confirmarSenha: "",

            // States de validação
            erroSenhaAntiga: false,
            mensagemErroSenhaAntiga: "",
            erroConfirmarSenha: false,
            mensagemSucesso: false,
        }

    }

    trocarSenha = async () => {
        var senhaNovaCoincide = this.validarSenha();

        if(senhaNovaCoincide) {
            await usuarioService.TrocarSenha(this.state.senhaAntiga, this.state.senhaNova)
                .then((result) => {
                    this.setState({ 
                        mensagemSucesso: true,
                        erroSenhaAntiga: false
                    }, () => alert(result.data));
                    
                })
                .catch((err) => {
                    console.error();
                    this.setState({
                        mensagemSucesso: false,
                        erroSenhaAntiga: true,
                        mensagemErroSenhaAntiga: err.response.data 
                    })
                })
                

        } else {
            this.setState({
                mensagemSucesso: false
            })
            window.scrollTo(0, 0);
        }
    }

    validarSenha = () => {
        if(this.state.senhaNova === this.state.confirmarSenha) {
            this.setState({
                erroConfirmarSenha: false
            })
            return true;
        } else {
            this.setState({
                erroConfirmarSenha: true
            })
            return false;
        }
    }

    renderizaErro = (stateErro, mensagemErro) => {
        if(stateErro) {
            return (    
                <div className="text-danger">
                    <i className="fas fa-exclamation-circle"></i>&nbsp;
                    {mensagemErro}
                </div>
            )
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="box">
                        <div className="box-content">
                            <form className="validatedForm">
                                <div className="form-group row">
                                    <label htmlFor="senhaAntiga" className="col-sm-2 col-form-label"><b>Senha antiga:</b></label>
                                    <div className="col-sm-10">
                                        <input name="senhaAntiga" id="senhaAntiga" className="form-control" type="password" value={this.state.senhaAntiga} onChange={(e) => handleFieldChange(this, e)}></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="senhaNova" className="col-sm-2  col-form-label"><b>Nova senha:</b></label>
                                    <div className="col-sm-10">
                                        <input name="senhaNova" id="senhaNova" className="form-control" type="password" value={this.state.senhaNova} onChange={(e) => handleFieldChange(this, e)} ></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="confirmarSenha" className="col-sm-2  col-form-label"><b>Confirme nova senha:</b></label>
                                    <div className="col-sm-10">
                                        <input name="confirmarSenha" id="confirmarSenha" className="form-control" type="password" value={this.state.confirmarSenha} onChange={(e) => handleFieldChange(this, e)} ></input>
                                    </div>
                                </div>
                                {this.renderizaErro(this.state.erroConfirmarSenha, "As senhas não coincidem!")}
                                {this.renderizaErro(this.state.erroSenhaAntiga, this.state.mensagemErroSenhaAntiga)}
                                {this.state.mensagemSucesso &&
                                    <div className="text-primary">
                                        <i className="fas fa-check"></i>&nbsp;
                                        Senha alterada com sucesso!
                                    </div>
                                }
                                <hr />
                                <button type="button" id="trocar-senha" className="btn btn-primary" onClick={() => this.trocarSenha()}>Trocar Senha</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
