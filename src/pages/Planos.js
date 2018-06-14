import React from "react";
import { PlanoService } from "prevsystem-service";

export default class Planos extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            listaPlanos: []
        }

    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="box">
                        <div className="box-content">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Plano</th>
                                        <th width="280px">Situação</th>
                                        <th>Data de inscrição</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <TabelaPlanos />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

class TabelaPlanos extends React.Component {
    constructor(props){
        super(props);

        this.state = { listaPlanos: [] }
        
        PlanoService.Buscar()
            .then((result) => {
                this.setState({
                    listaPlanos: result.data
                });
            });
    }

    render() {
        return (
            this.state.listaPlanos.map((plano, index) => {
                return (
                    <tr key={index}>
                        <td>{plano.DS_PLANO}</td>
                        <td><h5><span className="badge badge-primary">{plano.DS_CATEGORIA}</span></h5></td>
                        <td>{plano.DT_INSC_PLANO}</td>
                        <td>
                            {(plano.DS_CATEGORIA === 'ATIVO' || plano.DS_CATEGORIA === 'AUTOPATROCINIO') &&
                                <button className="btn btn-primary" onClick={() => {}}>Extrato</button>}
                        </td>
                        
                    </tr>
                );
            })
        );
    }
}

