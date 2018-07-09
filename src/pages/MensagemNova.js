import React from 'react';
import { MensagemService } from "prevsystem-service";
import DataInvalida from './_shared/Data';
import ListaMensagens from "./_shared/mensagem/ListaMensagens";

const config = require("../config.json");
const mensagemService = new MensagemService(config);

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

            // States Listas
            listaFundacao: [],
            listaEmpresa: [],
            listaPlano: [],
            listaSituacaoPlano: [],
            mensagens: [],

            modalVisivel: false,
            mensagemId: 1
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
        this.validar = this.validar.bind(this);
        this.validarVazio = this.validarVazio.bind(this);
        this.validarData = this.validarData.bind(this);
        this.validarCheckboxes = this.validarCheckboxes.bind(this);
    }

    componentDidMount() {
        mensagemService.BuscarTodas()
            .then((result) => {
                this.setState({ mensagens: result.data });
            });
    }

    onChangeInput(event) {
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

    validar() {
        var tituloVazio = this.validarVazio(this.state.titulo, "erroTituloVazio");
        var conteudoVazio = this.validarVazio(this.state.mensagem, "erroMensagemVazia");
        var checkboxVazia = this.validarCheckboxes();
        var dataInvalida = this.validarData();

        if(!tituloVazio && !conteudoVazio && !checkboxVazia && !dataInvalida) {
            console.log("Enviando mensagem...");
            // Chamar rota /mensagem/enviar
        } else {
            window.scrollTo(0, 60);
            console.log(this.state);
        }

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
                                            {this.state.erroTituloVazio &&
                                                <div className="text-danger mt-2 mb-2">
                                                    <i className="fas fa-exclamation-circle"></i>&nbsp;
                                                    Campo Obrigatório!
                                                </div>
                                            }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="mensagem"><b>Corpo da Mensagem:</b></label>
                                        <textarea name="mensagem" id="mensagem" className="form-control" rows="10" value={this.state.mensagem} onChange={this.onChangeInput}/>
                                        {this.state.erroMensagemVazia &&
                                            <div className="text-danger mt-2 mb-2">
                                                <i className="fas fa-exclamation-circle"></i>&nbsp;
                                                Campo Obrigatório!
                                            </div>
                                        }
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
                                        <input name="dataExpiracao" id="dataExpiracao" className="form-control" onChange={this.onChangeInput} />
                                        <span className="text text-secondary">Deixe em branco para indicar que a mensagem não terá uma data de expiração</span>
                                        {this.state.erroDataInvalida &&
                                            <div className="text-danger mt-2 mb-2">
                                                <i className="fas fa-exclamation-circle"></i>&nbsp;
                                                Data inválida!
                                            </div>
                                        }
                                    </div>
                                </div>
        
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="fundation"><b>Fundação:</b></label>
                                        <select className="form-control" id="fundation">
                                            <option>REGIUS - SOCIEDADE CIVIL DE PREVIDÊNCIA PRIVADA</option>
                                        </select>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="empresa"><b>Empresa:</b></label>
                                        <select name="empresa" className="form-control" id="empresa">
                                            <option>Todas(os)</option>
                                            <option>BRB - BANCO DE BRASÍLIA S.A</option>
                                            <option>REGIUS - SOCIEDADE CIVIL DE PREVIDÊNCIA PRIVADA</option>
                                            <option>CARTÃO BRB S/A - PATROCINADORA</option>
                                            <option>BRB - ADMINISTRADORA E CORRETORA DE SEGUROS S.A.</option>
                                            <option>METRO DF - COMPANHIA DO METROPOLITANO DO DF - PATROCINADORA</option>
                                            <option>SAÚDE BRB - CAIXA DE ASSISTÊNCIA</option>
                                        </select>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="plano"><b>Plano:</b></label>
                                        <select name="plano" className="form-control" id="plano">
                                            <option>Todas(os)</option>
                                        </select>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="situacaoPlano"><b>Situação do plano</b></label>
                                        <select name="situacaoPlano" className="form-control" id="situacaoPlano">
                                            <option>Todas(os)</option>
                                        </select>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="registration"><b>Matrícula</b></label>
                                        <input id="registration" className="form-control" />
                                        <span className="text text-secondary">Deixe em branco para enviar para todas as matrículas dentro dos parâmetros acima</span>
                                    </div>
        
        
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