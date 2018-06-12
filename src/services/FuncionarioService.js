import BaseService from "./BaseService";

class FuncionarioService extends BaseService {
    BuscarDados() {
        return this.CriarRequisicao("GET", "/funcionario", null);
    }
}

export default new FuncionarioService();
