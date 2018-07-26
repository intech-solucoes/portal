import React from 'react';
import FormFieldStatic from './_shared/FormFieldStatic';
import DataInvalida from './_shared/Data';
import { PlanoService } from 'prevsystem-service';

var InputMask = require('react-input-mask');

const config = require("../config.json");
const planoService = new PlanoService(config);

export default class DetalhesPlano extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisivel: false,
            dataInicio: "",
            dataFim: "",

            // States de validação e mensagens de erro.
            erroCampoVazio: false,
            erroCampoInvalido: false,
            mensagemErro: "",
            erroDataInicialSuperior: false,
            erroDataFinalSuperior: false,

            cdPlano: props.routeProps.match.params.plano,
            plano: {
                SalarioContribuicao: 0
            },
            extrato: {},
            dependentes: []
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.renderModal = this.renderModal.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.gerarExtrato = this.gerarExtrato.bind(this);
        this.gerarCertificado = this.gerarCertificado.bind(this);

        this.validarVazios = this.validarVazios.bind(this);
        this.validarInvalidos = this.validarInvalidos.bind(this);
        this.converteData = this.converteData.bind(this);
        this.renderizaMensagemErro = this.renderizaMensagemErro.bind(this);
    }

    componentWillMount() {
        planoService.BuscarPorFundacaoEmpresaPlano(this.state.cdPlano)
            .then((result) => {
                this.setState({
                    plano: result.data
                })
            });
    }

    /** 
     * @description Método que altera o state 'modalVisivel' que, consequentemente, deixa a modal visível ou não. Além disso, ao fechar a modal, os states de registros devem 
     * permanecer vazios e os states de erro devem receber'false'. Ao abrir a modal, os states recebem os valores default. 
     */ 
    toggleModal() {
        
        if(this.state.modalVisivel === true) {
            this.setState({
                dataInicio: "",
                dataFim: "",

                erroCampoVazio: false,
                erroCampoInvalido: false,
                mensagemErro: "",
    
                modalVisivel: !this.state.modalVisivel
            }, () => { console.log(this.state) })
        } else {
            this.setState({
                dataInicio: "",
                dataFim: "",

                modalVisivel: !this.state.modalVisivel
            }, () => { console.log(this.state) })
        }
    }

    renderModal() {
        if (this.state.modalVisivel) {
            return (
                <div className="modal" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Período</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.toggleModal()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group" align="center">
                                            <label htmlFor="dataInicio"><b>Data de Início:</b></label>
                                            <InputMask mask="99/99/9999" placeholder="Data inicial" name="dataInicio" id="dataInicio" type="text" className="form-control" 
                                                   value={this.state.dataInicio} onChange={this.onChangeInput} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group" align="center">
                                            <label htmlFor="dataFim"><b>Data Final:</b></label>
                                            <InputMask mask="99/99/9999" placeholder="Data final" name="dataFim" id="dataFim" type="text" className="form-control" 
                                                   value={this.state.dataFim} onChange={this.onChangeInput} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                {this.state.mensagemErro !== "" &&
                                    <div className="text-danger">
                                        <i className="fas fa-exclamation-circle"></i>&nbsp;
                                        {this.state.mensagemErro}
                                    </div>
                                }&nbsp;
                                <button type="button" className="btn btn-primary" onClick={this.validarVazios}>Gerar</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else
            return (<div></div>)

    }

    onChangeInput(event) {
        var target = event.target;
        var valor = target.value;
        var campo = target.name;

        this.setState({
            [campo]: valor
        }, () => { console.log(campo, ":", valor) })
    }

    /**
     * Método que checa se os campos estão vazios e atualiza o state que contém essa informação. Após isso faz uma chamada de validarInvalidos().
     */
    validarVazios() {
        // Variável que armazena true caso um dos campos esteja vazio.
        var campoVazio = (this.state.dataInicio === "" || this.state.dataFim === "")

        this.setState({
            erroCampoVazio: campoVazio
        }, () => { this.validarInvalidos() });

    }

    /**
     * Método que valida os campos dataInicio e dataFim. Para validação das datas é utilizado uma função que valida a data para não aceitar datas 
     * futuras e estar dentro dos limites de dias e meses. Os states são atualizados e faz-se uma chamada ao renderizaMensagemErro().
     */
    validarInvalidos() {
        var dataInicioObjeto = this.converteData(this.state.dataInicio);
        var dataInicioInvalida = DataInvalida(dataInicioObjeto, this.state.dataInicio);

        var dataFimObjeto = this.converteData(this.state.dataFim);
        var dataFimInvalida = DataInvalida(dataFimObjeto, this.state.dataFim);

        // Variável que armazena true caso um dos campos esteja inválido.
        var dataInvalida = dataInicioInvalida || dataFimInvalida;

        if(dataInicioObjeto > dataFimObjeto) {
            this.setState({ erroDataInicialSuperior: true })

        } else if(dataFimObjeto > new Date()) {
            this.setState({ 
                erroDataFinalSuperior: true,
                erroDataInicialSuperior: false
            })

        } else {
            this.setState({
                erroDataInicialSuperior: false,
                erroDataFinalSuperior: false
            })
        }

        this.setState({ 
            erroCampoInvalido: dataInvalida 
        }, () => { this.renderizaMensagemErro() });

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
     * Método que altera o state 'mensagemErro' para o tipo de mensagem que deve ser mostrada para o usuário. Após isso faz uma chamada de gerarExtrato.
     */
    renderizaMensagemErro() {
        // Mensagem de campo vazio é renderizada caso um dos dois campos esteja vazio.
        if(this.state.erroCampoVazio) {
            this.setState({ mensagemErro: "Preencha todos os campos!" })

        // Mensagem de campo inválido é renderizada caso um dos dois campos esteja inválido.
        } else if(this.state.erroCampoInvalido) {
            this.setState({ mensagemErro: "Preencha todos os campos corretamente!" })

        // Mensagem de data inicial superior é renderizada caso a data inicial seja superior que a data final.
        } else if(this.state.erroDataInicialSuperior) {
            this.setState({ mensagemErro: "A data inicial é superior à data final!" })

        // Mensagem de data final superior é renderizada caso a data final seja maior que a data atual.
        } else if(this.state.erroDataFinalSuperior) {
            this.setState({ mensagemErro: "A data final é superior à data atual!" })

        // Nenhuma mensagem de erro é renderizada se os dois campos estão preenchidos corretamente.
        } else {
            this.setState({
                mensagemErro: ""
            }, () => { this.gerarExtrato() })
        }

    }

    gerarExtrato() {
        var dataInicio = this.state.dataInicio.replace(new RegExp('/', 'g'), '.');
        var dataFim = this.state.dataFim.replace(new RegExp('/', 'g'), '.');
        
        planoService.RelatorioExtratoPorPlanoReferencia(this.state.cdPlano, dataInicio, dataFim)
            .then((result) => {
                const url = window.URL.createObjectURL(new Blob([result.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'extrato.pdf');
                document.body.appendChild(link);
                link.click();
            });
    }

    gerarCertificado() {
        planoService.RelatorioCertificado(this.state.cdPlano)
            .then((result) => {
                const url = window.URL.createObjectURL(new Blob([result.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'certificado.pdf');
                document.body.appendChild(link);
                link.click();
            });
    }

    render() {
        return(
            <div>
                <div className="row-12">
                    <div className="box">
                        <div className="box-content">
                            <div className="form-row">
                                <FormFieldStatic titulo="Plano" valor={this.state.plano.DS_PLANO} />
                            </div>
                            <div className="form-row">
                                <FormFieldStatic titulo="Situação no Plano" valor={this.state.plano.DS_CATEGORIA} col="6" />
                                <FormFieldStatic titulo="Data de inscrição" valor={this.state.plano.DT_INSC_PLANO} col="6" />
                            </div>
                            <div className="form-row">
                                <FormFieldStatic titulo="Último Salário de Contribuição" valor='' col="6" />
                                <FormFieldStatic titulo="Percentual de Contribuição Atual" valor='' col="6" />
                            </div>
                            <div className="form-row btn-toolbar">
                                <div className="btn-group mr-2">
                                    <button type="button" id="gerarExtrato" className="btn btn-primary btn-md" onClick={() => this.toggleModal() }>Gerar extrato</button>
                                </div>
                                {this.renderModal()}
                                <div className="btn-group mr-2">
                                    <button type="button" id="gerarCertificado" className="btn btn-primary btn-md" onClick={this.gerarCertificado}>Gerar Certificado de Participação</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
