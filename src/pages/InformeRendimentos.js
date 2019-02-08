import React from 'react';
import { InfoRendService } from "@intechprev/prevsystem-service";
import { Row, Col, Box, Form, Button } from '../components';
import { Page } from ".";

export default class InformeRendimentos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            datas: [],
            dataSelecionada: {},
            informe: {
                Grupos: []
            }
        }

        this.page = React.createRef();
    }

    async componentDidMount() {
        try {
            var { data: datas } = await InfoRendService.BuscarReferencias();
            await this.setState({ datas });

            if(this.state.datas[0])
                this.selecionarAno(this.state.datas[0]);
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

    render() {
        if (this.state.datas.length > 0) {
            return (
                <Page {...this.props} ref={this.page}>
                    <Row>
                        <Col className="col-lg-6">
                            <Box titulo={"Resumo"}>
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

                                <Button id="gerar-informe" className="btn btn-primary" titulo={"Gerar Informe de Rendimentos"} 
                                        onClick={this.gerarRelatorio} />
                            </Box>
                        </Col>
                    </Row>
                </Page>
            );
        } else {
            return (
                <Page {...this.props} ref={this.page}>
                    <div id="sem-informe" className="alert alert-danger">Nenhum informe disponível.</div>
                </Page>
            );
        }
    }
}