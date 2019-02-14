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
            mensagem: this.state.mensagem + espacamento + mensagemErro      // Aq na primeira vez que é chamado o state mensagem é vazio, sobrando apenas a mensagem adicionada.
        });

        console.log("Erro adicionado:", mensagemErro);                     // seria necessario mais uma variavel independente de msg?!
        console.log("mensagem total:", this.state.mensagem);
    }

    limparErros = async () => { 
        await this.setState({
            mensagem: ""   // mensagem: this.props.mensagem
        })
    }

    render() {
        console.log("Render Alert", this.state.mensagem, this.props.mensagem);
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