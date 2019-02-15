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

    adicionarErro = async (mensagemErro) => { 
        var espacamento = this.props.mensagem.length > 0 ? "<br/>" : "";

        await this.setState({
            mensagem: this.state.mensagem + espacamento + mensagemErro
        });
    }

    limparErros = async () => { 
        await this.setState({
            mensagem: ""
        })
    }

    render() {
        return (
            <div>
                {(this.state.mensagem || this.props.mensagem) &&
                    <div id="alerta" className={"alert alert-" + this.props.tipo}
                        dangerouslySetInnerHTML={{ __html: this.props.mensagem + this.state.mensagem }}>
                    </div>
                }
            </div>
        )
    }
}