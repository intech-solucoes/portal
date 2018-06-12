import BaseService from "./BaseService";

class UsuarioService extends BaseService {
    VerificarLogin() {
        return this.CriarRequisicao("GET", "/usuario", null);
    }

    Login(cpf, senha) {
        return this.CriarRequisicao("POST", "/usuario/login", { Cpf: cpf, Senha: senha });
    }
}

export default new UsuarioService();