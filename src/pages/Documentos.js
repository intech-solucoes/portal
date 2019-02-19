import React, { Component } from "react";
import axios from "axios";
import { handleFieldChange } from "@intechprev/react-lib";
import { DocumentoService } from "@intechprev/prevsystem-service";
import { Row, Col, Box, Form, Button, Alert, CampoTexto } from '../components';
import { Link } from "react-router-dom";
import { Page } from ".";
import config from '../config.json';

const apiUrl = config.apiUrl
export default class Documentos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            planos: [],
            documentos: [],
            pastas: [],
            nomePasta: "",
            nomeDocumento: "",
            arquivoUpload: "",
            podeCriarDocumento: false,
            oidArquivoUpload: 0,
            oidPasta: props.match.params.pasta,
            pastaAtual: "",
            visibilidadeFileInput: true
        }

        this.page = React.createRef();
        this.formDocumento = React.createRef();
        this.alertDocumento = React.createRef();
        this.formPasta = React.createRef();
        this.alertPasta = React.createRef();
    }

    componentDidMount = () => {
        this.buscarLista();
    }
    
    UNSAFE_componentWillReceiveProps() {
        window.location.reload();
    }

    buscarLista = async () => {
        var { data: resultado } = await DocumentoService.BuscarPorPasta(this.state.oidPasta);

        await this.setState({ 
            documentos: resultado.documentos,
            pastas: resultado.pastas
        });
    }

    salvarPasta = async (e) => {
        e.preventDefault();

        await this.alertPasta.current.limparErros();
        await this.formPasta.current.validar();

        if(this.alertPasta.current.state.mensagem.length === 0 && this.alertPasta.current.props.mensagem.length === 0) {
            try {
                await DocumentoService.CriarPasta(this.state.nomePasta, this.state.oidPasta);
                await this.setState({
                    nomePasta: ""
                });
        
                await this.buscarLista();

            } catch(err) {
                console.error(err);
            }
        }
    }

    uploadFile = (e) => {
        try {
            const formData = new FormData()
            var arquivoUpload = e.target.files[0];
    
            formData.append("File", arquivoUpload, arquivoUpload.name)
    
            axios.post(apiUrl + '/upload', formData, {
                headers: {'Content-Type': 'multipart/form-data'},
                onUploadProgress: progressEvent => {
                },
            })
            .then((result) => {
                this.setState({
                    podeCriarDocumento: true,
                    oidArquivoUpload: result.data,
                    visibilidadeFileInput: false
                });
            })
        } catch(err) { 
            console.error(err);
        }
    }

    salvarDocumento = async (e) => {
        e.preventDefault();

        await this.alertDocumento.current.limparErros();
        await this.formDocumento.current.validar();

        console.log("alert", this.alertDocumento.current.state.mensagem, this.alertDocumento.current.props.mensagem);
        if(this.alertDocumento.current.state.mensagem.length === 0 && this.alertDocumento.current.props.mensagem.length === 0) {
            try {
                await DocumentoService.Criar(this.state.oidArquivoUpload, this.state.nomeDocumento, "SIM", 1, this.state.oidPasta);
                
                await this.setState ({
                    nomeDocumento: "",
                    arquivoUpload: "",
                    oidArquivoUpload: 0,
                    visibilidadeFileInput: true
                });
                await this.buscarLista();

            } catch(err) {
                console.error(err);
            }
        }
    }

    render() {
        return (
            <Page {...this.props} ref={this.page}>

                <Row>
                    {localStorage.getItem("admin") === "S" &&

                        <Col className={"lg-4"}>
                            <Box titulo={"UPLOAD DE DOCUMENTOS"}>
                                <Form ref={this.formDocumento}>
                                
                                    <CampoTexto contexto={this} nome={"nomeDocumento"} max={50} valor={this.state.nomeDocumento} label={"Título"} obrigatorio />
                                    
                                    <div className="form-group">

                                        <label htmlFor="selecionar-documento"><b>Arquivo</b></label><br />

                                        {this.state.visibilidadeFileInput &&
                                        <input name="selecionar-documento" id="selecionar-documento" type="file" onChange={this.uploadFile} />}
                                        
                                        {!this.state.visibilidadeFileInput &&
                                            <Button titulo={"Enviar outro arquivo"} tipo={"primary"}
                                                    onClick={async () => await this.setState({ visibilidadeFileInput: true })} />}

                                        <hr/>
                                        
                                        <Button id="salvar-documento" titulo={"Salvar"} tipo={"primary"} submit desativado={!this.state.podeCriarDocumento} 
                                                onClick={this.salvarDocumento} />
                                    </div>

                                    <Alert ref={this.alertDocumento} padraoFormulario tipo={"danger"} />

                                </Form>
                            </Box>

                            <Box titulo={"CRIAÇÃO DE PASTA"}>
                                <Form ref={this.formPasta}>
                                
                                    <CampoTexto contexto={this} nome={"nomePasta"} max={50} valor={this.state.nomePasta} label={"Nome"} obrigatorio />
                                    <hr/>

                                    <div className="form-group">
                                        <Button id="salvar-pasta" className={"btn btn-primary"} titulo={"Salvar"} submit onClick={this.salvarPasta} />
                                    </div>

                                    <Alert ref={this.alertPasta} padraoFormulario tipo={"danger"} />

                                </Form>
                            </Box>
                        </Col>

                    }

                    <Col tamanho={"8"}>
                        <Box>
                            {(this.state.pastas.length > 0 || this.state.documentos.length > 0) &&
                                <div>
                                    <Tabelas {...this.props} itens={this.state.pastas} campoTexto={"NOM_PASTA"} icone={"fa-folder-open text-warning"} tipo={"pasta"} />
                                    <Tabelas {...this.props} itens={this.state.documentos} campoTexto={"TXT_TITULO"} icone={"fa-file text-info"} tipo={"documento"} />
                                </div>
                            }

                            {this.state.pastas.length === 0 && this.state.documentos.length === 0 &&
                                <div className="alert alert-danger">Nenhum item disponível.</div>
                            }
                        </Box>
                    </Col>
                </Row>

            </Page>
        );
    }
}

