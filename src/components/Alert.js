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

    constructor(props) {
        super(props);

        this.state = {
            mensagem: ""
        }
    }

    async componentDidMount() { 
        await this.setState({ mensagem: this.props.mensagem });
    }

    adicionarErro = async (mensagemErro) => { 
        await this.setState({ 
            mensagem: this.props.mensagem + '<br/>' + mensagemErro
        });
    }

    render() {
        return (
            <div>
                {this.props.mensagem &&
                    <div id="alerta" className={"alert alert-" + this.props.tipo}
                        dangerouslySetInnerHTML={{ __html: this.state.mensagem }}>
                    </div>
                }
            </div>
        )
    }
}