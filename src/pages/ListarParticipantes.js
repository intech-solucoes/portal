import React, { Component } from 'react';
import { Row, Col, Box, Form, CampoTexto, Button } from '../components';

export default class ListarParticipantes extends Component {

    constructor(props) {
        super(props)

        this.state = {

        };

        this.form = React.createRef();
    };

    selecionar = () => {

    }

    render() {
        return (
            <Row>
                <Col>
                    <Box titulo={"Listagem de Participantes"}>

                        <Form ref={this.form}>

                            <CampoTexto nome={"matricula"} placeholder={"Matricula"} />
                            <CampoTexto nome={"nome"} placeholder={"Nome"} />
                            <Button titulo={"Procurar"} tipo={"primary"} submit />

                        </Form>
                        <br/>

                        <table className={"table"}>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Matrícula</th>
                                    <th>Inscrição</th>
                                    <th>Empresa</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>Participante</td>
                                    <td>000012345</td>
                                    <td>000012345</td>
                                    <td>São Francisco</td>
                                    <td>
                                        <Button titulo={"Selecionar"} tipo={"primary"} pequeno onClick={this.selecionar} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Participante</td>
                                    <td>000012345</td>
                                    <td>000012345</td>
                                    <td>São Francisco</td>
                                    <td>
                                        <Button titulo={"Selecionar"} tipo={"primary"} pequeno />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Participante</td>
                                    <td>000012345</td>
                                    <td>000012345</td>
                                    <td>São Francisco</td>
                                    <td>
                                        <Button titulo={"Selecionar"} tipo={"primary"} pequeno />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </Box>
                </Col>
            </Row>
        );
    }

}