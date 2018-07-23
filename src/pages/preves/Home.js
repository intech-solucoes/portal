import React from "react";
import { FuncionarioService } from "prevsystem-service";

const config = require("../../config.json");
const funcionarioService = new FuncionarioService(config);

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dados: {
                funcionario: "",
            }
        }
        
    }

    componentWillMount() {
        var self = this;
        funcionarioService.BuscarDados()
            .then((result) => {
                self.setState({
                    dados: result.data
                }, () => console.log(this.state));
            });
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="box">
                        <div className="box-content">
                            <h2>Olá, <span className="text-primary">{this.state.dados.funcionario.NOME_ENTID},</span></h2>
                            <br/>
                            <h5>Bem vindo ao Portal do Participante. Aqui, você encontra as principais informações sobre seu Plano de Benefício.
                                Nosso portal está em desenvolvimento, mas diversas funcionalidades já estão disponíveis para acesso, dentre elas: 
                            </h5>
                            <br/>
                            <div className="list-group">
                                <div className="list-group-item flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1"><b>Consulta a Dados Pessoais</b></h5>
                                    </div>
                                    <p className="mb-1">Informações pessoais fornecidas por meio de sua Ficha de Inscrição na PREVES</p>
                                </div>
                                <div className="list-group-item flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1"><b>Planos</b></h5>
                                    </div>
                                    <p className="mb-1">Informações sobre os planos aos quais você está inscrito, bem como seu certificado de participação e seu extrato de contribuição</p>
                                </div>
                                <div className="list-group-item flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1"><b>Contracheque</b></h5>
                                    </div>
                                    <p className="mb-1">Esta opção mostra o comprovante de pagamento realizado pela PREVES para aquele Participante que já está na condição de Beneficiário</p>
                                </div>
                                <div className="list-group-item flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1"><b>Informe de rendimentos</b></h5>
                                        <small className="text-muted"><b>EM DESENVOLVIMENTO</b></small>
                                    </div>
                                    <p className="mb-1">Este item só terá informações para os participantes que efetuarem contribuições esporádicas ou que estiverem na situação de Autopatrocinado. Os demais participantes terão o informe de rendimento disponibilizado por meio de seu órgão de lotação</p>
                                </div>
                                <div className="list-group-item flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1"><b>Contracheque</b></h5>
                                    </div>
                                    <p className="mb-1">Esta opção mostra o comprovante de pagamento realizado pela PREVES para aquele Participante que já está na condição de Beneficiário</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
