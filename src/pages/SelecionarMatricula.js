import React, { Component } from 'react';
import { PageClean } from '.';
import { Row, Col } from '../components';
import { FuncionarioService } from '@intechprev/prevsystem-service';

export default class SelecionarMatricula extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            matriculas: [
                '09233706761',
                '09233706761'
            ]
        }
    }

    async componentDidMount() {
        

        // await this.setState({ matriculas });

        if(this.state.matriculas.length === 1)
            this.props.history.push('/');
    }

    selecionar = async (matricula) => { // salvar essa matricula payload do token, se n me engano.
                    
        var funcionarioResult = await FuncionarioService.Buscar();
            
        await localStorage.setItem("fundacao", funcionarioResult.data.Funcionario.CD_FUNDACAO);
        await localStorage.setItem("empresa", funcionarioResult.data.Funcionario.CD_EMPRESA);

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
