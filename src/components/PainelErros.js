import React, { Component } from "react";
import PropTypes from 'prop-types'

export default class PainelErros extends Component {
    static propTypes = {
        erros: PropTypes.any.isRequired
    }

    static defaultProps = {
        erros: []
    }

    render() {
        if(this.props.erros.length > 0)
            return (    
                <div className="alert alert-danger" role="alert" 
                    dangerouslySetInnerHTML={{__html: this.props.erros.join("<br/>") }}>
                </div>
            );
        else
            return "";
    }
}