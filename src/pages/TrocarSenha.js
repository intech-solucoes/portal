import React from 'react';
import { Row, Col, Box, Button, CampoTexto, Alert, Form } from "../components";
import { UsuarioService } from "@intechprev/prevsystem-service";
import { Page } from ".";

export default class TrocarSenha extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            senhaAntiga: "",
            senhaNova: "",
            confirmarSenha: "",
            erros: [],
            mensagemSucesso: false
        }

        this.page = React.createRef();
        this.form = React.createRef();
        this.alert = React.createRef();
    }

    trocarSenha = async () => {
        await this.alert.current.limparErros();
        await this.form.current.validar();

        // Define os estados iniciais de alertas.
        this.erros = [];
        this.setState({ mensagemSucesso: false })
        
        // Valida se a nova senha tem 6 ou mais caracteres.
        if(this.state.senhaNova.length < 6)
            this.erros.push("A nova senha deve possuir no mínimo 6 caracteres.");

        // Valida se os campos de nova senha e confirmação são iguais.
        if(this.state.senhaNova !== this.state.confirmarSenha)
            this.erros.push("As senhas não coincidem.");

        // Atualiza o state de erros.
        this.setState({ erros: this.erros });

        try {
            if(this.alert.current.state.mensagem.length === 0 && this.alert.current.props.mensagem.length === 0) {
                await UsuarioService.TrocarSenha(this.state.senhaAntiga, this.state.senhaNova);
                this.setState({ mensagemSucesso: true })
            }
        } catch(err) {
            if(err.response)
                this.erros.push(err.response.data)
            else
                console.error(err);
            
            this.setState({ erros: this.erros });
        }

    }

    render() {
        return (
            <Page {...this.props} ref={this.page}>
                <Row>
                    <Col className={"col-lg-12"}>
                        <Box>
                            <Form ref={this.form}>
                            
                                <Row className={"form-group"}>
                                    <label htmlFor="senhaAntiga" className="col-2 col-form-label"><b>Senha antiga:</b></label>
                                    <Col tamanho={"10"}>
                                        <CampoTexto contexto={this} nome={"senhaAntiga"} obrigatorio tipo={"password"} />
                                    </Col>
                                </Row>

                                <Row className={"form-group"}>
                                    <label htmlFor="senhaNova" className="col-sm-2  col-form-label"><b>Nova senha:</b></label>
                                    <Col tamanho={"10"}>
                                        <CampoTexto contexto={this} nome={"senhaNova"} obrigatorio tipo={"password"} />
                                    </Col>
                                </Row>

                                <Row className={"form-group"}>
                                    <label htmlFor="confirmarSenha" className="col-sm-2  col-form-label"><b>Confirme nova senha:</b></label>
                                    <Col tamanho={"10"}>
                                        <CampoTexto contexto={this} nome={"confirmarSenha"} obrigatorio tipo={"password"} />
                                    </Col>
                                </Row>

                                {/* <PainelErros erros={this.state.erros} /> */}

                                {this.state.mensagemSucesso &&
                                    <Alert tipo={"success"} mensagem={"Senha alterada com sucesso"} />
                                }
                                <hr />

                                <Alert ref={this.alert} padraoFormulario tipo={"danger"} /> 

                                <Button id="trocar-senha" submit titulo={"Trocar Senha"} tipo="primary" onClick={() => this.trocarSenha()} usaLoading />
                            
                            </Form>
                        </Box>
                    </Col>
                </Row>
            </Page>
        );
    }
}
