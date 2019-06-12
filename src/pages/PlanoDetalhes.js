import React from 'react';
import { PlanoService, SalarioBaseService, FichaFechamentoPrevesService } from "@intechprev/prevsystem-service";
import DataInvalida from './_shared/Data';
import { Page } from ".";
import { Box, FormFieldStatic, Row, Col, CampoTexto, Button, Alert, Form } from "../components";

export default class DetalhesPlano extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisivel: false,
            dataInicio: "",
            dataFim: "",

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
        
        this.form = React.createRef();
        this.alert = React.createRef();
        this.page = React.createRef();
    }

    componentDidMount = async () => {
        try {
            var { data: plano } = await PlanoService.BuscarPorCodigo(this.state.cdPlano);
            var { data: possuiSeguro } = await PlanoService.PossuiCertificadoSeguro();
            var { data: salario } = await SalarioBaseService.Buscar();
            var { data: saldo } = await FichaFechamentoPrevesService.BuscarSaldoPorPlano(this.state.cdPlano);
            
            await this.setState({ plano, possuiSeguro, salario, saldo });
            await this.page.current.loading(false);
        } catch(err) {
            console.error(err);
        }
    }

    toggleModal = async () => {
        await this.setState({
            dataInicio: "",
            dataFim: "",
            modalVisivel: !this.state.modalVisivel
        });
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
                            
                            <Form ref={this.form}>
                                <div className="modal-body">
                                    <Row>
                                        <Col className={"col-lg-6"}>
                                            <CampoTexto contexto={this} nome={"dataInicio"} mascara={"99/99/9999"} obrigatorio valor={this.state.dataInicio} 
                                                        label={"Data de Início"} underline />
                                        </Col>

                                        <Col className={"col-lg-6"}>
                                            <CampoTexto contexto={this} nome={"dataFim"} mascara={"99/99/9999"} obrigatorio valor={this.state.dataFim} 
                                                        label={"Data Final"} underline />
                                        </Col>
                                    </Row>
                                    <div>{/** Essa div vazia serve para a busca de campos dentro do Form funcionar. Não remova até eu corrigir. */}</div>
                                </div>

                                <Alert ref={this.alert} padraoFormulario tipo={"danger"} tamanho={"5"} rowClassName={"justify-content-end"} style={{marginRight: 15}} />
                                <div className="modal-footer">
                                    <Button id={"gerar"} titulo={"Gerar"} tipo="primary" submit onClick={this.gerarExtrato} usaLoading />
                                </div>
                            </Form>

                        </div>
                    </div>
                </div>
            );
        }
        else
            return <div></div>

    }

    gerarExtrato = async () => {
        try {
            await this.alert.current.limparErros();
            await this.form.current.validar();
            
            var dataInicio = this.converteData(this.state.dataInicio);
            var dataFim = this.converteData(this.state.dataFim);

            await this.validarData(this.state.dataInicio, dataInicio, "Data de Início");
            await this.validarData(this.state.dataFim, dataFim, "Data Fim");
            
            if(dataInicio > dataFim)
                this.alert.current.adicionarErro("A data inicial é superior à data final");
    
            if(dataFim > new Date())
                this.alert.current.adicionarErro("A data final é superior à data atual");
    
            var empresa = localStorage.getItem("empresa");
            
            if(this.alert.current.state.mensagem.length === 0 && this.alert.current.props.mensagem.length === 0) {
                dataInicio = this.state.dataInicio.replace(new RegExp('/', 'g'), '.');
                dataFim = this.state.dataFim.replace(new RegExp('/', 'g'), '.');

                var { data: relatorio } = await PlanoService.RelatorioExtratoPorPlanoEmpresaReferencia(this.state.cdPlano, empresa, dataInicio, dataFim)
    
                const blobURL = window.URL.createObjectURL(new Blob([relatorio]));
                const tempLink = document.createElement('a');
                tempLink.style.display = 'none';
                tempLink.href = blobURL;
                tempLink.setAttribute('download', "Extrato.pdf");
    
                if (typeof tempLink.download === 'undefined') {
                    tempLink.setAttribute('target', '_blank');
                }
    
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
                window.URL.revokeObjectURL(blobURL);
            }
            
        } catch(err) {
            console.error(err);
        }
    }

    validarData = async (data, dataObjeto, nomeCampo) => {
        if(DataInvalida(dataObjeto, data))
            await this.alert.current.adicionarErro(`Campo "${nomeCampo}" inválido.`);
    }

    converteData = (data) => {
        var dataObjeto = data.split("/");
        dataObjeto = new Date(dataObjeto[2], dataObjeto[1] - 1, dataObjeto[0]);
        return dataObjeto;
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
            <Page {...this.props} ref={this.page}>
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