import React from 'react';
import { PlanoService, SalarioBaseService, FichaFechamentoPrevesService } from "@intechprev/prevsystem-service";

import DataInvalida from './_shared/Data';
import { Page } from ".";
import { Box, FormFieldStatic, Row, Col } from "../components";

var InputMask = require('react-input-mask');

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

            cdPlano: props.match.params.plano,
            plano: {
                SalarioContribuicao: 0
            },
            salario: {},
            saldo: {},
            extrato: {},
            dependentes: [],
            possuiSeguro: false
        }
        
    }

    componentDidMount = async () => {
        try {
            var { data: plano } = await PlanoService.BuscarPorCodigo(this.state.cdPlano);
            var { data: possuiSeguro } = await PlanoService.PossuiCertificadoSeguro();
            var { data: salario } = await SalarioBaseService.Buscar();
            var { data: saldo } = await FichaFechamentoPrevesService.BuscarSaldoPorPlano(this.state.cdPlano);

            await this.setState({ plano, possuiSeguro, salario, saldo });
        } catch(err) {
            console.error(err);
        }
    }

    /** 
     * @description Método que altera o state 'modalVisivel' que, consequentemente, deixa a modal visível ou não. Além disso, ao fechar a modal, os states de registros devem 
     * permanecer vazios e os states de erro devem receber'false'. Ao abrir a modal, os states recebem os valores default. 
     */ 
    toggleModal = () => {
        
        if(this.state.modalVisivel === true) {
            this.setState({
                dataInicio: "",
                dataFim: "",

                erroCampoVazio: false,
                erroCampoInvalido: false,
                mensagemErro: "",
    
                modalVisivel: !this.state.modalVisivel
            })
        } else {
            this.setState({
                dataInicio: "",
                dataFim: "",

                modalVisivel: !this.state.modalVisivel
            })
        }
    }

    renderModal = () => {
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

    onChangeInput = (event) => {
        var target = event.target;
        var valor = target.value;
        var campo = target.name;

        this.setState({
            [campo]: valor
        })
    }

    /**
     * Método que checa se os campos estão vazios e atualiza o state que contém essa informação. Após isso faz uma chamada de validarInvalidos().
     */
    validarVazios = () => {
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
    validarInvalidos = () => {
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
    converteData = (dataString) => {
        var dataPartes = dataString.split("/");
        return new Date(dataPartes[2], dataPartes[1] - 1, dataPartes[0]);
    }

    /**
     * Método que altera o state 'mensagemErro' para o tipo de mensagem que deve ser mostrada para o usuário. Após isso faz uma chamada de gerarExtrato.
     */
    renderizaMensagemErro = () => {
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

    gerarExtrato = () => {
        var dataInicio = this.state.dataInicio.replace(new RegExp('/', 'g'), '.');
        var dataFim = this.state.dataFim.replace(new RegExp('/', 'g'), '.');
        var empresa = localStorage.getItem("empresa");

        PlanoService.RelatorioExtratoPorPlanoEmpresaReferencia(this.state.cdPlano, empresa, dataInicio, dataFim)
            .then((result) => {
                const url = window.URL.createObjectURL(new Blob([result.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Extrato.pdf');
                document.body.appendChild(link);
                link.click();
            });
    }

    gerarCertificado = () => {
        var empresa = localStorage.getItem("empresa");
        PlanoService.RelatorioCertificado(this.state.cdPlano, empresa)
            .then((result) => {
                const url = window.URL.createObjectURL(new Blob([result.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Certificado de Participação.pdf');
                document.body.appendChild(link);
                link.click();
            });
    }

    gerarCertificadoSeguro = () => {
        PlanoService.RelatorioCertificadoSeguro()
            .then((result) => {
                var blob = new Blob([result.data], { type: 'application/octet-stream' });
                if (typeof window.navigator.msSaveBlob !== 'undefined') {
                    // IE workaround for "HTML7007: One or more blob URLs were 
                    // revoked by closing the blob for which they were created. 
                    // These URLs will no longer resolve as the data backing 
                    // the URL has been freed."
                    window.navigator.msSaveBlob(blob, 'Certificado de Seguro.zip');
                }
                else {
                    const blobURL = window.URL.createObjectURL(blob);
                    const tempLink = document.createElement('a');
                    tempLink.style.display = 'none';
                    tempLink.href = blobURL;
                    tempLink.setAttribute('download', 'Certificado de Seguro.zip');

                    if (typeof tempLink.download === 'undefined') {
                        tempLink.setAttribute('target', '_blank');
                    }

                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                    window.URL.revokeObjectURL(blobURL);
                }
            });
    }

    render() {
        return(
            <Page {...this.props}>
                <Row>
                    <Col>
                        <Box>
                            <div className="form-row">
                                <FormFieldStatic titulo="Plano" valor={this.state.plano.DS_PLANO} />
                                <FormFieldStatic titulo="Data de inscrição" valor={this.state.plano.DT_INSC_PLANO} />
                            </div>
                            
                            <div className="form-row">
                                <FormFieldStatic titulo="Situação no Plano" valor={this.state.plano.DS_SIT_PLANO} />
                                <FormFieldStatic titulo="Categoria" valor={this.state.plano.DS_CATEGORIA} />
                            </div>

                            <div className="form-row">
                                <FormFieldStatic titulo="Salário de Participação" tipo={"dinheiro"} valor={this.state.salario.VL_SALARIO} />
                            </div>
                        </Box>
                        
                        <Box>
                            <h4>Saldo</h4><br/>

                            {this.state.cdPlano === "0001" &&
                                <div>
                                    <div className="form-row">
                                        <FormFieldStatic titulo="Quantidade de Cotas Participante" valor={this.state.saldo.CotasPartic} />

                                        {this.state.saldo.CotasPatroc !== 0 &&
                                        <FormFieldStatic titulo="Quantidade de Cotas Patrocinadora" valor={this.state.saldo.CotasPatroc} />}
                                    </div>

                                    <div className="form-row">
                                        <FormFieldStatic titulo="Saldo Participante" tipo={"dinheiro"} valor={this.state.saldo.SaldoPartic} />

                                        {this.state.saldo.SaldoPatroc !== 0 &&
                                        <FormFieldStatic titulo="Saldo Patrocinadora" tipo={"dinheiro"} valor={this.state.saldo.SaldoPatroc} />}
                                    </div>

                                    <div className="form-row">
                                        <FormFieldStatic titulo="Saldo Total" tipo={"dinheiro"} valor={this.state.saldo.Total} />
                                    </div>

                                    <div className="form-row">
                                        <FormFieldStatic titulo="Data do Indice" valor={this.state.saldo.DataIndice} />
                                        <FormFieldStatic titulo="Valor do Indice" valor={this.state.saldo.ValorIndice} />
                                    </div>
                                </div>
                            }

                            {this.state.cdPlano === "0002" &&
                                <div>
                                    <div className="form-row">
                                        <FormFieldStatic titulo="Quantidade de Cotas" valor={this.state.saldo.CotasPartic} />
                                        <FormFieldStatic titulo="Saldo" tipo={"dinheiro"} valor={this.state.saldo.SaldoPartic} />
                                    </div>
                                    <div className="form-row">
                                        <FormFieldStatic titulo="Data do Indice" valor={this.state.saldo.DataIndice} />
                                        <FormFieldStatic titulo="Valor do Indice" valor={this.state.saldo.ValorIndice} />
                                    </div>
                                </div>
                            }
                        </Box>
                    </Col>

                    <Col>
                        <Box>
                            <h4>Extrato de Contribuições</h4>

                            <p>Imprima o seu extrato para visualizar suas contribuições por período, assim como seu saldo do período.</p>

                            <button type="button" id="gerarExtrato" className="btn btn-primary btn-md" onClick={() => this.toggleModal()}>Gerar extrato</button>

                            {this.renderModal()}
                        </Box>

                        <Box>
                            <h4>Certificado de Participação</h4>

                            <p>Faça download do seu certificado de participação no plano {this.state.plano.DS_PLANO}.</p>
                            
                            <button type="button" id="gerarCertificado" className="btn btn-primary btn-md" onClick={this.gerarCertificado}>Baixar Certificado de Participação</button>
                        </Box>

                        {this.state.possuiSeguro && 
                            <Box>
                                <h4>Certificado de Seguro</h4>

                                <p>Faça download do seu certificado de seguro.</p>
                                <div className="btn-group mr-2">
                                    <button type="button" id="gerarCertificadoSeguro" className="btn btn-primary btn-md" onClick={this.gerarCertificadoSeguro}>Baixar Certificado de Seguro</button>
                                </div>
                            </Box>
                        }
                    </Col>
                </Row>
            </Page>
        );
    }

}