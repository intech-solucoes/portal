import React from "react";
import axios from "axios";
import { handleFieldChange } from "react-lib";
import { PlanoService, DocumentoService } from "prevsystem-service";

const config = require("../config.json");

const planoService = new PlanoService(config);
const documentoService = new DocumentoService(config);

export default class Documentos extends React.Component {
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
            oidArquivoUpload: 0
        }

        this.salvarPasta = this.salvarPasta.bind(this);
        this.salvarDocumento = this.salvarDocumento.bind(this);
        this.buscarLista = this.buscarLista.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    componentDidMount() {
        planoService.Listar()
            .then((result) => {
                this.setState({ planos: result.data });
            });

        this.buscarLista();
    }

    buscarLista() {
        documentoService.BuscarPorPasta()
            .then((result) => {
                this.setState({ 
                    documentos: result.data.documentos,
                    pastas: result.data.pastas
                });
            });
    }

    salvarPasta(e) {
        e.preventDefault();

        documentoService.CriarPasta(this.state.nomePasta)
            .then((result) => {
                this.setState({
                    nomePasta: ""
                });

                this.buscarLista();
            });
    }

    salvarDocumento(e) {
        e.preventDefault();

        documentoService.Criar(this.state.oidArquivoUpload, this.state.nomeDocumento, "SIM", 1)
            .then((result) => {
                this.setState({
                    nomeDocumento: "",
                    arquivoUpload: "",
                    oidArquivoUpload: 0
                });

                this.buscarLista();
            });
    }

    uploadFile(e) {
        const formData = new FormData()
        var arquivoUpload = e.target.files[0];

        formData.append("File", arquivoUpload, arquivoUpload.name)

        axios.post(config.apiUrl + '/upload', formData, {
            headers: {'Content-Type': 'multipart/form-data'},
            onUploadProgress: progressEvent => {
            },
        })
        .then((result) => {
            console.log(result.data);
            this.setState({
                podeCriarDocumento: true,
                oidArquivoUpload: result.data
            });
        })
    }

    render() {
        return (
            <div className="row">
                {localStorage.getItem("adm") === "S" &&
                    <div className="col-lg-4">
                        <div className="box">
                            <div className="box-title">
                                UPLOAD DE DOCUMENTOS
                            </div>
                            <div className="box-content">
                                <div className="form-group">
                                    <label htmlFor="titulo-documento"><b>Título:</b></label>
                                    <input name="nomeDocumento" className="form-control" value={this.state.nomeDocumento} onChange={(e) => handleFieldChange(this, e)}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="plano-documento"><b>Plano:</b></label>
                                    <select id="plano-documento" className="form-control">
                                        <option>TODOS</option>
                                        {this.state.planos.map((plano, index) => {
                                            return <option key={index} value={plano.CD_PLANO}>{plano.DS_PLANO}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="selecionar-documento"><b>Arquivo:</b></label>
                                    <form>
                                        <input id="selecionar-documento" type="file" onChange={this.uploadFile} value={this.state.arquivoUpload}></input>
                                        <hr/>
                                        <button id="salvar-documento" className="btn btn-primary" disabled={!this.state.podeCriarDocumento} onClick={this.salvarDocumento}>Salvar</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="box">
                            <div className="box-title">
                                CRIAÇÃO DE PASTA
                            </div>

                            <div className="box-content">
                                <div className="form-group">
                                    <label htmlFor="nomePasta"><b>Nome:</b></label>
                                    <input name="nomePasta" className="form-control" value={this.state.nomePasta} onChange={(e) => handleFieldChange(this, e)}></input>
                                </div>
                                <hr/>
                                <button id="salvar-pasta" className="btn btn-primary" onClick={this.salvarPasta}>Salvar</button>
                            </div>
                        </div>
                    </div>
                }

                <div className="col-lg-8">
                    <div className="box">
                        <div className="box-content">
                            <Tabelas itens={this.state.pastas} campoTexto={"NOM_PASTA"} icone={"fa-folder-open text-warning"} />
                            <Tabelas itens={this.state.documentos} campoTexto={"TXT_TITULO"} icone={"fa-file text-info"} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Tabelas extends React.Component {
    render() {
        return (
            <div>
            {
                this.props.itens.map((pasta, index) => {
                    return (
                        <div key={index} className="row m-3">
                            <div className="col-1">
                                <i className={"fa fa-2x " + this.props.icone}></i>
                            </div>
                            <div className="col mt-1">
                                <a id={"abrir-pasta-"} href="">{pasta[this.props.campoTexto]}</a>
                            </div>
                            <div className="col-1">
                                <button id={"deletar-pasta-"} className="btn btn-sm btn-danger">
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    );
                })
            }
            </div>
        )
    }
}