import React from 'react';
import { MensagemService, PlanoService } from "@intechprev/prevsystem-service";

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
            var planoResult = await PlanoService.Buscar();

            planoResult.data.map(async (plano) => {

                var resultMensagens = await MensagemService.BuscarPorFundacaoEmpresaPlano(plano.CD_PLANO);
                plano.mensagens = resultMensagens.data;
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
                <div className="row">
                    {
                        this.state.planos.map((plano, index) => {
                            return (
                                <div className="col" key={index}>
                                    <div key={index} className="box">
                                        <div className="box-title">
                                            Mensagens
                                            <small>{plano.DS_PLANO}</small>
                                        </div>
                                        <div className="box-content">
                                            { localStorage.getItem("admin") === "S" &&
                                                <div>
                                                    <button type="button" className="btn btn-primary" onClick={this.handleClick}>
                                                        <i className="fas fa-envelope"></i>&nbsp;
                                                        Nova Mensagem
                                                    </button>
                                                    <br/>
                                                    <br/>
                                                </div>
                                            }

                                            {plano.mensagens.length > 0 &&
                                                <ListaMensagens mensagens={plano.mensagens} />}

                                            {plano.mensagens.length === 0 &&
                                                <div className="alert alert-danger">Nenhuma mensagem enviada.</div>}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Page>
        );
    }
}