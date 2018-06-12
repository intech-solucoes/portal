import BaseService from "./BaseService";

export default class PlanoServiceService extends BaseService {
    Buscar(resolve, reject) {
        this.CriarRequisicao("GET", "/plano/porFundacaoEmpresa/01/0001", null)
            .then(resolve)
            .catch(reject);
    }
}
