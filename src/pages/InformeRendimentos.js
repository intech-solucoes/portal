import React from 'react';
import { InfoRendService, FichaFinanceiraService } from "@intechprev/prevsystem-service";
import { Row, Col, Box, Form, Button, Combo } from '../components';
import { Page } from ".";

export default class InformeRendimentos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            datas: [],
            dataSelecionada: {},
            informe: {
                Grupos: []
            },

            datasInformeContribuicoes: [],
            dataInformeContribuicoesSelecionada: "",
            informeContribuicoes: []
        }

        this.page = React.createRef();
    }

    componentDidMount = async () => {
        try {
            var { data: datas } = await InfoRendService.BuscarReferencias();
            var { data: datasInformeContribuicoes } = await FichaFinanceiraService.BuscarDatasInforme();

            await this.setState({ datas, datasInformeContribuicoes });

            if(this.state.datas[0])
                this.selecionarAno(this.state.datas[0]);

            if(this.state.datasInformeContribuicoes[0])
                this.selecionarAnoContribuicoes(this.state.datasInformeContribuicoes[0].ANO_REF);
            
            await this.page.current.loading(false);
        } catch(err) {
            console.error(err);
        }
    }

    selecionarAno = async (ano) => {
        try {
            await this.setState({ dataSelecionada: ano });

            var { data: informe } = await InfoRendService.BuscarPorReferencia(ano);

            this.setState({ informe });
        } catch(err) {
            console.error(err);
        }
    }

    selecionarAnoContribuicoes = async (ano) => {
        try {
            await this.setState({ dataInformeContribuicoesSelecionada: ano });

            var { data: informeContribuicoes } = await FichaFinanceiraService.BuscarInformePorAno(ano);

            this.setState({ informeContribuicoes });
        } catch(err) {
            console.error(err);
        }
    }

    gerarRelatorio = async () => {
        try { 
            var { data: relatorio } = await InfoRendService.Relatorio(this.state.dataSelecionada);
            const url = window.URL.createObjectURL(new Blob([relatorio]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'informe de rendimentos.pdf');
            document.body.appendChild(link);
            link.click();

        } catch(err) {
            console.error(err);
        }
    }

    selecionarAnoContrib = async (e) => {
        this.selecionarAnoContribuicoes(this.state.dataInformeContribuicoesSelecionada);
    }

    render() {
        return (
            <Page {...this.props} ref={this.page}>
                <Row>

                    <Col className="col-lg-6">
                        <Box titulo={"Resumo do Informe de Rendimentos"}>
                            {this.state.datas.length > 0 &&
                                <div>
                                    <Form>
                                        <Row className={"form-group"}>
                                            <label htmlFor="referencia" className="col-sm-2 col-form-label"><b>Referência:</b></label>
                                            <Col className={"col-sm-6"}>
                                                <select id="referencia" className="form-control">
                                                    {this.state.datas.map((data, index) => <option key={index}>{data}</option>)}
                                                </select>
                                            </Col>
                                        </Row>
                                    </Form>

                                    <h4>Ano Exercício: <span className="text-primary">{this.state.informe.ANO_EXERCICIO}</span></h4>
                                    <h4>Ano Calendário: <span className="text-primary">{this.state.informe.ANO_CALENDARIO}</span></h4>
                                    <br/>

                                    {
                                        this.state.informe.Grupos.map((informe, index) => {
                                            return (
                                                <div key={index}>
                                                    <h5><b>{informe.DES_GRUPO}</b></h5>

                                                    <table className="table table-striped">
                                                        <tbody>
                                                                {
                                                                    informe.Itens.map((linha, index) => {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>{linha.DES_INFO_REND}</td>
                                                                                <td className="text-right">
                                                                                    <b>R$ {linha.VAL_LINHA.toLocaleString('pt-br', {minimumFractionDigits: 2})}</b>
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    })
                                                                }
                                                        </tbody>
                                                    </table>
                                                    <br/>
                                                </div>
                                            );
                                        })
                                    }

                                    <Button id="gerar-informe" className="btn btn-primary" titulo={"Gerar Informe de Rendimentos"} onClick={this.gerarRelatorio} />
                                </div>
                            }
    
                            {this.state.datas.length == 0 &&
                                <div id="sem-informe" className="alert alert-danger">Nenhum informe disponível.</div>
                            }
                        </Box>
                    </Col>

                    <Col className="col-lg-6">
                        {this.state.datasInformeContribuicoes.length > 0 &&

                            <Box titulo={"Contribuições Esporádicas ou de Autopatrocínio"}>
                                <p>
                                    Esse demonstrativo relaciona as contribuições Esporádicas ou de Autopatrocinado que foram pagas pelo(a) Sr(a) e que são dedutíveis em sua Declaração de Imposto de Renda.
                                </p>

                                <Form>
                                    <Combo contexto={this} label={"Referência"}
                                           nome="dataInformeContribuicoesSelecionada" valor={this.state.dataInformeContribuicoesSelecionada}
                                           opcoes={this.state.datasInformeContribuicoes} nomeMembro={"ANO_REF"} valorMembro={"ANO_REF"} onChange={this.selecionarAnoContrib} />
                                </Form>
                                
                                <div>
                                    <table className="table table-striped">
                                        <tbody>
                                            {
                                                this.state.informeContribuicoes.map((informe, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{informe.DES_MES_REF}</td>
                                                            <td className="text-right">
                                                                <b>R$ {informe.CONTRIB_PARTICIPANTE.toLocaleString('pt-br', {minimumFractionDigits: 2})}</b>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <br/>
                                </div>
                            </Box>
                        }
                    </Col>
                </Row>
            </Page>
        );
    }
}