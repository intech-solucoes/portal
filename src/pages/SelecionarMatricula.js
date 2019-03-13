import React, { Component } from 'react';
import { PageClean } from '.';
import { Row, Col } from '../components';
import { FuncionarioService, UsuarioService } from '@intechprev/prevsystem-service';

export default class SelecionarMatricula extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            matriculas: []
        }
        this.matriculas = [];
    }

    async componentDidMount() {
        var { data: funcionarios } = await FuncionarioService.BuscarPorCpf();

        for(var i = 0; i < funcionarios.length; i++)
            if(!this.matriculas.includes(funcionarios[i].NUM_MATRICULA))
                this.matriculas.push(funcionarios[i].NUM_MATRICULA);

        await this.setState({ matriculas: this.matriculas });
    }

    selecionar = async (matricula) => {    // salvar essa matricula payload do token, gerando um NOVO.
        var { data: funcionarioResult} = await FuncionarioService.Buscar();
        await localStorage.setItem("fundacao", funcionarioResult.Funcionario.CD_FUNDACAO);
        await localStorage.setItem("empresa", funcionarioResult.Funcionario.CD_EMPRESA);

        var { data: funcionarioLogin } = await UsuarioService.SelecionarMatricula(matricula);
        await localStorage.setItem("token", funcionarioLogin.AccessToken);
        await localStorage.setItem("admin", funcionarioLogin.Admin);

        document.location = ".";
    }

    render() {
        return (
            <PageClean {...this.props}>
                <h4>Selecione uma matrícula</h4>
				<br/>
				<br/>

                {this.state.matriculas.map((matricula, index) => {
                    return (
                        <Row key={index} className={"mb-3"}>
                            <Col>
                                <div className="matricula-card" onClick={() => this.selecionar(matricula)}>
                                    <Row>
                                        <Col>
                                            <label style={{fontSize: 15}}>{matricula}</label>
                                        </Col>

                                        <Col tamanho={"2"} className={"text-right"}>
                                            <i className="fas fa-angle-right"></i>
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
