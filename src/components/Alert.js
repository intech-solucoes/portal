import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Alert extends Component {
    static propTypes = {
        mensagem: PropTypes.any,
        tipo: PropTypes.string.isRequired,
        padraoFormulario: PropTypes.bool
    }

    static defaultProps = {
        mensagem: "",
        padraoFormulario: false
    }

    render() {
        return (
            <div>
                {this.props.mensagem &&
                    <div className={"alert alert-" + this.props.tipo}>
                        {this.props.mensagem}
                    </div>
                }
            </div>
        )
    }
}
