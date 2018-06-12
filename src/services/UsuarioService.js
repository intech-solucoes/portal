import BaseService from "./BaseService";

class UsuarioService extends BaseService {
    Login(cpf, senha, resolve, reject) {
        this.CriarRequisicao("POST", "/usuario/login", { Cpf: cpf, Senha: senha })
            .then(resolve)
            .catch(reject);
    }

    BuscarUsuario(resolve, reject) {
        this.CriarRequisicao("GET", "/usuario", null)
            .then(resolve)
            .catch(reject);
    }
}

export default new UsuarioService();