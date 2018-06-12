import React from "react";

import PlanoService from "../../../services/PlanoService";
import FormFieldStatic from "../FormFieldStatic";

const service = new PlanoService();

export default class BoxListaPlanos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            planos: []
        };
    }

    componentWillMount() {
        var self = this;
        service.Buscar((result) => {
            console.log(result.data);

            self.setState({
                planos: result.data
            });
        }, (err) => {
            console.error(err);
        })
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
                                </div>

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
