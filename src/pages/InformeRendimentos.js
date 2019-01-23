import React from 'react';
import { InfoRendService } from "@intechprev/prevsystem-service";
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
            var result = await InfoRendService.BuscarReferencias();
            await this.setState({ datas: result.data });

            if(this.state.datas[0])
                this.selecionarAno(this.state.datas[0]);
        } catch(err) {
            console.error(err);
        }
    }

    selecionarAno = async (ano) => {
        try {
            await this.setState({ dataSelecionada: ano });
            var result = await InfoRendService.BuscarPorReferencia(ano);
            this.setState({ informe: result.data });
        } catch(err) {
            console.error(err);
        }
    }

    gerarRelatorio = async () => {
        try { 
            var result = await InfoRendService.Relatorio(this.state.dataSelecionada);
            const url = window.URL.createObjectURL(new Blob([result.data]));
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
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="box">
                                <div className="box-title">
                                    Resumo
                                </div>

                                <div className="box-content">
                                    <form>
                                        <div className="form-group row">
                                            <label htmlFor="referencia" className="col-sm-2 col-form-label"><b>Referência:</b></label>
                                            <div className="col-sm-6">
                                                <select id="referencia" className="form-control">
                                                    {this.state.datas.map((data, index) => <option key={index}>{data}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </form>
                                    <h4>Ano Exercício: <span className="text-primary">{this.state.informe.ANO_EXERCICIO}</span></h4>
                                    <h4>Ano Calendário: <span className="text-primary">{this.state.informe.ANO_CALENDARIO}</span></h4>
                                    <br/>
                                    
                                    {
                                        this.state.informe.Grupos.map((informe, index) => {
                                            console.log("informe:", informe);
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
                                                                                    <b>R$ {linha.VAL_LINHA}</b>
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    })
                                                                }
                                                        </tbody>
                                                    </table>
                                                    <br/>
                                                </div>
                                            )
                                        })
                                    }

                                    <button id="gerar-informe" className="btn btn-primary" onClick={this.gerarRelatorio}>Gerar Informe de Rendimentos</button>
                                </div>
                            </div>
                        </div>
                    </div>
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