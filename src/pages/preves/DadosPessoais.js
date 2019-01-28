import React from "react";
import { FuncionarioService } from "@intechprev/prevsystem-service";

import { Page } from "..";

import FormFieldStatic from "../_shared/FormFieldStatic";
import { Box } from "../../components";

export default class DadosPessoais extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dados: {
                Funcionario: {},
                DadosPessoais: {},
                Entidade: {}
            }
        };
    }

    componentWillMount() {
        var self = this;
        FuncionarioService.Buscar()
            .then((result) => {
                self.setState({
                    dados: result.data
                });
            });
    }

    render() {
        return (
            <Page {...this.props}>
                <Box titulo={"Dados Pessoais"}>
                    <div className="form-row">
                        <FormFieldStatic titulo="Nome" valor={this.state.dados.Funcionario.NOME_ENTID} col="12" id="0" />
                    </div>

                    <div className="form-row">
                        <FormFieldStatic titulo="Empresa" valor={this.state.dados.NOME_EMPRESA} id="1" />
                        <FormFieldStatic titulo="Matrícula" valor={this.state.dados.Funcionario.NUM_MATRICULA} id="2" />
                    </div>

                    <div className="form-row">
                        <FormFieldStatic titulo="Sexo" valor={this.state.dados.SEXO} id="3" />
                        <FormFieldStatic titulo="Estado Civil" valor={this.state.dados.DS_ESTADO_CIVIL} id="4" />
                    </div>

                    <div className="form-row">
                        <FormFieldStatic titulo="RG" valor={this.state.dados.DadosPessoais.NU_IDENT} id="5" />
                        <FormFieldStatic titulo="Órgão Emissor RG" valor={this.state.dados.DadosPessoais.ORG_EMIS_IDENT} id="6" />
                    </div>
                    <div className="form-row">
                        <FormFieldStatic titulo="Emissão RG" valor={this.state.dados.DadosPessoais.DT_EMIS_IDENT} id="7" />
                        <FormFieldStatic titulo="CPF" valor={this.state.dados.CPF} col="6" id="8" />
                    </div>
                    <div className="form-row">
                        <FormFieldStatic titulo="Data de nascimento" valor={this.state.dados.DadosPessoais.DT_NASCIMENTO} id="9" />
                        <FormFieldStatic titulo="Idade" valor={this.state.dados.IDADE} id="10" />
                    </div>
                    <div className="form-row">
                        <FormFieldStatic titulo="Data de Admissão" valor={this.state.dados.Funcionario.DT_ADMISSAO} id="11" />
                        <FormFieldStatic titulo="Data de Recadastro" valor={this.state.dados.Funcionario.DT_RECADASTRO} id="12" />
                    </div>
                    <div className="form-row">
                        <FormFieldStatic titulo="Nome do Pai" valor={this.state.dados.DadosPessoais.NOME_PAI} id="13" />
                        <FormFieldStatic titulo="Nome da Mãe" valor={this.state.dados.DadosPessoais.NOME_MAE} id="14" />
                    </div>
                    <div className="form-row">
                        <FormFieldStatic titulo="Contrato Único" valor={"Não Assinado"} id="15" />
                        <FormFieldStatic titulo="E-mail" valor={this.state.dados.DadosPessoais.EMAIL_AUX} col="6" id="16" />
                    </div>

                    <hr/>

                    <div className="form-row">
                        <FormFieldStatic titulo="Endereço" valor={this.state.dados.Entidade.END_ENTID} id="17" />
                        <FormFieldStatic titulo="Número" valor={this.state.dados.Entidade.NR_END_ENTID} id="18" />
                    </div>
                    <div className="form-row">
                        <FormFieldStatic titulo="Complemento" valor={this.state.dados.Entidade.COMP_END_ENTID} id="19" />
                        <FormFieldStatic titulo="Bairro" valor={this.state.dados.Entidade.BAIRRO_ENTID} id="20" />
                    </div>
                    <div className="form-row">
                        <FormFieldStatic titulo="Cidade" valor={this.state.dados.Entidade.CID_ENTID} col="4" id="21" />
                        <FormFieldStatic titulo="UF" valor={this.state.dados.Entidade.UF_ENTID} col="2" id="22" />
                        <FormFieldStatic titulo="CEP" valor={this.state.dados.CEP} id="23" />
                    </div>
                    <br/>
                </Box>
            </Page>
        );
    }
}
