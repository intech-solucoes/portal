import React from 'react';
import { InfoRendService } from "@intechprev/prevsystem-service";

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

        this.selecionarAno = this.selecionarAno.bind(this);
        this.gerarRelatorio = this.gerarRelatorio.bind(this);
    }

    componentDidMount() {
        InfoRendService.BuscarReferencias()
            .then(result => {
                this.setState({
                    datas: result.data
                }, () => this.selecionarAno(this.state.datas[0]));
            });
    }

    selecionarAno(ano) {
        this.setState({
            dataSelecionada: ano
        }, () => {

            InfoRendService.BuscarPorReferencia(ano)
                .then(result => {
                    this.setState({
                        informe: result.data
                    });
                });

        });
    }

    gerarRelatorio() {
        InfoRendService.Relatorio(this.state.dataSelecionada)
            .then((result) => {
                const url = window.URL.createObjectURL(new Blob([result.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'informe de rendimentos.pdf');
                document.body.appendChild(link);
                link.click();
            });
    }

    render() {
        if (this.state.datas.length > 0) {
            return (
                <div>
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
                                            return (
                                                <div key={index}>
                                                    <h5><b>{informe.DES_GRUPO}</b></h5>

                                                    <table className="table table-striped">
                                                        <tbody>
                                                            <tr key={index}>
                                                                <td>{informe.DES_INFO_REND}</td>
                                                                <td className="text-right">
                                                                    R$ {informe.VAL_LINHA}
                                                                </td>
                                                            </tr>
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
                </div>
            );
        } else {
            return (
                <div id="sem-informe" className="alert alert-danger">Nenhum informe disponível.</div>
            );
        }

    }
}