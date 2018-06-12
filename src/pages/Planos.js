import React from "react";

export default class Planos extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="box">
                        <div className="box-content">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Plano</th>
                                        <th width="280px" >Situação</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <TabelaPlanos />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

class TabelaPlanos extends React.Component {

    render() {
        return (
            listaPlanos.map(plano => {
                if (plano.situacao === "ATIVO") {
                    return (
                        <tr>
                            <td>{plano.nome}</td>
                            <td><span className="label label-success">{plano.situacao}</span></td>
                            <td width="200"><a href="">Extrato</a></td>
                        </tr>
                    );
                } else {
                    return (
                        <tr>
                            <td>{plano.nome}</td>
                            <td><span className="label label-success">{plano.situacao}</span></td>
                            <td></td>
                        </tr>
                    );
                }
            })
        );
    }

}

const listaPlanos = [
    {
        id: "1",
        nome: "BENEFÍCIO DEFINIDO",
        situacao: "ATIVO"
    },
    {
        id: "2",
        nome: "BENEFÍCIO DEFINIDO",
        situacao: "ASSISTIDO"
    }
];

