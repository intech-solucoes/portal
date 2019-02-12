import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { handleFieldChange } from "@intechprev/react-lib";

import { Col, Row } from ".";

var InputMask = require('react-input-mask');

export default class CampoTexto extends Component {
    static propTypes = {
        col: PropTypes.string,
        obrigatorio: PropTypes.bool,
        label: PropTypes.string,
        labelLateral: PropTypes.string,
        nome: PropTypes.string,
        contexto: PropTypes.object,
        parent: PropTypes.object,
        desabilitado: PropTypes.bool,
        max: PropTypes.number,
        min: PropTypes.number,
        valor: PropTypes.string,
        placeholder: PropTypes.string,
        mascara: PropTypes.string,
        tipo: PropTypes.string,
        underline: PropTypes.bool
    }

    render() {
        var col = "col-lg-2";

		if(this.props.col)
            col = this.props.col;
            
        return (
            <div className={"form-group"}>

                {this.props.label &&
                    <label htmlFor={this.props.nome}><b>{this.props.label}</b></label>
                }

                <Row formGroup>
                    
                    {this.props.labelLateral &&
                        <div className={col + " col-md-12 text-lg-right col-form-label"}>
                            <b>
                                <label htmlFor={this.props.nome}>
                                    {this.props.labelLateral}
                                    {this.props.obrigatorio && " *"}
                                </label>
                            </b>
                        </div>
                    }

                    <Col>
                        <InputMask mask={this.props.mascara} id={this.props.nome} name={this.props.nome} value={this.props.valor} maxLength={this.props.max} 
                                className="form-control" type={this.props.tipo} placeholder={this.props.placeholder} id={this.props.nome}
                                disabled={this.props.desabilitado} onChange={(e) => handleFieldChange(this.props.contexto, e, this.props.parent)} 
                                maskChar={this.props.underline ? "_" : ""} />
                    </Col>

                </Row>
            </div>
        )
    }
}
