import React from 'react';
import DataInvalida from './_shared/Data';

export default class MensagemNova extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            // States campos
            titulo: "",
            mensagem: "",
            enviarEmail: false,
            enviarSms: false,
            enviarPortal: false,
            dataExpiracao: "",
            fundacao: "",
            empresa: "",
            plano: "",
            situacaoPlano: "",
            matricula: "",

            // States validação
            erroTituloVazio: false,
            erroMensagemVazia: false,
            erroEnviarVia: false,
            erroDataInvalida: false,
            erroMatriculaInvalida: false,

            // States Listas
            listaFundacao: [],
            listaEmpresa: [],
            listaPlano: [],
            listaSituacaoPlano: [],

            modalVisivel: false,
            mensagemId: 1
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
        this.validar = this.validar.bind(this);
        this.validarVazio = this.validarVazio.bind(this);
        this.validarData = this.validarData.bind(this);
        this.validarCheckboxes = this.validarCheckboxes.bind(this);
    }

    onChangeInput(event) {
        var target = event.target;
        var valor = target.value;
        var campo = target.name;

        this.setState({
            [campo]: valor
        }, () => { console.log(this.state) })

    }
    
    onChangeCheckbox(event) {
        var target = event.target;
        var campo = target.name;

        if(campo === 'enviarEmail') {
            this.setState({
                enviarEmail: !this.state.enviarEmail
            }, () => { console.log(this.state) })

        } else if(campo === 'enviarSms') {
            this.setState({
                enviarSms: !this.state.enviarSms
            }, () => { console.log(this.state) })   

        } else {
            this.setState({
                enviarPortal: !this.state.enviarPortal
            }, () => { console.log(this.state) })

        }
    }

    toggleModal(id) {
        this.setState({ 
            modalVisivel: !this.state.modalVisivel,
            mensagemId : id
        });
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
                                <div className="btn-toolbar">
                                    <div className="btn-group mr-2">
                                        <label className="badge badge-success">Portal</label>
                                    </div>
                                    <div className="btn-group mr-2">
                                        <label className="badge badge-info">SMS</label>
                                    </div>
                                    <div className="btn-group mr-2">
                                        <label className="badge badge-danger">E-mail</label>
                                    </div>
                                </div><br/>
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

    validar() {
        var tituloVazio = this.validarVazio(this.state.titulo, "erroTituloVazio");
        var conteudoVazio = this.validarVazio(this.state.mensagem, "erroMensagemVazia");
        var checkboxVazia = this.validarCheckboxes();
        var dataInvalida = this.validarData();

        if(!tituloVazio && !conteudoVazio && !checkboxVazia && !dataInvalida) {
            console.log("Enviando mensagem...");
            // Chamar rota /mensagem/enviar
        } else {
            window.scrollTo(0, 60);
            console.log(this.state);
        }

    }

    validarVazio(valor, campoErro) {
        var campoVazio = (valor === "");
        this.setState({
            [campoErro]: campoVazio
        }, () => { 
            console.log(campoErro, ":", campoVazio);
        })
        return campoVazio;
    }

    validarCheckboxes() {
        var checkboxVazia = (!this.state.enviarEmail && !this.state.enviarSms && !this.state.enviarPortal)
        this.setState({
            erroEnviarVia: checkboxVazia
        })
        return checkboxVazia;
    }

    validarData() {
        var dataObjeto = this.converteData(this.state.dataExpiracao);
        var dataInvalida = DataInvalida(dataObjeto, this.state.dataExpiracao);

        this.setState({ 
            erroDataInvalida: dataInvalida 
        });
        return dataInvalida;
    }

    /**
     * @param {string} dataString Data a ser convertida para Date().
     * @description Método responsável por converter a data recebida (no formato 'dd/mm/aaaa') para date (Objeto).
     */
    converteData(dataString) {
        var dataPartes = dataString.split("/");
        return new Date(dataPartes[2], dataPartes[1] - 1, dataPartes[0]);
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
                                        <label htmlFor="titulo"><b>Título</b></label>
                                        <input name="titulo" id="titulo" className="form-control" maxLength="50" value={this.state.titulo} onChange={this.onChangeInput} />
                                            {this.state.erroTituloVazio &&
                                                <div className="text-danger mt-2 mb-2">
                                                    <i className="fas fa-exclamation-circle"></i>&nbsp;
                                                    Campo Obrigatório!
                                                </div>
                                            }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="mensagem"><b>Corpo da Mensagem:</b></label>
                                        <textarea name="mensagem" id="mensagem" className="form-control" rows="10" value={this.state.mensagem} onChange={this.onChangeInput}/>
                                        {this.state.erroMensagemVazia &&
                                            <div className="text-danger mt-2 mb-2">
                                                <i className="fas fa-exclamation-circle"></i>&nbsp;
                                                Campo Obrigatório!
                                            </div>
                                        }
                                    </div>
        
                                    <div className="form-group">
                                        <label><b>Enviar via:</b></label>
                                        <div className="row">
                                            <div className="col-lg-2">
                                                <input name="enviarEmail" id="enviarEmail" type="checkbox" value={this.state.enviarEmail} onChange={this.onChangeCheckbox} />&nbsp;
                                                <label htmlFor="enviarEmail"><b>E-mail</b></label>
                                            </div>
                                            <div className="col-lg-2">
                                                <input name="enviarSms" id="enviarSms" type="checkbox" value={this.state.enviarSms} onChange={this.onChangeCheckbox} />&nbsp;
                                                <label htmlFor="enviarSms"><b>SMS</b></label>
                                            </div>
                                            <div className="col-lg-2">
                                                <input name="enviarPortal" id="enviarPortal" type="checkbox" value={this.state.enviarPortal} onChange={this.onChangeCheckbox} />&nbsp; 
                                                <label htmlFor="enviarPortal"><b>Portal</b></label>
                                            </div>
                                            {this.state.erroEnviarVia &&
                                            <div className="text-danger col-12 mt-2 mb-2">
                                                <i className="fas fa-exclamation-circle"></i>&nbsp;
                                                Marque ao menos uma opção!
                                            </div>
                                            }
                                        </div>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="dataExpiracao"><b>Data de Expiração:</b></label>
                                        <input name="dataExpiracao" id="dataExpiracao" className="form-control" onChange={this.onChangeInput} />
                                        <span className="text text-secondary">Deixe em branco para indicar que a mensagem não terá uma data de expiração</span>
                                        {this.state.erroDataInvalida &&
                                            <div className="text-danger mt-2 mb-2">
                                                <i className="fas fa-exclamation-circle"></i>&nbsp;
                                                Data inválida!
                                            </div>
                                        }
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
                                        <label htmlFor="empresa"><b>Empresa:</b></label>
                                        <select name="empresa" className="form-control" id="empresa">
                                            <option>Todas(os)</option>
                                            <option>BRB - BANCO DE BRASÍLIA S.A</option>
                                            <option>REGIUS - SOCIEDADE CIVIL DE PREVIDÊNCIA PRIVADA</option>
                                            <option>CARTÃO BRB S/A - PATROCINADORA</option>
                                            <option>BRB - ADMINISTRADORA E CORRETORA DE SEGUROS S.A.</option>
                                            <option>METRO DF - COMPANHIA DO METROPOLITANO DO DF - PATROCINADORA</option>
                                            <option>SAÚDE BRB - CAIXA DE ASSISTÊNCIA</option>
                                        </select>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="plano"><b>Plano:</b></label>
                                        <select name="plano" className="form-control" id="plano">
                                            <option>Todas(os)</option>
                                        </select>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="situacaoPlano"><b>Situação do plano</b></label>
                                        <select name="situacaoPlano" className="form-control" id="situacaoPlano">
                                            <option>Todas(os)</option>
                                        </select>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="registration"><b>Matrícula</b></label>
                                        <input id="registration" className="form-control" />
                                        <span className="text text-secondary">Deixe em branco para enviar para todas as matrículas dentro dos parâmetros acima</span>
                                    </div>
        
        
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={() => this.validar()}>Enviar</button>
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
                                        historicoMensagens.map((mensagem, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th width="55px">
                                                        <button id={"mensagem-" + mensagem.id} className="btn btn-default" onClick={() => this.toggleModal(mensagem.id)}><i className="fa fa-search"></i></button>
                                                        {this.renderModal(this.state.mensagemId)}
                                                    </th>
                                                    <th width="115px">{mensagem.dataCriacao}</th>
                                                    <th>
                                                        <div className="form-row btn-toolbar">
                                                            <div className="btn-group mr-2">
                                                                <label className="badge badge-success">Portal</label>
                                                            </div>
                                                            <div className="btn-group mr-2">
                                                                <label className="badge badge-info">SMS</label>
                                                            </div>
                                                            <div className="btn-group mr-2">
                                                                <label className="badge badge-danger">E-mail</label>
                                                            </div>
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

