import React from 'react';
import { Badge } from 'reactstrap';

export default class MensagemNova extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisivel: false,
            mensagemId: 1
        }
        this.toggleModal = this.toggleModal.bind(this);
    }


    renderModal(id) {
        if (this.state.modalVisivel) {
            return (
                <div className="modal" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="basicPercentModalTitle">{historicoMensagens[id].titulo}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.toggleModal()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p><b>Data de Criação: </b>{historicoMensagens[id].dataCriacao}</p>
                                <p><b>Fundação: </b>{historicoMensagens[id].fundacao}</p>
                                <p><b>Empresa: </b>{historicoMensagens[id].empresa}</p>
                                <p><b>Plano: </b>{historicoMensagens[id].plano}</p>
                                <p><b>Situação Plano: </b>{historicoMensagens[id].situacaoPlano}</p>
                                <p><b>Matrícula: </b>{historicoMensagens[id].matricula}</p>
                                <p> <Badge color="success">Portal</Badge>                                                            
                                    <Badge color="warning">SMS</Badge>
                                    <Badge color="danger">E-mail</Badge>
                                    <Badge color="info">Mobile</Badge></p>
                                <p>{historicoMensagens[id].conteudo}</p>        
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" onClick={() => this.toggleModal()}>Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else
        {
            return <div></div>
        }
    }

    toggleModal(id) {
        this.setState({ modalVisivel: !this.state.modalVisivel,
                        mensagemId : id
                     });
        console.log(this.state.mensagemId);
    }

    render () {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="box">
                        <div className="box-title">
                            NOVA MENSAGEM
                        </div>
                        
                        <div className="box-content">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="message-title"><b>Título</b></label>
                                        <input id="message-title" className="form-control"></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message-content"><b>Corpo da Mensagem:</b></label>
                                        <textarea id="message-content" className="form-control" rows="10"></textarea>
                                    </div>
        
                                    <div className="form-group">
                                        <label><b>Enviar via:</b></label>
                                        <div className="row">
                                            <div className="col-lg-3">
                                                <input id="email-check" type="checkbox"></input>&nbsp;
                                                <label htmlFor="email-check"><b>E-mail</b></label>
                                            </div>
                                            <div className="col-lg-3">
                                                <input id="mobile-check" type="checkbox"></input>&nbsp;
                                                <label htmlFor="mobile-check"><b>Mobile</b></label>
                                            </div>
                                            <div className="col-lg-3">
                                                <input id="sms-check" type="checkbox"></input>&nbsp;
                                                <label htmlFor="sms-check"><b>SMS</b></label>
                                            </div>
                                            <div className="col-lg-3">
                                                <input id="portal-check" type="checkbox"></input>&nbsp; 
                                                <label htmlFor="portal-check"><b>Portal</b></label>
                                            </div>
                                        </div>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="date-expiration"><b>Data de Expiração:</b></label>
                                        <input id="date-expiration" className="form-control date"></input>
                                        <span className="text text-primary">Deixe em branco para indicar que a mensagem não terá uma data de expiração</span>
                                    </div>
                                </div>
        
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="fundation"><b>Fundação:</b></label>
                                        <select className="form-control" id="fundation">
                                            <option>REGIUS - SOCIEDADE CIVIL DE PREVIDÊNCIA PRIVADA</option>
                                        </select>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="company"><b>Empresa:</b></label>
                                        <select className="form-control" id="company">
                                            <option>BRB - BANCO DE BRASÍLIA S.A</option>
                                            <option>REGIUS - SOCIEDADE CIVIL DE PREVIDÊNCIA PRIVADA</option>
                                            <option>CARTÃO BRB S/A - PATROCINADORA</option>
                                            <option>BRB - ADMINISTRADORA E CORRETORA DE SEGUROS S.A.</option>
                                            <option>METRO DF - COMPANHIA DO METROPOLITANO DO DF - PATROCINADORA</option>
                                            <option>SAÚDE BRB - CAIXA DE ASSISTÊNCIA</option>
                                        </select>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="plan"><b>Plano</b></label>
                                        <input id="plan" className="form-control"></input>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="plan-situation"><b>Situação do plano</b></label>
                                        <input id="plan-situation" className="form-control"></input>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="registration"><b>Matrícula</b></label>
                                        <input id="registration" className="form-control"></input>
                                        <span className="text text-primary">Deixe em branco para enviar para todas as matrículas dentro dos parâmetros acima</span>
                                    </div>
        
        
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Enviar</button>
                        </div>
                    </div>
        
                    <div className="box">
                        <div className="box-title">
                            HISTÓRICO DE MENSAGENS
                        </div>
                        <div className="box-content">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Data de criação</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        historicoMensagens.map(mensagem => {
                                            return (
                                                <tr>
                                                    <th width="55px">
                                                        <button id={"mensagem-" + mensagem.id} className="btn btn-default" onClick={() => this.toggleModal(mensagem.id)}><i className="fa fa-search"></i></button>
                                                        {this.renderModal(this.state.mensagemId)}
                                                    </th>
                                                    <th width="115px">{mensagem.dataCriacao}</th>
                                                    <th>
                                                        <div>
                                                            <Badge color="success">Portal</Badge>
                                                            <Badge color="info">Mobile</Badge>
                                                            <Badge color="warning">SMS</Badge>
                                                            <Badge color="danger">E-mail</Badge>
                                                        </div>
                                                        <p>{mensagem.titulo}</p>
                                                    </th>
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
        );
    }

}

const historicoMensagens = [
    {
        id: "0",
        dataCriacao: "21/12/2017",
        titulo: "Aumento de percentual",
        fundacao: "PREVES - SOCIEDADE CIVIL DE PREVIDENCIA PRIVADA",
        empresa: "BRB - BANCO DE BRASÍLIA S.A.",
        plano: "CONTRIBUIÇÃO DEFINIDA",
        situacaoPlano: "ATIVO",
        matricula: "000067611",
        conteudo: "A data limite para aumento de percentual está chegando. Entre em contato e garanta um futuro melhor. PREVES"
    },
    {
        id: "1",
        dataCriacao: "02/01/2018",
        titulo: "Saudações PREVES",
        fundacao: "PREVES - SOCIEDADE CIVIL DE PREVIDENCIA PRIVADA",
        empresa: "Todas",
        plano: "BENEFÍCIO DEFINIDO",
        situacaoPlano: "Todos",
        matricula: "000048181",
        conteudo: "Teste"
    },
    {
        id: "2",
        dataCriacao: "04/01/2018",
        titulo: "PREVES Informa",
        fundacao: "PREVES - SOCIEDADE CIVIL DE PREVIDENCIA PRIVADA",
        empresa: "Todas",
        plano: "BENEFÍCIO DEFINIDO",
        situacaoPlano: "Todos",
        matricula: "00001234",
        conteudo: "Informativo Preves: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere risus et lacinia pellentesque. In ut imperdiet velit. Cras sagittis quam ac lorem ornare, vitae porta nulla mollis."
    }
];

