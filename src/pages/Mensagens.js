import React from 'react';

export default class Mensagens extends React.Component {

    handleClick = () => {
        this.props.history.push('/mensagens/nova');
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="box">
                        <div className="box-title">
                            MENSAGENS
                        </div>

                        <div className="box-content">
                            <a href="/mensagens/nova" className="btn-link">
                                <button className="btn btn-primary">
                                    <i className="fas fa-envelope"></i>&nbsp;
                                    Nova Mensagem
                                </button>
                            </a>
                            <br/>
                            <br/>
                            <TabelaMensagens />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const temMensagem = true;
class TabelaMensagens extends React.Component {
    
    render() {
        if (temMensagem) {
            return (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th width="2px"></th>
                            <th width="120px">Data de criação</th>
                            <th>Título</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listaMensagens.map(mensagem => {
                                return (
                                    <tr>
                                        <td><button id={"mensagem-" + mensagem.id} className="btn btn-default btn-sm"><i className="fa fa-search" /></button></td>
                                        <td>{mensagem.dataCriacao}</td>
                                        <td>{mensagem.titulo}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            );
        } else {
            return (
                <label id="sem-mensagem">Nenhuma mensagem enviada.</label>
            );
        }
    }
}

var listaMensagens = [
    {
        id: "1",
        dataCriacao: "21/12/2017",
        titulo: "Aumento de percentual"
    },
    {
        id: "2",
        dataCriacao: "28/12/2017",
        titulo: "Data limite"
    },
    {
        id: "3",
        dataCriacao: "09/02/2018",
        titulo: "Teste Portal"
    }
];
