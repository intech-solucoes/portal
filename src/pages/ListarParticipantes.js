import React, { Component } from 'react';
import { Row, Col, Box, Form, CampoTexto, Button } from '../components';

import { FuncionarioService, UsuarioService } from "@intechprev/prevsystem-service";

export default class ListarParticipantes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            matricula: "",
            nome: "",
            resultadoPesquisa: []
        };

        this.form = React.createRef();
    };

    pesquisar = async () => {
        var { data: resultadoPesquisa } = await FuncionarioService.Pesquisar(null, null, null, null, this.state.matricula, this.state.nome);
        await this.setState({ resultadoPesquisa });
    }

    selecionar = async (cpf) => {
        try {
            var { data: login } = await UsuarioService.SelecionarParticipante(cpf);
            await localStorage.setItem("token", login.AccessToken);
                        
            var { data: dados } = await FuncionarioService.Buscar();

            await localStorage.setItem("fundacao", dados.Funcionario.CD_FUNDACAO);
            await localStorage.setItem("empresa", dados.Funcionario.CD_EMPRESA);

            document.location = ".";
        } catch(e) {
            alert(e.response.data);
        }
    }

    render() {
        return (
            <Row>
                <Col>
                    <Box titulo={"Listagem de Participantes"}>

                        <Form ref={this.form}>

                            <CampoTexto contexto={this} nome={"matricula"} placeholder={"Matricula"} />
                            <CampoTexto contexto={this} nome={"nome"} placeholder={"Nome"} />
                            <Button titulo={"Procurar"} tipo={"primary"} submit onClick={this.pesquisar} />

                        </Form>

                        {this.state.resultadoPesquisa.length > 0 && 
                            <div>
                                <br/>

                                <table className={"table"}>
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Matrícula</th>
                                            <th>Inscrição</th>
                                            <th>CPF</th>
                                            <th>Empresa</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.resultadoPesquisa.map((func, index) => {
                                            return (
                                                <tr>
                                                    <td>{func.NOME_ENTID}</td>
                                                    <td>{func.NUM_MATRICULA}</td>
                                                    <td>{func.NUM_INSCRICAO}</td>
                                                    <td>{func.CPF_CGC}</td>
                                                    <td>{func.CD_EMPRESA}</td>
                                                    <td>
                                                        <Button titulo={"Selecionar"} tipo={"primary"} pequeno 
                                                                onClick={async () => await this.selecionar(func.CPF_CGC)} />
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </Box>
                </Col>
            </Row>
        );
    }

}