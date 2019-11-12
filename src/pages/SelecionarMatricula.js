import React, { Component } from 'react';
import { PageClean } from '.';
import { Row, Col } from '../components';
import { FuncionarioService, UsuarioService } from '@intechprev/prevsystem-service';

export default class SelecionarMatricula extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            funcionarios: []
        }
    }

    async componentDidMount() {
        var { data: funcionarios } = await FuncionarioService.BuscarPorCpf();

        await this.setState({ funcionarios });
    }

    selecionar = async (inscricao) => {    // salvar essa inscricao payload do token, gerando um NOVO.
        var { data: funcionarioResult} = await FuncionarioService.Buscar();
        await localStorage.setItem("fundacao", funcionarioResult.Funcionario.CD_FUNDACAO);
        await localStorage.setItem("empresa", funcionarioResult.Funcionario.CD_EMPRESA);

        var { data: funcionarioLogin } = await UsuarioService.SelecionarInscricao(inscricao.NUM_INSCRICAO);
        await localStorage.setItem("token", funcionarioLogin.AccessToken);
        await localStorage.setItem("admin", funcionarioLogin.Admin);

        document.location = ".";
    }

    render() {
        return (
            <PageClean {...this.props}>
                <h4>Selecione uma inscrição</h4>
				<br/>
				<br/>

                {this.state.funcionarios.map((inscricao, index) => {
                    return (
                        <Row key={index} className={"mb-3"}>
                            <Col>
                                <div className="matricula-card" onClick={() => this.selecionar(inscricao)}>
                                    <Row>
                                        <Col>
                                            <b>Inscrição: </b><label style={{fontSize: 15}}>{inscricao.NUM_INSCRICAO}</label><br/>
                                            <b>Matrícula: </b><label style={{fontSize: 15}}>{inscricao.NUM_MATRICULA}</label>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    );
                })}
               
                <br/>
            </PageClean>
        )
    }

}
