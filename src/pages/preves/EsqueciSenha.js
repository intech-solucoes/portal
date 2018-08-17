import React from 'react';
import { handleFieldChange } from "@intechprev/react-lib";
import DataInvalida from '../_shared/ValidacaoDataNascimento';
import  { UsuarioService } from "@intechprev/prevsystem-service";

import InputMask from 'react-input-mask';

var config = require('../../config.json');
var usuarioService = new UsuarioService(config);

export default class EsqueciSenha extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cpf: "",
            dataNascimento: "",

            // States Validação
            erroCampoVazio: false,
            erroCampoInvalido: false,

            mensagemErro: "",
            enviarSenhaDesabilitado: false
        }

        this.validarCampos = this.validarCampos.bind(this);
        this.validarVazios = this.validarVazios.bind(this);
        this.validarInvalidos = this.validarInvalidos.bind(this);
        this.converteData = this.converteData.bind(this);
        this.renderizaMensagemErro = this.renderizaMensagemErro.bind(this);
        this.enviarSenha = this.enviarSenha.bind(this);
    }
    
    componentDidMount() {
    }

    validarCampos() {
        this.validarVazios();
    }

    /**
     * Método que checa se os campos estão vazios e atualiza o state que contém essa informação. Após isso faz uma chamada de validarInvalidos().
     */
    validarVazios() {

        if(this.state.cpf === "" || this.state.dataNascimento === "") {
            this.setState({
                erroCampoVazio: true
            }, () => { this.validarInvalidos() });

        } else {
            this.setState({
                erroCampoVazio: false
            }, () => { this.validarInvalidos() });
        }

    }

    /**
     * Método que valida os campos Cpf e DataNascimento. Para validação de Cpf, o valor deve conter um tamanho maior que 14. Para validação de senha é 
     * utilizado uma função que valida a data para não aceitar datas futuras e estar dentro dos limites de dias e meses. Os states são atualizados e
     * faz-se uma chamada ao renderizaMensagemErro().
     */
    validarInvalidos() {
        var cpfInvalido = false;
        if(this.state.cpf.length < 11)
            cpfInvalido = true;

        var dataObjeto = this.converteData(this.state.dataNascimento);
        var dataInvalida = DataInvalida(dataObjeto, this.state.dataNascimento);

        if(cpfInvalido || dataInvalida) {
            this.setState({ 
                erroCampoInvalido: true 
            }, () => { this.renderizaMensagemErro() });
        } else {
            this.setState({ 
                erroCampoInvalido: false 
            }, () => { this.renderizaMensagemErro() })
        }

    }
    
    /**
     * @param {string} dataString Data a ser convertida para Date().
     * @description Método responsável por converter a data recebida (no formato 'dd/mm/aaaa') para date (Objeto).
     */
    converteData(dataString) {

        var dataPartes = dataString.split("/");
        return new Date(dataPartes[2], dataPartes[1] - 1, dataPartes[0]);
    }

    /**
     * Método que altera o state 'mensagemErro' para o tipo de mensagem que deve ser mostrada para o usuário. Após isso faz uma chamada de enviarSenha.
     */
    renderizaMensagemErro() {

        if(this.state.erroCampoVazio) {
            this.setState({
                mensagemErro: "Preencha todos os campos!"
            })
        } else if(this.state.erroCampoInvalido) {
            this.setState({
                mensagemErro: "Preencha todos os campos corretamente!"
            })
        } else {
            this.setState({
                mensagemErro: ""
            }, () => { this.enviarSenha() })
        }

    }

    /**
     * Método que chama o service que cria um POST com Cpf e DataNascimento para rota '/usuario/criarAcesso'. Após isso, redireciona para tela de login.
     */
    enviarSenha() {
        this.setState({ enviarSenhaDesabilitado: true }, () => {
            usuarioService.PrimeiroAcesso(this.state.cpf, this.state.dataNascimento)
                .then((result) => {
                    this.setState({ enviarSenhaDesabilitado: true }, () => {
                        window.alert(result.data);
                        this.props.history.push('/');
                    })
                })
                .catch((err) => { 
                    console.error(err.response.data);
                    this.setState({
                        mensagemErro: "Dados inválidos!",
                        enviarSenhaDesabilitado: false
                    })
                });
        })
    }

    render() {
        return (
            <div className="box">
                <div className="logo">
                    <img src="./imagens/preves/logo.png" alt="Preves" />
                </div>

                <h4>Bem vindo ao portal da Preves</h4>

                <div className="box-content">
                    <p align="middle"><b>Esqueci minha senha / Primeiro Acesso</b></p>
                    <p align="middle">Preencha as informações para que possamos gerar uma senha que será enviada para seu email cadastrado.</p>
                    <form>
                        <div className="form-group">
                            <input name="cpf" placeholder="CPF (somente números)" maxLength="11" className="form-control" value={this.state.cpf} onChange={(e) => handleFieldChange(this, e)} />
                        </div>
                        <div className="form-group">
                            <InputMask mask="99/99/9999" name="dataNascimento" placeholder="Data de Nascimento" className="form-control" value={this.state.dataNascimento} onChange={(e) => handleFieldChange(this, e)} />
                        </div>
                        {this.state.mensagemErro !== "" &&
                            <div className="text-danger">
                                <i className="fas fa-exclamation-circle"></i>&nbsp;
                                {this.state.mensagemErro}
                            </div>
                        }<br/>
                        <button id="enviarSenha" className="btn btn-primary btn-block" type="button" onClick={this.validarCampos} disabled={this.state.enviarSenhaDesabilitado}>Enviar Nova Senha</button>
                    </form>
                </div>
            </div>
        )
    }

}
