import React from 'react';

export default class BeneficioItem extends React.Component {
    render() {
        return (
            listaPlanos.map(plano => {
                if(plano.temEspecie) {
                    return (
                        <div className="box">
                            <div className="box-title">
                                PLANO {plano.nome} <label id="situacao"><small>SITUAÇÃO: {plano.situacaoPlano}</small></label>
                            </div>

                            <div className="box-content">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Espécie</th>
                                            <th>Situação Atual</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            plano.itens.map(item => {
                                                return (
                                                    <tr>
                                                        <td>{item.especie}</td>
                                                        <td>{item.situacaoAtual}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="box">
                            <div className="box-title">
                                PLANO {plano.nome} <label id="situacao"><small>SITUAÇÃO: {plano.situacaoPlano}</small></label>
                            </div>

                            <div className="box-commands">
                                <button id={"simular-aposentadoria-" + plano.id} className="btn btn-primary">
                                    Simular Aposentadoria&nbsp;
                                    <i className="fa fa-chevron-right"></i>
                                </button>
                            </div>

                            <div className="box-content">
                                <label id="sem-beneficios">Você não possui benefícios nesse plano.</label>
                            </div>
                        </div>
                    );
                }
            })  // Fim do map()
        );
    }
}

const listaPlanos = [
    {
        id: "1",
        nome: "BENEFICIO DEFINIDO",
        situacaoPlano: "ASSISTIDO",
        temEspecie: true,
        itens: [
            {
                especie: "APOSENTADORIA POR TEMPO DE CONTRIBUICAO",
                situacaoAtual: "EM MANUTENÇÃO"
            },
            {
                especie: "APOSENTADORIA ANTECIPADA",
                situacaoAtual: "EM MANUTENÇÃO"
            }
        ]
    },
    {
        id: "2",
        nome: "CONTRIBUICAO DEFINIDA",
        situacaoPlano: "ATIVO"
    }
];
