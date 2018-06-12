import React from 'react'

export default class InformeRendimentosTabela extends React.Component {
    
    render() {
        return (
            listaInforme.map(informe => {
                return (
                    <div>
                        <h5><b>{informe.nomeGrupo}</b></h5>

                        <table class="table table-striped">
                            <tbody>
                                {
                                    informe.itens.map(item => {
                                        return (
                                            <tr>
                                                <td>{item.descricao}</td>
                                                <td class="text-right">
                                                    {item.valor}
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                        <br/>
                    </div>
                )
            })
        );
    }
}

const listaInforme = [
    {
        nomeGrupo: "RENDIMENTOS SUJEITOS À TRIBUTAÇÃO EXCLUSIVA (RENDIMENTO LÍQUIDO)",
        itens: [
            {
                descricao: "Décimo Terceiro Salário",
                valor: "1.054,33"
            },
            {
                descricao: "Informações Complementares",
                valor: "4.406.11"
            }
        ]
    },
    {
        nomeGrupo: "RENDIMENTOS TRIBUTÁVEIS, DEDUÇÕES E IMPOSTO RETIDO NA FONTE",
        itens: [
            {
                descricao: "Total dos Rendimentos (inclusive férias)",
                valor: "12.079,44"
            },
            {
                descricao: "Contribuição a entidade de previdência complementar, pública ou privada, e a fundos de aposentadoria programada individual (Fapi) (preencher também o quadro 7)",
                valor: "2.139,82"
            },
            {
                descricao: "Imposto sobre a renda retido na fonte",
                valor: "314,19"
            }
        ]
    }
    
];