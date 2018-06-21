import MasterPage from "./MasterPage";
import MasterPageLogin from "./MasterPageLogin";

const config = require("../config.json");

function getPage(pageName) {
    try {
        return require("./" + config.cliente + "/" + pageName).default;
    } catch(e) {
        return require("./" + pageName).default;
    }
}

export const Login = getPage("Login");

export const Home = getPage("Home");
export const Planos = getPage("Planos");
export const Beneficios = getPage("Beneficios");
export const ContraCheque = getPage("ContraCheque");
export const InformeRendimentos = getPage("InformeRendimentos");
export const Documentos = getPage("Documentos");
export const Mensagens = getPage("Mensagens");
export const Recadastramento = getPage("Recadastramento");
export const TrocarSenha = getPage("TrocarSenha");
export const ControleFuncionalidades = getPage("ControleFuncionalidades");
export const MensagemNova = getPage("MensagemNova");
export const ContraChequeDetalhe = getPage("ContraChequeDetalhe");
export const ListarParticipantes = getPage("ListarParticipantes");
export const EsqueciSenha = getPage("EsqueciSenha");

export {
    MasterPage, MasterPageLogin
};
