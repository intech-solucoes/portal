import BaseService from "./BaseService";

class PlanoService extends BaseService {
    Buscar() {
        var fundacao = localStorage.getItem("fundacao");
        var empresa = localStorage.getItem("empresa");
        return this.CriarRequisicao("GET", `/plano/porFundacaoEmpresa/${fundacao}/${empresa}`, null);
    }
}

export default new PlanoService();