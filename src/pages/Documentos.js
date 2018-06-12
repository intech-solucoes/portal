import React from 'react';

export default class Documentos extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-lg-4">
                    <div className="box">
                        <div className="box-title">
                            UPLOAD DE DOCUMENTOS
                        </div>
                        <div className="box-content">
                            <div className="form-group">
                                <label htmlFor="titulo-documento"><b>Título:</b></label>
                                <input id="titulo-documento" className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="plano-documento"><b>Plano:</b></label>
                                <select id="plano-documento" className="form-control">
                                    <option>TODOS</option>
                                    <option>BENEFÍCIO DEFINIDO</option>
                                    <option>CONTRIBUIÇÃO DEFINIDA</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="selecionar-documento"><b>Arquivo:</b></label>
                                <form>
                                    <input id="selecionar-documento" type="file"></input>
                                    <hr/>
                                    <button id="salvar-documento" className="btn btn-primary">Salvar</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="box">
                        <div className="box-title">
                            CRIAÇÃO DE PASTA
                        </div>

                        <div className="box-content">
                            <div className="form-group">
                                <label htmlFor="nome-pasta"><b>Nome:</b></label>
                                <input id="nome-pasta" className="form-control"></input>
                            </div>
                            <hr/>
                            <button id="salvar-pasta" className="btn btn-primary">Salvar</button>
                        </div>
                    </div>
                </div>
                <TabelaPastas />
            </div>
        );
    }

}

var documentos = true;
class TabelaPastas extends React.Component {
    render() {
        if(documentos) {
            return(
                <div className="col-lg-8">
                    <div className="box">
                        <div className="box-content">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th className="col">Nome</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listaDiretorios.map(diretorio => {
                                            return (
                                                <tr>
                                                    <td><i className="fa fa-folder-open"></i></td>
                                                    <td><a id={"abrir-pasta-" + diretorio.id} href="">{diretorio.nome}</a></td>
                                                    <td align="right"><button id={"deletar-pasta-" + diretorio.id} className="btn btn-sm btn-danger"><i className="fa fa-trash"></i></button></td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="col-lg-8">
                    <div id="sem-documentos" className="alert alert-danger">Não há documentos salvos.</div>
                </div>
            );
        }
    }
}

var listaDiretorios = [
    {
        id: "1",
        nome: "COFIS"
    },
    {
        id: "2",
        nome: "CONDE"
    },
    {
        id: "3",
        nome: "DIREX"
    },
    {
        id: "4",
        nome: "COPAT"
    }
];
