import React from "react";
import { PlanoService } from "prevsystem-service";

const config = require("../config.json");
const planoService = new PlanoService(config);

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
        
        planoService.Buscar()
            .then((result) => {
                this.setState({
                    listaPlanos: result.data
                }, () => { console.log(this.state) });
            });
    }

    render() {
        return (
            this.state.listaPlanos.map(plano => {
                return (
                    <tr>
                        <td>{plano.DS_PLANO}</td>
                        <td><span className="label label-success">{plano.DS_CATEGORIA}</span></td>
                        <td>{plano.DT_INSC_PLANO}</td>
                        {plano.DS_CATEGORIA === 'ATIVO' ? <td width="200"><a href="">Extrato</a></td> : <td></td>}
                    </tr>
                );
            })
        );
    }
}

