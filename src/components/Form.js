import React, { Component } from 'react';

import { validarEmail } from "@intechprev/react-lib";

import { CampoTexto, Combo, Row } from '.';
import Alert from './Alert';
import { isArray } from 'util';

export default class Form extends Component {

	constructor(props) {
		super(props);

		this.erros = [];
        this.campos = [];

        this.state = {
            valido: true
        }
    }
    
    validar = async () => {
        this.valido = true;
        this.erros = [];
        this.campos = [];

        await this.buscarCamposRecursiva(this.props.children);
    
        console.log("FIM. Campos coletados:", this.campos);
        
        // await this.props.children
        //     .filter((campo) => campo.type === CampoTexto) // Filtra os tipos de campo apenas para CampoTexto
        //     .forEach((campo) => {
        //         console.log(campo);
        //         console.log("validando");
        //         // Valida cada campo
                
        //         if(campo.props.obrigatorio)
        //         {
        //             if(campo.props.valor === "")
        //                 this.erros.push(`Campo "${campo.props.label || campo.props.placeholder}" obrigatório.`);
        //         }

        //         else if(campo.props.tipo === "email" && validarEmail(campo.props.valor))
        //             this.erros.push("E-mail inválido.");

        //         var valorSemMascara = null;

        //         if(campo.props.valor !== undefined)
        //             valorSemMascara = campo.props.valor.split("_").join("");

        //         if(campo.props.min && valorSemMascara.length < campo.props.min)
        //             this.erros.push(`Campo "${campo.props.label || campo.props.placeholder}" inválido.`);
        //     });

        //     await this.setState({
        //         valido: this.erros.length === 0
        // });
    }

    buscarCamposRecursiva = async (children) => {
        console.log(typeof(children));
        if(typeof(children) === "string")
            console.log(typeof(children) === "string", children);

        try {
            children.map((campo, index) => {
                // console.log("index:", index);
                if(campo.type === CampoTexto || campo.type === Combo) {
                    this.campos.push(campo);
                    // if(children.length > children.length + 1)
                    //     this.buscarCamposRecursiva(children[index + 1]);
                } 
                else {
                    if(campo.props.children !== undefined)
                        this.buscarCamposRecursiva(campo.props.children);
                    // else {
                    //     if(children.length > children.length + 1)
                    //         this.buscarCamposRecursiva(children[index + 1]);
                    // }
                }
            })
        } catch(err) {
            console.error(err);
        }
    }

    render() {
        const { children } = this.props;

        const childrenWithProps = React.Children.map(children, child => {
            if(child.type === Alert && child.props.padraoFormulario)
                this.erros.map((index) => {
                    return React.cloneElement(child, { mensagem: this.erros[index] });
                })
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
