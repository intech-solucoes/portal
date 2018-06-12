import React from 'react';

export default class ContraCheque extends React.Component {

    render() {
        return (
            listaContraCheque.map(contraCheque => {
                return (
                    <div className="row">
                        <div id={"plano-" + contraCheque.id} className="col-lg-8">
                            <div className="box">
                                <div className="box-title">
                                    PLANO {contraCheque.plano} <small>SITUAÇÃO: {contraCheque.situacao}</small>
                                </div>
                                <div className="box-content">
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
                                                contraCheque.valores.map(valor => {
                                                    return (
                                                        <tr>
                                                            <td>{valor.referencia}</td>
                                                            <td className="text-info">{valor.bruto}</td>
                                                            <td className="text-danger">{valor.descontos}</td>
                                                            <td className="text-success">{valor.liquido}</td>
                                                            <td><a href={"/contracheque/detalhe/" + valor.id}>Detalhar</a> </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })

        );
    }
}

var listaContraCheque = [
    {
        id: "beneficio-definido",
        plano: "BENEFÍCIO DEFINIDO",
        situacao: "ASSISTIDO",
        valores: [
            {
                id: "1",
                referencia: "03/2018",
                bruto: "2.706,86",
                descontos: "894,00",
                liquido: "1.818,11"
            },
            {
                id: "2",
                referencia: "04/2018",
                bruto: "3.101,86",
                descontos: "912,30",
                liquido: "2.821,02"
            }
        ]
    },
    {
        id: "contribuicao-definida",
        plano: "CONTRIBUIÇÃO DEFINIDA",
        situacao: "ASSISTIDO",
        valores: [
            {
                id: "1",
                referencia: "01/2018",
                bruto: "2.646,17",
                descontos: "722,00",
                liquido: "1971,69"
            },
            {
                id: "2",
                referencia: "02/2018",
                bruto: "3.101,86",
                descontos: "941,30",
                liquido: "2.117,41"
            },
            {
                id: "3",
                referencia: "03/2018",
                bruto: "2.646,17",
                descontos: "722,00",
                liquido: "1971,69"
            },
            {
                id: "4",
                referencia: "04/2018",
                bruto: "3.101,86",
                descontos: "941,30",
                liquido: "2.117,41"
            }
        ]
    }
];
