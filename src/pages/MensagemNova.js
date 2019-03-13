import React from 'react';
import { MensagemService, ListasService } from "@intechprev/prevsystem-service";
import { handleFieldChange } from "@intechprev/react-lib";
import { Row, Col, Box, CampoTexto, Button, Form, Alert, Combo } from "../components";
import DataInvalida from './_shared/Data';
import ListaMensagens from "./_shared/mensagem/ListaMensagens";
import { Page } from ".";

export default class MensagemNova extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            // States campos
            titulo: "",
            mensagem: "",
            enviarEmail: false,
            enviarPortal: false,
            dataExpiracao: "",
            fundacao: "",
            empresa: "",
            plano: "",
            situacaoPlano: "",
            matricula: "",

            // States Listas
            listas: [],
            listaFundacao: [],
            listaEmpresa: [],
            listaPlano: [],
            listaSituacaoPlano: [],
            mensagens: [],

            modalVisivel: false
        }

        this.alert = React.createRef();
        this.form = React.createRef();
        this.page = React.createRef();
    }

    /**
     * @description Método de ciclo de vida, chamado ao montar o componente. Busca todas as listagens e armazena em seus respectivos states.
     */
    async componentDidMount() {

        try {
            var { data: mensagens } = await MensagemService.BuscarTodas();
            await this.setState({ mensagens })

            var { data: listas} = await ListasService.ListarFundacaoEmpresaPlano();
            await this.setState({
                listas,
                listaFundacao: listas.Fundacoes,
                listaSituacaoPlano: listas.SitPlanos
            });
            
            await this.page.current.loading(false);
        } catch(err) {
            console.error(err);
        }
    }

    /**
     * @description Método que busca as empresas que existem dentro da fundação selecionada e armazena no state listaEmpresa.
     * @param {event} object
     */
    onChangeFundacao = async (event) => {
        try {
            await this.setState({ listaEmpresa: this.state.listaFundacao[this.state.fundacao - 1].Empresas });
        } catch(err) {
            this.setState({ 
                listaEmpresa: [],
                listaPlano: [],
                empresa: "",
                plano: ""
            });
            console.error(err);
        }
    }

    /**
     * @description Método que busca os planos que existem dentro da empresa selecionada e armazena no state listaPlanos.
     * @param {event} object
     */
    onChangeEmpresa = async (event) => {
        try {
            await this.setState({ listaPlano: this.state.listaFundacao[this.state.fundacao - 1].Empresas[this.state.empresa - 1].Planos });
        } catch(err) { 
            this.setState({ 
                listaPlano: [],
                plano: ""
            })
            console.error(err);
        }
    }

    validar = async () => {
        await this.alert.current.limparErros();
        await this.form.current.validar();
        await this.validarData();
        await this.validarCheckboxes();

        var dadosMensagem = {};
        if(this.alert.current.state.mensagem.length === 0 && this.alert.current.props.mensagem.length === 0) {
            dadosMensagem.TXT_TITULO = this.state.titulo;
            dadosMensagem.TXT_CORPO = this.state.mensagem;
            dadosMensagem.DTA_EXPIRACAO = this.state.dataExpiracao;
            dadosMensagem.CD_FUNDACAO = this.state.fundacao;
            dadosMensagem.CD_EMPRESA = this.state.empresa;
            dadosMensagem.CD_PLANO = this.state.plano;
            dadosMensagem.CD_SIT_PLANO = this.state.situacaoPlano;
            dadosMensagem.NUM_MATRICULA = this.state.matricula;
            dadosMensagem.IND_MOBILE = this.state.enviarMobile ? "SIM" : "NAO";
            dadosMensagem.IND_PORTAL = this.state.enviarPortal ? "SIM" : "NAO";
            dadosMensagem.IND_EMAIL = this.state.enviarEmail ? "SIM" : "NAO";
            dadosMensagem.IND_SMS = this.state.enviarSms ? "SIM" : "NAO";
            
            try { 
                await MensagemService.EnviarMensagem(dadosMensagem);
                alert("Mensagem enviada com sucesso!");
                await this.limparCampos();
                
                var { data: mensagens } = await MensagemService.BuscarTodas();
                this.setState({ mensagens });

            } catch(err) {
                if(err.response)
                    alert(err.response.data);
                else
                    console.error(err);
            }
        } else {
            
        }
    }

    validarCheckboxes = async () => {
        if(!this.state.enviarEmail && !this.state.enviarPortal) {
            await this.alert.current.adicionarErro("Campo \"Enviar via\" obrigatório.");
        }
    }

    validarData = async () => {
        var dataObjeto = this.state.dataExpiracao.split("/");
        dataObjeto = new Date(dataObjeto[2], dataObjeto[1] - 1, dataObjeto[0]);
        var dataInvalida = DataInvalida(dataObjeto, this.state.dataExpiracao);

        if(dataObjeto < new Date()) {
            await this.alert.current.adicionarErro("A Data de Expiração deve ser superior à data atual.");
        } else {
            if(dataInvalida)
                await this.alert.current.adicionarErro("Campo \"Data de Expiração\" inválido.");
        }
    }

    /**
     * @description Método que limpa os states de campo para limpar o formulário de nova mensagem.
     */
    limparCampos = () => {
        this.setState({
            titulo: "",
            mensagem: "",
            enviarEmail: false,
            enviarPortal: false,
            enviarMobile: false,
            dataExpiracao: "",
            fundacao: "",
            empresa: "",
            plano: "",
            situacaoPlano: "",
            matricula: ""
        })
    }

    render () {
        return (
            <Page {...this.props} ref={this.page}>
                <Row>
                    <Col>
                        <Box titulo={"NOVA MENSAGEM"}>
                            <Form ref={this.form}>

                                <Row>                          
                                    <Col className={"col-lg-6"}>

                                        <CampoTexto contexto={this} nome={"titulo"} max={50} valor={this.state.titulo} label={"Título"} obrigatorio />

                                        <CampoTexto contexto={this} nome={"mensagem"} max={4000} textarea valor={this.state.mensagem} rows={10} label={"Corpo da Mensagem"} obrigatorio />

                                        <div className="form-group">
                                            <label><b>Enviar via</b></label>
                                            <Row>
                                                <Col className={"col-lg-2"}>
                                                    <input name="enviarEmail" id="enviarEmail" type="checkbox" checked={this.state.enviarEmail} onChange={(e) => handleFieldChange(this, e)} />&nbsp;
                                                    <label htmlFor="enviarEmail">E-mail</label>
                                                </Col>

                                                <Col className={"col-lg-2"}>
                                                    <input name="enviarPortal" id="enviarPortal" type="checkbox" checked={this.state.enviarPortal} onChange={(e) => handleFieldChange(this, e)} />&nbsp;
                                                    <label htmlFor="enviarPortal">Portal</label>
                                                </Col>
                                            </Row>
                                        </div>
            
                                        <div className="form-group">
                                            <CampoTexto contexto={this} nome={"dataExpiracao"} mascara={"99/99/9999"} valor={this.state.dataExpiracao} 
                                                        label={"Data de Expiração"} underline />
                                            <span className="text text-secondary">Deixe em branco para indicar que a mensagem não terá uma data de expiração</span>
                                        </div>
                                    </Col>
            
                                    <Col className={"col-lg-6"}>

                                        <Combo contexto={this} label={"Fundação"} onChange={this.onChangeFundacao}
                                               nome="fundacao" valor={this.state.fundacao} obrigatorio textoVazio="Selecione uma fundação"
                                               opcoes={this.state.listaFundacao} nomeMembro={"NOME_ENTID"} valorMembro={"CD_FUNDACAO"} />

                                        <Combo contexto={this} label={"Empresa"} onChange={this.onChangeEmpresa}
                                               nome="empresa" valor={this.state.empresa} textoVazio="Todas(os)"
                                               opcoes={this.state.listaEmpresa} nomeMembro={"NOME_ENTID"} valorMembro={"CD_EMPRESA"} />
                
                                        <Combo contexto={this} label={"Plano"}
                                               nome="plano" valor={this.state.plano} textoVazio="Todas(os)"
                                               opcoes={this.state.listaPlano} nomeMembro={"DS_PLANO"} valorMembro={"CD_PLANO"} />
                
                                        <Combo contexto={this} label={"Situação do plano"}
                                               nome="situacaoPlano" valor={this.state.situacaoPlano} textoVazio="Todas(os)"
                                               opcoes={this.state.listaSituacaoPlano} nomeMembro={"DS_SIT_PLANO"} valorMembro={"CD_SIT_PLANO"} />
            
                                        <div className="form-group">
                                            <CampoTexto contexto={this} nome={"matricula"} mascara={"999999999"} valor={this.state.matricula} label={"Matrícula"} />
                                            <span className="text text-secondary">Deixe em branco para enviar para todas as matrículas dentro dos parâmetros acima</span>
                                        </div>
                                    </Col>

                                </Row>
                                <Button id="enviar" titulo={"Enviar"} tipo="primary" submit onClick={this.validar} />
                                <br /><br />
                                <Alert ref={this.alert} padraoFormulario tipo={"danger"} tamanho={"6"} />
                            </Form>      
                        </Box>
                            
                        <Box titulo={"HISTÓRICO DE MENSAGENS"}>
                            {this.state.mensagens.length === 0 &&
                                <div id="alerta" className={"alert alert-danger"}>
                                    Nenhuma mensagem enviada.
                                </div>
                            }
                            {this.state.mensagens.length !== 0 &&
                                <ListaMensagens mensagens={this.state.mensagens} />
                            }
                        </Box>
                    </Col>
                </Row>
            </Page>
        );
    }
}