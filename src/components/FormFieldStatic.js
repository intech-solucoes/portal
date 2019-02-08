import React, { Component } from 'react';
import classNames from "classnames";

export default class FormFieldStatic extends Component {

    render() {
        var valor = "";

        if(this.props.valor) {
            valor = this.props.valor;

            console.log(this.props.titulo, typeof(valor));

            if(this.props.tipo === "dinheiro") {
                if(typeof(valor) === "string")
                    valor = `R$ ${Number.parseInt(valor).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                else
                    valor = `R$ ${valor.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            }
        }

        var classes = classNames({
            "form-group": true,
            "col": !this.props.col,
            [`col-${this.props.col}`]: this.props.col
        });
        
        return (
            <div className={classes}>
                <label className="text-primary">{this.props.titulo}</label>
                <label id={this.props.id} className="form-control-plaintext">{valor}</label>
            </div>
        );
    }

}