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

        this.page = React.createRef();
    }

    componentDidMount = async () => {
        var { data: listaPlanos } = await PlanoService.Buscar();
        await this.setState({ listaPlanos });
        await this.page.current.loading(false);
    }

    render() {
        return (
            <Page {...this.props} ref={this.page}>
                <Box>
                    <table className="table" id="tabelaPlanos">
                        <thead>
                            <tr>
                                <th width="250">Plano</th>
                                <th width="280">Situação</th>
                                <th width="180">Categoria</th>
                                <th width="150">Data de inscrição</th>
                                <th width="130"></th>
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
                                            <td align="center">
                                                <Link className={"btn btn-primary btn-sm"} onClick={() => localStorage.setItem("empresa", plano.CD_EMPRESA)} to={`/planos/${plano.CD_PLANO}`}>Detalhes</Link>
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