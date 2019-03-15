import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Alert extends Component {
    static propTypes = {
        mensagem: PropTypes.any,
        tipo: PropTypes.string.isRequired,
        padraoFormulario: PropTypes.bool,
        tamanho: PropTypes.string,
        rowClassName: PropTypes.string,
        colClassName: PropTypes.string,
        id: PropTypes.string,
        style: PropTypes.object
    }

    static defaultProps = {
        mensagem: "",
        padraoFormulario: false,
        tamanho: "12",
        rowClassName: "",
        colClassName: ""
    }

    constructor(props) {
        super(props);

        this.state = {
            mensagem: ""
        }
    }

    adicionarErro = async (mensagemErro) => { 
        var temMensagem = this.props.mensagem.length > 0 || this.state.mensagem.length > 0;
        var espacamento = temMensagem ? "<br/>" : "";

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
            <div className={"row " + this.props.rowClassName}>
                <div className={"col-" + this.props.tamanho + ` ${this.props.colClassName}`} style={this.props.style}>
                    {(this.state.mensagem || this.props.mensagem) &&
                        <div id="alerta" className={"alert alert-" + this.props.tipo} id={this.props.id}
                            dangerouslySetInnerHTML={{ __html: this.props.mensagem + this.state.mensagem }}>
                        </div>
                    }
                </div>
            </div>
        )
    }
}