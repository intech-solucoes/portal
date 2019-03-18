import React from 'react';
import DataInvalida from '../_shared/ValidacaoDataNascimento';
import  { UsuarioService } from "@intechprev/prevsystem-service";
import { CampoTexto, Button, Alert, Form } from "../../components";
import { PageClean } from "../";

export default class EsqueciSenha extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cpf: "",
            dataNascimento: ""
        }

        this.form = React.createRef();
        this.alert = React.createRef();
    }

    enviarSenha = async () => {
        try {
            await this.alert.current.limparErros();
            await this.form.current.validar();
            await this.validarData();

            if(this.state.cpf.length < 11)
                this.alert.current.adicionarErro("Campo \"CPF\" inválido.");

            if(this.alert.current.state.mensagem.length === 0 && this.alert.current.props.mensagem.length === 0) {
                var { data: result } = await UsuarioService.PrimeiroAcesso(this.state.cpf, this.state.dataNascimento);
                window.alert(result);
                this.props.history.push('/');
            } else {

            }
        
        } catch(err) { 
            if(err.response)
                this.alert.current.adicionarErro(err.response.data);
            else
                console.error(err);
        }
    }

    validarData = async () => {
        var dataObjeto = this.state.dataNascimento.split("/");
        dataObjeto = new Date(dataObjeto[2], dataObjeto[1] - 1, dataObjeto[0]);
        var dataInvalida = DataInvalida(dataObjeto, this.state.dataNascimento);

        if(dataInvalida)
            await this.alert.current.adicionarErro("Campo \"Data de Nascimento\" inválido.");
    }

    render() {
        return (
			<PageClean {...this.props}>
                <h4>Bem vindo ao portal da São Francisco</h4>
                
                <h5>
                    <b>Esqueci minha senha / Primeiro Acesso</b><br />
                    <br/>
                    <small>Preencha as informações para que possamos gerar uma senha que será enviada para seu email cadastrado na fundação São Francisco.</small>
                </h5>

                <Form ref={this.form}>
                    <CampoTexto contexto={this} nome={"cpf"} max={11} valor={this.state.cpf} 
                                placeholder="CPF (somente números)" />

                    <CampoTexto contexto={this} nome={"dataNascimento"} valor={this.state.dataNascimento} 
                                placeholder={"Data de Nascimento"} mascara={"99/99/9999"} />

                    <Button id="enviarSenha" titulo={"Enviar Nova Senha"} tipo="primary" block submit usaLoading
                            onClick={this.enviarSenha} />
                    <br />
                    <Alert id={"alerta-erro"} ref={this.alert} padraoFormulario tipo={"danger"} tamanho={"12"} />

                </Form>

            </PageClean>
        )
    }

}
