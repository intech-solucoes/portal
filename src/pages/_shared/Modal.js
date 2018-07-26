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

    /**
     * @description Renderizar uma badge de acordo com os parâmetros recebidos. A badge informa que a mensagem foi enviada por tal via caso esteja renderizada.
     * @param {string} badgeVisivel No banco, o valor que informa que tal mensagem foi enviada por tal via é "SIM" ou "NAO". A string badgeVisivel informa se a 
     * mensagem foi enviada por um tipo de meio, por isso, para true ("SIM") a badge é renderizada, caso contrário a badge não é renderizada.
     * @param {string} tipoBadge String com o valor do tipo (cor) da badge.
     * @param {string} nomeBadge String com o valor do texto da badge.
     * @returns Div com a badge com cor e nome recebidos.
     */
    renderBadge(badgeVisivel, tipoBadge, nomeBadge) {
        if(badgeVisivel === "SIM") {
            return (
                <div className="btn-group mr-2">
                    <label className={"badge badge-" + tipoBadge}>{nomeBadge}</label>
                </div>
            )
        } else if(badgeVisivel === "NAO")
            return <div></div>
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
                                    {this.renderBadge(this.state.mensagem.IND_PORTAL, "success", "Portal")}

                                    {/* Badge de SMS */}
                                    {this.renderBadge(this.state.mensagem.IND_SMS, "info", "SMS")}
                                    
                                    {/* Badge de E-mail */}
                                    {this.renderBadge(this.state.mensagem.IND_EMAIL, "danger", "E-mail")}
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
