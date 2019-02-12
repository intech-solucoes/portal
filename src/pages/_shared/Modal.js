import React from "react";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
    static propTypes = {
        mostrarDados: PropTypes.bool
    };

    static defaultProps = {
        mostrarDados: true
    };

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            mensagem: {}
        };
    }

    toggleModal = (mensagem) => {
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
                    <label id={`badge${nomeBadge}`} className={"badge badge-" + tipoBadge}>{nomeBadge}</label>
                </div>
            )
        } else if(badgeVisivel === "NAO")
            return null
    }

    render() {
        if(this.state.visible) {
            return (
                <div className="modal" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title" id="tituloModal">{this.state.mensagem.TXT_TITULO}</h5>
                                <button type="button" className="close" onClick={() => this.toggleModal()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <p><b>Data de Criação: <label id="dataCriacaoModal">{this.state.mensagem.DTA_MENSAGEM}</label></b></p>

                                {this.props.mostrarDados &&
                                    <div>
                                        <p><b>Fundação: <label id="fundacaoModal">{this.state.mensagem.NOM_FUNDACAO}</label></b></p>
                                        <p><b>Empresa: <label id="empresaModal">{this.state.mensagem.NOM_EMPRESA ? this.state.mensagem.NOM_EMPRESA : "Todas"}</label></b></p>
                                        <p><b>Plano: <label id="planoModal">{this.state.mensagem.DS_PLANO ? this.state.mensagem.DS_PLANO : "Todos"}</label></b></p>
                                        <p><b>Situação Plano: <label id="situacaoPlanoModal">{this.state.mensagem.DS_SIT_PLANO ? this.state.mensagem.DS_SIT_PLANO : "Todas"}</label></b></p>
                                        <p><b>Matrícula: <label id="matriculaModal">{this.state.mensagem.NUM_MATRICULA ? this.state.mensagem.NUM_MATRICULA : "Todas"}</label></b></p>

                                        <div className="btn-toolbar">
                                            {/* Badge do Portal */}
                                            {this.renderBadge(this.state.mensagem.IND_PORTAL, "success", "Portal")}
                                            
                                            {/* Badge de E-mail */}
                                            {this.renderBadge(this.state.mensagem.IND_EMAIL, "danger", "E-mail")}
                                        </div>

                                        <br/>
                                    </div>
                                }
                                
                                <p id="mensagemModal">{this.state.mensagem.TXT_CORPO}</p>
                            </div>

                            <div className="modal-footer">
                                <button id="botaoFecharModal" type="button" className="btn btn-default" onClick={() => this.toggleModal()}>Fechar</button>
                            </div>

                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}
