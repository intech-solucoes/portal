import React from "react";
import axios from "axios";
import { handleFieldChange } from "@intechprev/react-lib";
import { PlanoService, DocumentoService } from "@intechprev/prevsystem-service";

const apiUrl = process.env.API_URL;

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
            oidArquivoUpload: 0,
            oidPasta: props.routeProps.match.params.pasta
        }
    }

    componentDidMount() {
        PlanoService.BuscarTodos()
            .then((result) => {
                this.setState({ planos: result.data });
            });

        this.buscarLista();
    }

    buscarLista = async () => {
        var resultDocumentos = await DocumentoService.BuscarPorPasta(this.state.oidPasta);

        await this.setState({ 
            documentos: resultDocumentos.data.documentos,
            pastas: resultDocumentos.data.pastas
        });
    }

    salvarPasta = async (e) => {
        e.preventDefault();

        await DocumentoService.CriarPasta(this.state.nomePasta, this.state.oidPasta);
        await this.setState({
            nomePasta: ""
        });

        await this.buscarLista();
    }

    salvarDocumento = async (e) => {
        e.preventDefault();

        await DocumentoService.Criar(this.state.oidArquivoUpload, this.state.nomeDocumento, "SIM", 1, this.state.oidPasta);
        
        await this.setState({
            nomeDocumento: "",
            arquivoUpload: "",
            oidArquivoUpload: 0
        });

        await this.buscarLista();
    }

    uploadFile = (e) => {
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
                oidArquivoUpload: result.data
            });
        })
    }

    render() {
        return (
            <div className="row">
                {localStorage.getItem("admin") === "S" &&
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
                            {(this.state.pastas.length > 0 || this.state.documentos.length > 0) &&
                                <div>
                                    <Tabelas itens={this.state.pastas} campoTexto={"NOM_PASTA"} icone={"fa-folder-open text-warning"} tipo={"pasta"} />
                                    <Tabelas itens={this.state.documentos} campoTexto={"TXT_TITULO"} icone={"fa-file text-info"} tipo={"documento"} />
                                </div>
                            }

                            {this.state.pastas.length === 0 && this.state.documentos.length === 0 &&
                                <div className="alert alert-danger">Nenhum item disponível.</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
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

    render() {
        return (
            <div>
            {
                this.props.itens.map((item, index) => {
                    return (
                        <div key={index} className="row m-3">
                            <div className="col-1">
                                <i className={"fa fa-2x " + this.props.icone}></i>
                            </div>
                            <div className="col mt-1">
                                <a href={process.env.PUBLIC_URL + `/documentos/${item.OID_DOCUMENTO_PASTA}`}>{item[this.props.campoTexto]}</a>
                            </div>
                            
                            {localStorage.getItem("admin") === "S" &&
                                <div className="col-1">
                                    <button className="btn btn-sm btn-danger" 
                                        onClick={async () => {
                                            if(this.props.tipo === "pasta")
                                                await this.deletarPasta(item.OID_DOCUMENTO_PASTA);
                                            else
                                                await this.deletarDocumento(item.OID_DOCUMENTO);
                                        }}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>}
                        </div>
                    );
                })
            }
            </div>
        );
    }
}