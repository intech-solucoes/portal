import React from "react";
import { FuncionarioService } from "prevsystem-service";

import FormFieldStatic from "../_shared/FormFieldStatic";
import BoxListaPlanos from "../_shared/plano/BoxListaPlanos";

export default class Home extends React.Component {
    static defaultProps = {
        title: "123"
    }

    constructor(props) {
        super(props);
        this.state = {
            dados: {
                funcionario: {},
                dadosPessoais: {},
                entidade: {}
            }
        };
    }

    componentWillMount() {
        var self = this;
        FuncionarioService.BuscarDados()
            .then((result) => {

                self.setState({
                    dados: result.data
                });

            });
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="box">
                        <div className="box-title">
                            Dados Pessoais
                        </div>

                        <div className="box-content">

                            <div className="form-row">
                                <FormFieldStatic titulo="Nome" valor={this.state.dados.funcionario.NOME_ENTID} col="12" />
                            </div>

                            <div className="form-row">
                                <FormFieldStatic titulo="Empresa" valor={this.state.dados.NOME_EMPRESA} />
                                <FormFieldStatic titulo="Matrícula" valor={this.state.dados.funcionario.NUM_MATRICULA} />
                            </div>

                            <div className="form-row">
                                <FormFieldStatic titulo="Sexo" valor={this.state.dados.SEXO} />
                                <FormFieldStatic titulo="Estado Civil" valor={this.state.dados.DS_ESTADO_CIVIL} />
                            </div>

                            <div className="form-row">
                                <FormFieldStatic titulo="RG" valor={this.state.dados.dadosPessoais.NU_IDENT} />
                                <FormFieldStatic titulo="Órgão Emissor RG" valor={this.state.dados.dadosPessoais.ORG_EMIS_IDENT} />
                            </div>
                            <div className="form-row">
                                <FormFieldStatic titulo="Emissão RG" valor={this.state.dados.dadosPessoais.DT_EMIS_IDENT} />
                                <FormFieldStatic titulo="CPF" valor={this.state.dados.CPF} col="6" />
                            </div>
                            <div className="form-row">
                                <FormFieldStatic titulo="Data de nascimento" valor={this.state.dados.dadosPessoais.DT_NASCIMENTO} />
                                <FormFieldStatic titulo="Idade" valor={this.state.dados.IDADE} />
                            </div>
                            <div className="form-row">
                                <FormFieldStatic titulo="Data de Admissão" valor={this.state.dados.funcionario.DT_ADMISSAO} />
                                <FormFieldStatic titulo="Data de Recadastro" valor={this.state.dados.funcionario.DT_RECADASTRO} />
                            </div>
                            <div className="form-row">
                                <FormFieldStatic titulo="Nome do Pai" valor={this.state.dados.dadosPessoais.NOME_PAI} />
                                <FormFieldStatic titulo="Nome da Mãe" valor={this.state.dados.dadosPessoais.NOME_MAE} />
                            </div>
                            <div className="form-row">
                                <FormFieldStatic titulo="Contrato Único" valor={"Não Assinado"} link="Baixar" />
                                <FormFieldStatic titulo="E-mail" valor={this.state.dados.dadosPessoais.EMAIL_AUX} col="6" />
                            </div>

                            <hr/>

                            <div className="form-row">
                                <FormFieldStatic titulo="Endereço" valor={this.state.dados.entidade.END_ENTID} />
                                <FormFieldStatic titulo="Número" valor={this.state.dados.entidade.NR_END_ENTID} />
                            </div>
                            <div className="form-row">
                                <FormFieldStatic titulo="Complemento" valor={this.state.dados.entidade.COMP_END_ENTID} />
                                <FormFieldStatic titulo="Bairro" valor={this.state.dados.entidade.BAIRRO_ENTID} />
                            </div>
                            <div className="form-row">
                                <FormFieldStatic titulo="Cidade" valor={this.state.dados.entidade.CID_ENTID} col="4" />
                                <FormFieldStatic titulo="UF" valor={this.state.dados.entidade.UF_ENTID} col="2" />
                                <FormFieldStatic titulo="CEP" valor={this.state.dados.CEP} />
                            </div>
                            <br/>
                        </div>
                    </div>

                    <BoxListaPlanos mostrarBotaoExtrato={false} />
                </div>
            </div>
        );
    }
}
