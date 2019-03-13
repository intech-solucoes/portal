import React, { Component } from "react";
import { handleFieldChange } from "@intechprev/react-lib";
import PropTypes from "prop-types";

export default class Combo extends Component {

	constructor(props) {
		super(props);

		this.erros = [];
		this.possuiErros = false;
	}

    static propTypes = {
        nome: PropTypes.string.isRequired,
        contexto: PropTypes.object.isRequired,
        nomeMembro: PropTypes.string.isRequired,
        valorMembro: PropTypes.string.isRequired,
        valor: PropTypes.string.isRequired,
        obrigatorio: PropTypes.bool,
        desabilitado: PropTypes.bool,
        textoVazio: PropTypes.string,
        padrao: PropTypes.string,
        label: PropTypes.string,
        opcoes: PropTypes.array,
        onChange: PropTypes.func
    };

	static defaultProps = {
		padrao: "",
		opcoes: [],
		textoVazio: "Selecione uma opção"
	}

	async componentDidMount() {
		var nome = this.props.nome;

		// Atualiza o state do combo para o valor padrão selecionado via props.
		await this.props.contexto.setState({
			[nome]: this.props.padrao
        });
	}

	validar = () => {
		this.possuiErros = false;
		this.erros = [];

		if(this.props.obrigatorio)
		{
			if(this.props.valor === "")
				this.erros.push(`Campo "${this.props.label}" obrigatório.`);
		}

		this.possuiErros = this.erros.length > 0;
	}

	onChange = async (e) => {
        await handleFieldChange(this.props.contexto, e);
        
		if(this.props.onChange) {
			await this.props.onChange(e);
		}
	}

    render() {
        return (
			<div className="form-group">
				{this.props.label &&
                    <b><label htmlFor={this.props.nome}>
                        {this.props.label}
                    </label></b>
				}

                <select id={this.props.nome} name={this.props.nome} className="form-control" onChange={this.onChange} 
                        value={this.props.valor} disabled={this.props.desabilitado}>

                    {this.props.textoVazio &&
                        <option value="">{this.props.textoVazio}</option>
                    }

                    {
                        this.props.opcoes.map((opcao, index) => {
                            return (
                                <option key={index} value={opcao[this.props.valorMembro]}>{opcao[this.props.nomeMembro]}</option>
                            )
                        })
                    }
                    
                </select>
            </div>
        )
    }

}
