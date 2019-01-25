import React from "react";
import axios from "axios";
import { handleFieldChange } from "@intechprev/react-lib";
import { PlanoService, DocumentoService } from "@intechprev/prevsystem-service";
import { Link } from "react-router-dom";
import { Page } from ".";
import config from '../config.json';

const apiUrl = config.apiUrl
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
            oidPasta: props.match.params.pasta,
            pastaAtual: "",
            nomeDocumentoVazio: false,
            nomePastaVazio: false

        }
        this.page = React.createRef();
        this.setState({ pastaAtual: this.state.oidPasta });
    }

    componentDidMount() {
        PlanoService.BuscarTodos()
            .then((result) => {
                this.setState({ planos: result.data });
            });
        this.buscarLista();

        this.setState({ pastaAtual: this.state.oidPasta });
    }

    componentDidUpdate() {
        var pastaAntiga = this.state.oidPasta;
        var oidPasta = this.props.location.pathname.split('/');
        oidPasta = oidPasta[oidPasta.length - 1];
        // oidPasta = oidPasta === "" ? "raiz" : oidPasta;

        if(pastaAntiga !== oidPasta && pastaAntiga !== undefined)
            window.location.reload();

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

        await this.setState({ nomePastaVazio: false });
        if(this.state.nomePasta === "")
            await this.setState({ nomePastaVazio: true });

        if(!this.state.nomePastaVazio) {
            await DocumentoService.CriarPasta(this.state.nomePasta, this.state.oidPasta);
            await this.setState({
                nomePasta: ""
            });
    
            await this.buscarLista();
        }
    }

    salvarDocumento = async (e) => {
        e.preventDefault();

        await this.setState({ nomeDocumentoVazio: false });
        if(this.state.nomeDocumento === "")
            await this.setState({ nomeDocumentoVazio: true });

        if(!this.state.nomeDocumentoVazio) {
            await DocumentoService.Criar(this.state.oidArquivoUpload, this.state.nomeDocumento, "SIM", 1, this.state.oidPasta);
            
            await this.setState ({
                nomeDocumento: "",
                arquivoUpload: "",
                oidArquivoUpload: 0
            });
    
            await this.buscarLista();
        }
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

    renderizaErro = (stateErro, mensagemErro) => {
        if(stateErro) {
            return (    
                <div className="text-danger">
                    <i className="fas fa-exclamation-circle"></i>&nbsp;
                    <label id='mensagem-erro'>
                        {mensagemErro}
                    </label>
                </div>
            )
        }
    }

    render() {
        return (
            <Page {...this.props} ref={this.page}>
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
                                        {this.renderizaErro(this.state.nomeDocumentoVazio, "Título do documento obrigatório!")}
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
                                    {this.renderizaErro(this.state.nomePastaVazio, "Nome da pasta obrigatório!")}
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
            
            DocumentoService.Download(oidDocumento)
                .then(result => {
                    const blobURL = window.URL.createObjectURL(new Blob([result.data]));
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
                });
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
                        <div key={index} className="row m-3">
                            <div className="col-1">
                                <i className={"fa fa-2x " + this.props.icone}></i>
                            </div>

                            <div className="col mt-1">
                                {this.props.tipo === "pasta" &&
                                    <Link className="btn btn-link" onClick={async () => window.location.reload()} 
                                        to={`/documentos/${item.OID_DOCUMENTO_PASTA}`}> {item[this.props.campoTexto]} </Link>
                                }

                                {this.props.tipo !== "pasta" &&
                                    <button className={"btn btn-link"} onClick={() => this.downloadDocumento(item.OID_DOCUMENTO)}> {item[this.props.campoTexto]} </button>
                                }
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