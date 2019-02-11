import React from 'react';
import { MensagemService, PlanoService } from "@intechprev/prevsystem-service";
import { Row, Col, Box, Button } from '../components';

import ListaMensagens from "./_shared/mensagem/ListaMensagens";
import { Page } from ".";

export default class Mensagens extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mensagens: [],
            planos: []
        }

        this.page = React.createRef();
    }

    async componentDidMount() {

        try {
            var { data: plano } = await PlanoService.Buscar();

            plano.map(async (plano) => {

                var { data: mensagens } = await MensagemService.BuscarPorFundacaoEmpresaPlano(plano.CD_PLANO);
                plano.mensagens = mensagens;
                await this.setState({
                    planos: [...this.state.planos, plano]
                });

            });

        } catch(err) {
            console.error(err);
        }
            
    }

    handleClick = () => {
        this.props.history.push('/mensagem/nova');
    }

    render() {
        return (
            <Page {...this.props} ref={this.page}>
                <Row>
                    {
                        this.state.planos.map((plano, index) => {
                            return (
                                <Col key={index}>
                                    <Box titulo={"Mensagens"}>
                                        {localStorage.getItem("admin") === "S" &&
                                            <div>
                                                <Button id="novaMensagem" className="btn btn-primary" onClick={this.handleClick}>
                                                    <i className="fas fa-envelope"></i>&nbsp;
                                                    Nova Mensagem
                                                </Button>
                                                <br/>
                                                <br/>
                                            </div>
                                        }

                                        {plano.mensagens.length > 0 &&
                                            <ListaMensagens mostrarDados={false} mensagens={plano.mensagens} />}

                                        {plano.mensagens.length === 0 &&
                                            <div id="alertMensagem" className="alert alert-danger">Nenhuma mensagem enviada.</div>}
                                    </Box>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Page>
        );
    }
}