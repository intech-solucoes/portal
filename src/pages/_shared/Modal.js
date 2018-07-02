import React from "react";

export default class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            mensagem: {}
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(mensagem) {
        this.setState({
            visible: !this.state.visible,
            mensagem: mensagem
        });
    }

    render() {
        if(this.state.visible) {
            return (
                <div className="modal" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="basicPercentModalTitle">{this.state.mensagem.TXT_TITULO}</h5>
                                <button type="button" className="close" onClick={() => this.toggleModal()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p><b>Data de Criação: {this.state.mensagem.DTA_MENSAGEM}</b></p>
                                <p><b>Fundação: {this.state.mensagem.NOM_FUNDACAO}</b></p>
                                <p><b>Empresa: {this.state.mensagem.NOM_EMPRESA}</b></p>
                                <p><b>Plano: {this.state.mensagem.DS_PLANO}</b></p>
                                <p><b>Situação Plano: {this.state.mensagem.DS_SIT_PLANO}</b></p>
                                <p><b>Matrícula: {this.state.mensagem.NUM_MATRICULA}</b></p>
                                <div className="btn-toolbar">
                                    {/* Badge do Portal */}
                                    {this.state.mensagem.IND_PORTAL == "SIM" &&
                                        <div className="btn-group mr-2">
                                            <label className="badge badge-success">Portal</label>
                                        </div>
                                    }

                                    {/* Badge de SMS */}
                                    {this.state.mensagem.IND_PORTAL == "SIM" &&
                                        <div className="btn-group mr-2">
                                            <label className="badge badge-info">SMS</label>
                                        </div>
                                    }
                                    
                                    {/* Badge de E-mail */}
                                    {this.state.mensagem.IND_PORTAL == "SIM" &&
                                        <div className="btn-group mr-2">
                                            <label className="badge badge-danger">E-mail</label>
                                        </div>
                                    }
                                </div>
                                <br/>
                                
                                <p>{this.state.mensagem.TXT_CORPO}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" onClick={() => this.toggleModal()}>Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return "";
        }
    }
}
