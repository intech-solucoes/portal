import React from 'react';

export default class Recadastramento extends React.Component {

    render () {
        return(
            <div className="row">
                <div className="col-lg-12">
                    <div className="box">
                        <div className="box-title">
                            RECADASTRAMENTO
                        </div>
                        <div className="box-content">
                        </div>
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

                {/* <button className="btn btn-primary" onClick={() => document.location = "recadastramentoProtocolo"}>Enviar para análise</button> */}
            </div>
        );
    }
}
