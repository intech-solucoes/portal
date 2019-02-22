import React, { Component } from 'react';

import { validarEmail } from "@intechprev/react-lib";

import { CampoTexto, Combo } from '.';
import Alert from './Alert';

export default class Form extends Component {

	constructor(props) {
		super(props);

		this.erros = [];
        this.campos = [];

        this.state = {
            valido: true,
            erros: []
        }
    }

    validar = async () => {
        this.valido = true;
        this.erros = [];
        this.campos = [];

        await this.buscarCamposRecursiva(this.props.children);
        // console.log("FIM. Campos coletados:", this.campos);
            
        this.campos.forEach((campo) => {
            if(campo.props.obrigatorio) {
                if(campo.props.valor === "")
                    this.erros.push(`Campo "${campo.props.label || campo.props.placeholder}" obrigatório.`);
            }

            //para validação de email não utilizar a prop Obrigatorio
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

    buscarCamposRecursiva = async (children) => {
        try {
            children.map((campo) => {
                if(campo.type === CampoTexto || campo.type === Combo) {
                    this.campos.push(campo);
                } 
                else {
                    if(campo.props.children !== undefined)
                        this.buscarCamposRecursiva(campo.props.children);
                }
            })
        } catch(err) {
            // console.error(err);
        }
    }
    
    render() {
        const { children } = this.props;

        const childrenWithProps = React.Children.map(children, child => {
            try {
                if(child && child.type === Alert && child.props.padraoFormulario) {
                    var mensagem = "";
    
                    for(var i = 0; i < this.erros.length; i++) {
                        // Concatena a mensagem de erros atual com o novo erro da iteração atual
                        mensagem = mensagem + this.erros[i];
                        
                        // Verifica se é o ultimo item da lista de erros. Caso não seja, adiciona quebra de linha
                        if(i !== this.erros.length - 1)
                            mensagem = mensagem + "<br/>";
                    }
    
                    return React.cloneElement(child, { mensagem });
                }
                else return child;
            } catch(err) {
                console.error(err);
            }
        });
        return (
            <form>
                {childrenWithProps}
            </form>
        );
    }
}
