import React from 'react';
import { MensagemService, PlanoService, EmpresaService, SituacaoPlanoService, FundacaoService } from "prevsystem-service";
import DataInvalida from './_shared/Data';
import ListaMensagens from "./_shared/mensagem/ListaMensagens";

var InputMask = require('react-input-mask');
const config = require("../config.json");
const mensagemService = new MensagemService(config);
const planoService = new PlanoService(config);
const empresaService = new EmpresaService(config);
const situacaoPlanoService = new SituacaoPlanoService(config);
const fundacaoService = new FundacaoService(config);

export default class MensagemNova extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            // States campos
            titulo: "",
            mensagem: "",
            enviarEmail: false,
            enviarSms: false,
            enviarPortal: false,
            enviarMobile: false,    // State temporário: o campo e a funcionalidade não irá existir.
            dataExpiracao: "",
            fundacao: "",
            empresa: "",
            plano: "",
            situacaoPlano: "",
            matricula: "",

            // States validação
            erroTituloVazio: false,
            erroMensagemVazia: false,
            erroEnviarVia: false,
            erroDataInvalida: false,
            erroMatriculaInvalida: false,
            erroFundacao: false,

            // States Listas
            listaFundacao: "",
            listaEmpresa: [],
            listaPlano: [],
            listaSituacaoPlano: [],
            mensagens: [],

            modalVisivel: false,
            mensagemId: 1
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
        this.validar = this.validar.bind(this);
        this.validarVazio = this.validarVazio.bind(this);
        this.validarData = this.validarData.bind(this);
        this.validarCheckboxes = this.validarCheckboxes.bind(this);
        this.validarFundacao = this.validarFundacao.bind(this);
        this.renderMensagemErro = this.renderMensagemErro.bind(this);
        this.validarMatricula = this.validarMatricula.bind(this);
        this.enviarVia = this.enviarVia.bind(this);
    }

    /**
     * @description Método de ciclo de vida, chamado ao montar o componente. Busca todas as listagens e armazena em seus respectivos states.
     */
    componentDidMount() {
        mensagemService.BuscarTodas()
            .then((result) => {
                this.setState({ mensagens: result.data });
            })
            .catch((err) => console.error(err));

        planoService.Listar()
            .then((result) => { 
                this.setState({ listaPlano: result.data });
            })
            .catch((err) => console.error(err));

        empresaService.BuscarTodas()
            .then((result) => {
                this.setState({ listaEmpresa: result.data });
            })
            .catch((err) => console.error(err));

        situacaoPlanoService.BuscarTodas()
            .then((result) => {
                this.setState({ listaSituacaoPlano: result.data });
            })
            .catch((err) => console.error(err));
        
        fundacaoService.BuscarPorCdFundacao('01')   // '01' é o código da fundação PREVES.
            .then((result) => {
                this.setState({ listaFundacao: result.data });
            })
            .catch((err) => console.error(err));
    }

    onChangeInput = (event) => {
        var target = event.target;
        var valor = target.value;
        var campo = target.name;

        this.setState({
            [campo]: valor
        }, () => { console.log(this.state) })

    }
    
    onChangeCheckbox(event) {
        var target = event.target;
        var campo = target.name;

        if(campo === 'enviarEmail') {
            this.setState({
                enviarEmail: !this.state.enviarEmail
            }, () => { console.log(this.state) })

        } else if(campo === 'enviarSms') {
            this.setState({
                enviarSms: !this.state.enviarSms
            }, () => { console.log(this.state) })   

        } else {
            this.setState({
                enviarPortal: !this.state.enviarPortal
            }, () => { console.log(this.state) })

        }
    }

    toggleModal(id) {
        this.setState({ 
            modalVisivel: !this.state.modalVisivel,
            mensagemId : id
        });
    }

    async validar() {
        var tituloVazio = this.validarVazio(this.state.titulo, "erroTituloVazio");
        var conteudoVazio = this.validarVazio(this.state.mensagem, "erroMensagemVazia");
        var checkboxVazia = this.validarCheckboxes();
        var dataInvalida = this.validarData();
        var fundacaoVazia = this.validarFundacao();
        var matriculaInvalida = this.validarMatricula();

        var dadosMensagem = {};
        
        if(!tituloVazio && !conteudoVazio && !checkboxVazia && !dataInvalida && !fundacaoVazia && !matriculaInvalida) {
            dadosMensagem.TXT_TITULO = this.state.titulo;
            dadosMensagem.TXT_CORPO = this.state.mensagem;
            dadosMensagem.DTA_EXPIRACAO = this.state.dataExpiracao;
            dadosMensagem.CD_FUNDACAO = this.state.fundacao;
            dadosMensagem.CD_EMPRESA = this.state.empresa;
            dadosMensagem.CD_PLANO = this.state.plano;
            dadosMensagem.CD_SIT_PLANO = this.state.situacaoPlano;
            dadosMensagem.NUM_MATRICULA = "035857861";
            dadosMensagem.IND_MOBILE = this.enviarVia(this.state.enviarMobile);
            dadosMensagem.IND_PORTAL = this.enviarVia(this.state.enviarPortal);
            dadosMensagem.IND_EMAIL = this.enviarVia(this.state.enviarEmail);
            dadosMensagem.IND_SMS = this.enviarVia(this.state.enviarSms);
            console.log("dadosMensagem", dadosMensagem);
            
            mensagemService.EnviarMensagem(dadosMensagem)
                .then(() => {
                    alert("Mensagem enviada com sucesso!");
                    mensagemService.BuscarTodas()
                    .then((result) => {
                        this.setState({ mensagens: result.data });
                    })
                    .catch((err) => console.error(err));
                })
                .catch((err) => console.error(err));

        } else {
            window.scrollTo(0, 60);
            console.log(this.state);
        }

    }

    /**
     * @description Método que converte o valor booleano dos campos de "enviar mensagem via" para o valor que a requisição precisa receber. Para true é a string "SIM", para false a string "NAO".
     * @param {boolean} valorBooleano Valor booleano armazenado no state "enviarVia".
     */
    enviarVia(valorBooleano) {
        if(valorBooleano) 
            return "SIM";
        else 
            return "NAO";
    }

    validarVazio(valor, campoErro) {
        var campoVazio = (valor === "");
        this.setState({
            [campoErro]: campoVazio
        })
        return campoVazio;
    }

    validarCheckboxes() {
        var checkboxVazia = (!this.state.enviarEmail && !this.state.enviarSms && !this.state.enviarPortal)
        this.setState({
            erroEnviarVia: checkboxVazia
        })
        return checkboxVazia;
    }

    validarData() {
        var dataObjeto = this.converteData(this.state.dataExpiracao);
        var dataInvalida = DataInvalida(dataObjeto, this.state.dataExpiracao);

        if(dataObjeto < new Date()) {
            this.setState({ 
                erroDataInvalida: true 
            });
            return true;
        } else {
            this.setState({ 
                erroDataInvalida: dataInvalida 
            });
            return dataInvalida;
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
     * @description Método que valida o campo fundação, que deve ser selecionado com uma opção diferente da opção default.
     * @returns {boolean} True para fundação inválida (opção default) e false para fundação válida (sem erro).
     */
    validarFundacao() {
        if(this.state.fundacao === "") {
            this.setState({ erroFundacao: true });
            return true;
            
        } else {
            this.setState({ erroFundacao: false });
            return false;
        }
    }

    /**
     * @description Método que valida o campo Matrícula, que deve ser apenas vazio ou ter exatamente 9 caracteres.
     * @returns {boolean} False para matrícula sem erros, true para matrícula inválida.
     */
    validarMatricula() {
        // O valor da matrícula para validação por tamanho é feita a partir do valor no campo, pois deve-se tratar esse valor removendo os underline (_) da string.
        var matricula = document.getElementById("matricula").value;
        matricula = matricula.split('_').join("");

        if(this.state.matricula === "" || matricula.length === 9) {
            this.setState({ erroMatriculaInvalida: false })
            return false;

        } else {
            this.setState({ erroMatriculaInvalida: true });
            return true;
        }
    }

    renderMensagemErro(stateErro, mensagemErro) {
        if(stateErro) {
            return(
                <div className="text-danger mt-2 mb-2">
                    <i className="fas fa-exclamation-circle"></i>&nbsp;
                    {mensagemErro}
                </div>
            );
        } else {
            return(<div></div>);
        }
    }

    render () {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="box">
                        <div className="box-title">
                            NOVA MENSAGEM
                        </div>
                        
                        <div className="box-content">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="titulo"><b>Título</b></label>
                                        <input name="titulo" id="titulo" className="form-control" maxLength="50" value={this.state.titulo} onChange={this.onChangeInput} />
                                            {this.renderMensagemErro(this.state.erroTituloVazio, "Campo Obrigatório!")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="mensagem"><b>Corpo da Mensagem:</b></label>
                                        <textarea name="mensagem" id="mensagem" className="form-control" rows="10" value={this.state.mensagem} onChange={this.onChangeInput}/>
                                        {this.renderMensagemErro(this.state.erroMensagemVazia, "Campo Obrigatório!")}
                                    </div>
        
                                    <div className="form-group">
                                        <label><b>Enviar via:</b></label>
                                        <div className="row">
                                            <div className="col-lg-2">
                                                <input name="enviarEmail" id="enviarEmail" type="checkbox" value={this.state.enviarEmail} onChange={this.onChangeCheckbox} />&nbsp;
                                                <label htmlFor="enviarEmail"><b>E-mail</b></label>
                                            </div>
                                            <div className="col-lg-2">
                                                <input name="enviarSms" id="enviarSms" type="checkbox" value={this.state.enviarSms} onChange={this.onChangeCheckbox} />&nbsp;
                                                <label htmlFor="enviarSms"><b>SMS</b></label>
                                            </div>
                                            <div className="col-lg-2">
                                                <input name="enviarPortal" id="enviarPortal" type="checkbox" value={this.state.enviarPortal} onChange={this.onChangeCheckbox} />&nbsp; 
                                                <label htmlFor="enviarPortal"><b>Portal</b></label>
                                            </div>
                                            {this.state.erroEnviarVia && 
                                                <div className="text-danger col-12 mt-2 mb-2"> 
                                                    <i className="fas fa-exclamation-circle"></i>&nbsp; 
                                                    Selecione ao menos uma opção! 
                                                </div> 
                                            }
                                        </div>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="dataExpiracao"><b>Data de Expiração:</b></label>
                                        <InputMask mask="99/99/9999" id="dataExpiracao" name="dataExpiracao" id="dataExpiracao" className="form-control" onChange={this.onChangeInput} />
                                        <span className="text text-secondary">Deixe em branco para indicar que a mensagem não terá uma data de expiração</span>
                                        {this.renderMensagemErro(this.state.erroDataInvalida, "Data inválida!")}
                                    </div>
                                </div>
        
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="fundacao"><b>Fundação:</b></label>
                                        <select name="fundacao" className="form-control" id="fundacao" value={this.state.fundacao} onChange={this.onChangeInput}>
                                            <option value="">Selecione uma fundação</option>
                                            <option value={this.state.listaFundacao.CD_FUNDACAO}>{this.state.listaFundacao.NOME_ENTID}</option>
                                        </select>
                                        {this.renderMensagemErro(this.state.erroFundacao, "Selecione a fundação!")}
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="empresa"><b>Empresa:</b></label>
                                        <select name="empresa" className="form-control" id="empresa" value={this.state.empresa} onChange={this.onChangeInput}>
                                            <option value="0000">Todas(os)</option>
                                            {
                                                this.state.listaEmpresa.map((empresa, index) => {
                                                    return (
                                                        <option key={index} value={empresa.CD_EMPRESA}>{empresa.NOME_ENTID}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="plano"><b>Plano:</b></label>
                                        <select name="plano" className="form-control" id="plano" value={this.state.plano} onChange={this.onChangeInput}>
                                            <option value="0">Todas(os)</option>
                                            {
                                                this.state.listaPlano.map((plano, index) => {
                                                    return (
                                                        <option key={index} value={plano.CD_PLANO}>{plano.DS_PLANO}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="situacaoPlano"><b>Situação do plano</b></label>
                                        <select name="situacaoPlano" className="form-control" id="situacaoPlano" value={this.state.situacaoPlano} onChange={this.onChangeInput}>
                                            <option value="0">Todas(os)</option>
                                            {
                                                this.state.listaSituacaoPlano.map((situacaoPlano, index) => {
                                                    return (
                                                        <option key={index} value={situacaoPlano.CD_SIT_PLANO}>{situacaoPlano.DS_SIT_PLANO}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="matricula"><b>Matrícula</b></label>
                                        <InputMask mask="999999999" id="matricula" name="matricula" className="form-control" value={this.state.matricula} onChange={this.onChangeInput} />
                                        <span className="text text-secondary">Deixe em branco para enviar para todas as matrículas dentro dos parâmetros acima</span>
                                    </div>
                                    {this.renderMensagemErro(this.state.erroMatriculaInvalida, "Matrícula Inválida!")}
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={() => this.validar()}>Enviar</button>
                        </div>
                    </div>

                    <div className="box">
                        <div className="box-title">
                            HISTÓRICO DE MENSAGENS
                        </div>
                        <div className="box-content">
                            <ListaMensagens mensagens={this.state.mensagens} />
                        </div>
                    </div>
        
                </div>
            </div>
        );
    }
}