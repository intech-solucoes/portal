import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Button extends Component {
    static propTypes = {
        block: PropTypes.bool,
        pequeno: PropTypes.bool,
        submit: PropTypes.bool,
        titulo: PropTypes.string,
        tipo: PropTypes.string,
        className: PropTypes.string,

        onClick: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            carregando: false
        }
    }

    onClick = async (e) => {
        e.preventDefault();

        if(this.props.usaLoading)
            await this.setState({ carregando: true });

        await this.props.onClick(e);

        if(this.props.usaLoading)
            await this.setState({ carregando: false });
    }

    render() {
        var block = this.props.block ? " btn-block" : "";
        var sm = this.props.pequeno ? " btn-sm" : "";
        var type = this.props.submit ? "submit" : "button";

        return (
            <button type={type} 
                className={"btn btn-" + this.props.tipo + block + sm + " " + this.props.className} 
                onClick={this.onClick} disabled={this.props.desativado || this.state.carregando}
            >
                {!this.state.carregando && 
                    this.props.titulo}

                {this.props.children}

                {this.state.carregando &&
                    <i className="fas fa-spinner fa-pulse"></i>}
            </button>
        )
    }
}
