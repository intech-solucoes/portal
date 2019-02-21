import React from "react";
import { DadosPessoaisService } from "@intechprev/prevsystem-service";
import Page from "../Page";
import { Row, Col } from "../../components";
import Box from "../../components/Box";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dados: {
                dadosPessoais: {}
            }
        }
    }

    componentWillMount = async () => {
        var { data: dados } = await DadosPessoaisService.Buscar();
        await this.setState({ dados });
    }

    render() {
        const HomeItem = (props) => (
            <div className="list-group-item flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1"><b>{props.titulo}</b></h5>

                    {props.emDesenvolvimento &&
                        <small className="text-muted"><b>EM DESENVOLVIMENTO</b></small>
                    }
                </div>
                <p className="mb-1">{props.children}</p>
            </div>
        );

        return (
            <Page {...this.props}>
                <Row>
                    <Col tamanho={"lg-12"}>
                        <Box>
                            <h2>Olá, <span className="text-primary">{this.state.dados.dadosPessoais.NOME_ENTID}</span></h2>
                            <h5>
                                <p className="text-justify">Bem vindo ao Portal do Participante. Aqui, você encontra as principais informações sobre seu Plano de Benefício.
                                Nosso portal está em desenvolvimento, mas diversas funcionalidades já estão disponíveis para acesso, dentre elas: </p>
                            </h5>
                            <br/>

                            <div className="list-group">
                                <HomeItem titulo={"Consulta a Dados Pessoais"}>
                                    Informações pessoais fornecidas por meio de sua Ficha de Inscrição na PREVES
                                </HomeItem>

                                <HomeItem titulo={"Planos"}>
                                    Informações sobre os planos aos quais você está inscrito, bem como seu certificado de participação e seu extrato de contribuição
                                </HomeItem>

                                <HomeItem titulo={"Contracheque"}>
                                    Esta opção mostra o comprovante de pagamento realizado pela PREVES para aquele Participante que já está na condição de Beneficiário
                                </HomeItem>

                                <HomeItem titulo={"Informe de rendimentos"} emDesenvolvimento>
                                    Este item só terá informações para os participantes que efetuarem contribuições esporádicas ou que estiverem na situação de Autopatrocinado. 
                                    Os demais participantes terão o informe de rendimento disponibilizado por meio de seu órgão de lotação
                                </HomeItem>

                                <HomeItem titulo={"Recadastramento"} emDesenvolvimento>
                                    Este recurso ainda não está disponível, mas será utilizado, pelo participante, para alteração de alguns dados pessoais
                                </HomeItem>

                                <HomeItem titulo={"Documentos"}>
                                    Área destinada a publicações de documentos diversos destinados ao participante
                                </HomeItem>

                                <HomeItem titulo={"Mensagens"}>
                                    Informações enviadas pela PREVES
                                </HomeItem>

                                <HomeItem titulo={"Trocar senha"}>
                                    O participante tem a possibilidade de alterar a senha de acesso sempre que julgar necessário. Para isso, deverá informar a senha antiga, e a nova senha
                                </HomeItem>

                                <div style={{marginTop: 20}} className="box-footer">
                                    <h5>
                                        <p className="text-justify">
                                            O Portal do Participante foi desenvolvido com o objetivo de facilitar a comunicação entre a PREVES e seus participantes. Caso tenha alguma sugestão ou dúvida quanto as informações
                                            aqui disponibilizadas, entre em contato com a Fundação pelo e-mail <a href="mailto:contato@preves.es.gov.br">contato@preves.es.gov.br</a>.
                                        </p>
                                    </h5>
                                </div>
                                <br/>
                            </div>
                        </Box>
                    </Col>
                </Row>
            </Page>
        );
    }
}