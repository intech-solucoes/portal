import React from 'react';

var erro = false;
export default class ContraChequeDetalhe extends React.Component {

    render() {
        if(erro) {
            return (
                <div className="alert alert-danger">Não há detalhes do mês {listaCCDetalheMensal.mes}/{listaCCDetalheMensal.ano}</div>
            );
        } else {
            return (
                <div className="row">
                    <div className="col-lg-4">
                        <div className="box">
                            <div className="box-content">
                                <div className="row text-center">
                                    <div className="col-lg-4">
                                        <h5>BRUTO</h5>
                                        <span className="text text-info">R$ {listaCCDetalheMensal.bruto}</span>
                                    </div>
                                    <div className="col-lg-4">
                                        <h5>DESCONTOS</h5>
                                        <span className="text text-danger">R$ {listaCCDetalheMensal.desconto}</span>
                                    </div>
                                    <div className="col-lg-4">
                                        <h5>LÍQUIDO</h5>
                                        <span className="text text-warning">R$ {listaCCDetalheMensal.liquido}</span>
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="box">
                            <div className="box-content">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h2>
                                            <i className="fa fa-plus-circle text-success"></i>
                                            Rendimentos
                                        </h2>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Descrição</th>
                                                    <th>Valor</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    listaRendimentos.map((rendimento, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{rendimento.descricao}</td>
                                                                <td>R$ {rendimento.valor}</td>
                                                            </tr>
                                                        );
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-lg-6">
                                        <h2>
                                            <i className="fa fa-minus-circle text-danger"></i>
                                            Descontos
                                        </h2>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Descrição</th>
                                                    <th>Valor</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    listaDescontos.map(desconto => {
                                                        return (
                                                            <tr>
                                                                <td>{desconto.descricao}</td>
                                                                <td>R$ {desconto.valor}</td>
                                                            </tr>
                                                        );
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <button className="btn btn-default">Imprimir</button>
                            </div>
                        </div>
                    </div>
                </div>
            );

        }

    }

}

const listaRendimentos = [
    {
        descricao: "1520 SUPLEMENTACAO DE APOSENT. ANTECIPADA",
        valor: "12.067,11"
    },
    {
        descricao: "9144 CONTRIBUICAO REGIUS PARIDADE",
        valor: "605,00"
    },
    {
        descricao: "1520 SUPLEMENTACAO DE APOSENT. ANTECIPADA",
        valor: "111,66"
    }
];

const listaDescontos = [
    {
        descricao: "9101 CONTRIBUICAO REGIUS",
        valor: "1.816,31"
    },
    {
        descricao: "9102 CONTRIBUICAO EXTRAORDINARIA",
        valor: "399,03"
    },
    {
        descricao: "9601 CONTRIBUICAO BRB SAUDE - CAIXA DE ASSIST",
        valor: "111,81"
    },
    {
        descricao: "9611 UTILIZACAO BRB SAUDE - CAIXA DE ASSISTEN",
        valor: "79,62"
    },  
];

const listaCCDetalheMensal= {
    ano: "2018",
    mes: "02",
    bruto: "2.618,04",
    desconto: "911,91",
    liquido: "1645,33",
}