class Tabelas extends React.Component {

    deletarDocumento = async (oidDocumento) => {
        await DocumentoService.Deletar(oidDocumento);
        document.location.reload();
    }

    deletarPasta = async (oidDocumentPasta) => {
        await DocumentoService.DeletarPasta(oidDocumentPasta);
        document.location.reload();
    }

    downloadDocumento = async (oidDocumento) => {
        try {
            var { data: documento } = await DocumentoService.BuscarPorOidDocumento(oidDocumento);
            
            var { data: documentoBlob } = await DocumentoService.Download(oidDocumento);

            const blobURL = window.URL.createObjectURL(new Blob([documentoBlob]));
            const tempLink = document.createElement('a');
            tempLink.style.display = 'none';
            tempLink.href = blobURL;
            tempLink.setAttribute('download', documento.NOM_ARQUIVO_LOCAL);

            if (typeof tempLink.download === 'undefined') {
                tempLink.setAttribute('target', '_blank');
            }

            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(blobURL);

        } catch (err) {
            if(err.response)
                console.error(err.response.data);
            else
                console.error(err);
        }
    }

    render() {
        return (
            <div>
            {
                this.props.itens.map((item, index) => {
                    return (
                        <Row key={index} className={"m-3"}>
                            <Col tamanho={"1"}>
                                <i className={"fa fa-2x " + this.props.icone}></i>
                            </Col>

                            <Col className={"mt-1"}>
                                {this.props.tipo === "pasta" &&
                                    <Link className={"btn btn-link"} to={`/documentos/${item.OID_DOCUMENTO_PASTA}`}>{item[this.props.campoTexto]}</Link>
                                }

                                {this.props.tipo !== "pasta" &&
                                    <Button className={"btn btn-link"} onClick={() => this.downloadDocumento(item.OID_DOCUMENTO)} titulo={item[this.props.campoTexto]} />
                                }
                            </Col>
                            
                            {localStorage.getItem("admin") === "S" &&
                                <Col tamanho={"1"}>
                                    <Button className={"btn btn-sm btn-danger"}
                                        onClick={async () => {
                                            if(this.props.tipo === "pasta")
                                                await this.deletarPasta(item.OID_DOCUMENTO_PASTA);
                                            else
                                                await this.deletarDocumento(item.OID_DOCUMENTO);
                                        }}>
                                        <i className="fa fa-trash"></i>
                                    </Button>
                                </Col>
                            }
                        </Row>
                    );
                })
            }
            </div>
        );
    }
}