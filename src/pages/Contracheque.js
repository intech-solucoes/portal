import React from 'react';
import { ContrachequeService, PlanoService } from "@intechprev/prevsystem-service";
import { Page } from ".";

export default class ContraCheque extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            planos: []
        }

        this.buscarDatas = this.buscarDatas.bind(this);
        this.page = React.createRef();
    }

    async componentDidMount() {
        var resultPlanos = await PlanoService.Buscar()
        await this.buscarDatas(resultPlanos.data);
    }

    buscarDatas(planos) {
        planos.forEach((plano) => {
            ContrachequeService.BuscarDatas(plano.CD_PLANO)
                .then(result => {
                    plano.contracheque = result.data;

                    this.setState({ 
                        planos: [...this.state.planos, plano]
                    });
                });
        });
    }

    render() {
        return (
            this.state.planos.map((plano, index) => {
                return (
                    <Page {...this.props} ref={this.page}>
                        <div key={index} className="row">
                            <div id={"plano-"} className="col-lg-8">
                                <div className="box">
                                    <div className="box-title">
                                        PLANO {plano.DS_PLANO} <small>SITUAÇÃO: {plano.DS_CATEGORIA}</small>
                                    </div>

                                    <div className="box-content">
                                        {plano.contracheque.length > 0 && 
                                            <table className="table">
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
                                                                        {valor.VAL_BRUTO}
                                                                    </td>
                                                                    <td className="text-danger">
                                                                        {valor.VAL_DESCONTOS}
                                                                    </td>
                                                                    <td className="text-success">
                                                                        {valor.VAL_LIQUIDO}
                                                                    </td>
                                                                    <td>
                                                                        <a href={`/contracheque/${plano.CD_PLANO}/${valor.DT_REFERENCIA.replace(new RegExp('/', 'g'), '.')}` }>Detalhar</a>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        }

                                        {plano.contracheque.length === 0 && 
                                            <div>Nenhum contracheque disponível para este plano.</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Page>
                )
            })
        );
    }
}
