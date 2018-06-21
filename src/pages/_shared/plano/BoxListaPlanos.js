import React from "react";

import { PlanoService } from "prevsystem-service";
import FormFieldStatic from "../FormFieldStatic";

const config = require("../../../config.json");

const planoService = new PlanoService(config);

export default class BoxListaPlanos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            planos: []
        };
    }

    componentWillMount() {
        var self = this;
        planoService.Buscar()
            .then((result) => {

                self.setState({
                    planos: result.data
                });

            });
    }

    render() {
        return (
            this.state.planos.map((plano, index) => {
                return (
                    <div className="box" key={index}>
                        <div className="col-12">
                            <div className="box-title">
                                PLANO {plano.DS_PLANO} <small>SITUAÇÃO: {plano.DS_CATEGORIA}</small>
                            </div>
                            <div className="box-content">
                                <div className="form-row">
                                    {plano.ProcessoBeneficio &&
                                        <div>
                                            <FormFieldStatic titulo="Espécie" valor={plano.ProcessoBeneficio.DS_ESPECIE} />
                                            <FormFieldStatic titulo="Situação Atual" valor={plano.ProcessoBeneficio.DS_SITUACAO} />
                                        </div>
                                    }

                                    {!plano.ProcessoBeneficio &&
                                        <div>Você não possui benefícios neste plano.</div>
                                    }
                                </div><br />

                                {(plano.DS_CATEGORIA === "ATIVO" || plano.DS_CATEGORIA === "AUTOPATROCINIO") && 
                                    <div className="form-row">
                                        <button className="btn btn-primary" onClick={() => {}}>Extrato</button>
                                    </div>
                                }

                                {/* <div className="form-row">
                                    <FormFieldStatic titulo="Salário de Contribuição" valor={"R$" + 5000.25} />
                                    <FormFieldStatic titulo="Percentual de Contribuição" valor={3 + "%"} />
                                </div> */}
                            </div>
                        </div>
                    </div>
                );
            })
        );
    }
}
