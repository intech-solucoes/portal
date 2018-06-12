import React from "react";

const listaUltimasMargens = [
    { data: "01/04/2018",   valor: "551,29" },
    { data: "01/03/2018",   valor: "536,10" },
    { data: "01/02/2018",   valor: "541,36" }
];

export default class UltimasMargens extends React.Component {
    render() {
        if(listaUltimasMargens.length > 0) {
            return (
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaUltimasMargens.map((margem, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{margem.data}</td>
                                            <td>{margem.valor}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>

                    <button className="btn btn-primary">Inserir nova margem</button>
                </div>
            );
        } else {
            return (
                <div>
                    Nenhuma margem encontrada.
                </div>
            );
        }
    }
}
