import React from 'react';
import { RecadastramentoService, } from "prevsystem-service";

var config = require("../config.json");
var recadastramentoService = new RecadastramentoService(config);

export default class Recadastramento extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            passos: []
        };
    }

    componentDidMount() {
        recadastramentoService.BuscarPassos()
            .then(result => {
                this.setState({ passos: result.data });
            });
    }

    render () {
        return(
            <div>
                <div className="row">
                    <div className="col-lg-12 jumbotron">
                        <h1 className="display-4">Bem-vindo(a) ao Recadastramento.</h1>
                        <br/>
                        <p>Manter o seu cadastro atualizado é muito importante. Utilize o formulário abaixo para conferir e atualizar seus dados pessoais e de seus dependentes.</p>
                        <p>Anexe uma foto dos documentos comprobatórios quando houver a necessidade de inclusão, exclusão ou alterações de dependentes, tais como: certidão de casamento, 
                            certidão de nascimento, averbação de separação judicial ou dentre outros.</p>
                    </div>
                </div>

                {
                    this.state.passos.map((passo, index) => {
                        return (
                            <div className="row" key={index}>
                                <div className="col-lg-12">
                                    <div className="box">
                                        <div className="box-title">
                                            {passo.Titulo}
                                            <small>{passo.Subtitulo}</small>
                                        </div>
                                        
                                        <div className="box-content">

                                            <form class="form-horizontal">
                                                <p>{passo.MensagemInicio}</p>

                                                {
                                                    passo.GrupoCampos.map((grupo, index2) => {
                                                        return (
                                                            <div key={index2}>
                                                                <hr style={{margin: '15px 0'}} />
                                                                <h4>{grupo.Titulo}</h4>

                                                                {
                                                                    grupo.Campos.map((campo, index3) => {
                                                                        return (
                                                                            <div class="form-group" key={index3}>
                                                                                <label>{campo.Titulo}: </label>

                                                                                {campo.TipoCampo === "TXT" &&
                                                                                    <input class="form-control" type="text" disabled={!campo.Editavel} value={campo.NovoValor} />}

                                                                                {campo.TipoCampo === "CMB" &&
                                                                                    <select class="form-control">
                                                                                        {campo.Valores.map((valor, index4) => {
                                                                                            return <option key={index4} value={valor.Item1}>{valor.Item2}</option>
                                                                                        })}
                                                                                    </select>
                                                                                }

                                                                                {campo.PodeComprovar &&
                                                                                    <div class="panel-upload">
                                                                                        <input type="file" />
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <br/>
                                                            </div>
                                                        );
                                                    })
                                                }

                                                <p>{passo.MensagemFim}</p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                <button className="btn btn-primary" onClick={() => document.location = "recadastramentoProtocolo"}>Enviar para análise</button>
            </div>
        );
    }
}
