import React from 'react';
import { MensagemService } from "prevsystem-service";

import ListaMensagens from "./_shared/mensagem/ListaMensagens";

const config = require("../config.json");
const mensagemService = new MensagemService(config);

export default class Mensagens extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mensagens: []
        }
    }

    componentDidMount() {
        mensagemService.BuscarPorFundacaoEmpresaPlano('0001')
            .then((result) => {
                this.setState({ mensagens: result.data });
            });
    }

    handleClick = () => {
        this.props.history.push('/mensagens/nova');
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="box">
                        <div className="box-title">
                            MENSAGENS
                        </div>

                        <div className="box-content">
                            <a href="/mensagem/nova" className="btn-link">
                                <button className="btn btn-primary">
                                    <i className="fas fa-envelope"></i>&nbsp;
                                    Nova Mensagem
                                </button>
                            </a>
                            <br/>
                            <br/>

                            {this.state.mensagens.length > 0 &&
                                <ListaMensagens mensagens={this.state.mensagens} />}

                            {this.state.mensagens.length == 0 &&
                                <label id="sem-mensagem">Nenhuma mensagem enviada.</label>}
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}