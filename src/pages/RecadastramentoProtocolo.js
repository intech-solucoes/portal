import React from 'react';
import { RecadastramentoService, } from "prevsystem-service";

var config = require("../config.json");
var recadastramentoService = new RecadastramentoService(config);

export default class RecadastramentoProtocolo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div class="box">
                <div class="box-title">
                    Seu recadastramento está sendo processado.
                </div>

                <div class="box-content">
                    <h3>Data de Solicitação</h3>
                    {new Date().toLocaleString()}

                    <br /><br />

                    <h4>Número do protocolo:</h4>
                    <h3>4818103072018073421</h3>
                    <br />
                    <br/>
                </div>
            </div>
        );
    }

}