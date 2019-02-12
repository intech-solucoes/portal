import React from 'react';
import { MensagemService, ListasService } from "@intechprev/prevsystem-service";
import { Row, Col, Box, CampoTexto, Button, Form, Alert, Combo } from "../components";
import DataInvalida from './_shared/Data';
import ListaMensagens from "./_shared/mensagem/ListaMensagens";
import { Page } from ".";

var InputMask = require('react-input-mask');

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

            modalVisivel: false,
            // mensagemId: 1
        }

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

        } catch(err) {
            console.error(err);
        }
    }

    /**
     * @description Método que atualiza o state do campo.
     * @param {event} object
     */
    onChangeInput = (event) => {
        const target = event.target;
        const valor = target.type === 'checkbox' ? target.checked : target.value;
        const campo = target.name;

        this.setState({
            [campo]: valor
        });
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
        await this.form.current.validar();
        // var checkboxVazia = this.validarCheckboxes();
        // var dataInvalida = this.validarData();
        // var fundacaoVazia = this.validarFundacao();

        // var dadosMensagem = {};
        
        // if(!checkboxVazia && !dataInvalida && !fundacaoVazia) {
        //     dadosMensagem.TXT_TITULO = this.state.titulo;
        //     dadosMensagem.TXT_CORPO = this.state.mensagem;
        //     dadosMensagem.DTA_EXPIRACAO = this.state.dataExpiracao;
        //     dadosMensagem.CD_FUNDACAO = this.state.fundacao;
        //     dadosMensagem.CD_EMPRESA = this.state.empresa;
        //     dadosMensagem.CD_PLANO = this.state.plano;
        //     dadosMensagem.CD_SIT_PLANO = this.state.situacaoPlano;
        //     dadosMensagem.NUM_MATRICULA = this.state.matricula;
        //     dadosMensagem.IND_MOBILE = this.state.enviarMobile ? "SIM" : "NAO";
        //     dadosMensagem.IND_PORTAL = this.state.enviarPortal ? "SIM" : "NAO";
        //     dadosMensagem.IND_EMAIL = this.state.enviarEmail ? "SIM" : "NAO";
        //     dadosMensagem.IND_SMS = this.state.enviarSms ? "SIM" : "NAO";
            
        //     try { 
        //         await MensagemService.EnviarMensagem(dadosMensagem);
        //         alert("Mensagem enviada com sucesso!");
        //         await this.limparCampos();
                
        //         var { data: mensagens } = await MensagemService.BuscarTodas();
        //         this.setState({ mensagens });

        //     } catch(err) {
        //         if(err.response)
        //             alert(err.response.data);
        //         else
        //             console.error(err);
        //     }


        // } else {
        //     window.scrollTo(0, 60);
        // }
    }

    validarCheckboxes = () => {
        var checkboxVazia = (!this.state.enviarEmail && !this.state.enviarPortal)
        if(checkboxVazia)
            console.log("Preencha uma checkbox");
    }

    validarData = () => {
        var dataObjeto = this.state.dataExpiracao.split("/");
        dataObjeto = new Date(dataObjeto[2], dataObjeto[1] - 1, dataObjeto[0]);
        var dataInvalida = DataInvalida(dataObjeto, this.state.dataExpiracao);

        if(dataObjeto < new Date()) {
            console.log("data inválida.");
            return true;
        } else {
            console.log("data inválida:", dataInvalida);
            return dataInvalida;
        }
    }

    /**
     * @description Método que valida o campo fundação, que deve ser selecionado com uma opção diferente da opção default.
     * @returns {boolean} True para fundação inválida (opção default) e false para fundação válida (sem erro).
     */
    validarFundacao = () => {
        if(this.state.fundacao === "") {
            console.log("Selecione uma fundação");
            return true;
            
        } else {
            return false;
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

                                        <CampoTexto contexto={this} nome={"tituloMensagem"} max={50} valor={this.state.titulo} label={"Título:"} obrigatorio />

                                        <div className="form-group">
                                            <label htmlFor="mensagem"><b>Corpo da Mensagem:</b></label>
                                            <textarea name="mensagem" id="mensagem" className="form-control" rows="10" value={this.state.mensagem} onChange={this.onChangeInput}/>
                                        </div>

                                        <div className="form-group">
                                            <label><b>Enviar via:</b></label>
                                            <Row>
                                                <Col className={"col-lg-2"}>
                                                    <input name="enviarEmail" id="enviarEmail" type="checkbox" checked={this.state.enviarEmail} onChange={this.onChangeInput} />&nbsp;
                                                    <label htmlFor="enviarEmail"><b>E-mail</b></label>
                                                </Col>

                                                <Col className={"col-lg-2"}>
                                                    <input name="enviarPortal" id="enviarPortal" type="checkbox" checked={this.state.enviarPortal} onChange={this.onChangeInput} />&nbsp; 
                                                    <label htmlFor="enviarPortal"><b>Portal</b></label>
                                                </Col>
                                            </Row>
                                        </div>
            
                                        <div className="form-group">
                                            <CampoTexto contexto={this} nome={"dataExpiracao"} mascara={"99/99/9999"} valor={this.state.dataExpiracao} 
                                                        label={"Data de Expiração:"} underline />
                                            <span className="text text-secondary">Deixe em branco para indicar que a mensagem não terá uma data de expiração</span>
                                        </div>
                                    </Col>
            
                                    <Col className={"col-lg-6"}>

                                        <Combo contexto={this} label={"Fundação:"} onChange={this.onChangeFundacao}
                                               nome="fundacao" valor={this.state.fundacao} obrigatorio textoVazio="Selecione uma fundação"
                                               opcoes={this.state.listaFundacao} nomeMembro={"NOME_ENTID"} valorMembro={"CD_FUNDACAO"} />

                                        <Combo contexto={this} label={"Empresa:"} onChange={this.onChangeEmpresa}
                                               nome="empresa" valor={this.state.empresa} obrigatorio textoVazio="Todas(os)"
                                               opcoes={this.state.listaEmpresa} nomeMembro={"NOME_ENTID"} valorMembro={"CD_EMPRESA"} />
                
                                        <Combo contexto={this} label={"Plano:"}
                                               nome="plano" valor={this.state.plano} obrigatorio textoVazio="Todas(os)"
                                               opcoes={this.state.listaPlano} nomeMembro={"DS_PLANO"} valorMembro={"CD_PLANO"} />
                
                                        <Combo contexto={this} label={"Situação do plano:"}
                                               nome="situacaoPlano" valor={this.state.situacaoPlano} obrigatorio textoVazio="Todas(os)"
                                               opcoes={this.state.listaSituacaoPlano} nomeMembro={"DS_SIT_PLANO"} valorMembro={"CD_SIT_PLANO"} />
            
                                        {/** Tirar underline, permitir numeros incompletos (manda para todos que incluem o número incompleto)  */}
                                        <div className="form-group">
                                            <CampoTexto contexto={this} nome={"matricula"} mascara={"999999999"} valor={this.state.matricula} label={"Matrícula:"} />
                                            <span className="text text-secondary">Deixe em branco para enviar para todas as matrículas dentro dos parâmetros acima</span>
                                        </div>
                                    </Col>

                                </Row>
                                <Button id="enviar" titulo={"Enviar"} tipo="primary" submit onClick={this.validar} />
                                <Alert padraoFormulario tipo={"danger"} />
                            </Form>      
                        </Box>
                            
                        <Box titulo={"HISTÓRICO DE MENSAGENS"}>
                            <ListaMensagens mensagens={this.state.mensagens} />
                        </Box>
                    </Col>
                </Row>
            </Page>
        );
    }
}