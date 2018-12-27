import React from "react";
import { Link } from "react-router-dom";
import { PlanoService } from "@intechprev/prevsystem-service";

import { Page } from ".";
import { Box } from "../components";

export default class Planos extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            listaPlanos: []
        }

    }

    componentDidMount = async () => {
        var { data: listaPlanos } = await PlanoService.Buscar();
        await this.setState({ listaPlanos });
    }

    render() {
        return (
            <Page {...this.props}>
                <Box>
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
                            {
                                this.state.listaPlanos.map((plano, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{plano.DS_PLANO}</td>
                                            <td><h5><span className="badge badge-primary">{plano.DS_CATEGORIA}</span></h5></td>
                                            <td>{plano.DT_INSC_PLANO}</td>
                                            <td>
                                                <Link to={`/planos/${plano.CD_PLANO}`}>Detalhes do plano</Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </Box>
            </Page>
        );
    }
}