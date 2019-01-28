import React from 'react';
import { ContrachequeService, PlanoService } from "@intechprev/prevsystem-service";
import { Page } from '.';

var erro = false;
export default class ContrachequeDetalhe extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            plano: {},
            resumo: {},
            contracheque: {
                Proventos: [],
                Descontos: [],
                Resumo: { 
                    Bruto: "",
                    Descontos: "",
                    Liquido: ""
                }
            },
            cdPlano: props.match.params.plano,
            dataReferencia: props.match.params.data
        };

        this.page = React.createRef();
        this.gerarRelatorio = this.gerarRelatorio.bind(this);
    }

    async componentDidMount() {
        var result = await PlanoService.BuscarPorCodigo(this.state.cdPlano);
        await this.setState({ plano: result.data });

        result = await ContrachequeService.BuscarPorPlanoReferenciaTipoFolha(this.state.cdPlano, this.state.dataReferencia);
        await this.setState({ contracheque: result.data });
    }

    gerarRelatorio() {
        ContrachequeService.Relatorio(this.state.cdPlano, this.state.dataReferencia)
            .then((result) => {
                const url = window.URL.createObjectURL(new Blob([result.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'contracheque.pdf');
                document.body.appendChild(link);
                link.click();
            });
    }

    render() {
        if(erro) {
            return (
                <Page {...this.props} ref={this.page}>
                    <div className="alert alert-danger">Não há detalhes para o mês escolhido!</div>
                </Page>
            );
        } else {
            return (
                <Page {...this.props} ref={this.page}>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="box">
                                <div className="box-content">
                                    <div className="row text-center">
                                        <div className="col-lg-4">
                                            <h5>BRUTO</h5>
                                            <span className="text text-info">R$ {this.state.contracheque.Resumo.Bruto.toLocaleString('pt-br', {minimumFractionDigits: 2})}</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <h5>DESCONTOS</h5>
                                            <span className="text text-danger">R$ {this.state.contracheque.Resumo.Descontos.toLocaleString('pt-br', {minimumFractionDigits: 2})}</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <h5>LÍQUIDO</h5>
                                            <span className="text text-warning">R$ {this.state.contracheque.Resumo.Liquido.toLocaleString('pt-br', {minimumFractionDigits: 2})}</span>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="box">
                                <div className="box-content">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <h2>
                                                <i className="fa fa-plus-circle text-success"></i>
                                                Rendimentos
                                            </h2>
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Descrição</th>
                                                        <th>Valor</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.contracheque.Proventos.map((rendimento, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{rendimento.DS_RUBRICA}</td>
                                                                    <td>R$ {rendimento.VALOR_MC.toLocaleString('pt-br', {minimumFractionDigits: 2})}</td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-lg-6">
                                            <h2>
                                                <i className="fa fa-minus-circle text-danger"></i>
                                                Descontos
                                            </h2>
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Descrição</th>
                                                        <th>Valor</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.contracheque.Descontos.map((desconto, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{desconto.DS_RUBRICA}</td>
                                                                    <td>R$ {desconto.VALOR_MC.toLocaleString('pt-br', {minimumFractionDigits: 2})}</td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <button id="gerar-contracheque" className="btn btn-primary" onClick={this.gerarRelatorio}>Baixar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Page>
            );

        }

    }

}
