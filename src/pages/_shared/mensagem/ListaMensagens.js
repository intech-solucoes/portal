import React from "react";

import Modal from "../Modal";

export default class ListaMensagens extends React.Component {
    constructor(props) {
        super(props);

        this.modal = React.createRef();
    }

    render() {
        return (
            <div>
                <Modal ref={this.modal} />

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
                                        <td width="1px" className="align-middle">
                                            <button id={"mensagem-" + mensagem.OID_MENSAGEM} className="btn btn-link" onClick={() => this.modal.current.toggleModal(mensagem)}><i className="fa fa-search"></i></button>
                                        </td>
                                        <td width="150px" className="align-middle">
                                            {mensagem.DTA_MENSAGEM}
                                        </td>
                                        <td className="align-middle">
                                            <div>
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