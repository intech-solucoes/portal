import React, { Component } from 'react';
import { ContrachequeService, PlanoService } from "@intechprev/prevsystem-service";
import { Row, Col, Box } from "../components";
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
        await this.page.current.loading(false);
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

    renderTitulo = (plano, categoria) => { 
        return (
            <div>
                PLANO {plano} <small>SITUAÇÃO: {categoria}</small>
            </div>
        )
    }
    
    render() {
        return (
            <Page {...this.props} ref={this.page}>

                {
                    this.state.planos.map((plano, index) => {
                        return (

                            <Row key={index}>
                                <Col className={"col-lg-8"}>
                                    <Box titulo={this.renderTitulo(plano.DS_PLANO, plano.DS_CATEGORIA)}>

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
                                                                        {valor.VAL_BRUTO.toLocaleString('pt-br', {minimumFractionDigits: 2})}
                                                                    </td>
                                                                    <td className="text-danger">
                                                                        {valor.VAL_DESCONTOS.toLocaleString('pt-br', {minimumFractionDigits: 2})}
                                                                    </td>
                                                                    <td className="text-success">
                                                                        {valor.VAL_LIQUIDO.toLocaleString('pt-br', {minimumFractionDigits: 2})}
                                                                    </td>
                                                                    <td>
                                                                        <Link className={"btn btn-primary btn-sm"} to={`/contracheque/${plano.CD_PLANO}/${valor.DT_REFERENCIA.replace(new RegExp('/', 'g'), '.')}` }>Detalhar</Link>
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
                                    </Box>
                                </Col>
                            </Row>
                        )
                    })
                }

            </Page>
        );
    }
}
