import React from 'react';
import InformeRendimentosTabela from './_shared/InformeRendimentosTabela';

var informe = true;

export default class InformeRendimentos extends React.Component {
    render() {
        if (informe) {
            return (
                <div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="box">
                                <div className="box-title">
                                    Resumo
                                </div>

                                <div className="box-content">
                                    <form>
                                        <div className="form-group row">
                                            <label htmlFor="referencia" className="col-sm-2 col-form-label"><b>Referência:</b></label>
                                            <div className="col-sm-6">
                                                <select id="referencia" className="form-control">
                                                    <option>2018</option>
                                                    <option>2017</option>
                                                </select>
                                            </div>
                                        </div>
                                    </form>
                                    <h4>Ano Calendário: <span className="text-primary">2017</span></h4>
                                    <AnoAtual />
                                    <br/>
                                    <InformeRendimentosTabela />
                                    <button id="gerar-informe" className="btn btn-primary">Gerar Informe de Rendimentos</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div id="sem-informe" className="alert alert-danger">Nenhum informe disponível.</div>
            );
        }

    }
}

class AnoAtual extends React.Component {
    render() {
      return (
            <div>
                <h4>Ano Exercício: <span id="ano-atual" className="text text-primary">{(new Date().getFullYear())}</span></h4>
            </div>
        );
    }
}
