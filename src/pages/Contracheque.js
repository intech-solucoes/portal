import React, { Component } from 'react';
import { ContrachequeService, PlanoService } from "@intechprev/prevsystem-service";
import { Page } from ".";
import { Link } from "react-router-dom";

export default class ContraCheque extends Component {

    constructor(props) {
        super(props);

        this.state = {
            planos: []
        }
        this.page = React.createRef();
    }

    async componentDidMount() {
        var { data: resultPlanos} = await PlanoService.Buscar()
        await this.buscarDatas(resultPlanos);
    }

    buscarDatas = async (planos) => {
        planos.forEach(async (plano) => {
            var { data: datas } = await ContrachequeService.BuscarDatas(plano.CD_PLANO);
            plano.contracheque = datas;

            await this.setState({ 
                planos: [...this.state.planos, plano]
            });
        });
    }

    render() {
        return (
            <Page {...this.props} ref={this.page}>

                {
                    this.state.planos.map((plano, index) => {
                        return (
                            
                                <div key={index} className="row">
                                    <div id={"plano-"} className="col-lg-8">
                                        <div className="box">
                                            <div className="box-title">
                                                PLANO {plano.DS_PLANO} <small>SITUAÇÃO: {plano.DS_CATEGORIA}</small>
                                            </div>

                                            <div className="box-content">
                                                {plano.contracheque.length > 0 && 
                                                    <table className="table" id="tabelaContracheque">
                                                        <thead>
                                                            <tr>
                                                                <th>Referência</th>
                                                                <th>Bruto</th>
                                                                <th>Descontos</th>
                                                                <th>Líquido</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                plano.contracheque.map((valor, index) => {
                                                                    return (
                                                                        <tr key={index} >
                                                                            <td>
                                                                                {valor.DT_REFERENCIA}
                                                                            </td>
                                                                            <td className="text-info">
                                                                                {valor.VAL_BRUTO.toLocaleString('pt-br', {minimumFractionDigits: 2})}
                                                                            </td>
                                                                            <td className="text-danger">
                                                                                {valor.VAL_DESCONTOS.toLocaleString('pt-br', {minimumFractionDigits: 2})}
                                                                            </td>
                                                                            <td className="text-success">
                                                                                {valor.VAL_LIQUIDO.toLocaleString('pt-br', {minimumFractionDigits: 2})}
                                                                            </td>
                                                                            <td>
                                                                                <Link to={`/contracheque/${plano.CD_PLANO}/${valor.DT_REFERENCIA.replace(new RegExp('/', 'g'), '.')}` }>Detalhar</Link>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                }

                                                {plano.contracheque.length === 0 && 
                                                    <div id="semContracheque">Nenhum contracheque disponível para este plano.</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        )
                    })
                }

            </Page>
        );
    }
}
