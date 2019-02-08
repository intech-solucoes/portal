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
                    <table className="table" id="tabelaPlanos">
                        <thead>
                            <tr>
                                <th>Plano</th>
                                <th width="280px">Situação</th>
                                <th width="280px">Categoria</th>
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
                                            <td>{plano.DS_SIT_PLANO}</td>
                                            <td>{plano.DS_CATEGORIA}</td>
                                            <td>{plano.DT_INSC_PLANO}</td>
                                            <td>
                                                <Link onClick={() => localStorage.setItem("empresa", plano.CD_EMPRESA)} to={`/planos/${plano.CD_PLANO}`}>Detalhes do plano</Link>
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