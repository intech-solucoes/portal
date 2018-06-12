import BaseService from "./BaseService";

export default class FuncionarioService extends BaseService {
    BuscarDados(resolve, reject) {
        this.CriarRequisicao("GET", "/funcionario", null)
            .then(resolve)
            .catch(reject);
    }
}
