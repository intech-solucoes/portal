import React, { Component } from "react";
import { Row, Col, Box, Button } from '../components';
import { Page } from ".";

export default class ControleFuncionalidades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }

        this.page = React.createRef();
    }

    componentDidMount = async () => {
    }

    renderModal = () => {
        if (this.state.modalVisivel) {
            return (
                <div className="modal" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group" align="center">
                                            <label htmlFor="fundacao"><b>Fundação:</b></label>
                                            <select id="fundacao" className="form-control"><option>PREVES - SOCIEDADE CIVIL DE PREVIDÊNCIA PRIVADA</option></select>
                                        </div>
                                        <div className="form-group" align="center">
                                            <label htmlFor="empresa"><b>Empresa:</b></label>
                                            <select id="empresa" className="form-control">
                                                <option>PREVES - SOCIEDADE CIVIL DE PREVIDÊNCIA PRIVADA</option>
                                                <option>BRB - BANCO DE BRASÍLIA S.A.</option>
                                                <option>SAUDE BRB - CAIXA DE ASSISTÊNCIA</option>
                                            </select>
                                        </div>
                                        <div className="form-group" align="center">
                                            <label htmlFor="plano"><b>Plano:</b></label>
                                            <select id="plano" className="form-control">
                                                <option>BENEFÍCIO DEFINIDO</option>
                                                <option>CONTRIBUIÇÃO DEFINIDA</option>
                                                <option>CONTRIBUIÇÃO VARIÁVEL</option>
                                            </select>
                                        </div>
                                        <div className="form-group" align="center">
                                            <label htmlFor="data-inicio"><b>Data de Início:</b></label>
                                            <input type="date" id="data-inicio" className="form-control"></input>
                                        </div>
                                        <div className="form-group" align="center">
                                            <label htmlFor="data-final"><b>Data Final:</b></label>
                                            <input type="date" id="data-final" className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group" align="center">
                                            <label htmlFor="motivo-bloqueio"><b>Motivo do Bloqueio:</b></label>
                                            <textarea id="motivo-bloqueio" type="text" className="form-control" rows="7"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" >
                                    <i className="fa fa-lock"></i> Bloquear
                                </button>
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

    toggleModal = () => {
        this.setState({ modalVisivel: !this.state.modalVisivel });
    }

    render() {
        return (
            <Page {...this.props} ref={this.page}>
                <Row>
                    <Col>
                        <Box titulo={"PAINEL DE CONTROLE"}>

                            <Row className="form-group">
                                <label className="col-3" align="right"><b>Planos:</b></label>
                                <Col className="sm-7">
                                    <Button className="btn-danger btn-sm" onClick={() => this.toggleModal()}>
                                        <i className="fas fa-lock"></i>
                                        {" Bloquear"}
                                    </Button>
                                    {this.renderModal()}
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <label className="col-3" align="right"><b>Benefícios:</b></label>
                                <Col className="sm-7">
                                    <Button className="btn-danger btn-sm" onClick={() => this.toggleModal()}>
                                        <i className="fas fa-lock"></i>
                                        {" Bloquear"}
                                    </Button>
                                    {this.renderModal()}
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <label className="col-3" align="right"><b>Contracheque:</b></label>
                                <Col className="sm-7">
                                    <Button className="btn-danger btn-sm" onClick={() => this.toggleModal()}>
                                        <i className="fas fa-lock"></i>
                                        {" Bloquear"}
                                    </Button>
                                    {this.renderModal()}
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <label className="col-3" align="right"><b>Inf. Rendimentos:</b></label>
                                <Col className="sm-7">
                                    <Button className="btn-danger btn-sm" onClick={() => this.toggleModal()}>
                                        <i className="fas fa-lock"></i>
                                        {" Bloquear"}
                                    </Button>
                                    {this.renderModal()}
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <label className="col-3" align="right"><b>Documentos:</b></label>
                                <Col className="sm-7">
                                    <Button className="btn-danger btn-sm" onClick={() => this.toggleModal()}>
                                        <i className="fas fa-lock"></i>
                                        {" Bloquear"}
                                    </Button>
                                    {this.renderModal()}
                                </Col>
                            </Row>
                            

                            <Row className="form-group">
                                <label className="col-3" align="right"><b>Mensagens:</b></label>
                                <Col className="sm-7">
                                    <Button className="btn-danger btn-sm" onClick={() => this.toggleModal()}>
                                        <i className="fas fa-lock"></i>
                                        {" Bloquear"}
                                    </Button>
                                    {this.renderModal()}
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <label className="col-3" align="right"><b>Recadastramento:</b></label>
                                <Col className="sm-7">
                                    <Button className="btn-danger btn-sm" onClick={() => this.toggleModal()}>
                                        <i className="fas fa-lock"></i>
                                        {" Bloquear"}
                                    </Button>
                                    {this.renderModal()}
                                </Col>
                            </Row>
                            
                        </Box>
                    </Col>
                </Row>
            </Page>
        );
    }

}

