import React, { Component } from 'react';

import { validarEmail } from "@intechprev/react-lib";

import { CampoTexto } from '.';
import Alert from './Alert';

export default class Form extends Component {

	constructor(props) {
		super(props);

		this.erros = [];

        this.state = {
            valido: true
        }
    }
    
    validar = async () => {
        this.valido = true;
        this.erros = [];

        await this.props.children
            .filter((campo) => campo.type === CampoTexto) // Filtra os tipos de campo apenas para CampoTexto
            .forEach((campo) => {

                // Valida cada campo
                
                if(campo.props.obrigatorio)
                {
                    if(campo.props.valor === "")
                        this.erros.push(`Campo "${campo.props.label || campo.props.placeholder}" obrigatório.`);
                }

                else if(campo.props.tipo === "email" && validarEmail(campo.props.valor))
                    this.erros.push("E-mail inválido.");

                var valorSemMascara = null;

                if(campo.props.valor !== undefined)
                    valorSemMascara = campo.props.valor.split("_").join("");

                if(campo.props.min && valorSemMascara.length < campo.props.min)
                    this.erros.push(`Campo "${campo.props.label || campo.props.placeholder}" inválido.`);
            });

        await this.setState({
            valido: this.erros.length === 0
        });
    }

    render() {
        const { children } = this.props;

        const childrenWithProps = React.Children.map(children, child => {
            if(child.type === Alert && child.props.padraoFormulario)
                return React.cloneElement(child, { mensagem: this.erros[0] });
            else
                return child;
        });

        return (
            <form>
                {childrenWithProps}
            </form>
        );
    }
}
