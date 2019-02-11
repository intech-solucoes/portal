import React from 'react';
import { MensagemService, ListasService } from "@intechprev/prevsystem-service";
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
            enviarSms: false,
            enviarPortal: false,
            enviarMobile: false,
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
            listas: [],
            listaFundacao: [],
            listaEmpresa: [],
            listaPlano: [],
            listaSituacaoPlano: [],
            mensagens: [],

            modalVisivel: false,
            mensagemId: 1
        }

        this.page = React.createRef();
    }

    /**
     * @description Método de ciclo de vida, chamado ao montar o componente. Busca todas as listagens e armazena em seus respectivos states.
     */
    async componentDidMount() {

        try {
            var { data: mensagens } = await MensagemService.BuscarTodas();
            await this.setState({ mensagens })
        } catch(err) {
            console.error(err);
        }

        try {
            var listasResult = await ListasService.ListarFundacaoEmpresaPlano();
            await this.setState({
                listas: listasResult.data, 
                listaFundacao: listasResult.data.Fundacoes,
                listaSituacaoPlano: listasResult.data.SitPlanos
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
            await this.onChangeInput(event);
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
            await this.onChangeInput(event);
            await this.setState({ listaPlano: this.state.listaFundacao[this.state.fundacao - 1].Empresas[this.state.empresa - 1].Planos })
        } catch(err) { 
            this.setState({ 
                listaPlano: [],
                plano: ""
            })
            console.error(err);
        }
    }

    toggleModal = (id) => {
        this.setState({ 
            modalVisivel: !this.state.modalVisivel,
            mensagemId : id
        });
    }

    validar = async () => {
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
            dadosMensagem.NUM_MATRICULA = this.state.matricula;
            dadosMensagem.IND_MOBILE = this.enviarVia(this.state.enviarMobile);
            dadosMensagem.IND_PORTAL = this.enviarVia(this.state.enviarPortal);
            dadosMensagem.IND_EMAIL = this.enviarVia(this.state.enviarEmail);
            dadosMensagem.IND_SMS = this.enviarVia(this.state.enviarSms);
            
            MensagemService.EnviarMensagem(dadosMensagem)
                .then(() => {
                    alert("Mensagem enviada com sucesso!");
                    this.limparStates();
                    MensagemService.BuscarTodas()
                    .then((result) => {
                        this.setState({ mensagens: result.data });
                    })
                    .catch((err) => console.error(err));
                })
                .catch((err) => console.error(err));

        } else {
            window.scrollTo(0, 60);
        }
    }

    /**
     * @description Método que converte o valor booleano dos campos de "enviar mensagem via" para o valor que a requisição precisa receber. Para true é a string "SIM", para false a string "NAO".
     * @param {boolean} valorBooleano Valor booleano armazenado no state "enviarVia".
     */
    enviarVia = (valorBooleano) => {
        if(valorBooleano) 
            return "SIM";
        else 
            return "NAO";
    }

    validarVazio = (valor, campoErro) => {
        var campoVazio = (valor === "");
        this.setState({
            [campoErro]: campoVazio
        })
        return campoVazio;
    }

    validarCheckboxes = () => {
        var checkboxVazia = (!this.state.enviarEmail && !this.state.enviarPortal)
        this.setState({
            erroEnviarVia: checkboxVazia
        })
        return checkboxVazia;
    }

    validarData = () => {
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
    converteData = (dataString) => {
        var dataPartes = dataString.split("/");
        return new Date(dataPartes[2], dataPartes[1] - 1, dataPartes[0]);
    }

    /**
     * @description Método que valida o campo fundação, que deve ser selecionado com uma opção diferente da opção default.
     * @returns {boolean} True para fundação inválida (opção default) e false para fundação válida (sem erro).
     */
    validarFundacao = () => {
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
    validarMatricula = () => {
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

    /**
     * @description Método que limpa os states de campo para limpar o formulário de nova mensagem.
     */
    limparStates = () => {
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

    renderMensagemErro = (stateErro, mensagemErro, id) => {
        if(stateErro) {
            return (
                <div className="text-danger mt-2 mb-2">
                    <i className="fas fa-exclamation-circle"></i>&nbsp;
                    <label id={id}>{mensagemErro}</label>
                </div>
            );
        } else {
            return(<div></div>);
        }
    }

    render () {
        return (
            <Page {...this.props} ref={this.page}>
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
                                            <label htmlFor="tituloMensagem"><b>Título</b></label>
                                            <input name="titulo" id="tituloMensagem" className="form-control" maxLength="50" value={this.state.titulo} onChange={this.onChangeInput} />
                                                {this.renderMensagemErro(this.state.erroTituloVazio, "Campo Obrigatório!", "tituloVazio")}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="mensagem"><b>Corpo da Mensagem:</b></label>
                                            <textarea name="mensagem" id="mensagem" className="form-control" rows="10" value={this.state.mensagem} onChange={this.onChangeInput}/>
                                            {this.renderMensagemErro(this.state.erroMensagemVazia, "Campo Obrigatório!", "mensagemVazia")}
                                        </div>

                                        <div className="form-group">
                                            <label><b>Enviar via:</b></label>
                                            <div className="row">
                                                <div className="col-lg-2">
                                                    <input name="enviarEmail" id="enviarEmail" type="checkbox" checked={this.state.enviarEmail} onChange={this.onChangeInput} />&nbsp;
                                                    <label htmlFor="enviarEmail"><b>E-mail</b></label>
                                                </div>
                                                <div className="col-lg-2">
                                                    <input name="enviarPortal" id="enviarPortal" type="checkbox" checked={this.state.enviarPortal} onChange={this.onChangeInput} />&nbsp; 
                                                    <label htmlFor="enviarPortal"><b>Portal</b></label>
                                                </div>
                                                {this.state.erroEnviarVia && 
                                                    <div className="text-danger col-12 mt-2 mb-2"> 
                                                        <i className="fas fa-exclamation-circle"></i>&nbsp; 
                                                        <label id="enviarViaVazio">Selecione ao menos uma opção!</label>
                                                    </div> 
                                                }
                                            </div>
                                        </div>
            
                                        <div className="form-group">
                                            <label htmlFor="dataExpiracao"><b>Data de Expiração:</b></label>
                                            <InputMask mask="99/99/9999" name="dataExpiracao" id="dataExpiracao" value={this.state.dataExpiracao} className="form-control" onChange={this.onChangeInput} />
                                            <span className="text text-secondary">Deixe em branco para indicar que a mensagem não terá uma data de expiração</span>
                                            {this.renderMensagemErro(this.state.erroDataInvalida, "Data inválida!", "dataExpiracaoInvalida")}
                                        </div>
                                    </div>
            
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="fundacao"><b>Fundação:</b></label>
                                            <select name="fundacao" className="form-control" id="fundacao" value={this.state.fundacao} onChange={this.onChangeFundacao}>
                                                <option value="">Selecione uma fundação</option>
                                                {
                                                    this.state.listaFundacao.map((fundacao, index) => {
                                                        return (
                                                            <option key={index} value={fundacao.CD_FUNDACAO}>{fundacao.NOME_ENTID}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            {this.renderMensagemErro(this.state.erroFundacao, "Selecione a fundação!", "fundacaoVazia")}
                                        </div>
            
                                        <div className="form-group">
                                            <label htmlFor="empresa"><b>Empresa:</b></label>
                                            <select name="empresa" className="form-control" id="empresa" value={this.state.empresa} onChange={this.onChangeEmpresa}>
                                                <option value="">Todas(os)</option>
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
                                                <option value="">Todas(os)</option>
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
                                                <option value="">Todas(os)</option>
                                                {
                                                    this.state.listaSituacaoPlano.map((situacaoPlano, index) => {
                                                        return (
                                                            <option key={index} value={situacaoPlano.CD_SIT_PLANO}>{situacaoPlano.DS_SIT_PLANO}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
            
                                        {/** Tirar underline, permitir numeros incompletos (manda para todos que incluem o número incompleto)  */}
                                        <div className="form-group">
                                            <label htmlFor="matricula"><b>Matrícula</b></label>
                                            <InputMask mask="999999999" id="matricula" name="matricula" className="form-control" value={this.state.matricula} onChange={this.onChangeInput} />
                                            <span className="text text-secondary">Deixe em branco para enviar para todas as matrículas dentro dos parâmetros acima</span>
                                        </div>
                                        {this.renderMensagemErro(this.state.erroMatriculaInvalida, "Matrícula Inválida!", "matriculaInvalida")}
                                    </div>
                                </div>
                                <button id="enviar" type="button" className="btn btn-primary" onClick={() => this.validar()}>Enviar</button>
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
            </Page>
        );
    }
}