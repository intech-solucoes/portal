import React from "react";
import PropTypes from "prop-types";

import Modal from "../Modal";

export default class ListaMensagens extends React.Component {
    static propTypes = {
        mostrarDados: PropTypes.bool,
    };

    static defaultProps = {
        mostrarDados: true
    };

    constructor(props) {
        super(props);

        this.modal = React.createRef();
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
            return null
    }

    render() {
        return (
            <div>
                <Modal ref={this.modal} mostrarDados={this.props.mostrarDados} />

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Data de criação</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.mensagens.map((mensagem, index) => {
                                return (
                                    <tr key={index}>

                                        <td width="50px" className="align-middle">
                                            <button id={"mensagem-" + mensagem.OID_MENSAGEM} className="btn btn-link" onClick={() => this.modal.current.toggleModal(mensagem)}><i className="fa fa-search"></i></button>
                                        </td>

                                        <td width="150px" className="align-middle">
                                            {mensagem.DTA_MENSAGEM}
                                        </td>

                                        <td className="align-middle">
                                            {this.props.mostrarDados &&
                                                <div>
                                                    {this.renderBadge(mensagem.IND_PORTAL, "success", "Portal")}
                                                    {this.renderBadge(mensagem.IND_EMAIL, "danger", "E-mail")}
                                                </div>
                                            }

                                            {mensagem.TXT_TITULO}
                                        </td>

                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

}