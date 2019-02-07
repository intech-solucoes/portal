import React, { Component } from "react";
import { Page } from "../";

import { DadosPessoaisService } from "@intechprev/prevsystem-service";

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dados: {
                dadosPessoais: {}
            }
        }

        this.carregarDadosPessoais = this.carregarDadosPessoais.bind(this);
        this.page = React.createRef();
    }

    async carregarDadosPessoais() {
        var result = await DadosPessoaisService.Buscar();
        await this.setState({ dados: result.data });
    }

    async componentDidMount() {
        await this.carregarDadosPessoais();
    }

    render() {
        return (
            <Page {...this.props} ref={this.page}>

                <div style={{ marginBottom: 25 }}>
                    <h4>Olá,</h4>
                    <h3>{this.state.dados.dadosPessoais.NOME_ENTID}</h3>
                </div>

                <div className="row" style={{ marginBottom: 25 }}>
                    <div className="col-lg-4">
                        <div className="card text-white" style={{ backgroundColor: "#015670", textAlign: 'center', borderRadius: 80, padding: 5 }}>
                            <h4>PLANO DE BENEFÍCIOS II</h4>
                            <h5> Ativo </h5>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card text-white" style={{ backgroundColor: "#F56C62", textAlign: 'center', borderRadius: 80, padding: 5 }}>
                            <h5> Data de inscrição </h5>
                            <h4>10/01/2001</h4>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card text-white" style={{ backgroundColor: "#00C7B0", textAlign: 'center', borderRadius: 80, padding: 5 }}>
                            <h5> Valor da cota (01/12/2018) </h5>
                            <h4>3,75</h4>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-lg-3">
                        <div className="card text-white" style={{ backgroundColor: "#BDE5F5", textAlign: 'center' }}>
                            <div className="card-body">
                                <h5>Saldo acumulado</h5>
                                <h4 className="card-title" style={{ color: "#7DC7E9" }}>R$ 149.000,23</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="card text-white" style={{ backgroundColor: "#D3D3FA", textAlign: 'center' }}>
                            <div className="card-body">
                                <h5>Minha contribuição</h5>
                                <h4 className="card-title" style={{ color: "#9689FD" }}>R$ 149.000,23</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="card text-white" style={{ backgroundColor: "#BBECD0", textAlign: 'center' }}>
                            <div className="card-body">
                                <h5>Contribuição patrocinadora</h5>
                                <h4 className="card-title" style={{ color: "#5BB97F" }}>R$ 149.000,23</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="card text-white" style={{ backgroundColor: "#F5D2DE", textAlign: 'center' }}>
                            <div className="card-body">
                                <h5>Rendimento financeiro</h5>
                                <h4 className="card-title" style={{ color: "#EA769A" }}>R$ 149.000,23</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" style={{ marginTop: 25 }}>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-6" style={{ paddingRight: 5 }}>
                                <div className="card text-white" style={{ backgroundColor: "#D3D3FA", textAlign: 'center', border: 'solid 2px' }}>
                                    <div className="card-body">
                                        <h4>Minha última contribuição</h4>
                                        <h3 className="card-title" style={{ color: "#9689FD" }}>R$ 149.000,23</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6" style={{ paddingLeft: 0 }}>
                                <div className="card text-white" style={{ backgroundColor: "#F5D2DE", textAlign: 'center', border: 'solid 2px' }}>
                                    <div className="card-body">
                                        <h4>Última contribuição patrocinadora</h4>
                                        <h3 className="card-title" style={{ color: "#EA769A" }}>R$ 149.000,23</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row" style={{ paddingTop: 5 }}>
                            <div className="col-md-12">
                                <div className="card text-white" style={{ backgroundColor: "#BBECD0", textAlign: 'center', border: 'solid 2px' }}>
                                    <div className="card-body">
                                        <h4>Total em contribuição</h4>
                                        <h3 className="card-title" style={{ color: "#5BB97F" }}>R$ 149.000,23</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4" style={{ paddingLeft: 0 }}>
                        <div className="card text-white" style={{ backgroundColor: "#BDE5F5", height: '100%', border: 'solid 2px', textAlign: 'center', padding: '15%' }}>
                            <h4>Saldo acumulado</h4>
                            <h3 className="card-title" style={{ color: "#7DC7E9" }}>R$ 149.000,23</h3>
                        </div>
                    </div>
                </div>

                <div className="row" style={{ marginTop: 25 }}>
                    <div className="col-md-12">
                        <div className="card text-white" style={{ backgroundColor: "#458BBF", border: 'solid 2px', textAlign: 'center', padding: 20 }}>

                            <div style={{ flexDirection: 'column', padding: 5 }}>
                                <span style={{ fontWeight: 'bold' }}>CARÊNCIA DO PLANO</span>
                                <span> (data da simulação 29/12/2018) </span>
                            </div>

                            <div style={{ flexDirection: 'column', padding: 5 }}>
                                <span style={{ fontWeight: 'bold' }}>Faltam </span>
                                <span> 22 anos, 6 meses e 2 dias </span>
                                <span style={{ fontWeight: 'bold' }}> para sua aposentaria</span>
                            </div>
                        </div>
                    </div>
                </div>

            </Page>
        );
    }
}