import React from 'react';
import FormFieldStatic from './_shared/FormFieldStatic';
import DataInvalida from './_shared/Data';
import { PlanoService, DependenteService } from 'prevsystem-service';

var InputMask = require('react-input-mask');

const config = require("../config.json");
const planoService = new PlanoService(config);
const dependenteService = new DependenteService(config);

export default class DetalhesPlano extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisivel: false,
            dataInicio: "01/04/2014",
            dataFim: "01/03/2018",

            erroCampoVazio: false,
            erroCampoInvalido: false,
            mensagemErro: "",

            cdPlano: props.routeProps.match.params.plano,
            plano: {},
            extrato: {},
            dependentes: []
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.renderModal = this.renderModal.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.gerarExtrato = this.gerarExtrato.bind(this);
        this.gerarCertificado = this.gerarCertificado.bind(this);

        this.validarCampos = this.validarCampos.bind(this);
        this.validarVazios = this.validarVazios.bind(this);
        this.validarInvalidos = this.validarInvalidos.bind(this);
        this.converteData = this.converteData.bind(this);
        this.renderizaMensagemErro = this.renderizaMensagemErro.bind(this);
    }

    componentWillMount() {
        planoService.BuscarPorFundacaoEmpresaPlano(this.state.cdPlano)
            .then((result) => {
                this.setState({ plano: result.data })
            });

            dependenteService.Buscar()
                .then(result => {
                    this.setState({ dependentes: result.data });
                });
    }

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
                dataInicio: "01/04/2014",
                dataFim: "01/03/2018",

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
                                            <InputMask mask="99/99/9999" placeholder="__/__/____" className="form-control"
                                                       name="dataInicio" value={this.state.dataInicio} onChange={this.onChangeInput} />
                                                   
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group" align="center">
                                            <label htmlFor="dataFim"><b>Data Final:</b></label>
                                            <InputMask mask="99/99/9999" placeholder="__/__/____" className="form-control"
                                                       name="dataFim" value={this.state.dataFim} onChange={this.onChangeInput} />
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
                                <button type="button" className="btn btn-primary" onClick={this.validarCampos}>Gerar</button>
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

    validarCampos() {
        this.validarVazios();
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
            this.setState({
                mensagemErro: "Preencha todos os campos!"
            })
        // Mensagem de campo inválido é renderizada caso um dos dois campos esteja inválido.
        } else if(this.state.erroCampoInvalido) {
            this.setState({
                mensagemErro: "Preencha todos os campos corretamente!"
            })
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
                                <FormFieldStatic titulo="Último Salário de Contribuição" dinheiro={true} valor={this.state.plano.SalarioContribuicao} col="6" />
                                <FormFieldStatic titulo="Percentual de Contribuição Atual" valor={this.state.plano.PercentualContribuicao + '%'} col="6" />
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

                {this.state.dependentes.length > 0 &&
                    <div className="row-12">
                        <div className="box">
                            <div className="box-title">
                                Dependentes
                            </div>
                            <div className="box-content">

                                {
                                    this.state.dependentes.map((dependente, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="form-row">
                                                    <FormFieldStatic titulo="Nome" valor={dependente.NOME_DEP} />
                                                </div>

                                                <hr style={{margin: '15px 0'}} />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }

}
