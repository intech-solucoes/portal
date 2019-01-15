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
                        <FormFieldStatic titulo="Nome" valor={this.state.dados.Funcionario.NOME_ENTID} col="12" />
                    </div>

                    <div className="form-row">
                        <FormFieldStatic titulo="Empresa" valor={this.state.dados.NOME_EMPRESA} />
                        <FormFieldStatic titulo="Matrícula" valor={this.state.dados.Funcionario.NUM_MATRICULA} />
                    </div>

                    <div className="form-row">
                        <FormFieldStatic titulo="Sexo" valor={this.state.dados.SEXO} />
                        <FormFieldStatic titulo="Estado Civil" valor={this.state.dados.DS_ESTADO_CIVIL} />
                    </div>

                    <div className="form-row">
                        <FormFieldStatic titulo="RG" valor={this.state.dados.DadosPessoais.NU_IDENT} />
                        <FormFieldStatic titulo="Órgão Emissor RG" valor={this.state.dados.DadosPessoais.ORG_EMIS_IDENT} />
                    </div>
                    <div className="form-row">
                        <FormFieldStatic titulo="Emissão RG" valor={this.state.dados.DadosPessoais.DT_EMIS_IDENT} />
                        <FormFieldStatic titulo="CPF" valor={this.state.dados.CPF} col="6" />
                    </div>
                    <div className="form-row">
                        <FormFieldStatic titulo="Data de nascimento" valor={this.state.dados.DadosPessoais.DT_NASCIMENTO} />
                        <FormFieldStatic titulo="Idade" valor={this.state.dados.IDADE} />
                    </div>
                    <div className="form-row">
                        <FormFieldStatic titulo="Data de Admissão" valor={this.state.dados.Funcionario.DT_ADMISSAO} />
                        <FormFieldStatic titulo="Data de Recadastro" valor={this.state.dados.Funcionario.DT_RECADASTRO} />
                    </div>
                    <div className="form-row">
                        <FormFieldStatic titulo="Nome do Pai" valor={this.state.dados.DadosPessoais.NOME_PAI} />
                        <FormFieldStatic titulo="Nome da Mãe" valor={this.state.dados.DadosPessoais.NOME_MAE} />
                    </div>
                    <div className="form-row">
                        <FormFieldStatic titulo="Contrato Único" valor={"Não Assinado"} />
                        <FormFieldStatic titulo="E-mail" valor={this.state.dados.DadosPessoais.EMAIL_AUX} col="6" />
                    </div>

                    <hr/>

                    <div className="form-row">
                        <FormFieldStatic titulo="Endereço" valor={this.state.dados.Entidade.END_ENTID} />
                        <FormFieldStatic titulo="Número" valor={this.state.dados.Entidade.NR_END_ENTID} />
                    </div>
                    <div className="form-row">
                        <FormFieldStatic titulo="Complemento" valor={this.state.dados.Entidade.COMP_END_ENTID} />
                        <FormFieldStatic titulo="Bairro" valor={this.state.dados.Entidade.BAIRRO_ENTID} />
                    </div>
                    <div className="form-row">
                        <FormFieldStatic titulo="Cidade" valor={this.state.dados.Entidade.CID_ENTID} col="4" />
                        <FormFieldStatic titulo="UF" valor={this.state.dados.Entidade.UF_ENTID} col="2" />
                        <FormFieldStatic titulo="CEP" valor={this.state.dados.CEP} />
                    </div>
                    <br/>
                </Box>
            </Page>
        );
    }
}
